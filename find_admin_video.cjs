const fs = require('fs');
const html = fs.readFileSync('admin.html', 'utf8');
const lines = html.split('\n');
lines.forEach((line, idx) => {
  if (line.toLowerCase().includes('video') && (line.toLowerCase().includes('id') || line.toLowerCase().includes('form') || line.toLowerCase().includes('add'))) {
    console.log(`${idx + 1}: ${line.trim()}`);
  }
});
