import React, { useState } from 'react';
import { SEO } from '../components/SEO';

interface Video {
  id: string;
  youtubeId: string;
  title: string;
  category: string;
  duration: string;
  description: string;
}

const ddtvVideos: Video[] = [
  {
    id: 'vid-1',
    youtubeId: 'voPqfGSQp0I',
    title: 'Paint & Aesthetics: The Last Thing On The Dealer’s Mind | Porsche GT3 Weissach New Delivery Detail',
    category: 'detail',
    duration: '14:20',
    description: 'A deep-dive detailing walkthrough of a brand new Porsche GT3 Weissach. We inspect clear coat defects straight from transport and restore it to a mirror finish.'
  },
  {
    id: 'vid-2',
    youtubeId: 'DtfwRGnUyNo',
    title: '18 Years of Oxidation & Swirl Marks - Porsche Cayman Paint Correction',
    category: 'correction',
    duration: '18:45',
    description: 'Watch the transformation of a heavily swirled and oxidized Porsche Cayman clear coat. Multi-stage correction restores depth, clarity, and reflection.'
  },
  {
    id: 'vid-3',
    youtubeId: 'FFYJVuMa_qE',
    title: 'Satin Paint Requires Different Care | Range Rover Long Wheelbase',
    category: 'ceramic',
    duration: '10:15',
    description: 'Satin and matte paint finishes require specialized care. We walk through decontamination, wash technique, and satin-specific ceramic coatings on a Range Rover.'
  }
];

export default function DDTV() {
  const [activeVideo, setActiveVideo] = useState<Video>(ddtvVideos[0]);
  const [filter, setFilter] = useState('all');

  const filteredVideos = filter === 'all' 
    ? ddtvVideos 
    : ddtvVideos.filter((v) => v.category === filter);

  return (
    <main className="page-main-container" style={{ background: '#050507', minHeight: '80vh' }}>
      <SEO 
        title="Detail Driven TV | Precision Detailing & Correction Videos"
        description="Watch behind-the-scenes paint correction, ceramic coating applications, and exotic car details from our Austin studio."
        canonicalPath="/ddtv"
      />

      {/* Intro */}
      <section className="site-container" style={{ paddingTop: '120px', paddingBottom: '40px' }}>
        <span style={{ color: 'var(--color-red)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700, display: 'block', marginBottom: '12px', fontFamily: 'var(--font-headings)' }}>
          DD TV // PROCESS DEMONSTRATED
        </span>
        <h1 style={{ fontFamily: 'var(--font-headings)', fontSize: 'clamp(40px, 6vw, 64px)', color: 'var(--color-white)', lineHeight: 1.1, marginBottom: '20px', textTransform: 'uppercase' }}>
          WATCH &amp; <span style={{ color: 'var(--color-red)' }}>LEARN</span>
        </h1>
        <p style={{ color: 'var(--color-steel)', fontSize: '1.1rem', maxWidth: '600px', lineHeight: 1.6 }}>
          Paint correction in real time. Ceramic coating installs. Pro tips. See the craft behind every detailing detail we perform.
        </p>
      </section>

      {/* Featured Video */}
      <section className="site-container" style={{ paddingBottom: '60px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <span style={{ color: 'var(--color-red)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', fontFamily: 'var(--font-headings)' }}>
            Featured // Now Playing
          </span>
        </div>
        
        <div 
          style={{ width: '100%', aspectRatio: '16/9', background: '#09090A', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.08)', position: 'relative' }}
        >
          {/* Branded Fallback / Background Layer */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundImage: `url(https://img.youtube.com/vi/${activeVideo.youtubeId}/maxresdefault.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(9, 9, 10, 0.75)' }}></div>
            <div style={{ zIndex: 1, textAlign: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="var(--color-steel)" stroke="none" style={{ opacity: 0.5, marginBottom: '16px' }}><polygon points="5 3 19 12 5 21 5 3"/></svg>
              <p style={{ color: 'var(--color-steel)', fontFamily: 'var(--font-headings)', fontSize: '1.25rem' }}>Video Loading</p>
            </div>
          </div>
          
          <iframe 
            src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=0&rel=0`}
            title={activeVideo.title}
            style={{ width: '100%', height: '100%', border: 'none', position: 'relative', zIndex: 2 }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div style={{ marginTop: '24px' }}>
          <h2 style={{ fontFamily: 'var(--font-headings)', fontSize: 'clamp(20px, 3.5vw, 28px)', color: 'var(--color-white)', marginBottom: '12px', textTransform: 'uppercase', lineHeight: '1.2' }}>
            {activeVideo.title}
          </h2>
          <p style={{ color: 'var(--color-steel)', fontSize: '1.05rem', lineHeight: '1.6', maxWidth: '800px' }}>
            {activeVideo.description}
          </p>
        </div>
      </section>

      {/* Categories & Listing */}
      <section className="site-container" style={{ paddingBottom: '80px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '40px' }}>
          <h2 style={{ fontFamily: 'var(--font-headings)', color: 'var(--color-white)', fontSize: '1.8rem', textTransform: 'uppercase', margin: 0 }}>Browse Videos</h2>
          
          {/* Filters */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {['all', 'detail', 'correction', 'ceramic'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: filter === cat ? 'var(--color-red)' : 'rgba(255, 255, 255, 0.03)',
                  border: filter === cat ? '1px solid var(--color-red)' : '1px solid rgba(255, 255, 255, 0.08)',
                  color: filter === cat ? '#FFFFFF' : 'var(--color-steel)',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat === 'all' ? 'Show All' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Video Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
          {filteredVideos.map((vid) => (
            <div 
              key={vid.id} 
              onClick={() => {
                setActiveVideo(vid);
                window.scrollTo({ top: 300, behavior: 'smooth' });
              }}
              style={{
                cursor: 'pointer',
                borderRadius: '4px',
                overflow: 'hidden',
                border: activeVideo.id === vid.id ? '1px solid var(--color-red)' : '1px solid rgba(255, 255, 255, 0.08)',
                background: 'rgba(255, 255, 255, 0.01)',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}
              className="gateway-card"
            >
              <div style={{ position: 'relative', aspectRatio: '16/10', background: '#111216', overflow: 'hidden' }}>
                <img 
                  src={`https://img.youtube.com/vi/${vid.youtubeId}/mqdefault.jpg`} 
                  alt={vid.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#FFFFFF" stroke="none" style={{ marginLeft: '2px' }}><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  </div>
                </div>
                <span style={{ position: 'absolute', bottom: '8px', right: '8px', backgroundColor: 'rgba(0,0,0,0.8)', padding: '2px 6px', borderRadius: '2px', fontSize: '0.75rem', color: '#FFF', fontWeight: 600 }}>
                  {vid.duration}
                </span>
              </div>
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <span style={{ color: 'var(--color-red)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px', display: 'block', fontFamily: 'var(--font-headings)' }}>
                  {vid.category}
                </span>
                <h3 style={{ fontFamily: 'var(--font-headings)', fontSize: '1.15rem', color: 'var(--color-white)', lineHeight: 1.3, margin: 0, textTransform: 'uppercase' }}>
                  {vid.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
