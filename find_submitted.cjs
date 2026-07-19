const fs = require('fs');
const tsx = fs.readFileSync('src/App.tsx', 'utf8');
const lines = tsx.match(/submitted/gi);
console.log('Matches:', lines);
const lineArray = tsx.split('\n');
lineArray.forEach((line, idx) => {
  if (line.includes('submitted') || line.includes('Submitted')) {
    console.log(`${idx+1}: ${line.trim()}`);
  }
});
