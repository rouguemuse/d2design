const fs = require('fs');
let css = fs.readFileSync('src/App.css', 'utf8');

// The current --fs-h1 is clamp(38px, 5vw, 56px);
css = css.replace(/--fs-h1:\s*clamp\([^)]+\);/, '--fs-h1: clamp(28px, 6vw, 56px);');

fs.writeFileSync('src/App.css', css, 'utf8');
console.log("H1 minimum font size reduced for mobile.");
