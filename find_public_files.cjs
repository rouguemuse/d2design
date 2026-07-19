const fs = require('fs');
function walk(dir) {
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = dir + '/' + file;
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      walk(filePath);
    } else {
      console.log(filePath);
    }
  });
}
walk('public');
