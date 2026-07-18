const fs = require('fs');

// 1. Update App.tsx
let appTsx = fs.readFileSync('src/App.tsx', 'utf8');

// Replace Hero Right Column
const heroRightRegex = /\{\/\*\s*Hero Right: Copywriting & CTAs\s*\*\/\}.*?\{\/\*\s*3\.\s*SERVICE PREVIEW STRIP\s*\*\/\}/s;
const heroRightMatch = appTsx.match(heroRightRegex);
if (heroRightMatch) {
    const newHeroRight = `{/* Hero Right: Copywriting & CTAs */}
            <div className="hero-copy-col">
              <div className="hero-copy-content">
                <div className="hero-headline-wrapper">
                  <div className="headline-accent-rule"></div>
                  <h1 className="hero-headline">
                    Precision You Can See.<br />Protection You Can Trust.
                  </h1>
                </div>
                <p className="hero-supporting-text">
                  Detail Driven provides premium detailing, paint correction, ceramic coatings, PPF, and vehicle restoration in Austin, Texas. We approach every surface with intention, precision, and respect for the vehicle.
                </p>
                
                <div className="hero-cta-row">
                  <button onClick={(e) => { handleScrollToForm(e); trackEvent('Request a Quote Hero Click'); }} className="btn-primary-hero">
                    Request A Quote
                  </button>
                  <a href="https://www.instagram.com/d2_detaildriven/" target="_blank" rel="noopener noreferrer" className="link-quiet-hero" onClick={() => trackEvent('View Our Work Hero Click')}>
                    View Our Work
                  </a>
                </div>
  
                <div className="hero-contact-clean">
                  <p>Call or Text: <a href="tel:19494442885" style={{color: 'inherit', textDecoration: 'none'}}>+1 949 444 2885</a> &nbsp;|&nbsp; Email: <a href="mailto:contact@d2detaildriven.com" style={{color: 'inherit', textDecoration: 'none'}}>contact@d2detaildriven.com</a></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. SERVICE PREVIEW STRIP */}`;
    appTsx = appTsx.replace(heroRightMatch[0], newHeroRight);
}

// Replace Services
const servicesRegex = /\{\/\*\s*3\.\s*SERVICE PREVIEW STRIP\s*\*\/\}.*?\{\/\*\s*3\.2\s*CERAMIC COATING FEATURE\s*\*\/\}/s;
const servicesMatch = appTsx.match(servicesRegex);
if (servicesMatch) {
    const newServices = `{/* 3. SERVICE PREVIEW STRIP */}
        <section className="service-grid-section">
          <div className="site-container">
            <div className="service-strip-header-block" style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="service-strip-accent" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-red)' }}>//</span>
              <h2 style={{ fontSize: 'var(--fs-h2)', color: 'var(--color-white)', fontFamily: 'var(--font-headings)' }}>Services Currently Available</h2>
            </div>
            <div className="premium-service-grid">
              <div className="premium-service-item">
                <span className="service-num">01</span>
                <h3>Premium Detailing</h3>
                <span className="service-price-clean">Starting at $225</span>
              </div>
              <div className="premium-service-item">
                <span className="service-num">02</span>
                <h3>Paint Correction</h3>
                <span className="service-price-clean">Starting at $300</span>
              </div>
              <div className="premium-service-item">
                <span className="service-num">03</span>
                <h3>Ceramic Coating</h3>
                <span className="service-price-clean">Starting at $575</span>
              </div>
              <div className="premium-service-item">
                <span className="service-num">04</span>
                <h3>Paint Protection Film</h3>
                <span className="service-price-clean">Starting at $1500</span>
              </div>
              <div className="premium-service-item">
                <span className="service-num">05</span>
                <h3>Vehicle Restoration</h3>
                <span className="service-price-clean">By Quote</span>
              </div>
            </div>
          </div>
        </section>
  
        {/* 3.2 CERAMIC COATING FEATURE */}`;
    appTsx = appTsx.replace(servicesMatch[0], newServices);
}

// Replace Ceramic
const ceramicRegex = /\{\/\*\s*3\.2\s*CERAMIC COATING FEATURE\s*\*\/\}.*?\{\/\*\s*4\.\s*QUOTE REQUEST FORM\s*\*\/\}/s;
const ceramicMatch = appTsx.match(ceramicRegex);
if (ceramicMatch) {
    const newCeramic = `{/* 3.2 CERAMIC COATING FEATURE */}
        <section className="ceramic-feature-section">
          <div className="site-container ceramic-two-col">
            <div className="ceramic-copy-col">
              <div className="headline-accent-rule"></div>
              <h2 style={{ fontSize: 'var(--fs-h2)', marginBottom: '1rem', color: 'var(--color-white)', fontFamily: 'var(--font-headings)' }}>Ceramic Coating</h2>
              <p className="ceramic-desc">
                Long-term hydrophobic surface protection built on proper preparation. Starting at $575.
              </p>
              <div className="ceramic-tags">
                <span>Enhanced gloss</span>
                <span>Easier maintenance</span>
                <span>Hydrophobic protection</span>
              </div>
              <button onClick={(e) => { handleScrollToForm(e); trackEvent('Request a Quote Ceramic Click'); }} className="btn-primary-hero" style={{ marginTop: '2.5rem' }}>
                Request A Quote
              </button>
            </div>
            
            <div className="ceramic-image-col">
              <img src="/new_porsche.png" alt="Porsche headlight ceramic coating" className="ceramic-editorial-img" />
            </div>
          </div>
        </section>

        {/* 4. QUOTE REQUEST FORM */}`;
    appTsx = appTsx.replace(ceramicMatch[0], newCeramic);
}

// Replace Quote Section
const quoteRegex = /\{\/\*\s*4\.\s*QUOTE REQUEST FORM\s*\*\/\}.*?(?=\{\/\*\s*5\.\s*BRAND STATEMENT\s*\*\/\})/s;
const quoteMatch = appTsx.match(quoteRegex);
if (quoteMatch) {
    const formMatch = quoteMatch[0].match(/(<form.*?<\/form>)/s);
    const formHtml = formMatch ? formMatch[1] : "";
    
    const newQuote = `{/* 4. QUOTE REQUEST FORM */}
        <section id="quote-section" className="quote-form-section">
          <div className="quote-form-inner site-container quote-two-col">
            
            <div className="quote-contact-info-col">
              <div className="headline-accent-rule"></div>
              <h2 style={{ fontSize: 'var(--fs-h2)', marginBottom: '1.5rem', color: 'var(--color-white)', fontFamily: 'var(--font-headings)', lineHeight: 1.1 }}>
                Tell Us What Your Vehicle Needs
              </h2>
              <p style={{ color: 'var(--color-steel)', marginBottom: '2.5rem', fontSize: 'var(--fs-body)', lineHeight: '1.6' }}>
                Send a few details and Detail Driven will follow up with service information and availability. We prioritize rapid response and clear communication.
              </p>
              
              <div className="quote-direct-contact">
                <p><strong>Call or Text:</strong> +1 949 444 2885</p>
                <p><strong>Email:</strong> contact@d2detaildriven.com</p>
              </div>
            </div>

            <div className="quote-form-col">
              ${formHtml}
            </div>
          </div>
        </section>

        `;
    appTsx = appTsx.replace(quoteMatch[0], newQuote);
}

// Replace Closing and Footer
const footerRegex = /\{\/\*\s*5\.\s*BRAND STATEMENT\s*\*\/\}.*?<\/footer>\s*<\/div>\s*\);\s*\}/s;
const footerMatch = appTsx.match(footerRegex);
if (footerMatch) {
    const newFooter = `{/* 5. BRAND STATEMENT / CLOSING CTA */}
      <section className="closing-cta-section">
        <div className="site-container closing-cta-inner">
          <div className="closing-cta-copy">
            <span className="closing-accent">// DETAIL DRIVEN</span>
            <h2 style={{ fontSize: 'var(--fs-h2)' }}>THE FINISH STARTS WITH THE PREP.</h2>
            <p>Lasting protection begins with careful cleaning, decontamination, correction, and preparation.</p>
          </div>
          <div className="closing-cta-action">
            <button onClick={handleScrollToForm} className="btn-primary-hero">Request A Quote</button>
          </div>
        </div>
      </section>
      </>
      )}

      {/* 6. SOCIAL & CONTACT FOOTER */}
      <footer id="footer-section" className="brand-footer-clean">
        <div className="site-container footer-flex-row">
          <a href="/" className="footer-logo-block">
            <img src={theme === 'dark' ? '/logo-light.svg' : '/logo-dark.svg'} alt="D2 Logo" className="footer-logo-img" />
          </a>
          <div className="footer-links-block">
            <a href="https://www.instagram.com/d2_detaildriven/" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="https://www.facebook.com/people/D2-Auto-Detail/100063942352825/" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="/ddtv.html" className="footer-social-btn" aria-label="DD TV">
              <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>DD TV</span>
            </a>
            <a href="/blog.html" className="footer-social-btn" aria-label="Blog">
              <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Blog</span>
            </a>
          </div>
          <div className="footer-contact-block">
            <a href="mailto:contact@d2detaildriven.com">contact@d2detaildriven.com</a>
            <span className="footer-service-area">Serving Austin and surrounding areas</span>
            <span className="copyright-text">&copy; 2026 Detail Driven. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}`;
    appTsx = appTsx.replace(footerMatch[0], newFooter);
}

fs.writeFileSync('src/App.tsx', appTsx, 'utf8');
console.log("App.tsx refactored via Node.");
