const fs = require('fs');
let css = fs.readFileSync('src/App.css', 'utf8');

const newCSS = `

/* --- CHICAGO AUTO PROS INSPIRED LAYOUT --- */

/* 1. Full-Screen Hero */
.hero-fullscreen {
  position: relative;
  width: 100%;
  height: 90svh;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: var(--bg-dark);
}

.hero-fullscreen-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 1;
}

.hero-fullscreen-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(9, 9, 10, 1) 0%, rgba(9, 9, 10, 0.4) 50%, rgba(9, 9, 10, 0.7) 100%);
  z-index: 2;
}

.hero-fullscreen-content {
  position: relative;
  z-index: 3;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Header states */
.header-transparent {
  position: absolute !important;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background: transparent !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: none !important;
}

.header-solid {
  position: fixed !important;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background: rgba(9, 9, 10, 0.95) !important;
  border-bottom: 1px solid var(--glass-border) !important;
  backdrop-filter: blur(12px) !important;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from { transform: translateY(-100%); }
  to { transform: translateY(0); }
}

/* Image-led Gateway */
.gateway-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 40px;
}

.gateway-card {
  position: relative;
  aspect-ratio: 4/5;
  background-color: var(--surface-elevated);
  border: 1px solid var(--glass-border);
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  cursor: pointer;
  transition: border-color 0.3s ease;
}

.gateway-card:hover {
  border-color: var(--color-red);
}

.gateway-card-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  opacity: 0.6;
  transition: transform 0.6s ease, opacity 0.3s ease;
}

.gateway-card:hover .gateway-card-img {
  transform: scale(1.05);
  opacity: 0.8;
}

.gateway-card-content {
  position: relative;
  z-index: 2;
  padding: 32px 24px;
  background: linear-gradient(to top, rgba(9,9,10,1) 0%, rgba(9,9,10,0) 100%);
}

.gateway-card h3 {
  font-family: var(--font-headings);
  font-size: 1.5rem;
  color: var(--color-white);
  margin-bottom: 8px;
  text-transform: uppercase;
}

.gateway-card p {
  font-family: var(--font-supporting);
  font-size: 0.95rem;
  color: var(--color-steel);
  margin-bottom: 16px;
}

/* Storytelling Sections */
.story-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: stretch;
  background: var(--bg-dark);
  min-height: 60vh;
}

.story-section.reverse {
  /* Copy left, Image right */
}

.story-image-col {
  position: relative;
  min-height: 400px;
}

.story-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.story-copy-col {
  padding: 8vw 6vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.story-highlights {
  list-style: none;
  padding: 0;
  margin: 24px 0;
}

.story-highlights li {
  color: var(--color-white);
  font-family: var(--font-supporting);
  font-size: 1.05rem;
  padding-left: 24px;
  position: relative;
  margin-bottom: 12px;
}

.story-highlights li::before {
  content: "—";
  color: var(--color-red);
  position: absolute;
  left: 0;
}

/* Mobile Overrides */
@media (max-width: 992px) {
  .hero-fullscreen {
    height: auto;
    padding-top: 120px;
    padding-bottom: 80px;
  }
  
  .header-transparent, .header-solid {
    position: static !important;
    animation: none !important;
    background: rgba(9, 9, 10, 1) !important;
  }
  
  .story-section {
    grid-template-columns: 1fr;
    min-height: auto;
  }
  
  .story-section.reverse .story-image-col {
    order: -1;
  }
  
  .story-image-col {
    aspect-ratio: 16/9;
    min-height: auto;
  }
  
  .story-copy-col {
    padding: 10vw 5vw;
  }
  
  .gateway-grid {
    grid-template-columns: 1fr;
  }
  .gateway-card {
    aspect-ratio: 16/9;
  }
}

`;

css += newCSS;
fs.writeFileSync('src/App.css', css, 'utf8');
console.log("App.css updated with new structures.");
