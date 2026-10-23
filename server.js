const http = require('http');
const fs = require('fs');
const path = require('path');
const port = Number(process.env.PORT || 3000);
const file = path.join('C:', 'devops-deploy', 'website', 'index.html');
http.createServer((req, res) => {
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(503); return res.end('Waiting for deployment'); }
    res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
    res.end(data);
  });
}).listen(port, '0.0.0.0', () => console.log(`Website: http://localhost:${port}`));
