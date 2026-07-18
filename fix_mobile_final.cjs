const fs = require('fs');

// 1. Fix App.tsx Header Structure
let appTsx = fs.readFileSync('src/App.tsx', 'utf8');

const oldHeader = `<div className="header-actions">
            <div className="header-socials">
              <a href="/ddtv.html" className="header-social-link">DD TV</a>
              <a href="/blog.html" className="header-social-link">Blog</a>
            </div>
            <button onClick={handleScrollToForm} className="btn-primary-header">
              Request A Quote
            </button>
          </div>`;
          
const newHeader = `<button onClick={handleScrollToForm} className="btn-primary-header">
            Request A Quote
          </button>
          <div className="header-socials">
            <a href="/ddtv.html" className="header-social-link">DD TV</a>
            <a href="/blog.html" className="header-social-link">Blog</a>
          </div>`;

if(appTsx.includes(oldHeader)) {
    appTsx = appTsx.replace(oldHeader, newHeader);
}

fs.writeFileSync('src/App.tsx', appTsx, 'utf8');

// 2. Fix App.css
let css = fs.readFileSync('src/App.css', 'utf8');

const mobileFixes = `
/* RE-OVERRIDE MOBILE FIXES */
@media (max-width: 768px) {
  .compact-header {
    position: relative !important;
    height: auto !important;
    padding-top: 16px;
    padding-bottom: 0px !important;
  }
  .compact-header .header-inner {
    display: grid !important;
    grid-template-columns: 1fr auto !important;
    grid-template-rows: auto auto;
    gap: 16px;
    align-items: center;
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
    padding: 12px 0;
    width: 100%;
    margin: 0;
  }
  
  /* Force 1 column services on mobile */
  .premium-service-grid {
    grid-template-columns: 1fr !important;
  }

  /* Force Hero buttons to 100% since they look cramped */
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
console.log("Mobile layout fixed completely.");
