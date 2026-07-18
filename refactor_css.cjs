const fs = require('fs');
let cssContent = fs.readFileSync('src/App.css', 'utf8');

// 1. Root Variables & Typography
cssContent = cssContent.replace(
  /:root\s*\{.*?\}/s,
  `:root {
  --bg-dark: #09090A;
  --surface-elevated: #111216;
  --color-red: #CF1C1C;
  --color-white: #F7F7F7;
  --color-steel: #BCC0CB;
  --glass-border: rgba(255, 255, 255, 0.08);
  --form-input-bg: rgba(11, 11, 11, 0.5);
  --form-input-focus-bg: rgba(11, 11, 11, 0.85);
  --font-headings: 'Montserrat', system-ui, -apple-system, sans-serif;
  --font-supporting: 'Rajdhani', system-ui, -apple-system, sans-serif;
  
  /* Responsive Typography */
  --fs-h1: clamp(38px, 5vw, 56px);
  --fs-h2: clamp(28px, 4vw, 36px);
  --fs-body: clamp(16px, 1.2vw, 17px);
  --fs-label: clamp(12px, 1vw, 14px);
  
  /* Section Padding */
  --section-padding: clamp(64px, 8vw, 96px) 0;
}`
);

// Add scroll padding to html
if (!cssContent.includes('scroll-padding-top')) {
    cssContent = cssContent.replace('html {', 'html {\n  scroll-padding-top: 80px;');
}

// 2. Site Container Width
cssContent = cssContent.replace(
  /\.site-container\s*\{\s*width:\s*min\(100%\s*-\s*80px,\s*1240px\);\s*margin-inline:\s*auto;\s*\}/s,
  `.site-container {
  width: min(100% - 80px, 1180px);
  margin-inline: auto;
}`
);

// 3. Compact Header
cssContent = cssContent.replace(
  /\.compact-header\s*\{[^}]+\}/,
  `.compact-header {
  height: 76px;
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--glass-border);
  background-color: rgba(9, 9, 10, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  position: sticky;
  top: 0;
  z-index: 100;
  transition: background-color 0.3s ease;
}`
);

// Now I will append the NEW styles to the end of the file. 
// They will override previous styles because they are at the end, 
// and they use new class names for the restructured sections.

const newStyles = `
/* --- NEW REFACTORED STYLES --- */

/* Hero Section */
.hero-section {
  padding: var(--section-padding);
}
.hero-inner-split {
  display: grid;
  grid-template-columns: 52fr 48fr;
  gap: clamp(40px, 5vw, 64px);
  align-items: center;
}
.hero-copy-col {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.hero-headline-wrapper {
  margin-bottom: 1.5rem;
}
.headline-accent-rule {
  width: 40px;
  height: 2px;
  background-color: var(--color-red);
  margin-bottom: 1rem;
}
.hero-headline {
  font-size: var(--fs-h1);
  line-height: 1.1;
  color: var(--color-white);
  font-family: var(--font-headings);
  margin: 0;
}
.hero-headline span {
  display: block;
}
.hero-supporting-text {
  font-size: var(--fs-body);
  color: var(--color-steel);
  line-height: 1.6;
  margin-bottom: 2rem;
  max-width: 540px;
}
.hero-cta-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  align-items: center;
}
.hero-contact-clean p {
  font-size: var(--fs-label);
  color: var(--color-steel);
  margin: 0;
  letter-spacing: 0.5px;
}

/* Service Grid */
.service-grid-section {
  padding: var(--section-padding);
  background-color: var(--surface-elevated);
  border-top: 1px solid var(--glass-border);
  border-bottom: 1px solid var(--glass-border);
}
.premium-service-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
}
.premium-service-item {
  border: 1px solid var(--glass-border);
  padding: 24px;
  background-color: rgba(255, 255, 255, 0.02);
  border-radius: 2px;
  display: flex;
  flex-direction: column;
}
.service-num {
  font-size: 11px;
  color: var(--color-red);
  font-weight: 700;
  margin-bottom: 16px;
  letter-spacing: 2px;
}
.premium-service-item h3 {
  font-size: 16px;
  color: var(--color-white);
  margin-bottom: 8px;
  line-height: 1.3;
}
.service-price-clean {
  font-size: 13px;
  color: var(--color-steel);
  margin-top: auto;
}

/* Ceramic Coating */
.ceramic-feature-section {
  padding: var(--section-padding);
}
.ceramic-two-col {
  display: grid;
  grid-template-columns: 40fr 60fr;
  gap: clamp(40px, 6vw, 80px);
  align-items: center;
}
.ceramic-desc {
  font-size: var(--fs-body);
  color: var(--color-steel);
  line-height: 1.6;
  margin-bottom: 2rem;
}
.ceramic-tags {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.ceramic-tags span {
  font-size: var(--fs-label);
  color: var(--color-steel);
  display: flex;
  align-items: center;
  gap: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.ceramic-tags span::before {
  content: '';
  display: block;
  width: 12px;
  height: 2px;
  background-color: var(--color-red);
}
.ceramic-editorial-img {
  width: 100%;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  display: block;
  border-radius: 2px;
}

/* Quote Section */
.quote-form-section {
  padding: var(--section-padding);
  background-color: var(--surface-elevated);
  border-top: 1px solid var(--glass-border);
}
.quote-two-col {
  display: grid;
  grid-template-columns: 40fr 60fr;
  gap: clamp(40px, 6vw, 80px);
}
.quote-direct-contact {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--glass-border);
}
.quote-direct-contact p {
  color: var(--color-steel);
  font-size: var(--fs-body);
  margin-bottom: 0.5rem;
}
.quote-direct-contact strong {
  color: var(--color-white);
  font-weight: 700;
}
.quote-form-col .form-group-field input,
.quote-form-col .form-group-field select {
  height: 50px;
  font-size: 16px;
  background-color: var(--form-input-bg);
  border: 1px solid var(--glass-border);
  color: var(--color-white);
  padding: 0 16px;
}
.quote-form-col .form-group-field textarea {
  font-size: 16px;
  background-color: var(--form-input-bg);
  border: 1px solid var(--glass-border);
  color: var(--color-white);
  padding: 16px;
}

/* Closing CTA & Footer */
.closing-cta-section {
  padding: var(--section-padding);
  text-align: center;
  background-color: var(--color-red);
}
.closing-cta-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}
.closing-accent {
  font-size: 12px;
  letter-spacing: 3px;
  color: rgba(255,255,255,0.7);
  margin-bottom: 1rem;
  display: block;
}
.closing-cta-copy h2 {
  color: #fff;
  margin-bottom: 1rem;
}
.closing-cta-copy p {
  color: rgba(255,255,255,0.9);
  font-size: var(--fs-body);
}
.closing-cta-action .btn-primary-hero {
  background-color: var(--bg-dark);
  color: var(--color-white);
}
.closing-cta-action .btn-primary-hero:hover {
  background-color: #1a1a1a;
}

.brand-footer-clean {
  padding: 64px 0;
  background-color: var(--bg-dark);
  border-top: 1px solid var(--glass-border);
}
.footer-flex-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
}
.footer-logo-img {
  height: 40px;
}
.footer-links-block {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}
.footer-social-btn {
  color: var(--color-steel);
  transition: color 0.2s;
  text-decoration: none;
  display: flex;
  align-items: center;
}
.footer-social-btn:hover {
  color: var(--color-white);
}
.footer-contact-block {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
}
.footer-contact-block a {
  color: var(--color-white);
  text-decoration: none;
  font-weight: 700;
  font-size: 15px;
}
.footer-service-area, .copyright-text {
  color: var(--color-steel);
  font-size: 13px;
}

/* --- RESPONSIVE MEDIA QUERIES --- */
@media (max-width: 992px) {
  .hero-inner-split {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .hero-image-col {
    order: 2;
  }
  .hero-copy-col {
    order: 1;
  }
  .premium-service-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .ceramic-two-col {
    grid-template-columns: 1fr;
  }
  .ceramic-copy-col {
    order: 1;
  }
  .ceramic-image-col {
    order: 2;
  }
  .quote-two-col {
    grid-template-columns: 1fr;
  }
  .footer-flex-row {
    flex-direction: column;
    align-items: flex-start;
  }
  .footer-contact-block {
    align-items: flex-start;
  }
}

@media (max-width: 768px) {
  .hero-cta-row {
    flex-direction: column;
    align-items: stretch;
  }
  .hero-cta-row .btn-primary-hero,
  .hero-cta-row .link-quiet-hero {
    width: 100%;
    text-align: center;
  }
}

@media (max-width: 576px) {
  .premium-service-grid {
    grid-template-columns: 1fr;
  }
}
`;

cssContent += '\n' + newStyles;

fs.writeFileSync('src/App.css', cssContent, 'utf8');
console.log("App.css refactored.");
