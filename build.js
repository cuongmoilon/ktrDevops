const fs = require('fs');
const path = require('path');
const source = path.join(__dirname, 'index.html');
if (!fs.existsSync(source)) throw new Error('BUILD FAILED: missing index.html');
fs.mkdirSync(path.join(__dirname, 'dist'), { recursive: true });
fs.copyFileSync(source, path.join(__dirname, 'dist', 'index.html'));
console.log('BUILD SUCCESS');
