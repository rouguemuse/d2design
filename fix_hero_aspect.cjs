const fs = require('fs');
let css = fs.readFileSync('src/App.css', 'utf8');

const fix = `
/* Fix tablet hero image scaling */
@media (max-width: 992px) {
  .hero-image-wrapper {
    aspect-ratio: 16 / 9 !important;
  }
}
@media (max-width: 480px) {
  .hero-image-wrapper {
    aspect-ratio: 3 / 2 !important;
  }
}
`;

css += '\n' + fix;
fs.writeFileSync('src/App.css', css, 'utf8');
console.log("Hero image aspect ratio fixed for tablet/mobile.");
