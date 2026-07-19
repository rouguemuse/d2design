const fs = require('fs');
const tsx = fs.readFileSync('src/App.tsx', 'utf8');
const regex = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g;
const matches = tsx.match(regex);
console.log('Matches in App.tsx:', matches);
