const https = require('https');
https.get('https://www.youtube.com/watch?v=voPqfGSQp0I', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const match = data.match(/<title>(.*?)<\/title>/);
    if(match) console.log("TITLE: " + match[1]);
  });
});
