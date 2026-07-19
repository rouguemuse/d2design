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
    <header className={`compact-header ${isHome ? 'header-absolute' : 'header-solid'} ${scrolled ? 'scrolled' : ''}`}>
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
          <a href={`mailto:\${businessInfo.email}`} style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-white)', textDecoration: 'none' }}>{businessInfo.email}</a>
          <span className="footer-service-area" style={{ fontSize: '0.9rem', marginTop: '6px' }}>Serving {businessInfo.city} and surrounding areas</span>
          <span className="copyright-text" style={{ fontSize: '0.85rem', marginTop: '4px' }}>&copy; 2026 {businessInfo.name}. All rights reserved.</span>
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
    <>
      <SEO 
        title="Paint Correction, Ceramic Coating & PPF in Austin | Detail Driven"
        description="Detail Driven provides premium auto detailing, paint correction, ceramic coatings, paint protection film and vehicle restoration in Austin, Texas. Request a custom quote."
        path="/"
      />

      {/* 1. CINEMATIC VIDEO HERO SECTION */}
      <section className="video-hero">
        <video
          className="video-hero-media"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
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

      {/* 2. CREDIBILITY STRIP */}
      <div className="credibility-strip" style={{
        backgroundColor: '#0F1013',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        padding: '16px 0',
        textAlign: 'center'
      }}>
        <div className="site-container" style={{
          color: 'var(--color-steel)',
          fontSize: '0.9rem',
          letterSpacing: '1.5px',
          fontWeight: 600,
          textTransform: 'uppercase',
          fontFamily: 'var(--font-headings)'
        }}>
          Austin, Texas &bull; By Appointment &bull; Paint Correction &bull; Ceramic Coatings &bull; Paint Protection Film
        </div>
      </div>

      {/* 3. CORE SERVICE GATEWAY */}
      <section className="service-grid-section" style={{padding: '80px 0 90px 0', background: 'var(--bg-dark)'}}>
        <div className="site-container">
          <h2 style={{ fontSize: 'var(--fs-h2)', color: 'var(--color-white)', fontFamily: 'var(--font-headings)', textAlign: 'center', textTransform: 'uppercase', marginBottom: '40px' }}>Detailing Services</h2>
          
          <div className="gateway-grid">
            {/* Card 1 */}
            <div className="gateway-card">
              <img src="/img_leather.png" alt="Premium Detailing" className="gateway-card-img" />
              <div className="gateway-card-content">
                <h3>Premium Detailing</h3>
                <p className="card-outcome" style={{ color: 'var(--color-steel)', fontSize: '0.9rem', margin: '8px 0', minHeight: '40px' }}>
                  Restoration of interior cabin surfaces and deep exterior hand wash.
                </p>
                <p className="card-audience" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', fontStyle: 'italic', marginBottom: '8px' }}>
                  For daily drivers seeking cabin and surface decontamination.
                </p>
                <p className="card-price" style={{ color: 'var(--color-white)', fontWeight: 'bold', fontSize: '1rem', margin: '4px 0' }}>Starting at $225</p>
                <a href="#quote-section" className="card-action-link" style={{color: 'var(--color-red)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem', textDecoration: 'none', display: 'inline-block', marginTop: '12px'}}>Request Quote &rarr;</a>
              </div>
            </div>

            {/* Card 2 */}
            <div className="gateway-card">
              <img src="/img_black_paint.png" alt="Paint Correction" className="gateway-card-img" />
              <div className="gateway-card-content">
                <h3>Paint Correction</h3>
                <p className="card-outcome" style={{ color: 'var(--color-steel)', fontSize: '0.9rem', margin: '8px 0', minHeight: '40px' }}>
                  Complete machine correction to eliminate paint swirl marks and scratches.
                </p>
                <p className="card-audience" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', fontStyle: 'italic', marginBottom: '8px' }}>
                  For vehicles with weathered clear coats needing high gloss restoration.
                </p>
                <p className="card-price" style={{ color: 'var(--color-white)', fontWeight: 'bold', fontSize: '1rem', margin: '4px 0' }}>Starting at $300</p>
                <a href="#quote-section" className="card-action-link" style={{color: 'var(--color-red)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem', textDecoration: 'none', display: 'inline-block', marginTop: '12px'}}>Request Quote &rarr;</a>
              </div>
            </div>

            {/* Card 3 */}
            <div className="gateway-card">
              <img src="/new_porsche.png" alt="Ceramic Coating" className="gateway-card-img" />
              <div className="gateway-card-content">
                <h3>Ceramic Coating</h3>
                <p className="card-outcome" style={{ color: 'var(--color-steel)', fontSize: '0.9rem', margin: '8px 0', minHeight: '40px' }}>
                  Chemically-bonded nano-coating for long-term hydrophobic protection.
                </p>
                <p className="card-audience" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', fontStyle: 'italic', marginBottom: '8px' }}>
                  For owners looking for chemical resistance and effortless washing.
                </p>
                <p className="card-price" style={{ color: 'var(--color-white)', fontWeight: 'bold', fontSize: '1rem', margin: '4px 0' }}>Starting at $575</p>
                <a href="#quote-section" className="card-action-link" style={{color: 'var(--color-red)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem', textDecoration: 'none', display: 'inline-block', marginTop: '12px'}}>Request Quote &rarr;</a>
              </div>
            </div>

            {/* Card 4 */}
            <div className="gateway-card">
              <img src="/d2_wrap_mockup.png" alt="Paint Protection Film" className="gateway-card-img" />
              <div className="gateway-card-content">
                <h3>Paint Protection Film</h3>
                <p className="card-outcome" style={{ color: 'var(--color-steel)', fontSize: '0.9rem', margin: '8px 0', minHeight: '40px' }}>
                  Physical clear-bra protection film shielding against road debris impacts.
                </p>
                <p className="card-audience" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', fontStyle: 'italic', marginBottom: '8px' }}>
                  For high-performance vehicles needing impact and scratch armor.
                </p>
                <p className="card-price" style={{ color: 'var(--color-white)', fontWeight: 'bold', fontSize: '1rem', margin: '4px 0' }}>Starting at $1,500</p>
                <a href="#quote-section" className="card-action-link" style={{color: 'var(--color-red)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem', textDecoration: 'none', display: 'inline-block', marginTop: '12px'}}>Request Quote &rarr;</a>
              </div>
            </div>

            {/* Card 5 */}
            <div className="gateway-card">
              <img src="/img_carbon.png" alt="Vehicle Restoration" className="gateway-card-img" />
              <div className="gateway-card-content">
                <h3>Vehicle Restoration</h3>
                <p className="card-outcome" style={{ color: 'var(--color-steel)', fontSize: '0.9rem', margin: '8px 0', minHeight: '40px' }}>
                  Bespoke cabin rejuvenation, paint leveling, and full vehicle restoration.
                </p>
                <p className="card-audience" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', fontStyle: 'italic', marginBottom: '8px' }}>
                  For classic, vintage, and high-end collector automobiles.
                </p>
                <p className="card-price" style={{ color: 'var(--color-white)', fontWeight: 'bold', fontSize: '1rem', margin: '4px 0' }}>Custom Assessment</p>
                <a href="#quote-section" className="card-action-link" style={{color: 'var(--color-red)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem', textDecoration: 'none', display: 'inline-block', marginTop: '12px'}}>Request Quote &rarr;</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED WORK GALLERY */}
      <section className="featured-gallery-section" style={{ padding: '80px 0', backgroundColor: '#09090A', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
        <div className="site-container">
          <h2 style={{ fontSize: 'var(--fs-h2)', color: 'var(--color-white)', fontFamily: 'var(--font-headings)', textAlign: 'center', textTransform: 'uppercase', marginBottom: '16px' }}>Featured Work</h2>
          <p style={{ color: 'var(--color-steel)', fontSize: '1.05rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto 48px auto', lineHeight: '1.6' }}>
            A look at the vehicles detailed, corrected, and protected in our Austin studio.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div style={{ borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.08)', position: 'relative', aspectRatio: '16/10' }}>
              <img src="/new_porsche.png" alt="Porsche GT3 Weissach delivery detailing" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px', background: 'linear-gradient(0deg, rgba(0,0,0,0.95) 0%, transparent 100%)', color: '#FFF' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-red)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Ceramic Protection</span>
                <h4 style={{ margin: '4px 0 0 0', fontSize: '1.05rem', fontFamily: 'var(--font-headings)' }}>Porsche GT3 Weissach</h4>
              </div>
            </div>

            <div style={{ borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.08)', position: 'relative', aspectRatio: '16/10' }}>
              <img src="/img_black_paint.png" alt="Black paint correction and polishing" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px', background: 'linear-gradient(0deg, rgba(0,0,0,0.95) 0%, transparent 100%)', color: '#FFF' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-red)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Paint Correction</span>
                <h4 style={{ margin: '4px 0 0 0', fontSize: '1.05rem', fontFamily: 'var(--font-headings)' }}>Deep Reflection Restoration</h4>
              </div>
            </div>

            <div style={{ borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.08)', position: 'relative', aspectRatio: '16/10' }}>
              <img src="/img_leather.png" alt="Fine leather and interior decontamination" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px', background: 'linear-gradient(0deg, rgba(0,0,0,0.95) 0%, transparent 100%)', color: '#FFF' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-red)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Cabin Detail</span>
                <h4 style={{ margin: '4px 0 0 0', fontSize: '1.05rem', fontFamily: 'var(--font-headings)' }}>Premium Interior Rejuvenation</h4>
              </div>
            </div>

            <div style={{ borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.08)', position: 'relative', aspectRatio: '16/10' }}>
              <img src="/img_carbon.png" alt="Carbon fiber vehicle restoration details" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px', background: 'linear-gradient(0deg, rgba(0,0,0,0.95) 0%, transparent 100%)', color: '#FFF' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-red)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Restoration</span>
                <h4 style={{ margin: '4px 0 0 0', fontSize: '1.05rem', fontFamily: 'var(--font-headings)' }}>Exotic Carbon Accents</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DETAILING PROCESS */}
      <section className="detailing-process-section" style={{ padding: '80px 0', backgroundColor: '#050507', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
        <div className="site-container">
          <div className="process-intro" style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={{ color: 'var(--color-red)', fontSize: '0.85rem', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>THE PHILOSOPHY</span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', color: 'var(--color-white)', fontFamily: 'var(--font-headings)', textTransform: 'uppercase', margin: '0 auto 16px auto', maxWidth: '800px', lineHeight: 1.2 }}>
              We Don’t Chase Shine. We Chase Perfection.
            </h2>
            <p style={{ color: 'var(--color-steel)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
              Detailing is not a fast car wash. It is a highly disciplined preparation, correction, and finishing cycle.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.01)', border: '1px solid rgba(255, 255, 255, 0.05)', padding: '32px', borderRadius: '4px' }}>
              <span style={{ color: 'var(--color-red)', fontFamily: 'var(--font-headings)', fontSize: '1.5rem', fontWeight: 800, display: 'block', marginBottom: '16px' }}>01 / INSPECT & DECONTAMINATE</span>
              <p style={{ color: 'var(--color-steel)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                Every vehicle begins with deep chemical wash fallout removals, clay bar treatments to draw embedded particles out of clear coat pores, and digital paint depth inspection.
              </p>
            </div>

            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.01)', border: '1px solid rgba(255, 255, 255, 0.05)', padding: '32px', borderRadius: '4px' }}>
              <span style={{ color: 'var(--color-red)', fontFamily: 'var(--font-headings)', fontSize: '1.5rem', fontWeight: 800, display: 'block', marginBottom: '16px' }}>02 / CORRECT & REFINE</span>
              <p style={{ color: 'var(--color-steel)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                We execute measured compounding and polishing passes to level the clear coat, completely correcting swirl marks, microscopic weathering scratches, and oxidation haze.
              </p>
            </div>

            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.01)', border: '1px solid rgba(255, 255, 255, 0.05)', padding: '32px', borderRadius: '4px' }}>
              <span style={{ color: 'var(--color-red)', fontFamily: 'var(--font-headings)', fontSize: '1.5rem', fontWeight: 800, display: 'block', marginBottom: '16px' }}>03 / PROTECT & FINISH</span>
              <p style={{ color: 'var(--color-steel)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                We seal the corrected paintwork under chemically-bonded professional nano-ceramic coatings or physical paint protection film to secure long-term depth and hydrophobics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. QUOTE REQUEST FORM */}
      <section id="quote-section" className="quote-form-section" style={{padding: '100px 0', borderTop: '1px solid rgba(255, 255, 255, 0.05)'}}>
        <div className="quote-form-inner site-container quote-two-col">
          
          <div className="quote-contact-info-col">
            <div className="headline-accent-rule"></div>
            <h2 style={{ fontSize: 'clamp(36px, 5vw, 54px)', marginBottom: '1.5rem', color: 'var(--color-white)', fontFamily: 'var(--font-headings)', lineHeight: 1.1 }}>
              Request a Custom Quote
            </h2>
            <p style={{ color: 'var(--color-steel)', marginBottom: '2.5rem', fontSize: 'var(--fs-body)', lineHeight: '1.6' }}>
              Provide details about your vehicle's condition and protection goals. Detail Driven will review your request and contact you to coordinate options and studio availability.
            </p>
            
            <div className="quote-direct-contact">
              <p><strong>Call or Text:</strong> {businessInfo.phoneDisplay}</p>
              <p><strong>Email:</strong> {businessInfo.email}</p>
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
                    <label htmlFor="email">Email Address <span style={{ color: 'var(--color-steel)', fontSize: '0.8rem' }}>(Either email or phone is required)</span></label>
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
                    <label htmlFor="phone">Phone Number <span style={{ color: 'var(--color-steel)', fontSize: '0.8rem' }}>(Either email or phone is required)</span></label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(555) 000-0000" 
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

                  {/* Photo Attachments (max 3 files, combined size under 8MB) */}
                  <div className="form-group-field full-width-field" style={{ marginTop: '8px' }}>
                    <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>Upload Vehicle Photos <span style={{ color: 'var(--color-steel)', fontSize: '0.8rem' }}>(Optional, max 3 files)</span></span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-steel)' }}>Max total size: 8 MB</span>
                    </label>
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept=".jpg,.jpeg,.png,.webp"
                      multiple
                      style={{ display: 'none' }}
                    />
                    <button 
                      type="button" 
                      onClick={() => fileInputRef.current?.click()}
                      className="btn-secondary-header"
                      style={{ padding: '10px 16px', display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                      Select Files
                    </button>

                    {selectedFiles.length > 0 && (
                      <div className="selected-files-list" style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {selectedFiles.map((file, idx) => (
                          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.02)', padding: '6px 12px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)', fontSize: '0.9rem' }}>
                            <span style={{ color: 'var(--color-white)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '80%' }}>
                              {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                            </span>
                            <button 
                              type="button" 
                              onClick={() => removeFile(idx)} 
                              style={{ background: 'none', border: 'none', color: 'var(--color-red)', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', padding: '0 4px' }}
                              aria-label={`Remove ${file.name}`}
                            >
                              &times;
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Consent checkbox */}
                  <div className="form-group-field full-width-field" style={{ marginTop: '16px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <input 
                      type="checkbox" 
                      id="consent" 
                      name="consent" 
                      checked={formData.consent}
                      onChange={handleInputChange}
                      style={{ marginTop: '4px', cursor: 'pointer' }}
                      required
                    />
                    <label htmlFor="consent" style={{ fontSize: '0.9rem', color: 'var(--color-steel)', cursor: 'pointer', userSelect: 'none', lineHeight: '1.4' }}>
                      I agree that Detail Driven may contact me about this quote request. I understand that submitting this form does not confirm an appointment or final price. Understood in accordance with the <Link to="/privacy" target="_blank" style={{ color: 'var(--color-white)', textDecoration: 'underline' }}>Privacy Policy</Link>.
                    </label>
                  </div>
                </div>

                <div className="form-submit-block" style={{ marginTop: '24px' }}>
                  <button type="submit" className="btn-submit-form" disabled={submitting} style={{ opacity: submitting ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    {submitting ? 'SENDING REQUEST...' : 'REQUEST A CUSTOM QUOTE'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

// Router Root Layout Component
export default function App() {
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
