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
              <img 
                src="/new_hero_image.png" 
                alt="Black Corvette rear detail with D2 plate" 
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
                  <span>Precision You Can See.</span>
                  <span>Protection You Can Trust.</span>
                </h1>
              </div>
              <p className="hero-supporting-text">
                Detail Driven provides premium detailing, paint correction, ceramic coatings, PPF, and vehicle restoration in Austin, Texas. We approach every surface with intention, precision, and respect for the vehicle.
              </p>
              
              <div className="hero-cta-row">
                <button onClick={(e) => { handleScrollToForm(e); trackEvent('Request a Quote Hero Click'); }} className="btn-primary-hero">
                  Request A Quote
                </button>
                <a 
                  href="https://www.instagram.com/d2_detaildriven/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="link-quiet-hero"
                  onClick={() => trackEvent('View Our Work Hero Click')}
                >
                  View Our Work
                </a>
              </div>

              <p className="hero-estimate-hint">
                For faster estimates, include your vehicle year, make, model, current condition, and the service you are considering.
              </p>

              <div className="hero-contact-row">
                <span className="contact-item">
                  <strong>Call or Text:</strong> <a href="tel:+19494442885" onClick={() => trackEvent('Phone Link Click')}>+1 949 444 2885</a>
                </span>
                <span className="contact-separator">|</span>
                <span className="contact-item">
                  <strong>Email:</strong> <a href="mailto:contact@d2detaildriven.com" onClick={() => trackEvent('Email Link Click')}>contact@d2detaildriven.com</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICE PREVIEW STRIP */}
      <section className="service-strip-section">
        <div className="service-strip-inner site-container">
          <div className="service-strip-header-block">
            <span className="service-strip-accent">//</span>
            <h2>Services Currently Available</h2>
          </div>
          <div className="service-strip-list">
            <span className="service-strip-bullet-item"><span className="service-number">01</span>Premium Detailing <span className="service-price">| $225+</span></span>
            <span className="service-strip-bullet-item"><span className="service-number">02</span>Paint Correction <span className="service-price">| $300+</span></span>
            <span className="service-strip-bullet-item"><span className="service-number">03</span>Ceramic Coating <span className="service-price">| $575+</span></span>
            <span className="service-strip-bullet-item"><span className="service-number">04</span>Paint Protection Film <span className="service-price">| $1500+</span></span>
            <span className="service-strip-bullet-item"><span className="service-number">05</span>Vehicle Restoration <span className="service-price">| Quote</span></span>
          </div>
        </div>
      </section>

      {/* 3.2 CERAMIC COATING FEATURE */}
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
      </section>

      {/* 4. QUOTE REQUEST FORM */}
      <section id="quote-section" className="quote-form-section" style={{ padding: '80px 0' }}>
        <div className="quote-form-inner site-container">
          
          <div className="quote-contact-info">
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-white)', fontFamily: 'var(--font-headings)', lineHeight: 1.1 }}>
              Tell Us What Your Vehicle Needs
            </h2>
            <p style={{ color: 'var(--color-steel)', marginBottom: '2.5rem', fontSize: '1.05rem', lineHeight: '1.6' }}>
              Send a few details and Detail Driven will follow up with service information and availability.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-steel)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.25rem', fontFamily: 'var(--font-technical)' }}>Call or Text</span>
                <a href="tel:+19494442885" style={{ color: 'var(--color-white)', fontSize: '1.25rem', fontWeight: 600, textDecoration: 'none' }} onClick={() => trackEvent('Phone Link Click')}>+1 949 444 2885</a>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-steel)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.25rem', fontFamily: 'var(--font-technical)' }}>Email</span>
                <a href="mailto:contact@d2detaildriven.com" style={{ color: 'var(--color-white)', fontSize: '1.25rem', fontWeight: 600, textDecoration: 'none' }} onClick={() => trackEvent('Email Link Click')}>contact@d2detaildriven.com</a>
              </div>
            </div>
          </div>

          <div className="quote-form-wrapper" style={{ backgroundColor: 'var(--form-card-bg)', padding: '40px', borderRadius: '4px', border: '1px solid var(--form-card-border)' }}>

          {submitted ? (
            <div className="form-feedback-success">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="success-icon"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              <div className="success-text">
                <h3>Request Dispatched</h3>
                <p>Thank you for reaching out. Your vehicle information has been saved locally and dispatched to <strong>driven2inc@gmail.com</strong>.</p>
                <span className="integration-notice">
                  Note: Email dispatch has been triggered via FormSubmit API. (If this is the first submission to this address, please approve the FormSubmit activation link in driven2inc@gmail.com's inbox to receive subsequent lead notifications directly).
                </span>
              </div>
            </div>
          ) : (
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
          )}
          </div>
        </div>
      </section>

      {/* 5. BRAND STATEMENT */}
      <section className="brand-statement-section" style={{ padding: '60px 0 40px', borderTop: '2px solid var(--color-red)' }}>
        <div className="brand-statement-inner site-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.25rem', letterSpacing: '2px', color: 'var(--color-white)', fontFamily: 'var(--font-headings)', textTransform: 'uppercase', margin: '0 0 1rem 0' }}>
            THE FINISH STARTS WITH THE PREP.
          </h2>
          <p style={{ color: 'var(--color-steel)', fontSize: '1.05rem', maxWidth: '600px', margin: 0 }}>
            Lasting protection begins with careful cleaning, decontamination, correction, and preparation.
          </p>
        </div>
      </section>
      </>
      )}

      {/* 6. SOCIAL & CONTACT FOOTER */}
      <footer id="footer-section" className="brand-footer">
        <div className="footer-inner site-container">
          <div className="footer-top-block">
            <a href="/" className="footer-logo-area" style={{ textDecoration: 'none', color: 'inherit' }}>
              <img src={theme === 'dark' ? '/logo-light.svg' : '/logo-dark.svg'} alt="D2 Logo" className="footer-logo-img" />
              <div className="footer-brand-title">
                <span className="footer-name">DETAIL DRIVEN</span>
                <span className="footer-subtext">Auto Detail</span>
              </div>
            </a>
            <div className="footer-social-links">
              <a 
                href="https://www.instagram.com/d2_detaildriven/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-social-btn" 
                aria-label="Instagram"
                onClick={() => trackEvent('Instagram Social Click')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                <span>Instagram</span>
              </a>
              <a 
                href="https://www.facebook.com/people/D2-Auto-Detail/100063942352825/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-social-btn" 
                aria-label="Facebook"
                onClick={() => trackEvent('Facebook Social Click')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                <span>Facebook</span>
              </a>
              <a 
                href="/ddtv.html" 
                className="footer-social-btn" 
                aria-label="DD TV"
                onClick={() => trackEvent('DD TV Click')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline></svg>
                <span>DD TV</span>
              </a>
              <a 
                href="/blog.html" 
                className="footer-social-btn" 
                aria-label="Blog"
                onClick={() => trackEvent('Blog Click')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>
                <span>Blog</span>
              </a>
            </div>
          </div>
          
          <div className="footer-divider"></div>

          <div className="footer-bottom-block">
            <div className="footer-meta-info">
              <a href="mailto:contact@d2detaildriven.com" className="footer-contact-link" onClick={() => trackEvent('Email Link Click')}>contact@d2detaildriven.com</a>
              <span className="footer-service-area">Serving Austin and surrounding areas</span>
            </div>
            <p className="footer-copyright">
              &copy; 2026 Detail Driven. All rights reserved.
            </p>
          </div>
        </div>
        <div className="footer-watermark" aria-hidden="true">DETAIL DRIVEN</div>
      </footer>
    </div>
  );
}

export default App;
