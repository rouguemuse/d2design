const fs = require('fs');
const html = fs.readFileSync('admin.html', 'utf8');
const lines = html.split('\n');
lines.forEach((line, idx) => {
  if (line.toLowerCase().includes('blog') && (line.toLowerCase().includes('form') || line.toLowerCase().includes('save') || line.toLowerCase().includes('image'))) {
    console.log(`${idx + 1}: ${line.trim()}`);
  }
});
