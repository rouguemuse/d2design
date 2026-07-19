import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export default function Privacy() {
  return (
    <main className="page-main-container" style={{ background: '#050507', minHeight: '80vh', color: 'var(--color-steel)' }}>
      <SEO 
        title="Privacy Policy | Detail Driven Austin"
        description="Detail Driven's Privacy Policy. Learn how we handle your contact information, vehicle details, and uploaded photographs securely."
        canonicalPath="/privacy"
      />
      
      <section className="site-container" style={{ paddingTop: '120px', paddingBottom: '80px', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'var(--font-headings)', color: 'var(--color-white)', fontSize: 'clamp(28px, 4vw, 40px)', marginBottom: '24px', textTransform: 'uppercase' }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '24px' }}>
          Last updated: July 19, 2026
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', lineHeight: '1.8', fontSize: '1.05rem' }}>
          <div>
            <h2 style={{ color: 'var(--color-white)', fontFamily: 'var(--font-headings)', fontSize: '1.5rem', marginBottom: '12px' }}>1. Information We Collect</h2>
            <p>
              When you request a quote on our website, we collect your name, phone number, email address, vehicle details (year, make, model), paint condition details or project goals, and any optional photographs of the vehicle you choose to upload.
            </p>
          </div>

          <div>
            <h2 style={{ color: 'var(--color-white)', fontFamily: 'var(--font-headings)', fontSize: '1.5rem', marginBottom: '12px' }}>2. How We Use Your Information</h2>
            <p>
              The information we collect is used solely to evaluate your vehicle's needs, prepare an accurate pricing estimate, and contact you regarding your request. We do not sell, rent, or share your contact details or vehicle data with third parties for marketing purposes.
            </p>
          </div>

          <div>
            <h2 style={{ color: 'var(--color-white)', fontFamily: 'var(--font-headings)', fontSize: '1.5rem', marginBottom: '12px' }}>3. Third-Party Services & Storage</h2>
            <p>
              We utilize <strong>FormSubmit</strong> to securely receive and route quote requests to our studio inbox. According to FormSubmit's policies, form submission text data is temporarily retained for up to 30 days. Uploaded vehicle photographs are processed directly to assist with paint and cabin inspection and are not shared or publicly indexed.
            </p>
          </div>

          <div>
            <h2 style={{ color: 'var(--color-white)', fontFamily: 'var(--font-headings)', fontSize: '1.5rem', marginBottom: '12px' }}>4. Consent & Opt-Out</h2>
            <p>
              By submitting our quote request form, you consent to Detail Driven contacting you regarding your vehicle. You can opt out of any subsequent communication at any time by replying to our email or text messages.
            </p>
          </div>

          <div>
            <h2 style={{ color: 'var(--color-white)', fontFamily: 'var(--font-headings)', fontSize: '1.5rem', marginBottom: '12px' }}>5. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
              <br />
              <strong>Email:</strong> contact@d2detaildriven.com
            </p>
          </div>
        </div>

        <div style={{ marginTop: '40px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '24px' }}>
          <Link to="/" className="btn-primary-hero" style={{ textDecoration: 'none', display: 'inline-block' }}>Back to Home</Link>
        </div>
      </section>
    </main>
  );
}
