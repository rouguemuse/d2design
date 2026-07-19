const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require('puppeteer');

const distDir = path.resolve(__dirname, '../dist');
const artifactsDir = 'C:\\Users\\rougu\\.gemini\\antigravity\\brain\\67e4ec9b-7bb9-400f-8a65-6c09056ae536';

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
    else if (ext === '.webm') contentType = 'video/webm';
    else if (ext === '.mp4') contentType = 'video/mp4';
    
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end();
  }
});

async function run() {
  const port = await new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => resolve(server.address().port));
  });
  
  const localOrigin = `http://127.0.0.1:${port}`;
  console.log(`Server started on ${localOrigin}`);

  const browser = await puppeteer.launch({ headless: true });

  const capture = async (width, filename) => {
    const page = await browser.newPage();
    await page.setViewport({ width, height: 1000 });
    await page.goto(`${localOrigin}/`, { waitUntil: 'networkidle0' });
    
    // Wait for autoplay video to mount
    await new Promise(r => setTimeout(r, 1000));
    
    const screenshotPath = path.join(artifactsDir, filename);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`Captured screenshot for ${width}px to ${screenshotPath}`);
    await page.close();
  };

  await capture(1440, 'screenshot_1440.png');
  await capture(768, 'screenshot_768.png');
  await capture(390, 'screenshot_390.png');

  await browser.close();
  server.close();
}

run().catch(console.error);
