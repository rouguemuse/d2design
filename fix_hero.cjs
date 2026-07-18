const fs = require('fs');
let cssContent = fs.readFileSync('src/App.css', 'utf8');

const heroWrapperCSS = `
.hero-image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid var(--glass-border);
  background-color: var(--bg-dark);
  height: auto;
  min-height: auto;
  max-height: none;
  padding-bottom: 0;
}
.hero-detailing-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  display: block;
}
`;

cssContent += '\n' + heroWrapperCSS;
fs.writeFileSync('src/App.css', cssContent, 'utf8');
