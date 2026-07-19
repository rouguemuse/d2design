import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export default function NotFound() {
  useEffect(() => {
    // Add noindex tag to head
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', 'noindex, nofollow');

    return () => {
      // Remove it when leaving 404
      if (metaRobots) {
        metaRobots.setAttribute('content', 'index, follow');
      }
    };
  }, []);

  return (
    <main className="page-main-container" style={{ background: '#050507', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <SEO 
        title="Page Not Found | Detail Driven"
        description="The page you are looking for does not exist."
        path="/404"
      />
      
      <section className="site-container" style={{ textAlign: 'center', padding: '100px 20px', maxWidth: '600px' }}>
        <h1 style={{ fontFamily: 'var(--font-headings)', fontSize: '5rem', marginBottom: '1rem', color: 'var(--color-red)' }}>404</h1>
        <h2 style={{ fontFamily: 'var(--font-headings)', color: 'var(--color-white)', fontSize: '1.8rem', marginBottom: '1.5rem', textTransform: 'uppercase' }}>Page Not Found</h2>
        <p style={{ color: 'var(--color-steel)', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2.5rem' }}>
          We can't find the page you're looking for. It may have been moved, renamed, or is temporarily unavailable.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn-primary-hero" style={{ textDecoration: 'none' }}>Go Home</Link>
          <Link to="/blog" className="link-quiet-hero" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', fontWeight: 'bold', color: '#FFF' }}>Read Blog</Link>
          <Link to="/ddtv" className="link-quiet-hero" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', fontWeight: 'bold', color: '#FFF' }}>Watch DD TV</Link>
        </div>
      </section>
    </main>
  );
}
