const fs = require('fs');
let appTsx = fs.readFileSync('src/App.tsx', 'utf8');

appTsx = appTsx.replace(
    /<img\s+src="\/background\.jpg"/,
    '<img src="/premium_detailing.png"'
);
appTsx = appTsx.replace(
    /alt="Black Corvette rear detail with D2 plate"/,
    'alt="Detailer working on car wheel"'
);

fs.writeFileSync('src/App.tsx', appTsx, 'utf8');
console.log("Hero image updated.");
