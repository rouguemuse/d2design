import os
import re

# 1. Update App.tsx
with open('src/App.tsx', 'r', encoding='utf-8') as f:
    app_tsx = f.read()

# Replace Hero Right Column
old_hero_right = re.search(r'\{/\* Hero Right: Copywriting & CTAs \*/\}.*?\{/\* 3\. SERVICE PREVIEW STRIP \*/\}', app_tsx, re.DOTALL)
if old_hero_right:
    new_hero_right = """{/* Hero Right: Copywriting & CTAs */}
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

        {/* 3. SERVICE PREVIEW STRIP */}"""
    app_tsx = app_tsx.replace(old_hero_right.group(0), new_hero_right)

# Replace Services
old_services = re.search(r'\{/\* 3\. SERVICE PREVIEW STRIP \*/\}.*?\{/\* 3\.2 CERAMIC COATING FEATURE \*/\}', app_tsx, re.DOTALL)
if old_services:
    new_services = """{/* 3. SERVICE PREVIEW STRIP */}
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
  
        {/* 3.2 CERAMIC COATING FEATURE */}"""
    app_tsx = app_tsx.replace(old_services.group(0), new_services)

# Replace Ceramic
old_ceramic = re.search(r'\{/\* 3\.2 CERAMIC COATING FEATURE \*/\}.*?\{/\* 4\. QUOTE REQUEST FORM \*/\}', app_tsx, re.DOTALL)
if old_ceramic:
    new_ceramic = """{/* 3.2 CERAMIC COATING FEATURE */}
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

        {/* 4. QUOTE REQUEST FORM */}"""
    app_tsx = app_tsx.replace(old_ceramic.group(0), new_ceramic)

# Replace Quote Section
old_quote = re.search(r'\{/\* 4\. QUOTE REQUEST FORM \*/\}.*?(?=\{/\* 5\. BRAND STATEMENT \*/\})', app_tsx, re.DOTALL)
if old_quote:
    # We want to extract the form itself to keep it untouched
    form_match = re.search(r'(<form.*?</form>)', old_quote.group(0), re.DOTALL)
    form_html = form_match.group(1) if form_match else ""
    
    new_quote = f"""{{/* 4. QUOTE REQUEST FORM */}}
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
              {form_html}
            </div>
          </div>
        </section>

        """
    app_tsx = app_tsx.replace(old_quote.group(0), new_quote)

# Replace Closing and Footer
old_footer = re.search(r'\{/\* 5\. BRAND STATEMENT \*/\}.*?</Footer>', app_tsx, re.DOTALL)
if not old_footer: # fallback if </Footer> isn't there
    old_footer = re.search(r'\{/\* 5\. BRAND STATEMENT \*/\}.*?</footer>\s*</div>\s*\);\s*}', app_tsx, re.DOTALL)
    
if old_footer:
    new_footer = """{/* 5. BRAND STATEMENT / CLOSING CTA */}
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
}"""
    app_tsx = app_tsx.replace(old_footer.group(0), new_footer)

with open('src/App.tsx', 'w', encoding='utf-8') as f:
    f.write(app_tsx)

print("App.tsx refactored.")
