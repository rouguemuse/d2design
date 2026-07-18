import React, { useState, useEffect } from 'react';

const getInitialPosts = () => {
  if (typeof window !== 'undefined' && (window as any).D2CMS) {
    return (window as any).D2CMS.getBlogPosts();
  }
  return [
    {
      id: 'post-1',
      num: '01',
      tag: 'Ceramic Coatings',
      title: 'What Is a Ceramic Coating? The Ultimate Protection Guide',
      excerpt: 'Learn what a ceramic coating actually is, how it protects your vehicle, and why it is the gold standard of modern paint protection.',
      readTime: '5 min read',
      date: 'July 18, 2026',
      image: '/img_water_bead.png',
      body: `<p>A ceramic coating is a liquid polymer that is professionally applied to the exterior of a vehicle. The coating chemically bonds with the vehicle's factory paint, creating a sacrificial layer of protection that doesn't wash away or require frequent reapplication like traditional wax or sealants.</p>
             <h3>How It Works</h3>
             <p>Typically composed of Silicon Dioxide (SiO2) or Silicon Carbide (SiC), these nano-coatings fill in the microscopic pores of your clear coat. When cured, it forms a flat, extremely hard protective glass-like barrier that is highly hydrophobic.</p>
             <h3>Core Benefits</h3>
             <ul>
               <li><strong>Hydrophobic Performance:</strong> Water, mud, and grime bead up and roll off with ease, making the washing process incredibly simple.</li>
               <li><strong>UV & Chemical Protection:</strong> Shields paint from harmful ultraviolet rays that cause fading and oxidation, while protecting against bird droppings, acid rain, and road salt.</li>
               <li><strong>Deep Mirror Gloss:</strong> Enhances the reflective properties of your paint, creating a high-gloss wet look.</li>
             </ul>
             <p>While a ceramic coating is not bulletproof armor (it will not prevent deep rock chips or heavy scratches), it is the ultimate shield for daily driving preservation. Contact Detail Driven to inquire about adding a ceramic coating to your vehicle.</p>`
    }
  ];
};

export default function Blog() {
  const [posts, setPosts] = useState(getInitialPosts());
  const [activePost, setActivePost] = useState<any>(null);
  const [nlEmail, setNlEmail] = useState('');
  const [nlStatus, setNlStatus] = useState<'idle' | 'submitted'>('idle');

  // Reactively sync with LocalStorage events
  useEffect(() => {
    const handleUpdate = () => {
      if ((window as any).D2CMS) {
        setPosts((window as any).D2CMS.getBlogPosts());
      }
    };
    window.addEventListener('d2_blog_updated', handleUpdate);
    return () => window.removeEventListener('d2_blog_updated', handleUpdate);
  }, []);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (nlEmail) {
      setNlStatus('submitted');
    }
  };

  const featuredPost = posts[0] || null;
  const gridPosts = posts.slice(1);

  if (activePost) {
    return (
      <main className="page-main-container">
        <section className="site-container" style={{ paddingTop: '80px', paddingBottom: '80px', maxWidth: '800px' }}>
          <button 
            onClick={() => setActivePost(null)}
            className="btn-ghost"
            style={{ marginBottom: '24px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
            Back to Articles
          </button>
          
          <div style={{ marginBottom: '40px' }}>
            <span style={{ color: 'var(--color-red)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
              {activePost.tag} &nbsp;|&nbsp; {activePost.readTime}
            </span>
            <h1 style={{ fontFamily: 'var(--font-headings)', fontSize: 'clamp(32px, 5vw, 48px)', color: 'var(--color-white)', lineHeight: 1.1, marginBottom: '24px' }}>
              {activePost.title}
            </h1>
            <div 
              style={{ width: '100%', aspectRatio: '16/9', borderRadius: '4px', overflow: 'hidden', marginBottom: '32px', border: '1px solid var(--brand-card-border)', background: '#111216' }}
            >
              <img 
                src={activePost.image} 
                alt={activePost.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).parentElement!.classList.add('img-fallback');
                }}
              />
            </div>
          </div>

          <div 
            className="article-content"
            dangerouslySetInnerHTML={{ __html: activePost.body }}
            style={{ color: 'var(--color-steel)', fontSize: '1.1rem', lineHeight: '1.8' }}
          />
        </section>
      </main>
    );
  }

  return (
    <main className="page-main-container">
      {/* Intro */}
      <section className="site-container" style={{ paddingTop: '80px', paddingBottom: '40px' }}>
        <p style={{ color: 'var(--color-steel)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700, marginBottom: '12px', fontFamily: 'var(--font-technical)' }}>
          THE BLOG // 01
        </p>
        <h1 style={{ fontFamily: 'var(--font-headings)', fontSize: 'clamp(40px, 6vw, 64px)', color: 'var(--color-white)', lineHeight: 1.1, marginBottom: '20px' }}>
          Detail Driven <br/><span style={{ color: 'var(--color-red)' }}>Knowledge</span>
        </h1>
        <p style={{ color: 'var(--color-steel)', fontSize: '1.1rem', maxWidth: '600px', lineHeight: 1.6 }}>
          Expert insights on paint correction, ceramic coatings, and professional automotive care to help you maintain your vehicle's pristine condition.
        </p>
      </section>

      {/* Featured Post */}
      {featuredPost && (
      <section className="site-container" style={{ paddingBottom: '60px' }}>
        <div 
          className="featured-post-card"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', background: 'var(--brand-card-bg)', border: '1px solid var(--brand-card-border)', borderRadius: '6px', overflow: 'hidden' }}
        >
          <div style={{ aspectRatio: '16/9', background: '#111216', position: 'relative' }}>
            <img 
              src={featuredPost.image} 
              alt={featuredPost.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).parentElement!.classList.add('img-fallback');
              }}
            />
          </div>
          <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ color: 'var(--color-red)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>
              {featuredPost.tag} &nbsp;|&nbsp; {featuredPost.readTime}
            </span>
            <h2 style={{ fontFamily: 'var(--font-headings)', fontSize: '2rem', color: 'var(--color-white)', lineHeight: 1.2, marginBottom: '16px' }}>
              {featuredPost.title}
            </h2>
            <p style={{ color: 'var(--color-steel)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '24px' }}>
              {featuredPost.excerpt}
            </p>
            <div>
              <button onClick={() => setActivePost(featuredPost)} className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                Read Article
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    )}

      {/* Grid Posts */}
      <section className="site-container" style={{ paddingBottom: '80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {gridPosts.map((post: any) => (
            <div 
              key={post.id}
              className="blog-grid-card"
              style={{ display: 'flex', flexDirection: 'column', background: 'var(--brand-card-bg)', border: '1px solid var(--brand-card-border)', borderRadius: '6px', overflow: 'hidden' }}
            >
              <div style={{ width: '100%', aspectRatio: '16/9', background: '#111216', position: 'relative' }}>
                <img 
                  src={post.image} 
                  alt={post.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).parentElement!.classList.add('img-fallback');
                  }}
                />
              </div>
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <span style={{ color: 'var(--color-steel)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
                  {post.tag} &nbsp;|&nbsp; {post.readTime}
                </span>
                <h3 style={{ fontFamily: 'var(--font-headings)', fontSize: '1.25rem', color: 'var(--color-white)', lineHeight: 1.3, marginBottom: '12px' }}>
                  {post.title}
                </h3>
                <p style={{ color: 'var(--color-steel)', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '24px', flexGrow: 1 }}>
                  {post.excerpt}
                </p>
                <button 
                  onClick={() => setActivePost(post)}
                  className="btn-ghost"
                  style={{ alignSelf: 'flex-start', padding: 0, height: 'auto', color: 'var(--color-white)' }}
                >
                  Read Article
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px' }}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="site-container" style={{ paddingBottom: '80px' }}>
        <div style={{ background: 'var(--form-card-bg)', border: '1px solid var(--form-card-border)', borderRadius: '6px', padding: '40px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-headings)', fontSize: '1.75rem', color: 'var(--color-white)', marginBottom: '12px' }}>
            Detail Driven Newsletter
          </h2>
          <p style={{ color: 'var(--color-steel)', marginBottom: '24px', fontSize: '1rem' }}>
            Join our mailing list to receive our latest articles and detailing tips directly in your inbox.
          </p>
          {nlStatus === 'submitted' ? (
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', color: 'var(--color-white)', fontWeight: 600 }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: '8px', color: '#10b981' }}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              Thank you for subscribing!
            </div>
          ) : (
            <form onSubmit={handleNewsletter} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', maxWidth: '400px', margin: '0 auto', justifyContent: 'center' }}>
              <input 
                type="email" 
                placeholder="your@email.com" 
                required 
                value={nlEmail}
                onChange={e => setNlEmail(e.target.value)}
                style={{ flexGrow: 1, minWidth: '200px', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--form-card-border)', background: 'var(--bg-dark)', color: 'var(--color-white)', fontFamily: 'var(--font-supporting)' }}
              />
              <button type="submit" className="btn-primary" style={{ padding: '12px 24px', borderRadius: '4px', border: 'none' }}>
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
