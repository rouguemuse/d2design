import React, { useState } from 'react';
import './App.css';

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

  return (
    <div className="coming-soon-container">
      {/* 1. COMPACT HEADER */}
      <header className="compact-header">
        <div className="header-inner">
          <div className="header-logo-block">
            <img src="/logo-light.svg" alt="D2 Logo" className="header-logo-img" />
            <div className="header-brand-info">
              <span className="header-brand-name">DETAIL DRIVEN</span>
              <span className="header-tagline">Perfection Is in the Details</span>
            </div>
          </div>
          <div className="header-actions">
            <div className="header-socials">
              <a href="https://www.instagram.com/d2_detaildriven/" target="_blank" rel="noopener noreferrer" className="header-social-link" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="https://www.facebook.com/people/D2-Auto-Detail/100063942352825/" target="_blank" rel="noopener noreferrer" className="header-social-link" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://www.youtube.com/@d2_detaildriven" target="_blank" rel="noopener noreferrer" className="header-social-link" aria-label="YouTube">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/><polygon points="10 15 15 12 10 9 10 15"/></svg>
              </a>
            </div>
            <button onClick={handleScrollToForm} className="btn-primary-header">
              Request Info
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="hero-section">
        <div className="hero-inner-split">
          {/* Hero Left: Detailing Image */}
          <div className="hero-image-col">
            <div className="hero-image-wrapper">
              <img 
                src="/background.jpg" 
                alt="Professional automotive detailing process" 
                className="hero-detailing-img"
              />
              <div className="hero-image-overlay"></div>
              <span className="hero-image-label">DETAIL DRIVEN AUTO DETAIL</span>
            </div>
          </div>

          {/* Hero Right: Copywriting & CTAs */}
          <div className="hero-copy-col">
            <div className="hero-copy-content">
              <p className="hero-eyebrow">A MORE REFINED EXPERIENCE IS COMING</p>
              <h1 className="hero-headline">Precision You Can See.<br />Protection You Can Trust.</h1>
              <p className="hero-supporting-text">
                Detail Driven is preparing a new online experience built around premium detailing, paint correction, ceramic protection, and uncompromising preparation. The website is being finished. The work has never stopped.
              </p>
              
              <div className="hero-cta-row">
                <button onClick={handleScrollToForm} className="btn-primary-hero">
                  Request Service Information
                </button>
                <a href="#footer-section" className="link-secondary-hero">
                  Connect With Us
                </a>
              </div>

              <div className="hero-service-labels">
                <span className="service-tag-label"><span className="red-bullet"></span>Premium Detailing</span>
                <span className="service-tag-label"><span className="red-bullet"></span>Paint Correction</span>
                <span className="service-tag-label"><span className="red-bullet"></span>Ceramic Protection</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICE PREVIEW STRIP */}
      <section className="service-strip-section">
        <div className="service-strip-inner">
          <div className="service-strip-item">
            <div className="service-strip-header">
              <span className="service-strip-accent">//</span>
              <h3>Detailing</h3>
            </div>
            <p>Comprehensive interior and exterior restoration.</p>
          </div>
          <div className="service-strip-item">
            <div className="service-strip-header">
              <span className="service-strip-accent">//</span>
              <h3>Paint Correction</h3>
            </div>
            <p>Measured correction designed to restore clarity and depth.</p>
          </div>
          <div className="service-strip-item">
            <div className="service-strip-header">
              <span className="service-strip-accent">//</span>
              <h3>Ceramic Protection</h3>
            </div>
            <p>Long-term surface protection built on proper preparation.</p>
          </div>
          <div className="service-strip-item">
            <div className="service-strip-header">
              <span className="service-strip-accent">//</span>
              <h3>Vehicle Preservation</h3>
            </div>
            <p>Maintenance plans created to protect the finished result.</p>
          </div>
        </div>
      </section>

      {/* 4. QUOTE REQUEST FORM */}
      <section id="quote-section" className="quote-form-section">
        <div className="quote-form-inner">
          <div className="quote-form-header">
            <h2>Tell Us What Your Vehicle Needs</h2>
            <p>Send a few details and Detail Driven will follow up with service information and availability.</p>
          </div>

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
            <form onSubmit={handleSubmit} className="quote-inquiry-form">
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
                      <option value="Premium Detail">Premium Detail</option>
                      <option value="Interior Detail">Interior Detail</option>
                      <option value="Exterior Detail">Exterior Detail</option>
                      <option value="Paint Correction">Paint Correction</option>
                      <option value="Ceramic Coating">Ceramic Coating</option>
                      <option value="New Vehicle Protection">New Vehicle Protection</option>
                      <option value="Resale Preparation">Resale Preparation</option>
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
                  Request Information
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* 5. BRAND STATEMENT */}
      <section className="brand-statement-section">
        <div className="brand-statement-inner">
          <div className="brand-statement-header">
            <span className="statement-line">We don’t chase shine.</span>
            <span className="statement-line highlight">We chase perfection.</span>
          </div>
          <p className="brand-statement-copy">
            Every lasting result begins with disciplined preparation. Detail Driven approaches every surface with intention, precision, and respect for the vehicle.
          </p>
        </div>
      </section>

      {/* 6. SOCIAL & CONTACT FOOTER */}
      <footer id="footer-section" className="brand-footer">
        <div className="footer-inner">
          <div className="footer-top-block">
            <div className="footer-logo-area">
              <img src="/logo-light.svg" alt="D2 Logo" className="footer-logo-img" />
              <div className="footer-brand-title">
                <span className="footer-name">DETAIL DRIVEN</span>
                <span className="footer-subtext">Auto Detail</span>
              </div>
            </div>
            <div className="footer-social-links">
              <a href="https://www.instagram.com/d2_detaildriven/" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                <span>Instagram</span>
              </a>
              <a href="https://www.facebook.com/people/D2-Auto-Detail/100063942352825/" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                <span>Facebook</span>
              </a>
              <a href="https://www.youtube.com/@d2_detaildriven" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="YouTube">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/><polygon points="10 15 15 12 10 9 10 15"/></svg>
                <span>YouTube</span>
              </a>
            </div>
          </div>
          
          <div className="footer-divider"></div>

          <div className="footer-bottom-block">
            <div className="footer-meta-info">
              <a href="mailto:info@d2detaildriven.com" className="footer-contact-link">info@d2detaildriven.com</a>
              <span className="footer-service-area">Serving Austin and surrounding areas</span>
            </div>
            <p className="footer-copyright">
              &copy; 2026 Detail Driven. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
