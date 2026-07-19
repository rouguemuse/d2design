const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require('puppeteer');

const distDir = path.resolve(__dirname, '../dist');

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

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  // 1. Load page with JavaScript disabled (to get exact static HTML structure parsed by browser)
  const page1 = await browser.newPage();
  await page1.setJavaScriptEnabled(false);
  await page1.goto(`${localOrigin}/`, { waitUntil: 'networkidle0' });
  const staticHTML = await page1.evaluate(() => document.getElementById('root').innerHTML);
  await page1.close();

  // 2. Load page with JavaScript enabled (to get client rendered structure, or catch error)
  const page2 = await browser.newPage();
  const consoleErrors = [];
  page2.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page2.on('pageerror', err => {
    consoleErrors.push(err.message);
  });
  await page2.goto(`${localOrigin}/`, { waitUntil: 'networkidle0' });
  
  // Give it a moment to hydrate
  await new Promise(r => setTimeout(r, 1000));
  const clientHTML = await page2.evaluate(() => document.getElementById('root').innerHTML);
  await page2.close();

  console.log('--- Static HTML ---');
  console.log(staticHTML.substring(0, 500));
  
  // Find where they differ
  let firstDiff = -1;
  for (let i = 0; i < Math.min(staticHTML.length, clientHTML.length); i++) {
    if (staticHTML[i] !== clientHTML[i]) {
      firstDiff = i;
      break;
    }
  }

  if (firstDiff !== -1) {
    console.log(`\nDiff found at index ${firstDiff}:`);
    console.log('Static:', JSON.stringify(staticHTML.slice(Math.max(0, firstDiff - 50), firstDiff + 100)));
    console.log('Client:', JSON.stringify(clientHTML.slice(Math.max(0, firstDiff - 50), firstDiff + 100)));
  } else {
    console.log('\nNo HTML difference found!');
  }

  console.log('\nConsole Errors/Warnings:', consoleErrors);

  await browser.close();
  server.close();
}

run().catch(console.error);
