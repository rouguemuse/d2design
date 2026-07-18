import React, { useState, useEffect, useRef } from 'react';
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
  const [theme, setTheme] = useState<'dark' | 'light'>('light');

  
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  


  useEffect(() => {
    if (!videoUrl || !videoRef.current) return;
    const video = videoRef.current;
    video.muted = true;
    video.defaultMuted = true;
    const attemptPlay = () => {
      const p = video.play();
      if (p !== undefined) p.catch(() => {});
    };
    attemptPlay();
    video.addEventListener('loadeddata', attemptPlay);
    video.addEventListener('canplay', attemptPlay);
    const onPageShow = () => attemptPlay();
    window.addEventListener('pageshow', onPageShow);
    return () => {
      video.removeEventListener('loadeddata', attemptPlay);
      video.removeEventListener('canplay', attemptPlay);
      window.removeEventListener('pageshow', onPageShow);
    };
  }, [videoUrl]);


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

  const handleScrollToForm = (e: React.MouseEvent<HTMLElement>) => {
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
      <header className="compact-header header-absolute">
        <div className="header-inner site-container">
          <a href="/" className="header-logo-block" style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src="/logo-light.svg" alt="D2 Logo" className="header-logo-img" />
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
        <section className="hero-fullscreen">
          {videoUrl ? (
            <video 
              ref={videoRef}
              className="hero-fullscreen-bg"
              autoPlay 
              muted 
              loop 
              playsInline 
              preload="auto"
              poster="/premium_detailing.png"
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
          ) : (
            <img src="/premium_detailing.png" alt="Detailer" className="hero-fullscreen-bg" />
          )}
          <div className="hero-fullscreen-overlay"></div>
          
          <div className="hero-fullscreen-content">
            <div className="hero-headline-wrapper">
              <div className="headline-accent-rule"></div>
              <h1 className="hero-headline">
                PRECISION YOU CAN SEE.<br />PROTECTION YOU CAN TRUST.
              </h1>
            </div>
            <p className="hero-supporting-text" style={{maxWidth: '800px', margin: '0 auto 2rem auto'}}>
              Detail Driven provides premium detailing, paint correction, ceramic coatings, PPF, and vehicle restoration in Austin, Texas. We approach every surface with intention, precision, and respect for the vehicle.
            </p>
            
            <div className="hero-cta-row" style={{flexDirection: 'row', gap: '16px'}}>
              <button onClick={(e) => { handleScrollToForm(e); trackEvent('Request a Quote Hero Click'); }} className="btn-primary-hero">
                Request A Quote
              </button>
              <a href="https://www.instagram.com/d2_detaildriven/" target="_blank" rel="noopener noreferrer" className="link-quiet-hero" onClick={() => trackEvent('View Our Work Hero Click')}>
                View Our Work
              </a>
            </div>
          </div>
        </section>

        {/* 3. IMAGE-LED SERVICE GATEWAY */}
        <section className="service-grid-section" style={{padding: '80px 0 90px 0', background: 'var(--bg-dark)'}}>
          <div className="site-container">
            <h2 style={{ fontSize: 'var(--fs-h2)', color: 'var(--color-white)', fontFamily: 'var(--font-headings)', textAlign: 'center' }}>Services Currently Available</h2>
            
            <div className="gateway-grid">
              <div className="gateway-card" onClick={handleScrollToForm}>
                <img src="/img_leather.png" alt="Premium Detailing" className="gateway-card-img" />
                <div className="gateway-card-content">
                  <h3>Premium Detailing</h3>
                  <p>Starting at $225</p>
                  <span style={{color: 'var(--color-red)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem'}}>Request Quote &rarr;</span>
                </div>
              </div>
              <div className="gateway-card" onClick={handleScrollToForm}>
                <img src="/img_black_paint.png" alt="Paint Correction" className="gateway-card-img" />
                <div className="gateway-card-content">
                  <h3>Paint Correction</h3>
                  <p>Starting at $300</p>
                  <span style={{color: 'var(--color-red)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem'}}>Request Quote &rarr;</span>
                </div>
              </div>
              <div className="gateway-card" onClick={handleScrollToForm}>
                <img src="/new_porsche.png" alt="Ceramic Coating" className="gateway-card-img" />
                <div className="gateway-card-content">
                  <h3>Ceramic Coating</h3>
                  <p>Starting at $575</p>
                  <span style={{color: 'var(--color-red)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem'}}>Request Quote &rarr;</span>
                </div>
              </div>
              <div className="gateway-card" onClick={handleScrollToForm}>
                <img src="/d2_wrap_mockup.png" alt="Paint Protection Film" className="gateway-card-img" />
                <div className="gateway-card-content">
                  <h3>Paint Protection Film</h3>
                  <p>Starting at $1500</p>
                  <span style={{color: 'var(--color-red)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem'}}>Request Quote &rarr;</span>
                </div>
              </div>
              <div className="gateway-card" onClick={handleScrollToForm}>
                <img src="/img_carbon.png" alt="Vehicle Restoration" className="gateway-card-img" />
                <div className="gateway-card-content">
                  <h3>Vehicle Restoration</h3>
                  <p>By Quote</p>
                  <span style={{color: 'var(--color-red)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem'}}>Request Quote &rarr;</span>
                </div>
              </div>
            </div>
          </div>
        </section>
  
        {/* 4. STORYTELLING SECTIONS */}
        <section className="story-section">
          <div className="story-image-col">
            <img src="/new_porsche.png" alt="Porsche headlight ceramic coating" className="story-image" />
          </div>
          <div className="story-copy-col">
            <div className="story-copy-container">
              <div className="headline-accent-rule"></div>
              <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', marginBottom: '1rem', color: 'var(--color-white)', fontFamily: 'var(--font-headings)' }}>Ceramic Coating</h2>
              <p style={{color: 'var(--color-steel)', fontSize: '1.1rem', lineHeight: '1.6'}}>
                Long-term hydrophobic surface protection built on proper preparation. We lock in the finish so your vehicle remains stunningly reflective and incredibly easy to maintain.
              </p>
              <ul className="story-highlights">
                <li>Enhanced gloss & depth</li>
                <li>Easier washing & maintenance</li>
                <li>Years of hydrophobic protection</li>
              </ul>
              <p style={{color: 'var(--color-white)', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '24px'}}>Starting at $575</p>
              <button onClick={(e) => { handleScrollToForm(e); trackEvent('Request a Quote Ceramic Click'); }} className="btn-primary-hero" style={{alignSelf: 'flex-start'}}>
                Request A Quote
              </button>
            </div>
          </div>
        </section>

        <section className="story-section reverse">
          <div className="story-copy-col">
            <div className="story-copy-container">
              <div className="headline-accent-rule"></div>
              <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', marginBottom: '1rem', color: 'var(--color-white)', fontFamily: 'var(--font-headings)' }}>Paint Correction</h2>
              <p style={{color: 'var(--color-steel)', fontSize: '1.1rem', lineHeight: '1.6'}}>
                Erase years of swirl marks, scratches, and oxidation. Our multi-stage compounding and polishing restores a mirror-like finish to your vehicle's paintwork, revealing its true color and brilliance.
              </p>
              <ul className="story-highlights">
                <li>Removes swirls and light scratches</li>
                <li>Restores lost clarity and gloss</li>
                <li>Essential preparation before coatings</li>
              </ul>
              <p style={{color: 'var(--color-white)', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '24px'}}>Starting at $300</p>
              <button onClick={(e) => { handleScrollToForm(e); trackEvent('Request a Quote Correction Click'); }} className="btn-primary-hero" style={{alignSelf: 'flex-start'}}>
                Request A Quote
              </button>
            </div>
          </div>
          <div className="story-image-col">
            <img src="/img_black_paint.png" alt="Paint correction process on black paint" className="story-image" />
          </div>
        </section>

        {/* 5. QUOTE REQUEST FORM */}
        <section id="quote-section" className="quote-form-section" style={{padding: '100px 0'}}>
          <div className="quote-form-inner site-container quote-two-col">
            
            <div className="quote-contact-info-col">
              <div className="headline-accent-rule"></div>
              <h2 style={{ fontSize: 'clamp(36px, 5vw, 54px)', marginBottom: '1.5rem', color: 'var(--color-white)', fontFamily: 'var(--font-headings)', lineHeight: 1.1 }}>
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

        {/* 6. BRAND STATEMENT / CLOSING CTA */}
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

      {/* 7. SOCIAL & CONTACT FOOTER */}
      <footer id="footer-section" className="brand-footer-clean">
        <div className="site-container footer-flex-row">
          <a href="/" className="footer-logo-block" style={{display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none'}}>
            <img src="/logo-light.svg" alt="D2 Logo" className="footer-logo-img" style={{height: '32px'}} />
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <span style={{color: '#F7F7F7', fontFamily: 'var(--font-headings)', fontWeight: '800', letterSpacing: '1.5px', fontSize: '1.1rem', lineHeight: '1.1'}}>DETAIL DRIVEN</span>
              <span style={{color: '#BCC0CB', fontSize: '0.7rem', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: '500'}}>Auto Detail</span>
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
