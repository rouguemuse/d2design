const https = require('https');
const getTitle = (id) => new Promise((resolve) => {
  https.get('https://www.youtube.com/watch?v=' + id, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const match = data.match(/<title>(.*?)<\/title>/);
      resolve(match ? match[1] : 'YouTube Video');
    });
  });
});

Promise.all([getTitle('DtfwRGnUyNo'), getTitle('FFYJVuMa_qE')]).then(([t1, t2]) => {
  console.log('T1: ' + t1);
  console.log('T2: ' + t2);
});
