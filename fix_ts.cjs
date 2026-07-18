const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');
content = content.replace(
  "const handleScrollToForm = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {",
  "const handleScrollToForm = (e: React.MouseEvent<HTMLElement>) => {"
);
fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log("Typescript error fixed.");
