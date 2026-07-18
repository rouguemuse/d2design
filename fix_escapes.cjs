const fs = require('fs');

function fixFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    
    // The previous agent likely escaped ` as \` and $ as \$
    // Let's use regex to replace \` with ` and \$ with $
    content = content.replace(/\\`/g, '`');
    content = content.replace(/\\\$/g, '$');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Fixed " + filePath);
}

fixFile('src/pages/DDTV.tsx');
fixFile('src/pages/Blog.tsx');
