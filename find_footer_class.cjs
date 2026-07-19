const fs = require('fs');
const css = fs.readFileSync('src/App.css', 'utf8');
const lines = css.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('brand-footer-clean') || line.includes('brand-footer')) {
    console.log(`${idx + 1}: ${line.trim()}`);
  }
});
