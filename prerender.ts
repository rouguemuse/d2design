import fs from 'fs';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import { blogPosts } from './src/data/blogPosts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, 'dist');
const shellPath = path.resolve(distDir, 'index.html');

// Validate build directory exists
if (!fs.existsSync(shellPath)) {
  console.error('Error: dist/index.html not found. Run Vite build first.');
  process.exit(1);
}

// Preserve original empty-root shell HTML in memory
const shellHtml = fs.readFileSync(shellPath, 'utf8');

// Define static and dynamic routes derived from blogPosts array
const staticRoutes = [
  { path: '/blog', output: 'blog/index.html' },
  { path: '/ddtv', output: 'ddtv/index.html' },
  { path: '/privacy', output: 'privacy/index.html' }
];

const dynamicRoutes = blogPosts.map((post) => ({
  path: `/blog/${post.slug}`,
  output: `blog/${post.slug}/index.html`
}));

// Route sequence (H1 page is last)
const routes = [
  ...staticRoutes,
  ...dynamicRoutes,
  { path: '/mock-not-found-path', output: '404.html' },
  { path: '/', output: 'index.html' }
];

// Start local server to serve static output and fallback to preserved shell
const server = http.createServer((req, res) => {
  const url = new URL(req.url || '', `http://${req.headers.host}`);
  const decodedPath = decodeURIComponent(url.pathname);
  let filePath = path.join(distDir, decodedPath);

  // If the path resolves to a directory, check for index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    let contentType = 'text/plain';
    if (ext === '.html') contentType = 'text/html; charset=utf-8';
    else if (ext === '.js') contentType = 'application/javascript; charset=utf-8';
    else if (ext === '.css') contentType = 'text/css; charset=utf-8';
    else if (ext === '.webp') contentType = 'image/webp';
    else if (ext === '.webm') contentType = 'video/webm';
    else if (ext === '.mp4') contentType = 'video/mp4';
    else if (ext === '.png') contentType = 'image/png';
    else if (ext === '.svg') contentType = 'image/svg+xml';
    
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  } else {
    // Serve the preserved shell HTML for client-side routing fallback
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(shellHtml);
  }
});

// Run prerender generation sequence
async function run() {
  // 1. Verify Puppeteer browser installation path
  const executablePath = await puppeteer.executablePath();
  if (!executablePath) {
    throw new Error('Puppeteer Chrome installation is missing. Run: npx puppeteer browsers install');
  }
  console.log(`Resolved Chrome executable: ${executablePath}`);

  // 2. Start server on dynamic port
  const port = await new Promise<number>((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      if (address && typeof address !== 'string') {
        resolve(address.port);
      }
    });
  });
  
  const localOrigin = `http://127.0.0.1:${port}`;
  console.log(`Server started on ${localOrigin}`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const pageErrors: string[] = [];
  const consoleErrors: string[] = [];
  const thirdPartyWarnings: string[] = [];

  // Register page events
  page.on('pageerror', (err) => {
    pageErrors.push(err.message);
  });

  page.on('console', (msg) => {
    const text = msg.text();
    const isHydrationError = /hydration|server rendered html|didn't match the client/i.test(text);
    const location = msg.location();
    const sourceUrl = location.url || '';
    const isFirstParty = sourceUrl.startsWith(localOrigin) || sourceUrl === '';

    // Print all browser console messages to build output for debugging
    console.log(`[Browser Console ${msg.type()}]: ${text} (from ${sourceUrl})`);

    if (msg.type() === 'error' && (isFirstParty || isHydrationError)) {
      consoleErrors.push(text);
    } else if (msg.type() === 'error') {
      thirdPartyWarnings.push(text);
    }
  });

  try {
    // ----------------------------------------------------
    // PASS 1: STATIC PRERENDER COMPILATION
    // ----------------------------------------------------
    console.log('\n--- Starting Pass 1: Prerendering HTML generation ---');
    for (const r of routes) {
      const isNotFoundRoute = r.output === '404.html';
      const visitUrl = `${localOrigin}${r.path}`;
      console.log(`Prerendering route: ${r.path} -> dist/${r.output}`);

      const response = await page.goto(visitUrl, { waitUntil: 'domcontentloaded' });
      if (!response || response.status() !== 200) {
        throw new Error(`Failed to load ${r.path}: Response status ${response ? response.status() : 'null'}`);
      }

      // Wait for deterministic mount ready signals
      await page.waitForFunction(
        (requiresCanonical) => {
          const ready =
            document.documentElement.dataset.prerenderReady === 'true' &&
            document.querySelector('main h1') !== null;
          const canonicalReady =
            !requiresCanonical ||
            document.querySelector('link[rel="canonical"]') !== null;
          return ready && canonicalReady;
        },
        {},
        !isNotFoundRoute
      );

      // Verify page error safety
      if (pageErrors.length > 0) {
        throw new Error(`Page error detected during render of ${r.path}: ${pageErrors[0]}`);
      }

      // Validate head SEO metadata elements strictly
      const counts = await page.evaluate(() => ({
        titles: document.head.querySelectorAll('title').length,
        descriptions: document.head.querySelectorAll('meta[name="description"]').length,
        canonicals: document.head.querySelectorAll('link[rel="canonical"]').length,
        robots: document.head.querySelectorAll('meta[name="robots"]').length,
        jsonld: document.querySelectorAll('script[type="application/ld+json"]').length
      }));

      console.log(`  Metadata verification counts:`, counts);

      if (isNotFoundRoute) {
        if (counts.titles !== 1 || counts.descriptions !== 1 || counts.robots !== 1) {
          throw new Error(`SEO metadata count mismatch for 404 route: ${JSON.stringify(counts)}`);
        }
        if (counts.canonicals > 0) {
          throw new Error(`404 route must not contain any canonical link.`);
        }
      } else {
        if (counts.titles !== 1 || counts.descriptions !== 1 || counts.canonicals !== 1 || counts.robots > 0) {
          throw new Error(`SEO metadata count mismatch for indexable route ${r.path}: ${JSON.stringify(counts)}`);
        }
      }

      // Verify and parse JSON-LD schemas
      if (counts.jsonld > 0) {
        const jsonLdContents = await page.evaluate(() => {
          const scripts = document.querySelectorAll('script[type="application/ld+json"]');
          return Array.from(scripts).map((s) => s.textContent || '');
        });
        
        for (const jsonStr of jsonLdContents) {
          try {
            JSON.parse(jsonStr);
          } catch {
            throw new Error(`Invalid JSON-LD schema parsing error in ${r.path}: ${jsonStr}`);
          }
        }
        console.log(`  JSON-LD parsed successfully.`);
      }

      // Serialize and write to disk
      const html = await page.content();
      const outputPath = path.join(distDir, r.output);
      const outputFolder = path.dirname(outputPath);

      if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder, { recursive: true });
      }

      fs.writeFileSync(outputPath, html, 'utf8');
      console.log(`  Successfully saved: dist/${r.output}`);
    }

    // Write Sitemap sitemap.xml dynamically from the shared database
    console.log('\n--- Generating Sitemap sitemap.xml ---');
    const allPaths = [
      '/',
      '/blog',
      ...blogPosts.map((p) => `/blog/${p.slug}`),
      '/ddtv',
      '/privacy'
    ];
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPaths
  .map(
    (p) => `  <url>
    <loc>https://www.d2autodetail.com${p}</loc>
    <priority>${p === '/' ? '1.0' : p.startsWith('/blog/') ? '0.7' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

    fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapContent, 'utf8');
    console.log('Successfully wrote dist/sitemap.xml');

    // ----------------------------------------------------
    // PASS 2: CLIENT HYDRATION VERIFICATION
    // ----------------------------------------------------
    console.log('\n--- Starting Pass 2: Client Hydration Verification ---');
    // Clear errors from pass 1
    pageErrors.length = 0;
    consoleErrors.length = 0;

    const hydrationRoutes = [
      '/',
      '/blog',
      ...blogPosts.map((p) => `/blog/${p.slug}`),
      '/ddtv',
      '/privacy'
    ];

    for (const routePath of hydrationRoutes) {
      console.log(`Verifying hydration on route: ${routePath}`);
      const testUrl = `${localOrigin}${routePath}`;

      // Visit route again (local server will now serve the physical index.html files generated in Pass 1!)
      const response = await page.goto(testUrl, { waitUntil: 'load' });
      if (!response || response.status() !== 200) {
        throw new Error(`Failed to visit generated path ${routePath} for hydration check.`);
      }

      // Check page error
      if (pageErrors.length > 0) {
        throw new Error(`Hydration page error on ${routePath}: ${pageErrors[0]}`);
      }

      // Check hydration console failures
      if (consoleErrors.length > 0) {
        throw new Error(`Hydration error detected in console output on ${routePath}: ${consoleErrors[0]}`);
      }

      console.log(`  Hydration check passed.`);
    }

    console.log('\nAll generation and hydration checks succeeded!');
    if (thirdPartyWarnings.length > 0) {
      console.log('\nThird-party warnings logged during crawl:');
      thirdPartyWarnings.slice(0, 10).forEach((w) => console.log(`  - ${w}`));
    }

  } finally {
    await browser.close();
    server.close(() => {
      console.log('Local compilation server stopped.');
    });
  }
}

run().catch((err) => {
  console.error('\nBuild compilation failed:', err.message);
  process.exit(1);
});
