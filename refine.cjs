const fs = require('fs');

// 1. App.css fixes
let cssContent = fs.readFileSync('src/App.css', 'utf8');

// Remove radial glows from .coming-soon-container
const oldComingSoon = `.coming-soon-container {
  width: 100%;
  min-height: 100vh;
  background-color: var(--bg-dark);
  color: var(--color-white);
  background-image: 
    radial-gradient(circle at 80% 20%, var(--radial-glow-1) 0%, transparent 40%),
    radial-gradient(circle at 10% 60%, var(--radial-glow-2) 0%, transparent 50%);
  background-attachment: fixed;
  transition: background-color 0.3s ease, color 0.3s ease;
}`;
const newComingSoon = `.coming-soon-container {
  width: 100%;
  min-height: 100vh;
  background-color: var(--bg-dark);
  color: var(--color-white);
  background-attachment: fixed;
  transition: background-color 0.3s ease, color 0.3s ease;
}`;
if (cssContent.includes(oldComingSoon)) {
    cssContent = cssContent.replace(oldComingSoon, newComingSoon);
} else {
    // regex fallback
    cssContent = cssContent.replace(/background-image:\s*radial-gradient[^;]+;/, '');
}

// Fix Hero Overlay gradient
cssContent = cssContent.replace(
  /\.hero-image-overlay\s*\{[^}]+\}/,
  `.hero-image-overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(9, 9, 10, 0.2);
  pointer-events: none;
}`
);

// Fix Hero contact info size
cssContent = cssContent.replace(
  /\.hero-contact-clean\s*p\s*\{[^}]+\}/,
  `.hero-contact-clean p {
  font-size: var(--fs-body);
  color: var(--color-steel);
  margin: 0;
  letter-spacing: 0.5px;
}`
);

// Fix Service card font sizes
cssContent = cssContent.replace(
  /\.premium-service-item\s*h3\s*\{[^}]+\}/,
  `.premium-service-item h3 {
  font-size: var(--fs-body);
  color: var(--color-white);
  margin-bottom: 8px;
  line-height: 1.3;
}`
);
cssContent = cssContent.replace(
  /\.service-num\s*\{[^}]+\}/,
  `.service-num {
  font-size: var(--fs-label);
  color: var(--color-red);
  font-weight: 700;
  margin-bottom: 12px;
  letter-spacing: 2px;
}`
);
cssContent = cssContent.replace(
  /\.service-price-clean\s*\{[^}]+\}/,
  `.service-price-clean {
  font-size: 14px;
  color: var(--color-steel);
  margin-top: auto;
}`
);

// Fix Ceramic Coating aspect ratio to 16/9
cssContent = cssContent.replace(
  /aspect-ratio:\s*3\s*\/\s*2;/,
  `aspect-ratio: 16 / 9;`
);

fs.writeFileSync('src/App.css', cssContent, 'utf8');

// 2. App.tsx fixes
let tsxContent = fs.readFileSync('src/App.tsx', 'utf8');
// Remove the weird red // from services
tsxContent = tsxContent.replace(
  /<span className="service-strip-accent" style={{ display: 'block', marginBottom: '0.5rem', color: 'var\(--color-red\)' }}>\/\/<\/span>/,
  ``
);
fs.writeFileSync('src/App.tsx', tsxContent, 'utf8');

console.log("Visual refinements applied.");
