const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require('puppeteer');
const { execSync } = require('child_process');

const distDir = path.resolve(__dirname, '../dist');
const prerenderedPath = path.resolve(distDir, 'index.html');
const backupPath = path.resolve(__dirname, 'index.prerendered.html');

async function run() {
  if (!fs.existsSync(prerenderedPath)) {
    console.error('No dist/index.html found');
    return;
  }

  // 1. Backup the prerendered HTML
  console.log('Backing up prerendered HTML...');
  fs.copyFileSync(prerenderedPath, backupPath);

  // 2. Rebuild Vite client in PRODUCTION mode to get the true empty shell
  console.log('Rebuilding Vite shell in production mode...');
  execSync('npx vite build --mode production', { stdio: 'ignore' });

  // 3. Start local server to serve the Vite shell
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

  const port = await new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => resolve(server.address().port));
  });

  // 4. Load page in Puppeteer with JS enabled to let React render on client from empty root
  console.log('Loading shell in Puppeteer to get client-rendered DOM...');
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle0' });
  const clientHTML = await page.evaluate(() => document.getElementById('root').innerHTML);
  await browser.close();
  server.close();

  // 5. Restore prerendered HTML
  console.log('Restoring prerendered HTML...');
  fs.copyFileSync(backupPath, prerenderedPath);
  fs.unlinkSync(backupPath);

  // 6. Load the prerendered HTML file content
  const prerenderedHTML = fs.readFileSync(prerenderedPath, 'utf8');
  // Get the innerHTML of root from prerendered HTML
  const rootStart = prerenderedHTML.indexOf('<div id="root">') + '<div id="root">'.length;
  const rootEnd = prerenderedHTML.lastIndexOf('</div>');
  const serverHTML = prerenderedHTML.slice(rootStart, rootEnd);

  // Compare serverHTML vs clientHTML
  console.log('\nLength Comparison:');
  console.log('Server:', serverHTML.length);
  console.log('Client:', clientHTML.length);

  let firstDiff = -1;
  for (let i = 0; i < Math.min(serverHTML.length, clientHTML.length); i++) {
    if (serverHTML[i] !== clientHTML[i]) {
      firstDiff = i;
      break;
    }
  }

  if (firstDiff !== -1) {
    console.log(`\nDiff found at index ${firstDiff}:`);
    console.log('Server:', JSON.stringify(serverHTML.slice(Math.max(0, firstDiff - 100), firstDiff + 100)));
    console.log('Client:', JSON.stringify(clientHTML.slice(Math.max(0, firstDiff - 100), clientHTML.length)));
  } else {
    console.log('\nNo HTML difference found between server-rendered and client-rendered DOM!');
  }
}

run().catch(console.error);
