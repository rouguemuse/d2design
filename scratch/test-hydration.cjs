const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require('puppeteer');

const distDir = path.resolve(__dirname, '../dist');
const shellPath = path.resolve(distDir, 'index.html');

if (!fs.existsSync(shellPath)) {
  console.error('Error: dist/index.html not found. Run Vite build first.');
  process.exit(1);
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url || '', `http://${req.headers.host}`);
  let filePath = path.join(distDir, decodeURIComponent(url.pathname));

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    let contentType = 'text/plain';
    if (ext === '.html') contentType = 'text/html; charset=utf-8';
    else if (ext === '.js') contentType = 'application/javascript; charset=utf-8';
    else if (ext === '.css') contentType = 'text/css; charset=utf-8';
    
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end();
  }
});

async function run() {
  const port = await new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      resolve(server.address().port);
    });
  });
  
  const localOrigin = `http://127.0.0.1:${port}`;
  console.log(`Server started on ${localOrigin}`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  page.on('pageerror', (err) => {
    console.log('[PAGE ERROR]:', err.stack || err.message);
  });

  page.on('console', (msg) => {
    console.log(`[CONSOLE ${msg.type().toUpperCase()}]:`, msg.text());
  });

  console.log('Navigating to / ...');
  await page.goto(`${localOrigin}/`, { waitUntil: 'networkidle0' });
  console.log('Navigation complete. Waiting 3 seconds for async errors...');
  await new Promise(r => setTimeout(r, 3000));

  await browser.close();
  server.close();
}

run().catch(console.error);
