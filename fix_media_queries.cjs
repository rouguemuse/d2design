const fs = require('fs');
let css = fs.readFileSync('src/App.css', 'utf8');

// We need to find the definition of .gateway-grid and the media queries for it
// Let's replace the whole section from /* Image-led Gateway */ to the end of the file with the corrected responsive layout
const startIndex = css.indexOf('/* Image-led Gateway */');
if (startIndex !== -1) {
  css = css.substring(0, startIndex);
}

const cleanSection = `/* Image-led Gateway */
.gateway-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
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
  box-sizing: border-box;
}

.story-image-col {
  position: relative;
  min-height: 500px;
}

.story-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.story-copy-col {
  box-sizing: border-box;
  padding: clamp(32px, 6vw, 96px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
}

.story-copy-container {
  max-width: 500px;
  width: 100%;
  box-sizing: border-box;
}

.story-section:not(.reverse) .story-copy-container {
  margin-left: 0;
  margin-right: auto;
}

.story-section.reverse .story-copy-container {
  margin-left: auto;
  margin-right: 0;
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

/* Responsive Grid Arrangements */
@media (max-width: 1200px) {
  .gateway-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .gateway-card:nth-child(5) {
    grid-column: span 2;
  }
}

@media (max-width: 768px) {
  .gateway-grid {
    grid-template-columns: 1fr;
  }
  .gateway-card {
    grid-column: auto !important;
    aspect-ratio: 16/9;
  }
}

/* General Mobile Overrides */
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
    display: flex;
    flex-direction: column;
    min-height: auto;
  }
  
  .story-copy-col {
    order: 1; /* Copy always first on mobile */
    padding: 10vw 5vw;
  }
  
  .story-image-col {
    order: 2; /* Image always second on mobile */
    aspect-ratio: 16/9;
    min-height: auto;
  }
}
`;

css += cleanSection;
fs.writeFileSync('src/App.css', css, 'utf8');
console.log('App.css updated with responsive mobile stacked settings.');
