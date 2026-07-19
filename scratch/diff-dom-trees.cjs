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

  // 1. Backup prerendered
  fs.copyFileSync(prerenderedPath, backupPath);

  // 2. Build Vite client shell (empty root)
  console.log('Rebuilding Vite shell in production mode...');
  execSync('npx vite build --mode production', { stdio: 'ignore' });

  // 3. Start local server
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

  // 4. Load in Puppeteer to get client-rendered tree
  console.log('Loading client DOM tree...');
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle0' });
  
  // Helper to serialize DOM tree
  const serializeTree = () => {
    const root = document.getElementById('root');
    const walk = (node) => {
      if (node.nodeType === 3) { // Text node
        return { type: 'text', value: node.nodeValue };
      }
      if (node.nodeType === 1) { // Element node
        const attrs = {};
        for (const attr of node.attributes) {
          attrs[attr.name] = attr.value;
        }
        return {
          type: 'element',
          tag: node.tagName.toLowerCase(),
          attrs,
          children: Array.from(node.childNodes).map(walk)
        };
      }
      return { type: 'other' };
    };
    return walk(root);
  };

  const clientTree = await page.evaluate(serializeTree);
  await browser.close();
  server.close();

  // 5. Restore prerendered
  fs.copyFileSync(backupPath, prerenderedPath);
  fs.unlinkSync(backupPath);

  // 6. Start local server with prerendered HTML
  const server2 = http.createServer((req, res) => {
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

  const port2 = await new Promise((resolve) => {
    server2.listen(0, '127.0.0.1', () => resolve(server2.address().port));
  });

  // 7. Load page with JS disabled to get pure static HTML DOM tree parsed by browser
  console.log('Loading server DOM tree...');
  const browser2 = await puppeteer.launch({ headless: true });
  const page2 = await browser2.newPage();
  await page2.setJavaScriptEnabled(false);
  await page2.goto(`http://127.0.0.1:${port2}/`);
  const serverTree = await page2.evaluate(serializeTree);
  await browser2.close();
  server2.close();

  // Diff the trees
  const findDiff = (node1, node2, path = '') => {
    if (!node1 && !node2) return null;
    if (!node1) return { error: 'Missing node in Server', path };
    if (!node2) return { error: 'Missing node in Client', path };
    
    if (node1.type !== node2.type) {
      return { error: `Type mismatch: ${node1.type} vs ${node2.type}`, path };
    }
    
    if (node1.type === 'text') {
      if (node1.value !== node2.value) {
        return {
          error: 'Text mismatch',
          server: JSON.stringify(node1.value),
          client: JSON.stringify(node2.value),
          path
        };
      }
      return null;
    }

    if (node1.tag !== node2.tag) {
      return { error: `Tag mismatch: ${node1.tag} vs ${node2.tag}`, path };
    }

    // Compare attributes
    const attrs1 = Object.keys(node1.attrs).sort();
    const attrs2 = Object.keys(node2.attrs).sort();
    for (const key of new Set([...attrs1, ...attrs2])) {
      if (node1.attrs[key] !== node2.attrs[key]) {
        return {
          error: `Attribute mismatch for ${key}`,
          server: node1.attrs[key],
          client: node2.attrs[key],
          path: `${path}/${node1.tag}`
        };
      }
    }

    // Compare children
    const maxLen = Math.max(node1.children.length, node2.children.length);
    for (let i = 0; i < maxLen; i++) {
      const diff = findDiff(node1.children[i], node2.children[i], `${path}/${node1.tag}[${i}]`);
      if (diff) return diff;
    }

    return null;
  };

  const diffResult = findDiff(serverTree, clientTree);
  if (diffResult) {
    console.log('\n--- Hydration DOM tree diff found! ---');
    console.log(JSON.stringify(diffResult, null, 2));
  } else {
    console.log('\nDOM trees are completely identical!');
  }
}

run().catch(console.error);
