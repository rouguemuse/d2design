import React, { useState } from 'react';
import './App.css';
import Blog from './pages/Blog';
import DDTV from './pages/DDTV';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicle: '',
    service: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const path = window.location.pathname;
  const isBlog = path.includes('blog.html');
  const isDDTV = path.includes('ddtv.html');

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.vehicle || !formData.service) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      // Retrieve existing orders from LocalStorage
      const storedOrdersRaw = localStorage.getItem('d2_orders');
      let ordersList = [];
      if (storedOrdersRaw) {
        ordersList = JSON.parse(storedOrdersRaw);
      } else {
        // Seeding default mock orders to sync with cms.js system
        ordersList = [
          {
            id: 'D2-1001',
            date: '2026-07-09',
            client: 'Alexander Wright',
            email: 'alex@wrightm4.com',
            phone: '(555) 123-4567',
            vehicle: '2022 BMW M4 Competition',
            service: 'Paint Correction + Ceramic Coating',
            status: 'Paid',
            amount: 1648,
            items: [
              { desc: 'Multi-Stage Paint Correction (BMW M4)', cost: 899 },
              { desc: 'D2 Ceramic Glass Shield (5-Year Coating)', cost: 749 }
            ]
          },
          {
            id: 'D2-1002',
            date: '2026-07-08',
            client: 'Sarah Jenkins',
            email: 's.jenkins@gmail.com',
            phone: '(555) 987-6543',
            vehicle: '2024 Porsche Macan GTS',
            service: 'Ceramic Coating',
            status: 'Invoice Sent',
            amount: 1499,
            items: [
              { desc: 'Ceramic Coating Package (SUV)', cost: 1499 }
            ]
          },
          {
            id: 'D2-1003',
            date: '2026-07-07',
            client: 'Marcus Vance',
            email: 'marcus@vancedesign.com',
            phone: '(555) 444-8899',
            vehicle: '1967 Chevrolet Camaro SS',
            service: 'Full Restoration Detail',
            status: 'Pending Assessment',
            amount: 499,
            items: [
              { desc: 'Premium Detail & Leather Restoration (Exotic/Classic)', cost: 499 }
            ]
          }
        ];
      }

      // Generate next order ID
      const nextIndex = ordersList.length + 1001;
      const newOrder = {
        id: `D2-${nextIndex}`,
        date: new Date().toISOString().split('T')[0],
        client: formData.name,
        email: formData.email,
        phone: formData.phone,
        vehicle: formData.vehicle,
        service: formData.service,
        status: 'Lead (Web Form)',
        amount: 0,
        items: [
          { desc: `${formData.service} (Requested)`, cost: 0 }
        ]
      };

      ordersList.push(newOrder);
      localStorage.setItem('d2_orders', JSON.stringify(ordersList));
      
      // Dispatch custom sync event
      window.dispatchEvent(new Event('d2_orders_updated'));

      // Dispatch real email via FormSubmit API
      fetch("https://formsubmit.co/ajax/driven2inc@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "Name": formData.name,
          "Email": formData.email,
          "Phone": formData.phone,
          "Vehicle": formData.vehicle,
          "Service": formData.service,
          "Message": formData.message,
          "_subject": `New Lead Inquiry - ${formData.vehicle} (${formData.service})`
        })
      })
      .then(res => res.json())
      .then(data => console.log("Email dispatch success:", data))
      .catch(err => console.error("Email dispatch failure:", err));

    } catch (err) {
      console.error("Local storage sync error:", err);
    }

    setError('');
    setSubmitted(true);
  };

  const handleScrollToForm = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('quote-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const trackEvent = (eventName: string) => {
    console.log(`[Tracking Event]: ${eventName}`);
    if (typeof window !== 'undefined') {
      if ((window as any).gtag) {
        (window as any).gtag('event', 'click', {
          'event_category': 'engagement',
          'event_label': eventName
        });
      }
    }
  };

  return (
    <div className="coming-soon-container" data-theme={theme}>
      {/* 1. COMPACT HEADER */}
      <header className="compact-header">
        <div className="header-inner site-container">
          <a href="/" className="header-logo-block" style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src={theme === 'dark' ? '/logo-light.svg' : '/logo-dark.svg'} alt="D2 Logo" className="header-logo-img" />
            <div className="header-brand-info">
              <span className="header-brand-name">DETAIL DRIVEN</span>
              <span className="header-tagline">Perfection Is in the Details</span>
            </div>
          </a>
          <div className="header-actions">
            <a href="/ddtv.html" className="btn-secondary-header" style={{ marginRight: '16px', color: 'inherit', textDecoration: 'none', fontWeight: 'bold' }}>
              DD TV
            </a>
            <a href="/blog.html" className="btn-secondary-header" style={{ marginRight: '16px', color: 'inherit', textDecoration: 'none', fontWeight: 'bold' }}>
              Blog
            </a>
            <button onClick={(e) => { handleScrollToForm(e); trackEvent('Request a Quote Header Click'); }} className="btn-primary-header">
              Request A Quote
            </button>
          </div>
        </div>
      </header>

      {isBlog ? (
        <Blog />
      ) : isDDTV ? (
        <DDTV />
      ) : (
        <>
        {/* 2. HERO SECTION */}
      <section className="hero-section">
        <div className="hero-inner-split site-container">
          {/* Hero Left: Detailing Image */}
          <div className="hero-image-col">
            <div className="hero-image-wrapper">
              <img src="/premium_detailing.png" 
                alt="Detailer working on car wheel" 
                className="hero-detailing-img"
              />
              <div className="hero-image-overlay"></div>
            </div>
          </div>

          {/* Hero Right: Copywriting & CTAs */}
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

        {/* 3. SERVICE PREVIEW STRIP */}
        <section className="service-grid-section">
          <div className="site-container">
            <div className="service-strip-header-block" style={{ textAlign: 'center', marginBottom: '3rem' }}>
              
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
  
        {/* 3.2 CERAMIC COATING FEATURE */}
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

        {/* 4. QUOTE REQUEST FORM */}
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
              <form onSubmit={(e) => { handleSubmit(e); trackEvent('Form Inquiry Submit'); }} className="quote-inquiry-form">
              {error && <div className="form-feedback-error">{error}</div>}
              
              <div className="form-grid-layout">
                <div className="form-group-field">
                  <label htmlFor="name">Name <span className="required-star">*</span></label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name" 
                    required 
                  />
                </div>

                <div className="form-group-field">
                  <label htmlFor="email">Email Address <span className="required-star">*</span></label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@example.com" 
                    required 
                  />
                </div>

                <div className="form-group-field">
                  <label htmlFor="phone">Phone Number <span className="required-star">*</span></label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(555) 000-0000" 
                    required 
                  />
                </div>

                <div className="form-group-field">
                  <label htmlFor="vehicle">Vehicle (Year, Make, Model) <span className="required-star">*</span></label>
                  <input 
                    type="text" 
                    id="vehicle" 
                    name="vehicle" 
                    value={formData.vehicle}
                    onChange={handleInputChange}
                    placeholder="e.g., 2023 Porsche 911 GT3" 
                    required 
                  />
                </div>

                <div className="form-group-field full-width-field">
                  <label htmlFor="service">Service of Interest <span className="required-star">*</span></label>
                  <div className="select-wrapper">
                    <select 
                      id="service" 
                      name="service" 
                      value={formData.service}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="" disabled>Select a service</option>
                      <option value="Complete Detail (Starting at $225)">Complete Detail (Starting at $225)</option>
                      <option value="Paint Correction (Starting at $300)">Paint Correction (Starting at $300)</option>
                      <option value="Ceramic Coating (Starting at $575)">Ceramic Coating (Starting at $575)</option>
                      <option value="PPF (Starting at $1500)">PPF (Starting at $1500)</option>
                      <option value="Complete Vehicle Restoration">Complete Vehicle Restoration</option>
                      <option value="Premium Detail">Premium Detail</option>
                      <option value="Interior Detail">Interior Detail</option>
                      <option value="Exterior Detail">Exterior Detail</option>
                      <option value="Maintenance Service">Maintenance Service</option>
                      <option value="Not Sure Yet">Not Sure Yet</option>
                    </select>
                  </div>
                </div>

                <div className="form-group-field full-width-field">
                  <label htmlFor="message">Message / Special Requests</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about the vehicle's condition, paint swirls, leather stains, or your timeline..." 
                    rows={4}
                  ></textarea>
                </div>
              </div>

              <div className="form-submit-block">
                <button type="submit" className="btn-submit-form">
                  Request A Quote
                </button>
              </div>
            </form>
            </div>
          </div>
        </section>

        {/* 5. BRAND STATEMENT / CLOSING CTA */}
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
          <a href="/" className="footer-logo-block" style={{display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none'}}>
            <img src={theme === 'dark' ? '/logo-light.svg' : '/logo-dark.svg'} alt="D2 Logo" className="footer-logo-img" style={{height: '32px'}} />
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <span style={{color: 'var(--color-white)', fontFamily: 'var(--font-headings)', fontWeight: '800', letterSpacing: '1.5px', fontSize: '1.1rem', lineHeight: '1.1'}}>DETAIL DRIVEN</span>
              <span style={{color: 'var(--color-steel)', fontSize: '0.7rem', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: '500'}}>Auto Detail</span>
            </div>
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
}

export default App;
