const fs = require('fs');
const css = fs.readFileSync('src/App.css', 'utf8');
const lines = css.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('@import') || line.includes('--font') || line.includes('font-family')) {
    console.log(`${idx + 1}: ${line.trim()}`);
  }
});
