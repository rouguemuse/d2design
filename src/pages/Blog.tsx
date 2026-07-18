import React, { useState } from 'react';

const DEFAULT_BLOG_POSTS = [
  {
    id: 'post-1',
    num: '01',
    tag: 'Paint Correction',
    title: 'Why Paint Correction Must Come Before Every Ceramic Coating',
    excerpt: 'Ceramic coatings are permanent. That means whatever is under the coating stays there \u2014 forever. Here\'s the science behind why skipping correction is the most expensive mistake you can make.',
    readTime: '8 min read',
    date: 'July 9, 2026',
    image: '/img_black_paint.png',
    body: `<p>Ceramic coatings have revolutionized paint protection. A professionally applied nano-ceramic layer bonds chemically to your clear coat, creating a semi-permanent hydrophobic shell that repels water, resists UV, and maintains gloss for years. But there's a catch \u2014 and it's a big one.</p>
           <h3>Coatings Are Permanent. Defects Are Too.</h3>
           <p>Unlike wax or sealant, a ceramic coating cannot simply be washed off or buffed away. Once it cures, it becomes part of the paint's surface. That means every swirl mark, water spot, fine scratch, and hologram that existed before the coating went on will remain perfectly preserved underneath it \u2014 locked in, magnified by the very gloss you paid for.</p>
           <h3>The Magnification Effect</h3>
           <p>Ceramic coatings enhance depth and clarity dramatically. A corrected, defect-free surface looks astonishing under a coating. An uncorrected surface looks worse \u2014 because the high-gloss finish now amplifies every imperfection instead of hiding it the way older wax products did.</p>
           <h3>What Proper Correction Involves</h3>
           <p>A complete pre-coating correction process starts with a full decontamination \u2014 iron fallout removal, clay bar treatment, and a thorough wash. From there, we assess paint thickness with a digital gauge and inspect under high-intensity lighting. Depending on the severity of defects, we'll run single-stage or multi-stage machine polishing before a final IPA wipe-down to remove all residue. Only then does the coating go on.</p>
           <p>The result is a surface that's factory-smooth \u2014 or better \u2014 sealed beneath glass-like ceramic protection. That's the Detail Driven standard.</p>`
  },
  {
    id: 'post-2',
    num: '02',
    tag: 'Ceramic Coatings',
    title: 'How Long Do Ceramic Coatings Actually Last?',
    excerpt: 'Marketing says 5\u201310 years. Reality depends on prep, product, application, and maintenance. Here\'s an honest breakdown.',
    readTime: '6 min read',
    date: 'July 8, 2026',
    image: '/img_water_bead.png',
    body: `<p>If you've researched paint protection, you've likely seen bold claims. "Lifetime protection," "9H hardness," "10-year durability." But how long does a professional nano-ceramic coating actually last on a real-world vehicle?</p>
           <h3>The Simple Answer</h3>
           <p>A professional grade, multi-layer ceramic coating will realistically last between <strong>2 and 5 years</strong>. Any claims of "lifetime" or "10 years" without mandatory annual maintenance inspections are marketing exaggerations.</p>
           <h3>Key Factors Influencing Durability</h3>
           <ol>
             <li><strong>Surface Prep:</strong> A coating requires a chemically clean, bare paint surface to form a permanent bond. Any residual wax, polish oils, or microscopic contamination will block bonding, causing early failure.</li>
             <li><strong>Maintenance Wash Routine:</strong> Running a coated vehicle through abrasive automated car washes is the fastest way to micro-scratch and strip the coating. Only hand wash with pH-neutral soap.</li>
             <li><strong>Climate:</strong> Extreme heat, road salt, chemical fallout, and heavy UV exposure put more strain on the coating shell over time.</li>
           </ol>
           <p>With annual decontaminating washes and silica-based top-ups, keeping your coating performing at 100% gloss and water-beading for a full 5 years is easily achievable.</p>`
  },
  {
    id: 'post-3',
    num: '03',
    tag: 'Maintenance',
    title: 'The Right Way to Wash a Ceramic Coated Car',
    excerpt: 'Two-bucket method, pH-neutral soap, no automatic car washes. What you do after the coating is just as important as the coating itself.',
    readTime: '4 min read',
    date: 'July 5, 2026',
    image: '/premium_detailing.png',
    body: `<p>A ceramic coating makes your car incredibly easy to wash thanks to its self-cleaning, hydrophobic properties. However, it is not armor. Wash it incorrectly, and you will introduce swirl marks that can only be polished out by removing the coating.</p>
           <h3>The Golden Rule: No Automatic Car Washes</h3>
           <p>Avoid tunnel car washes with spinning brushes. These brushes collect dirt from every previous dirty vehicle and drag it across your paint like sandpaper. Touchless automatic washes are better, but use harsh high-alkaline chemicals that degrade the hydrophobic layer over time.</p>
           <p>Always hand wash using the two-bucket method to keep dirt separate from your clean wash mitt.</p>`
  }
];

export default function Blog() {
  const [activePost, setActivePost] = useState<typeof DEFAULT_BLOG_POSTS[0] | null>(null);
  const [nlEmail, setNlEmail] = useState('');
  const [nlStatus, setNlStatus] = useState<'idle' | 'submitted'>('idle');

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (nlEmail) {
      setNlStatus('submitted');
    }
  };

  const featuredPost = DEFAULT_BLOG_POSTS[0];
  const gridPosts = DEFAULT_BLOG_POSTS.slice(1);

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

      {/* Grid Posts */}
      <section className="site-container" style={{ paddingBottom: '80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {gridPosts.map(post => (
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
