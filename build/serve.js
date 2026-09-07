#!/usr/bin/env node
/* ==========================================================================
   ROMIX STUDIO — yerel önizleme sunucusu

   Kullanım:  node build/serve.js [port]

   Vercel'in davranışını taklit ediyor: dizinler index.html ile karşılanıyor,
   sondaki eğik çizgi zorunlu, bulunamayan adresler 404.html'e düşüyor ve
   vercel.json'daki kalıcı yönlendirmeler uygulanıyor.
   ========================================================================== */

'use strict';

const http = require('http');
const fs   = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PORT = Number(process.argv[2]) || 4321;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml':  'application/xml; charset=utf-8',
  '.txt':  'text/plain; charset=utf-8',
  '.jpg':  'image/jpeg',
  '.png':  'image/png',
  '.mp4':  'video/mp4',
  '.md':   'text/markdown; charset=utf-8'
};

const config = JSON.parse(fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf8'));
const redirects = new Map((config.redirects || []).map((r) => [r.source, r.destination]));

function send(res, code, body, type) {
  res.writeHead(code, { 'Content-Type': type || 'text/plain; charset=utf-8' });
  res.end(body);
}

http.createServer(function (req, res) {
  const url = decodeURIComponent(req.url.split('?')[0]);

  if (redirects.has(url)) {
    res.writeHead(308, { Location: redirects.get(url) });
    return res.end();
  }

  // Dosya uzantısı olmayan ve eğik çizgiyle bitmeyen adresler → eğik çizgili hâline
  if (!path.extname(url) && !url.endsWith('/')) {
    res.writeHead(308, { Location: url + '/' });
    return res.end();
  }

  let rel = url.replace(/^\/+/, '');
  if (!rel || rel.endsWith('/')) rel += 'index.html';

  const abs = path.join(ROOT, rel);
  if (!abs.startsWith(ROOT)) return send(res, 403, 'Forbidden');

  if (!fs.existsSync(abs) || fs.statSync(abs).isDirectory()) {
    const notFound = path.join(ROOT, '404.html');
    return fs.existsSync(notFound)
      ? send(res, 404, fs.readFileSync(notFound), TYPES['.html'])
      : send(res, 404, 'Not found');
  }

  send(res, 200, fs.readFileSync(abs), TYPES[path.extname(abs)] || 'application/octet-stream');
}).listen(PORT, function () {
  console.log('http://localhost:' + PORT + '/');
});
