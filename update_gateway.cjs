const fs = require('fs');
let css = fs.readFileSync('src/App.css', 'utf8');

const target = `@media (max-width: 1200px) and (min-width: 769px) {
  .gateway-grid {
    grid-template-columns: repeat(6, 1fr);
  }
  .gateway-card:nth-child(1),
  .gateway-card:nth-child(2),
  .gateway-card:nth-child(3) {
    grid-column: span 2;
  }
  .gateway-card:nth-child(4) {
    grid-column: 2 / span 2;
  }
  .gateway-card:nth-child(5) {
    grid-column: 4 / span 2;
  }
}`;

const replacement = `@media (max-width: 1200px) and (min-width: 769px) {
  .gateway-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .gateway-card {
    grid-column: auto;
  }
  .gateway-card:nth-child(5) {
    grid-column: span 2;
  }
}`;

css = css.replace(target, replacement);
fs.writeFileSync('src/App.css', css, 'utf8');
console.log('App.css updated to 2 columns on medium screen sizes.');
