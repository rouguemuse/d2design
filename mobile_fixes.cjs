const fs = require('fs');

let css = fs.readFileSync('src/App.css', 'utf8');

// 1. Mobile text sizes
css = css.replace(/--fs-body:\s*clamp\([^)]+\);/, '--fs-body: clamp(17px, 1.5vw, 18px);');
css = css.replace(/--fs-label:\s*clamp\([^)]+\);/, '--fs-label: clamp(14px, 1.2vw, 15px);');

// 2. Ceramic CTA spacing
// In App.tsx the button has inline style. Let's do it via CSS just to be safe.
css += `\n.ceramic-copy-col .btn-primary-hero { margin-top: 3.5rem !important; }`;

// 3. Complete Mobile overrides
const mobileFixes = `
@media (max-width: 768px) {
  /* Unstick header */
  .compact-header {
    position: relative !important;
    height: auto !important;
    padding-top: 16px;
    padding-bottom: 16px;
  }
  .compact-header .header-inner {
    display: grid !important;
    grid-template-columns: 1fr auto !important;
    grid-template-rows: auto auto;
    gap: 16px;
    align-items: center;
  }
  .header-actions {
    display: contents !important;
  }
  .header-logo-block {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
  }
  .btn-primary-header {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    padding: 0 16px !important;
  }
  .header-socials {
    display: flex !important;
    grid-column: 1 / 3;
    grid-row: 2 / 3;
    justify-content: center;
    border-top: 1px solid var(--glass-border);
    padding-top: 16px;
    width: 100%;
  }

  /* Hero padding and CTA Row */
  .hero-section {
    padding-top: 56px !important;
  }
  .hero-cta-row {
    flex-direction: row !important;
    flex-wrap: wrap;
    gap: 16px !important;
  }
  .hero-cta-row .btn-primary-hero,
  .hero-cta-row .link-quiet-hero {
    flex: 1 1 calc(50% - 8px);
    width: auto !important;
    text-align: center;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  /* Footer bottom padding */
  .brand-footer-clean {
    padding-bottom: 96px !important;
  }
}

@media (max-width: 480px) {
  .hero-cta-row {
    flex-direction: column !important;
  }
  .hero-cta-row .btn-primary-hero,
  .hero-cta-row .link-quiet-hero {
    width: 100% !important;
  }
}
`;

css += '\n' + mobileFixes;

fs.writeFileSync('src/App.css', css, 'utf8');
console.log("Mobile fixes applied.");
