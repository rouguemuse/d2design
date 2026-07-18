const fs = require('fs');

let cssContent = fs.readFileSync('src/App.css', 'utf8');

// Update .hero-image-wrapper
const oldWrapperRule = `.hero-image-wrapper {
  position: relative;
  width: 100%;
  max-height: 540px;
  aspect-ratio: 4 / 5;
  border-radius: 4px; /* Subtle radius */
  overflow: hidden;
  border: 1px solid var(--glass-border);
  background-color: var(--surface-elevated);
}`;
const newWrapperRule = `.hero-image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 4px; /* Subtle radius */
  overflow: hidden;
  border: 1px solid var(--glass-border);
  background-color: var(--surface-elevated);
}`;

if (cssContent.includes(oldWrapperRule)) {
    cssContent = cssContent.replace(oldWrapperRule, newWrapperRule);
} else {
    // Fallback regex replacement
    cssContent = cssContent.replace(/\.hero-image-wrapper\s*\{[^}]+\}/, newWrapperRule);
}

// Update .hero-detailing-img
// It currently has aspect-ratio: 4 / 3; from my previous change.
const oldImgRule = `.hero-detailing-img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  object-position: center;
  display: block;
}`;
const newImgRule = `.hero-detailing-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}`;
if (cssContent.includes(oldImgRule)) {
    cssContent = cssContent.replace(oldImgRule, newImgRule);
} else {
    cssContent = cssContent.replace(/\.hero-detailing-img\s*\{[^}]+\}/, newImgRule);
}

// Update media query max-width for mobile
// It was:
// .hero-image-wrapper {
//   max-width: 400px;
//   margin-inline: auto;
// }
// I'll change it to max-width: 100%
const oldMobileWrapper = `.hero-image-wrapper {
    max-width: 400px;
    margin-inline: auto;
  }`;
const newMobileWrapper = `.hero-image-wrapper {
    width: 100%;
    margin-inline: auto;
  }`;
if (cssContent.includes(oldMobileWrapper)) {
    cssContent = cssContent.replace(oldMobileWrapper, newMobileWrapper);
} else {
    // If exact spacing is weird, do a regex replace
    cssContent = cssContent.replace(/\.hero-image-wrapper\s*\{\s*max-width:\s*400px;\s*margin-inline:\s*auto;\s*\}/, newMobileWrapper);
}


fs.writeFileSync('src/App.css', cssContent, 'utf8');
