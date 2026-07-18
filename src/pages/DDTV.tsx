import React, { useState } from 'react';

const DEFAULT_TV_VIDEOS = [
  {
    id: 'vid-1',
    youtubeId: 'voPqfGSQp0I',
    title: 'Full Exterior Wash & Certified Ceramic Coating Install',
    category: 'ceramic',
    duration: '14:20',
    image: '/new_hero_image.png'
  },
  {
    id: 'vid-2',
    youtubeId: 'voPqfGSQp0I',
    title: 'Restoring Swirl-Marked Black Paint // Step-by-Step Polish',
    category: 'correction',
    duration: '18:45',
    image: '/img_black_paint.png'
  },
  {
    id: 'vid-3',
    youtubeId: 'voPqfGSQp0I',
    title: 'Interior Deep Clean, Leather Restoration & Conditioning',
    category: 'detail',
    duration: '10:15',
    image: '/img_leather.png'
  }
];

export default function DDTV() {
  const [activeVideo, setActiveVideo] = useState(DEFAULT_TV_VIDEOS[0]);
  const [filter, setFilter] = useState('all');

  const filteredVideos = filter === 'all' 
    ? DEFAULT_TV_VIDEOS 
    : DEFAULT_TV_VIDEOS.filter(v => v.category === filter);

  return (
    <main className="page-main-container">
      {/* Intro */}
      <section className="site-container" style={{ paddingTop: '80px', paddingBottom: '40px' }}>
        <p style={{ color: 'var(--color-steel)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700, marginBottom: '12px', fontFamily: 'var(--font-technical)' }}>
          DD TV // 01
        </p>
        <h1 style={{ fontFamily: 'var(--font-headings)', fontSize: 'clamp(40px, 6vw, 64px)', color: 'var(--color-white)', lineHeight: 1.1, marginBottom: '20px' }}>
          Watch &amp; <br/><span style={{ color: 'var(--color-red)' }}>Learn</span>
        </h1>
        <p style={{ color: 'var(--color-steel)', fontSize: '1.1rem', maxWidth: '600px', lineHeight: 1.6 }}>
          Paint correction in real time. Ceramic coating installs. Pro tips. All the content you need to see the craft behind the detail.
        </p>
      </section>

      {/* Featured Video */}
      <section className="site-container" style={{ paddingBottom: '60px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <span style={{ color: 'var(--color-red)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
            Featured // Now Playing
          </span>
        </div>
        
        {/* We use a branded fallback approach instead of a broken iframe if the video is unavailable, but since we can't reliably detect iframe load failures client-side, we wrap the iframe with a solid dark theme. */}
        <div 
          style={{ width: '100%', aspectRatio: '16/9', background: '#09090A', borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--brand-card-border)', position: 'relative' }}
        >
          {/* Branded Fallback / Background Layer */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundImage: `url(${activeVideo.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(9, 9, 10, 0.75)' }}></div>
            <div style={{ zIndex: 1, textAlign: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="var(--color-steel)" stroke="none" style={{ opacity: 0.5, marginBottom: '16px' }}><polygon points="5 3 19 12 5 21 5 3"/></svg>
              <p style={{ color: 'var(--color-steel)', fontFamily: 'var(--font-headings)', fontSize: '1.25rem' }}>Video Coming Soon</p>
            </div>
          </div>
          
          {/* Actual Iframe (will cover the fallback if it loads successfully) */}
          <iframe 
            src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=0&rel=0`}
            title={activeVideo.title}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', zIndex: 2 }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          />
        </div>
        <h2 style={{ fontFamily: 'var(--font-headings)', fontSize: 'clamp(24px, 3.5vw, 36px)', color: 'var(--color-white)', marginTop: '24px', lineHeight: 1.2 }}>
          {activeVideo.title}
        </h2>
      </section>

      {/* Video Grid */}
      <section className="site-container" style={{ paddingBottom: '80px' }}>
        
        {/* Filter Bar */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
          {['all', 'correction', 'ceramic', 'detail'].map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                background: filter === cat ? 'var(--color-red)' : 'transparent',
                color: filter === cat ? '#fff' : 'var(--color-steel)',
                border: `1px solid ${filter === cat ? 'var(--color-red)' : 'var(--form-card-border)'}`,
                padding: '8px 16px',
                borderRadius: '4px',
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {cat === 'all' ? 'All Episodes' : cat === 'correction' ? 'Paint Correction' : cat === 'ceramic' ? 'Ceramic Coatings' : 'Full Details'}
            </button>
          ))}
        </div>

        {/* Videos */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          {filteredVideos.map(video => (
            <div 
              key={video.id}
              onClick={() => {
                setActiveVideo(video);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
              className="video-card-hover"
            >
              <div style={{ width: '100%', aspectRatio: '16/9', background: '#111216', borderRadius: '4px', overflow: 'hidden', position: 'relative', border: '1px solid var(--brand-card-border)', marginBottom: '16px' }}>
                <img 
                  src={video.image} 
                  alt={video.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} 
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).parentElement!.classList.add('img-fallback');
                  }}
                />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '48px', height: '48px', background: 'rgba(0,0,0,0.6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid rgba(255,255,255,0.2)' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#fff" stroke="none" style={{ marginLeft: '4px' }}><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  </div>
                </div>
                <span style={{ position: 'absolute', bottom: '8px', right: '8px', background: 'rgba(0,0,0,0.8)', color: '#fff', fontSize: '0.75rem', padding: '4px 8px', borderRadius: '2px', fontWeight: 600 }}>
                  {video.duration}
                </span>
              </div>
              <span style={{ color: 'var(--color-red)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
                {video.category}
              </span>
              <h3 style={{ fontFamily: 'var(--font-headings)', fontSize: '1.15rem', color: 'var(--color-white)', lineHeight: 1.3 }}>
                {video.title}
              </h3>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
