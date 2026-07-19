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

  // Test video asset headers first
  console.log('Testing video asset fetch...');
  await new Promise((resolve) => {
    const req = http.get(`${localOrigin}/media/d2-hero-optimized.webm`, (res) => {
      console.log('HTTP Status:', res.statusCode);
      console.log('Content-Type:', res.headers['content-type']);
      res.destroy();
      resolve();
    });
    req.on('error', (err) => {
      console.error('Fetch Error:', err.message);
      resolve();
    });
  });

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  console.log('Navigating to homepage...');
  await page.goto(`${localOrigin}/`, { waitUntil: 'networkidle0' });

  // Get video element state
  const getVideoState = async () => {
    return await page.evaluate(() => {
      const video = document.querySelector('video');
      if (!video) return { found: false };
      return {
        found: true,
        currentSrc: video.currentSrc,
        readyState: video.readyState,
        paused: video.paused,
        currentTime: video.currentTime
      };
    });
  };

  const initial = await getVideoState();
  console.log('\nInitial Video State:', initial);

  console.log('Waiting 2 seconds...');
  await new Promise(r => setTimeout(r, 2000));

  const secondary = await getVideoState();
  console.log('Secondary Video State:', secondary);

  console.log('\nValidation Checks:');
  const checks = {
    endsInCorrectFormat: initial.currentSrc.endsWith('.webm') || initial.currentSrc.endsWith('.mp4'),
    readyStateAtLeast2: initial.readyState >= 2,
    pausedIsFalse: initial.paused === false,
    currentTimeIncreases: secondary.currentTime > initial.currentTime
  };
  console.log(checks);

  await browser.close();
  server.close();
}

run().catch(console.error);
