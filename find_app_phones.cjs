const fs = require('fs');
const tsx = fs.readFileSync('src/App.tsx', 'utf8');
const lines = tsx.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('949') || line.includes('555') || line.includes('Phone') || line.includes('phone')) {
    console.log(`${idx+1}: ${line.trim()}`);
  }
});
