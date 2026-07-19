import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import { SEO } from '../components/SEO';

export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <main className="page-main-container">
        <section className="site-container" style={{ paddingTop: '100px', paddingBottom: '100px', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-headings)', color: 'var(--color-white)', fontSize: '2.5rem', marginBottom: '1.5rem' }}>Article Not Found</h1>
          <p style={{ color: 'var(--color-steel)', marginBottom: '2rem' }}>The article you are looking for does not exist or has been moved.</p>
          <Link to="/blog" className="btn-primary-hero" style={{ textDecoration: 'none', display: 'inline-block' }}>Back to Blog</Link>
        </section>
      </main>
    );
  }

  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "datePublished": post.publishedDate,
    "image": `https://www.d2autodetail.com\${post.featuredImage}`,
    "author": {
      "@type": "Organization",
      "name": "Detail Driven"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Detail Driven",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.d2autodetail.com/logo-light.svg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.d2autodetail.com/blog/\${post.slug}`
    }
  };

  return (
    <main className="page-main-container" style={{ background: '#050507', minHeight: '80vh' }}>
      <SEO 
        title={`\${post.title} | Detail Driven Blog`}
        description={post.description}
        path={`/blog/\${post.slug}`}
      />
      <script type="application/ld+json">
        {JSON.stringify(schemaJson)}
      </script>

      <section className="site-container" style={{ paddingTop: '120px', paddingBottom: '80px', maxWidth: '800px', margin: '0 auto' }}>
        <Link 
          to="/blog"
          className="btn-ghost"
          style={{ marginBottom: '24px', display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-white)', textDecoration: 'none', fontWeight: 600 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
          Back to Articles
        </Link>
        
        <div style={{ marginBottom: '40px' }}>
          <span style={{ color: 'var(--color-red)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', display: 'block', marginBottom: '12px', fontFamily: 'var(--font-headings)' }}>
            {post.category} &nbsp;|&nbsp; {post.readTime}
          </span>
          <h1 style={{ fontFamily: 'var(--font-headings)', fontSize: 'clamp(32px, 5vw, 48px)', color: 'var(--color-white)', lineHeight: 1.15, marginBottom: '24px', textTransform: 'uppercase' }}>
            {post.title}
          </h1>
          <span style={{ color: 'var(--color-steel)', display: 'block', marginBottom: '24px', fontSize: '0.95rem' }}>Published on {post.publishedDate}</span>
          <div 
            style={{ width: '100%', aspectRatio: '16/9', borderRadius: '4px', overflow: 'hidden', marginBottom: '32px', border: '1px solid rgba(255, 255, 255, 0.08)', background: '#111216' }}
          >
            <img 
              src={post.featuredImage} 
              alt={post.featuredImageAlt}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>

        <div 
          className="article-content"
          dangerouslySetInnerHTML={{ __html: post.body }}
          style={{ color: 'var(--color-steel)', fontSize: '1.1rem', lineHeight: '1.8' }}
        />
      </section>
    </main>
  );
}
