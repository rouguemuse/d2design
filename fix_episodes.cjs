const fs = require('fs');
let fileContent = fs.readFileSync('src/pages/DDTV.tsx', 'utf8');

const newData = `const DEFAULT_TV_VIDEOS = [
  {
    id: 'vid-1',
    youtubeId: 'voPqfGSQp0I',
    title: 'Paint & Aesthetics: The Last Thing On The Dealer’s Mind | Porsche GT3 Weissach New Delivery Detail',
    category: 'detail',
    duration: '14:20',
    image: 'https://img.youtube.com/vi/voPqfGSQp0I/maxresdefault.jpg'
  },
  {
    id: 'vid-2',
    youtubeId: 'voPqfGSQp0I',
    title: 'Paint & Aesthetics: The Last Thing On The Dealer’s Mind | Porsche GT3 Weissach New Delivery Detail',
    category: 'ceramic',
    duration: '14:20',
    image: 'https://img.youtube.com/vi/voPqfGSQp0I/maxresdefault.jpg'
  },
  {
    id: 'vid-3',
    youtubeId: 'voPqfGSQp0I',
    title: 'Paint & Aesthetics: The Last Thing On The Dealer’s Mind | Porsche GT3 Weissach New Delivery Detail',
    category: 'correction',
    duration: '14:20',
    image: 'https://img.youtube.com/vi/voPqfGSQp0I/maxresdefault.jpg'
  }
];`;

fileContent = fileContent.replace(/const DEFAULT_TV_VIDEOS = \[\s*\{[\s\S]*?\];/, newData);

fs.writeFileSync('src/pages/DDTV.tsx', fileContent, 'utf8');
console.log("Updated videos");
