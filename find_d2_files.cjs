const fs = require('fs');
const files = fs.readdirSync('C:/Users/rougu/Downloads');
files.forEach(file => {
  if (file.toLowerCase().includes('d2') || file.toLowerCase().includes('hero') || file.toLowerCase().includes('poster')) {
    console.log(file);
  }
});
