import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import { SEO } from '../components/SEO';

export default function Blog() {
  const featuredPost = blogPosts[0] || null;
  const gridPosts = blogPosts.slice(1);

  return (
    <main className="page-main-container" style={{ background: '#050507', minHeight: '80vh' }}>
      <SEO 
        title="Detail Driven Blog | Auto Detailing & Paint Care Insights"
        description="Read professional advice on paint correction, ceramic coatings, vehicle decontamination, and automotive detailing from Detail Driven Austin."
        path="/blog"
      />

      <section className="site-container" style={{ paddingTop: '120px', paddingBottom: '40px' }}>
        <span style={{ color: 'var(--color-red)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700, display: 'block', marginBottom: '12px', fontFamily: 'var(--font-headings)' }}>
          JOURNAL // INSIGHTS
        </span>
        <h1 style={{ fontFamily: 'var(--font-headings)', fontSize: 'clamp(40px, 6vw, 64px)', color: 'var(--color-white)', lineHeight: 1.1, marginBottom: '20px', textTransform: 'uppercase' }}>
          THE FINISH <br/><span style={{ color: 'var(--color-red)' }}>JOURNAL</span>
        </h1>
        <p style={{ color: 'var(--color-steel)', fontSize: '1.1rem', maxWidth: '600px', lineHeight: 1.6 }}>
          Professional insights, paint science, coating care guides, and detailing recommendations straight from our Austin studio.
        </p>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="site-container" style={{ paddingBottom: '60px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'center' }}>
            <div style={{ aspectRatio: '16/10', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.08)', background: '#111216' }}>
              <img 
                src={featuredPost.featuredImage} 
                alt={featuredPost.featuredImageAlt} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div>
              <span style={{ color: 'var(--color-red)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '12px', fontFamily: 'var(--font-headings)' }}>
                FEATURED &bull; {featuredPost.category}
              </span>
              <h2 style={{ fontFamily: 'var(--font-headings)', fontSize: 'clamp(28px, 4vw, 36px)', color: 'var(--color-white)', lineHeight: 1.2, marginBottom: '16px', textTransform: 'uppercase' }}>
                {featuredPost.title}
              </h2>
              <p style={{ color: 'var(--color-steel)', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '24px' }}>
                {featuredPost.description}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <Link to={`/blog/${featuredPost.slug}`} className="btn-primary-hero" style={{ textDecoration: 'none' }}>
                  Read Article
                </Link>
                <span style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.9rem' }}>{featuredPost.readTime}</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Grid Posts */}
      {gridPosts.length > 0 && (
        <section className="site-container" style={{ paddingBottom: '80px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '60px' }}>
          <h2 style={{ fontFamily: 'var(--font-headings)', color: 'var(--color-white)', fontSize: '1.8rem', marginBottom: '40px', textTransform: 'uppercase' }}>All Articles</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
            {gridPosts.map((post) => (
              <article key={post.slug} className="story-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden', background: 'rgba(255, 255, 255, 0.01)' }}>
                <div style={{ aspectRatio: '16/10', overflow: 'hidden', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', background: '#111216' }}>
                  <img 
                    src={post.featuredImage} 
                    alt={post.featuredImageAlt} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <span style={{ color: 'var(--color-red)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px', display: 'block', fontFamily: 'var(--font-headings)' }}>
                    {post.category}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-headings)', fontSize: '1.3rem', color: 'var(--color-white)', lineHeight: 1.3, marginBottom: '12px', textTransform: 'uppercase' }}>
                    {post.title}
                  </h3>
                  <p style={{ color: 'var(--color-steel)', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '20px', flexGrow: 1 }}>
                    {post.description}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    <Link to={`/blog/${post.slug}`} style={{ color: 'var(--color-white)', fontWeight: 'bold', fontSize: '0.9rem', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Read More &rarr;
                    </Link>
                    <span style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.85rem' }}>{post.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
