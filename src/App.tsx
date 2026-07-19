import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink, useLocation } from 'react-router-dom';
import './App.css';
import Blog from './pages/Blog';
import BlogArticle from './pages/BlogArticle';
import DDTV from './pages/DDTV';
import Privacy from './pages/Privacy';
import NotFound from './pages/NotFound';
import { SEO } from './components/SEO';
import { businessInfo } from './data/businessInfo';

// Central FormSubmit receiving endpoint
// Note: Jacobi must replace this address with the FormSubmit random token once activated
const FORM_ENDPOINT = "https://formsubmit.co/ajax/driven2inc@gmail.com";

// Scroll restoration helper
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Scrolled state header wrapper
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`compact-header ${isHome ? 'header-absolute' : 'header-solid'}${scrolled ? ' scrolled' : ''}`}>
      <div className="header-inner site-container">
        <Link to="/" className="header-logo-block" style={{ textDecoration: 'none', color: 'inherit' }}>
          <img src="/logo-light.svg" alt="D2 Logo" className="header-logo-img" />
          <div className="header-brand-info">
            <span className="header-brand-name">DETAIL DRIVEN</span>
            <span className="header-tagline">Perfection Is in the Details</span>
          </div>
        </Link>
        <div className="header-actions">
          <NavLink to="/ddtv" className={({ isActive }) => `btn-secondary-header ${isActive ? 'active' : ''}`} style={{ marginRight: '16px', color: '#FFFFFF', textDecoration: 'none', fontWeight: 'bold' }}>
            DD TV
          </NavLink>
          <NavLink to="/blog" className={({ isActive }) => `btn-secondary-header ${isActive ? 'active' : ''}`} style={{ marginRight: '16px', color: '#FFFFFF', textDecoration: 'none', fontWeight: 'bold' }}>
            BLOG
          </NavLink>
          {isHome ? (
            <a href="#quote-section" className="btn-primary-header" style={{ textDecoration: 'none' }}>
              REQUEST A QUOTE
            </a>
          ) : (
            <Link to="/#quote-section" className="btn-primary-header" style={{ textDecoration: 'none' }}>
              REQUEST A QUOTE
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

// Shared Footer Layout
function Footer() {
  return (
    <footer id="footer-section" className="brand-footer-clean">
      <div className="site-container footer-flex-row">
        <Link to="/" className="footer-logo-block" style={{display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none'}}>
          <img src="/logo-light.svg" alt="D2 Logo" className="footer-logo-img" style={{height: '52px'}} />
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <span style={{color: '#F7F7F7', fontFamily: 'var(--font-headings)', fontWeight: '800', letterSpacing: '1.5px', fontSize: '1.5rem', lineHeight: '1.1'}}>DETAIL DRIVEN</span>
            <span style={{color: '#BCC0CB', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: '500'}}>Auto Detail</span>
          </div>
        </Link>
        
        <div className="footer-links-block">
          <a href={businessInfo.instagram} target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
          <a href={businessInfo.facebook} target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <Link to="/ddtv" className="footer-social-btn" aria-label="DD TV" style={{ textDecoration: 'none' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>DD TV</span>
          </Link>
          <Link to="/blog" className="footer-social-btn" aria-label="Blog" style={{ textDecoration: 'none' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>BLOG</span>
          </Link>
          <Link to="/privacy" className="footer-social-btn" aria-label="Privacy" style={{ textDecoration: 'none' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>PRIVACY</span>
          </Link>
        </div>
        
        <div className="footer-contact-block">
          <a href={`mailto:${businessInfo.email}`} style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-white)', textDecoration: 'none' }}>{businessInfo.email}</a>
          <span className="footer-service-area" style={{ fontSize: '0.9rem', marginTop: '6px' }}>{`Serving ${businessInfo.city} and surrounding areas`}</span>
          <span className="copyright-text" style={{ fontSize: '0.85rem', marginTop: '4px' }}>{`© 2026 ${businessInfo.name}. All rights reserved.`}</span>
        </div>
      </div>
    </footer>
  );
}

// Homepage View Component
function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicle: '',
    service: '',
    message: '',
    consent: false,
    _honey: ''
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  // Imperatively start video playback on mount
  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch((err) => {
      console.error('Hero video failed to autoplay:', err);
    });
  }, []);

  // Check hash on load for deep section scrolling
  useEffect(() => {
    if (window.location.hash === '#quote-section') {
      const element = document.getElementById('quote-section');
      if (element) {
        setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 300);
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      
      // Limit to 3 files max
      if (selectedFiles.length + filesArray.length > 3) {
        setError('You can upload a maximum of 3 photographs.');
        return;
      }

      // Check file types (jpg, jpeg, png, webp)
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      const invalidType = filesArray.some(file => !allowedTypes.includes(file.type));
      if (invalidType) {
        setError('Unsupported file format. Please upload JPG, PNG, or WEBP images.');
        return;
      }

      // Check file size (max 8MB total combined size)
      const combinedSize = [...selectedFiles, ...filesArray].reduce((acc, file) => acc + file.size, 0);
      if (combinedSize > 8 * 1024 * 1024) {
        setError('Total file size exceeds the 8 MB upload limit.');
        return;
      }

      setError('');
      setSelectedFiles(prev => [...prev, ...filesArray]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Honeypot spam trap check
    if (formData._honey) {
      console.log('Bot detected via honeypot.');
      return;
    }

    // Validation
    if (!formData.name || (!formData.email && !formData.phone) || !formData.vehicle || !formData.service || !formData.consent) {
      setError('Please fill in all required fields and accept the contact consent.');
      return;
    }

    setSubmitting(true);

    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("email", formData.email);
      payload.append("phone", formData.phone);
      payload.append("vehicle", formData.vehicle);
      payload.append("service", formData.service);
      payload.append("message", formData.message);
      payload.append("_subject", `New Detail Driven Quote Request — ${formData.vehicle}`);
      payload.append("_template", "table");
      payload.append("_honey", formData._honey);

      selectedFiles.forEach((file) => {
        payload.append("attachment", file);
      });

      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json"
        },
        body: payload
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const resJson = await response.json().catch(() => ({ success: true }));

      if (resJson.success || response.status === 200) {
        setSubmitted(true);
        setSubmitting(false);
        // Clear form fields
        setFormData({
          name: '',
          email: '',
          phone: '',
          vehicle: '',
          service: '',
          message: '',
          consent: false,
          _honey: ''
        });
        setSelectedFiles([]);
      } else {
        throw new Error('FormSubmit endpoint returned an error status.');
      }
    } catch (err) {
      console.error("Quote submission error:", err);
      setError('Unable to send quote request. Please verify your internet connection and try again.');
      setSubmitting(false);
    }
  };

  return (
    <main>
      <SEO 
        title="Paint Correction, Ceramic Coating & PPF in Austin | Detail Driven"
        description="Detail Driven provides premium auto detailing, paint correction, ceramic coatings, paint protection film and vehicle restoration in Austin, Texas. Request a custom quote."
        canonicalPath="/"
      />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AutomotiveBusiness",
          "name": businessInfo.name,
          "url": `${businessInfo.domain}/`,
          "logo": `${businessInfo.domain}/logo-light.svg`,
          "image": `${businessInfo.domain}/media/d2-hero-poster.webp`,
          "telephone": `+1-${businessInfo.phoneDisplay.replace(/\D/g, '')}`,
          "email": businessInfo.email,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": businessInfo.streetAddress,
            "addressLocality": businessInfo.city,
            "addressRegion": businessInfo.region,
            "postalCode": businessInfo.postalCode,
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 30.370425,
            "longitude": -97.914285
          },
          "areaServed": {
            "@type": "City",
            "name": businessInfo.city
          },
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "07:00",
              "closes": "18:00"
            },
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": "Saturday",
              "opens": "09:00",
              "closes": "16:30"
            }
          ]
        })}
      </script>

      {/* 1. CINEMATIC VIDEO HERO SECTION */}
      <section className="video-hero">
        <video
          ref={heroVideoRef}
          className="video-hero-media"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/media/d2-hero-poster.webp"
          aria-hidden="true"
        >
          <source src="/media/d2-hero-optimized.webm" type="video/webm" />
          <source src="/media/d2-hero-optimized.mp4" type="video/mp4" />
        </video>
        <div className="video-hero-overlay"></div>
        <div className="video-hero-content site-container">
          <span className="video-hero-eyebrow">AUSTIN’S PRECISION AUTO DETAILING STUDIO</span>
          <div className="hero-headline-wrapper">
            <div className="headline-accent-rule" style={{ marginLeft: 0 }}></div>
            <h1 className="hero-headline">
              PRECISION YOU CAN SEE.<br />PROTECTION YOU CAN TRUST.
            </h1>
          </div>
          <p className="hero-supporting-text">
            Paint correction, ceramic coatings, paint protection film, premium detailing, and vehicle restoration—performed with disciplined preparation and obsessive attention to finish.
          </p>
          <div className="hero-cta-row" style={{display: 'flex', flexDirection: 'row', gap: '16px'}}>
            <a href="#quote-section" className="btn-primary-hero" style={{ textDecoration: 'none' }}>
              REQUEST A QUOTE
            </a>
            <a href={businessInfo.instagram} target="_blank" rel="noopener noreferrer" className="link-quiet-hero" style={{ textDecoration: 'none', color: '#FFFFFF', display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
              VIEW OUR WORK
            </a>
          </div>
          <span className="video-hero-trust-line">AUSTIN, TEXAS &bull; BY APPOINTMENT &bull; CALL OR TEXT</span>
        </div>
      </section>

      {/* 2. CREDIBILITY STRIP — LIGHT */}
      <div className="credibility-strip-light">
        <div className="site-container">
          <div className="strip-inner">
            Austin, Texas
            <span className="strip-sep" aria-hidden="true" />
            By Appointment
            <span className="strip-sep" aria-hidden="true" />
            Paint Correction
            <span className="strip-sep" aria-hidden="true" />
            Ceramic Coatings
            <span className="strip-sep" aria-hidden="true" />
            Paint Protection Film
          </div>
        </div>
      </div>

      {/* 3. DETAILING SERVICES — LIGHT */}
      <section className="services-section-light editorial-section">
        <div className="site-container">
          <span className="section-eyebrow">Our Services</span>
          <h2 className="section-heading">Detailing Services</h2>

          <div className="svc-grid">
            <article className="svc-card">
              <div className="svc-card-img-wrap">
                <img src="/img_leather.png" alt="Premium Detailing — interior cabin restoration" />
              </div>
              <div className="svc-card-body">
                <span className="svc-card-eyebrow">01 — Premium Detail</span>
                <h3 className="svc-card-heading">Premium Detailing</h3>
                <p className="svc-card-desc">Restoration of interior cabin surfaces and deep exterior hand wash.</p>
                <p className="svc-card-price">Starting at $225</p>
                <a href="#quote-section" className="svc-card-cta">Request Quote &rarr;</a>
              </div>
            </article>

            <article className="svc-card">
              <div className="svc-card-img-wrap">
                <img src="/img_black_paint.png" alt="Paint Correction — eliminate swirl marks and scratches" />
              </div>
              <div className="svc-card-body">
                <span className="svc-card-eyebrow">02 — Correction</span>
                <h3 className="svc-card-heading">Paint Correction</h3>
                <p className="svc-card-desc">Complete machine correction to eliminate paint swirl marks and scratches.</p>
                <p className="svc-card-price">Starting at $300</p>
                <a href="#quote-section" className="svc-card-cta">Request Quote &rarr;</a>
              </div>
            </article>

            <article className="svc-card">
              <div className="svc-card-img-wrap">
                <img src="/new_porsche.png" alt="Ceramic Coating — long-term hydrophobic protection" />
              </div>
              <div className="svc-card-body">
                <span className="svc-card-eyebrow">03 — Ceramic</span>
                <h3 className="svc-card-heading">Ceramic Coating</h3>
                <p className="svc-card-desc">Chemically-bonded nano-coating for long-term hydrophobic protection.</p>
                <p className="svc-card-price">Starting at $575</p>
                <a href="#quote-section" className="svc-card-cta">Request Quote &rarr;</a>
              </div>
            </article>

            <article className="svc-card">
              <div className="svc-card-img-wrap">
                <img src="/d2_wrap_mockup.png" alt="Paint Protection Film — physical clear-bra armor" />
              </div>
              <div className="svc-card-body">
                <span className="svc-card-eyebrow">04 — PPF</span>
                <h3 className="svc-card-heading">Paint Protection Film</h3>
                <p className="svc-card-desc">Physical clear-bra film shielding against road debris and scratch impacts.</p>
                <p className="svc-card-price">Starting at $1,500</p>
                <a href="#quote-section" className="svc-card-cta">Request Quote &rarr;</a>
              </div>
            </article>

            <article className="svc-card">
              <div className="svc-card-img-wrap">
                <img src="/img_carbon.png" alt="Vehicle Restoration — classic and collector automobiles" />
              </div>
              <div className="svc-card-body">
                <span className="svc-card-eyebrow">05 — Restoration</span>
                <h3 className="svc-card-heading">Vehicle Restoration</h3>
                <p className="svc-card-desc">Bespoke cabin rejuvenation, paint leveling, and full vehicle restoration for classic and collector automobiles.</p>
                <p className="svc-card-price">Custom Assessment</p>
                <a href="#quote-section" className="svc-card-cta">Request Quote &rarr;</a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 4. FEATURED WORK — DARK */}
      <section className="featured-work-section editorial-section">
        <div className="site-container">
          <span className="section-eyebrow">Studio Portfolio</span>
          <h2 className="section-heading">Featured Work</h2>

          <div className="featured-work-grid">
            <div className="fw-hero">
              <img src="/new_porsche.png" alt="Porsche GT3 Weissach — ceramic protection" />
              <div className="fw-caption">
                <span className="fw-caption-tag">Ceramic Protection</span>
                <h4 className="fw-caption-title">Porsche GT3 Weissach</h4>
              </div>
            </div>

            <div className="fw-supp">
              <img src="/img_black_paint.png" alt="Paint correction — deep reflection restoration" />
              <div className="fw-caption">
                <span className="fw-caption-tag">Paint Correction</span>
                <h4 className="fw-caption-title">Deep Reflection Restoration</h4>
              </div>
            </div>

            <div className="fw-supp">
              <img src="/img_leather.png" alt="Interior detailing — premium cabin rejuvenation" />
              <div className="fw-caption">
                <span className="fw-caption-tag">Cabin Detail</span>
                <h4 className="fw-caption-title">Premium Interior Rejuvenation</h4>
              </div>
            </div>

            <div className="fw-supp">
              <img src="/img_carbon.png" alt="Carbon fiber restoration details" />
              <div className="fw-caption">
                <span className="fw-caption-tag">Restoration</span>
                <h4 className="fw-caption-title">Exotic Carbon Accents</h4>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 5. PHILOSOPHY / PROCESS — LIGHT */}
      <section className="process-section-light editorial-section">
        <div className="site-container">
          <span className="section-eyebrow">The Philosophy</span>
          <h2 className="section-heading">WE DON&apos;T CHASE SHINE. WE CHASE PERFECTION.</h2>
          <p className="section-sub">
            Detailing is not a fast car wash. It is a highly disciplined preparation, correction, and finishing cycle.
          </p>

          <div className="process-steps-grid">
            <div className="process-step">
              <span className="process-step-num">01</span>
              <span className="process-step-title">Inspect &amp; Decontaminate</span>
              <p className="process-step-body">
                Every vehicle begins with deep chemical wash, fallout removal, clay bar treatments to draw embedded particles from clear coat pores, and digital paint depth inspection.
              </p>
            </div>

            <div className="process-step">
              <span className="process-step-num">02</span>
              <span className="process-step-title">Correct &amp; Refine</span>
              <p className="process-step-body">
                We execute measured compounding and polishing passes to level the clear coat, completely correcting swirl marks, microscopic weathering scratches, and oxidation haze.
              </p>
            </div>

            <div className="process-step">
              <span className="process-step-num">03</span>
              <span className="process-step-title">Protect &amp; Finish</span>
              <p className="process-step-body">
                We seal the corrected paintwork under chemically-bonded professional nano-ceramic coatings or physical paint protection film to secure long-term depth and hydrophobics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. QUOTE REQUEST FORM — LIGHT GRAY */}
      <section id="quote-section" className="quote-form-section quote-section-light editorial-section">
        <div className="quote-form-inner quote-two-col">
          
          <div className="quote-contact-info-col">
            <div className="headline-accent-rule"></div>
            <h2 style={{ fontSize: 'clamp(36px, 5vw, 54px)', marginBottom: '1.5rem', fontFamily: 'var(--font-headings)', lineHeight: 1.1 }}>
              Request a Custom Quote
            </h2>
            <p style={{ marginBottom: '2.5rem', fontSize: 'var(--fs-body)', lineHeight: '1.6' }}>
              Provide details about your vehicle's condition and protection goals. Detail Driven will review your request and contact you to coordinate options and studio availability.
            </p>
            
            <div className="quote-direct-contact">
              <p><strong>Call or Text: </strong>{businessInfo.phoneDisplay}</p>
              <p><strong>Email: </strong>{businessInfo.email}</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-steel)', marginTop: '20px', fontStyle: 'italic' }}>
                Note: Form submissions are retained securely for up to 30 days to facilitate estimates.
              </p>
            </div>
          </div>

          <div className="quote-form-col">
            {submitted ? (
              <div className="form-success-container" style={{
                padding: '40px 30px',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '4px',
                textAlign: 'center'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#CF1C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginBottom: '1rem'}}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                <h3 style={{
                  fontFamily: 'var(--font-headings)',
                  fontSize: '1.8rem',
                  color: 'var(--color-white)',
                  marginBottom: '1rem',
                  textTransform: 'uppercase'
                }}>Quote Request Received</h3>
                <p style={{
                  color: 'var(--color-steel)',
                  fontSize: '1.05rem',
                  lineHeight: '1.6',
                  marginBottom: '1.5rem'
                }}>
                  Your request has been sent. Detail Driven will review your vehicle information and follow up about service options and availability.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn-primary-hero" style={{ maxWidth: '200px', margin: '0 auto', textTransform: 'uppercase' }}>Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="quote-inquiry-form" style={{ opacity: submitting ? 0.6 : 1, pointerEvents: submitting ? 'none' : 'auto' }}>
                {error && <div className="form-feedback-error" style={{
                  padding: '12px 16px',
                  backgroundColor: 'rgba(207, 28, 28, 0.1)',
                  border: '1px solid #CF1C1C',
                  borderRadius: '4px',
                  color: '#CF1C1C',
                  marginBottom: '20px',
                  fontSize: '0.95rem'
                }}>{error}</div>}
                
                {/* Honeypot Spam Trap */}
                <input
                  type="text"
                  name="_honey"
                  value={formData._honey}
                  onChange={handleInputChange}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ display: 'none' }}
                />

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

                  <p className="contact-method-helper">Please provide either an email address or a phone number.</p>

                  <div className="form-group-field">
                    <label htmlFor="email">Email address</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="name@example.com" 
                    />
                  </div>

                  <div className="form-group-field">
                    <label htmlFor="phone">Phone number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(512) 555-0000" 
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
                        <option value="Paint Correction">Paint Correction</option>
                        <option value="Ceramic Coating">Ceramic Coating</option>
                        <option value="PPF (Paint Protection Film)">PPF (Paint Protection Film)</option>
                        <option value="Vehicle Restoration">Vehicle Restoration</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group-field full-width-field">
                    <label htmlFor="message">Paint Condition / Protection Goals <span className="required-star">*</span></label>
                    <textarea 
                      id="message" 
                      name="message" 
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Describe paint condition, swirl marks, scratches, or your detailing timelines..." 
                      rows={4}
                      required
                    ></textarea>
                  </div>

                  {/* Photo upload panel */}
                  <div className="form-group-field full-width-field">
                    <div className="upload-panel">
                      <label htmlFor="photo-upload">Upload vehicle photos <span style={{ color: 'rgba(188,192,203,0.65)', fontWeight: 400 }}>· Optional · Up to 3 images · 8 MB total</span></label>
                      <input 
                        type="file" 
                        id="photo-upload"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".jpg,.jpeg,.png,.webp"
                        multiple
                        style={{ display: 'none' }}
                      />
                      <button 
                        type="button" 
                        onClick={() => fileInputRef.current?.click()}
                        className="upload-dropzone-btn"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                        Choose vehicle photos
                        <span style={{ fontSize: '12px', color: 'rgba(188,192,203,0.55)', marginLeft: 'auto' }}>JPG, PNG, WebP</span>
                      </button>
                      {selectedFiles.length > 0 && (
                        <div className="upload-file-chips">
                          {selectedFiles.map((file, idx) => (
                            <div key={idx} className="upload-file-chip">
                              <span className="upload-file-chip-name">
                                {file.name} <span style={{ color: 'rgba(188,192,203,0.55)' }}>({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                              </span>
                              <button 
                                type="button" 
                                onClick={() => removeFile(idx)} 
                                className="upload-file-chip-remove"
                                aria-label={`Remove ${file.name}`}
                              >
                                &times;
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Consent row */}
                  <div className="consent-row">
                    <input 
                      className="consent-checkbox"
                      type="checkbox" 
                      id="consent" 
                      name="consent" 
                      checked={formData.consent}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor="consent" className="consent-copy">
                      I agree that Detail Driven may contact me about this quote request. Submitting this form does not confirm an appointment or final price. <Link to="/privacy" target="_blank" style={{ color: '#FFFFFF', fontWeight: 600, textDecorationThickness: '1px', textUnderlineOffset: '3px' }}>View the Privacy Policy.</Link>
                    </label>
                  </div>
                </div>

                <div className="form-submit-block">
                  <button type="submit" className="btn-submit-form" disabled={submitting} style={{ opacity: submitting ? 0.7 : 1 }}>
                    {submitting ? 'SENDING REQUEST...' : 'REQUEST A CUSTOM QUOTE'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

// Router Root Layout Component
export default function App() {
  useEffect(() => {
    document.documentElement.dataset.prerenderReady = "true";
    return () => {
      delete document.documentElement.dataset.prerenderReady;
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="coming-soon-container" data-theme="dark">
        <ScrollToTop />
        <Header />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogArticle />} />
          <Route path="/ddtv" element={<DDTV />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        
        <Footer />
      </div>
    </BrowserRouter>
  );
}
