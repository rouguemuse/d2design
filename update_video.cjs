const fs = require('fs');
let fileContent = fs.readFileSync('src/pages/DDTV.tsx', 'utf8');

fileContent = fileContent.replace(
    /youtubeId:\s*'qAHEZl-L39w'/,
    "youtubeId: 'voPqfGSQp0I'"
);

// I'll also just replace the second and third with the same ID so they all work for now as a demo
fileContent = fileContent.replace(
    /youtubeId:\s*'l1r4fK6_L2A'/,
    "youtubeId: 'voPqfGSQp0I'"
);
fileContent = fileContent.replace(
    /youtubeId:\s*'e8i5cQ-u3E4'/,
    "youtubeId: 'voPqfGSQp0I'"
);

fs.writeFileSync('src/pages/DDTV.tsx', fileContent, 'utf8');
console.log("Updated video IDs in DDTV.tsx");
