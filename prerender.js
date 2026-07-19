import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.resolve(__dirname, 'dist');
const TEMPLATE_PATH = path.resolve(DIST_DIR, 'index.html');

if (!fs.existsSync(TEMPLATE_PATH)) {
  console.error('Error: dist/index.html template not found. Please run vite build first.');
  process.exit(1);
}

const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');

const routes = [
  {
    path: '/',
    title: 'Paint Correction, Ceramic Coating & PPF in Austin | Detail Driven',
    description: 'Detail Driven provides premium auto detailing, paint correction, ceramic coatings, paint protection film and vehicle restoration in Austin, Texas. Request a custom quote.',
    body: `
      <main class="page-main-container">
        <section class="video-hero">
          <div class="video-hero-content site-container">
            <span class="video-hero-eyebrow">AUSTIN’S PRECISION AUTO DETAILING STUDIO</span>
            <h1 class="hero-headline">PRECISION YOU CAN SEE.<br>PROTECTION YOU CAN TRUST.</h1>
            <p class="hero-supporting-text">Paint correction, ceramic coatings, paint protection film, premium detailing, and vehicle restoration—performed with disciplined preparation and obsessive attention to finish.</p>
            <a href="#quote-section" class="btn-primary-hero">REQUEST A QUOTE</a>
          </div>
        </section>
        <div class="credibility-strip">
          <div class="site-container">Austin, Texas • By Appointment • Paint Correction • Ceramic Coatings • Paint Protection Film</div>
        </div>
      </main>
    `
  },
  {
    path: '/blog',
    title: 'Detail Driven Blog | Auto Detailing & Paint Care Insights',
    description: 'Read professional advice on paint correction, ceramic coatings, vehicle decontamination, and automotive detailing from Detail Driven Austin.',
    body: `
      <main class="page-main-container">
        <section class="site-container" style="padding-top: 120px; padding-bottom: 40px;">
          <span style="color: var(--color-red); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; font-weight: 700; display: block; margin-bottom: 12px;">JOURNAL // INSIGHTS</span>
          <h1 style="font-family: var(--font-headings); font-size: clamp(40px, 6vw, 64px); color: var(--color-white); line-height: 1.1; margin-bottom: 20px; text-transform: uppercase;">THE FINISH <span style="color: var(--color-red)">JOURNAL</span></h1>
          <p style="color: var(--color-steel); font-size: 1.1rem; max-width: 600px; line-height: 1.6;">Professional insights, paint science, coating care guides, and detailing recommendations straight from our Austin studio.</p>
        </section>
      </main>
    `
  },
  {
    path: '/blog/why-paint-correction-must-come-before-every-ceramic-coating',
    title: 'Why Paint Correction Must Come Before Every Ceramic Coating | Detail Driven Blog',
    description: 'Ceramic coatings are permanent. That means whatever is under the coating stays there — forever. Here\'s the science behind why skipping correction is the most expensive mistake you can make.',
    body: `
      <main class="page-main-container">
        <section class="site-container" style="padding-top: 120px; padding-bottom: 80px; max-width: 800px; margin: 0 auto;">
          <h1 style="font-family: var(--font-headings); font-size: clamp(32px, 5vw, 48px); color: var(--color-white); line-height: 1.15; margin-bottom: 24px; text-transform: uppercase;">Why Paint Correction Must Come Before Every Ceramic Coating</h1>
          <p>Ceramic coatings have revolutionized paint protection. A professionally applied nano-ceramic layer bonds chemically to your clear coat, creating a semi-permanent hydrophobic shell that repels water, resists UV, and maintains gloss for years.</p>
        </section>
      </main>
    `
  },
  {
    path: '/blog/how-long-do-ceramic-coatings-actually-last',
    title: 'How Long Do Ceramic Coatings Actually Last? | Detail Driven Blog',
    description: 'Marketing says 5–10 years. Reality depends on prep, product, application, and maintenance. Here\'s an honest breakdown.',
    body: `
      <main class="page-main-container">
        <section class="site-container" style="padding-top: 120px; padding-bottom: 80px; max-width: 800px; margin: 0 auto;">
          <h1 style="font-family: var(--font-headings); font-size: clamp(32px, 5vw, 48px); color: var(--color-white); line-height: 1.15; margin-bottom: 24px; text-transform: uppercase;">How Long Do Ceramic Coatings Actually Last?</h1>
          <p>If you've researched paint protection, you've likely seen bold claims. "Lifetime protection," "9H hardness," "10-year durability." But how long does a professional nano-ceramic coating actually last on a real-world vehicle?</p>
        </section>
      </main>
    `
  },
  {
    path: '/ddtv',
    title: 'Detail Driven TV | Precision Detailing & Correction Videos',
    description: 'Watch behind-the-scenes paint correction, ceramic coating applications, and exotic car details from our Austin studio.',
    body: `
      <main class="page-main-container">
        <section class="site-container" style="padding-top: 120px; padding-bottom: 40px;">
          <span style="color: var(--color-red); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; font-weight: 700; display: block; margin-bottom: 12px;">DD TV // PROCESS DEMONSTRATED</span>
          <h1 style="font-family: var(--font-headings); font-size: clamp(40px, 6vw, 64px); color: var(--color-white); line-height: 1.1; margin-bottom: 20px; text-transform: uppercase;">WATCH &amp; <span style="color: var(--color-red)">LEARN</span></h1>
        </section>
      </main>
    `
  },
  {
    path: '/privacy',
    title: 'Privacy Policy | Detail Driven Austin',
    description: 'Detail Driven\'s Privacy Policy. Learn how we handle your contact information, vehicle details, and uploaded photographs securely.',
    body: `
      <main class="page-main-container">
        <section class="site-container" style="padding-top: 120px; padding-bottom: 80px; max-width: 800px; margin: 0 auto;">
          <h1 style="font-family: var(--font-headings); color: var(--color-white); font-size: clamp(28px, 4vw, 40px); margin-bottom: 24px; text-transform: uppercase;">Privacy Policy</h1>
          <p>Learn how we handle your contact information, vehicle details, and uploaded photographs securely.</p>
        </section>
      </main>
    `
  }
];

routes.forEach((route) => {
  let html = template;

  // Replace default title
  const titleRegex = /<title>[^]*?<\/title>/;
  html = html.replace(titleRegex, `<title>${route.title}</title>`);

  // Replace default meta description
  const descRegex = /<meta\s+name="description"\s+content="[^]*?"\s*\/?>/;
  const newDesc = `<meta name="description" content="${route.description}" />`;
  if (descRegex.test(html)) {
    html = html.replace(descRegex, newDesc);
  } else {
    html = html.replace('</head>', `  ${newDesc}\n  </head>`);
  }

  // Inject OG & Twitter metadata
  const metadata = `
    <link rel="canonical" href="https://www.d2autodetail.com${route.path}" />
    <meta property="og:title" content="${route.title}" />
    <meta property="og:description" content="${route.description}" />
    <meta property="og:url" content="https://www.d2autodetail.com${route.path}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="https://www.d2autodetail.com/media/d2-hero-poster.webp" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${route.title}" />
    <meta name="twitter:description" content="${route.description}" />
    <meta name="twitter:image" content="https://www.d2autodetail.com/media/d2-hero-poster.webp" />
  `;

  html = html.replace('</head>', `${metadata}\n  </head>`);

  // Inject pre-rendered body into #root for crawlers
  const rootStr = '<div id="root"></div>';
  const preRenderedRoot = `<div id="root">${route.body}</div>`;
  html = html.replace(rootStr, preRenderedRoot);

  // Determine output directory and index.html filepath
  if (route.path === '/') {
    fs.writeFileSync(TEMPLATE_PATH, html, 'utf8');
    console.log('Prerendered root path: /');
  } else {
    const routeDir = path.join(DIST_DIR, route.path);
    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }
    fs.writeFileSync(path.join(routeDir, 'index.html'), html, 'utf8');
    console.log(`Prerendered path: ${route.path}`);
  }
});

console.log('Prerendering completed successfully.');
