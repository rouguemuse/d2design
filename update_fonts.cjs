const fs = require('fs');

// 1. Update index.html
let html = fs.readFileSync('index.html', 'utf8');

const oldFonts = `<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&family=Manrope:wght@400;500;600;700&family=Rajdhani:wght@600;700&display=swap" rel="stylesheet" />`;
const newFonts = `<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />`;

if(html.includes(oldFonts)) {
    html = html.replace(oldFonts, newFonts);
} else {
    html = html.replace(/<link href="https:\/\/fonts\.googleapis\.com\/css2\?[^"]+" rel="stylesheet" \/>/, newFonts);
}
fs.writeFileSync('index.html', html, 'utf8');

// 2. Update App.css
let css = fs.readFileSync('src/App.css', 'utf8');

css = css.replace(/--font-headings:\s*[^;]+;/, `--font-headings: 'Outfit', system-ui, -apple-system, sans-serif;`);
css = css.replace(/--font-supporting:\s*[^;]+;/, `--font-supporting: 'Inter', system-ui, -apple-system, sans-serif;`);

// ensure body uses Inter if it was using Manrope directly
css = css.replace(/font-family:\s*'Manrope'[^;]*;/g, `font-family: var(--font-supporting);`);
css = css.replace(/font-family:\s*'Rajdhani'[^;]*;/g, `font-family: var(--font-supporting);`);
css = css.replace(/font-family:\s*'Montserrat'[^;]*;/g, `font-family: var(--font-headings);`);

fs.writeFileSync('src/App.css', css, 'utf8');

console.log("Font pairing updated.");
