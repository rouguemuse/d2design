const fs = require('fs');
const css = fs.readFileSync('src/App.css', 'utf8');
const lines = css.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('header-brand-name') || line.includes('btn-secondary-header') || line.includes('header-tagline')) {
    console.log(`${idx + 1}: ${line.trim()}`);
  }
});
