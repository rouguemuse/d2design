const fs = require('fs');
const path = require('path');

function search(dir) {
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    if (filePath.includes('node_modules') || filePath.includes('.git') || filePath.includes('.system_generated')) return;
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      search(filePath);
    } else if (stat && stat.isFile()) {
      if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.js') || filePath.endsWith('.html') || filePath.endsWith('.md')) {
        const content = fs.readFileSync(filePath, 'utf8');
        const regex = /(\+?\d{1,2}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
        const matches = content.match(regex);
        if (matches) {
          console.log(`${filePath} matches:`, matches);
        }
      }
    }
  });
}

search('.');
