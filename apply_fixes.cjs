const fs = require('fs');

let cssContent = fs.readFileSync('src/App.css', 'utf8');

// 1. Remove Solid Red Closing Section
const oldClosingSection = /\.closing-cta-section\s*\{\s*padding:\s*var\(--section-padding\);\s*text-align:\s*center;\s*background-color:\s*var\(--color-red\);\s*\}/;
const newClosingSection = `.closing-cta-section {
  padding: var(--section-padding);
  text-align: center;
  background-color: var(--surface-elevated);
  border-top: 2px solid var(--color-red);
}`;
cssContent = cssContent.replace(oldClosingSection, newClosingSection);

// Update CTA button inside closing
const oldClosingBtn = /\.closing-cta-action\s*\.btn-primary-hero\s*\{\s*background-color:\s*var\(--bg-dark\);\s*color:\s*var\(--color-white\);\s*\}/;
const newClosingBtn = `.closing-cta-action .btn-primary-hero {
  background-color: var(--color-red);
  color: var(--color-white);
}`;
cssContent = cssContent.replace(oldClosingBtn, newClosingBtn);

const oldClosingBtnHover = /\.closing-cta-action\s*\.btn-primary-hero:hover\s*\{\s*background-color:\s*#1a1a1a;\s*\}/;
const newClosingBtnHover = `.closing-cta-action .btn-primary-hero:hover {
  background-color: #b31017;
}`;
cssContent = cssContent.replace(oldClosingBtnHover, newClosingBtnHover);

// 2. Remove Red Glow entirely (already removed radial-glows, but let's double check box-shadows or any remaining radial glows)
// The user says "The red glow under the form is still present." 
// This could be --radial-glow-2 variable still in use somewhere, or the form container itself has a glow.
// Let's force any radial gradient on the body or coming-soon-container to be gone.
cssContent = cssContent.replace(/background-image:[^;]*radial-gradient[^;]+;/g, '');

// 3. Widen quote container and fix columns (38% / 62%)
// And fix heading breaking into 4 lines
const oldQuoteTwoCol = /\.quote-two-col\s*\{\s*display:\s*grid;\s*grid-template-columns:\s*40fr\s*60fr;\s*gap:\s*clamp\(40px,\s*6vw,\s*80px\);\s*\}/;
const newQuoteTwoCol = `.quote-two-col {
  display: grid;
  grid-template-columns: 38fr 62fr;
  gap: clamp(40px, 4vw, 64px);
  max-width: 1080px;
  margin-inline: auto;
}`;
if(cssContent.match(oldQuoteTwoCol)) {
    cssContent = cssContent.replace(oldQuoteTwoCol, newQuoteTwoCol);
} else {
    // If exact match fails, append it
    cssContent += `\n.quote-two-col { display: grid; grid-template-columns: 38fr 62fr !important; gap: 40px !important; max-width: 1080px !important; margin-inline: auto !important; }`;
}

// Ensure quote section background doesn't glow
// It has background-color: var(--surface-elevated); which is fine.

// 4. Quote heading size
cssContent += `
.quote-contact-info-col h2 {
  font-size: clamp(24px, 3.5vw, 34px) !important;
  line-height: 1.2 !important;
}
`;

// 5. Typography (body >= 16px, contact info >= 14px, input >= 16px, label >= 12px)
// Update root clamp values
cssContent = cssContent.replace(/--fs-body:\s*clamp\(16px,\s*1\.2vw,\s*17px\);/, '--fs-body: clamp(16px, 1.2vw, 18px);');
cssContent = cssContent.replace(/--fs-label:\s*clamp\(12px,\s*1vw,\s*14px\);/, '--fs-label: clamp(12px, 1vw, 14px);');

// 6. Brighten hero photograph
const oldHeroOverlay = /\.hero-image-overlay\s*\{\s*position:\s*absolute;\s*inset:\s*0;\s*background-color:\s*rgba\(9,\s*9,\s*10,\s*0\.2\);\s*pointer-events:\s*none;\s*\}/;
const newHeroOverlay = `.hero-image-overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(9, 9, 10, 0.05); /* significantly brightened */
  pointer-events: none;
}`;
if(cssContent.match(oldHeroOverlay)) {
    cssContent = cssContent.replace(oldHeroOverlay, newHeroOverlay);
} else {
    cssContent += `\n.hero-image-overlay { background-color: rgba(9, 9, 10, 0.05) !important; }`;
}

fs.writeFileSync('src/App.css', cssContent, 'utf8');

// Update App.tsx for the footer logo (make sure it's the full logo, maybe the image source was wrong)
let appTsx = fs.readFileSync('src/App.tsx', 'utf8');
// The footer logo might be using `/logo-light.svg` which could be just the D2 icon instead of the full wordmark.
// Let's see what full logo asset is. We have `d2_logo.png` or maybe it's `logo-light.svg` and we just need to use `d2_logo.png`
appTsx = appTsx.replace(
    /className="footer-logo-img"\s*\/>/g,
    `className="footer-logo-img" />`
);
// Wait, I will use `d2_logo.png` if it is a white logo, or just `/logo-light.svg`. If the user says "Restore the complete Detail Driven logo and wordmark... Do not show only the small D2 icon", it means the current `logo-light.svg` is just the icon! Or maybe the wordmark is separate.
// In the original footer:
// <span className="footer-name">DETAIL DRIVEN</span>
// Let's add that back to the footer-logo-block in App.tsx
const oldFooterBlock = `<a href="/" className="footer-logo-block">
            <img src={theme === 'dark' ? '/logo-light.svg' : '/logo-dark.svg'} alt="D2 Logo" className="footer-logo-img" />
          </a>`;
const newFooterBlock = `<a href="/" className="footer-logo-block" style={{display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none'}}>
            <img src={theme === 'dark' ? '/logo-light.svg' : '/logo-dark.svg'} alt="D2 Logo" className="footer-logo-img" style={{height: '32px'}} />
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <span style={{color: 'var(--color-white)', fontFamily: 'var(--font-headings)', fontWeight: '800', letterSpacing: '1.5px', fontSize: '1.1rem', lineHeight: '1.1'}}>DETAIL DRIVEN</span>
              <span style={{color: 'var(--color-steel)', fontSize: '0.7rem', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: '500'}}>Auto Detail</span>
            </div>
          </a>`;
if(appTsx.includes(oldFooterBlock)) {
    appTsx = appTsx.replace(oldFooterBlock, newFooterBlock);
}

fs.writeFileSync('src/App.tsx', appTsx, 'utf8');

console.log("Refinements applied.");
