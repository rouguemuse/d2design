const fs = require('fs');

// Patch App.tsx
let tsxContent = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Swap Hero Image
tsxContent = tsxContent.replace(
    'src="/new_hero_image.png"',
    'src="/background.jpg"'
);

// 2. Rewrite Ceramic Coating Section
const oldCeramicSection = `        {/* 3.2 CERAMIC COATING FEATURE */}
        <section className="ceramic-feature-section" style={{ padding: '60px 0', borderBottom: '1px solid var(--glass-border)' }}>
          <div className="site-container ceramic-grid">
            <div>
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--color-white)', fontFamily: 'var(--font-headings)' }}>Ceramic Coating</h2>
              <p style={{ color: 'var(--color-steel)', marginBottom: '2rem', fontSize: '1.05rem', lineHeight: '1.6' }}>
                Long-term hydrophobic surface protection built on proper preparation. Starting at $575.
              </p>
              <div className="ceramic-benefits-rail">
                <span className="ceramic-benefit"><span className="red-marker"></span> Enhanced gloss</span>
                <span className="ceramic-benefit"><span className="red-marker"></span> Easier maintenance</span>
                <span className="ceramic-benefit"><span className="red-marker"></span> Hydrophobic protection</span>
              </div>
            </div>
            <div className="ceramic-image-wrapper">
              <img src="/new_porsche.png" alt="Porsche headlight ceramic coating" style={{ width: '100%', display: 'block', borderRadius: '4px' }} />
            </div>
          </div>
        </section>`;

const newCeramicSection = `        {/* 3.2 CERAMIC COATING FEATURE */}
        <section className="ceramic-feature-section" style={{ padding: '80px 0 96px 0', borderBottom: '1px solid var(--glass-border)' }}>
          <div className="site-container" style={{ maxWidth: '1150px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-white)', fontFamily: 'var(--font-headings)' }}>Ceramic Coating</h2>
              <p style={{ color: 'var(--color-steel)', margin: '0 auto 1.5rem', fontSize: '1.1rem', lineHeight: '1.6', maxWidth: '600px' }}>
                Long-term hydrophobic surface protection built on proper preparation. Starting at $575.
              </p>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-steel)', background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '4px', border: '1px solid var(--glass-border)' }}>Enhanced gloss</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-steel)', background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '4px', border: '1px solid var(--glass-border)' }}>Easier maintenance</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-steel)', background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '4px', border: '1px solid var(--glass-border)' }}>Hydrophobic protection</span>
              </div>
            </div>
            <div className="ceramic-editorial-image" style={{ width: '100%' }}>
              <img src="/new_porsche.png" alt="Porsche headlight ceramic coating" style={{ width: '100%', display: 'block', borderRadius: '6px', aspectRatio: '16/9', maxHeight: '520px', objectFit: 'cover', objectPosition: 'center' }} />
            </div>
          </div>
        </section>`;

if (tsxContent.includes(oldCeramicSection)) {
    tsxContent = tsxContent.replace(oldCeramicSection, newCeramicSection);
} else {
    // Try fuzzy replacing line by line or just logging error
    console.log("Could not find the exact old ceramic section");
    // Fallback regex logic in case of whitespace issues
    const match = tsxContent.match(/\{\/\*\s*3\.2\s*CERAMIC COATING FEATURE\s*\*\/\}.*?<\/section>/s);
    if (match) {
        tsxContent = tsxContent.replace(match[0], newCeramicSection);
        console.log("Replaced using fallback regex.");
    }
}

fs.writeFileSync('src/App.tsx', tsxContent, 'utf8');

// Patch App.css
let cssContent = fs.readFileSync('src/App.css', 'utf8');

const oldImgRule = `.hero-detailing-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}`;
const newImgRule = `.hero-detailing-img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  object-position: center;
  display: block;
}`;

cssContent = cssContent.replace(oldImgRule, newImgRule);
// Fallback if formatting was different
if(!cssContent.includes(newImgRule)) {
   cssContent = cssContent.replace(/\.hero-detailing-img\s*\{[^}]+\}/, newImgRule);
}

const oldOverlayRule = `.hero-image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(11, 11, 11, 0.75) 0%, rgba(11, 11, 11, 0.1) 40%, rgba(11, 11, 11, 0.25) 100%);
}`;
const newOverlayRule = `.hero-image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(9, 9, 10, 0.95) 0%, rgba(9, 9, 10, 0.4) 40%, rgba(9, 9, 10, 0.25) 100%);
  pointer-events: none;
}`;
cssContent = cssContent.replace(oldOverlayRule, newOverlayRule);
if(!cssContent.includes(newOverlayRule)) {
   cssContent = cssContent.replace(/\.hero-image-overlay\s*\{[^}]+\}/, newOverlayRule);
}

fs.writeFileSync('src/App.css', cssContent, 'utf8');
console.log("Patches applied.");
