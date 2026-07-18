const fs = require('fs');

let tsconfig = fs.readFileSync('tsconfig.app.json', 'utf8');
tsconfig = tsconfig.replace(/"noUnusedLocals":\s*true/, '"noUnusedLocals": false');
tsconfig = tsconfig.replace(/"noUnusedParameters":\s*true/, '"noUnusedParameters": false');

fs.writeFileSync('tsconfig.app.json', tsconfig, 'utf8');
