const fs = require('fs');
const tsx = fs.readFileSync('src/App.tsx', 'utf8');
const lines = tsx.split('\n');
lines.forEach((line, idx) => {
  if (line.toLowerCase().includes('success') || line.toLowerCase().includes('thank') || line.toLowerCase().includes('inquiry')) {
    console.log(`${idx+1}: ${line.trim()}`);
  }
});
