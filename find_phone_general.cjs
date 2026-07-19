const fs = require('fs');
const files = ['src/App.tsx', 'public/cms.js', 'admin.html', 'cms.js'];
files.forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');
    lines.forEach((line, idx) => {
      if (line.includes('512') || line.includes('Phone') || line.includes('Inquiry') || line.includes('contact@')) {
        console.log(`${file}:${idx+1} -> ${line.trim()}`);
      }
    });
  }
});
