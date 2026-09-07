#!/usr/bin/env node
/* ==========================================================================
   ROMIX STUDIO — statik sayfa üreticisi

   Kullanım:  node build/build.js

   Ne yapar:
     1. build/content/* içindeki sayfa tanımlarından HTML dosyalarını üretir
     2. sitemap.xml'i üretilen sayfalardan otomatik oluşturur
     3. robots.txt'i tazeler
     4. build/keyword-map.md — anahtar kelime → URL eşlemesini yazar

   Ana sayfa (index.html) bu üreticinin dışında; kendi WebGL yapısı olduğu
   için elle bakımda tutuluyor. Sitemap'e elle ekleniyor.
   ========================================================================== */

'use strict';

const fs   = require('fs');
const path = require('path');

const { ORIGIN } = require('./site');
const T = require('./template');

const ROOT = path.join(__dirname, '..');

const services = require('./content/services');
const others   = require('./content/pages');

const pages = services.concat(others);


/* --- Ana sayfa: sitemap ve anahtar kelime haritası için kayıt ------------- */

const HOME_ENTRY = {
  path: '/',
  priority: '1.0',
  changefreq: 'monthly',
  keywords: {
    primary: 'Romix Studio',
    secondary: ['dijital tasarım stüdyosu', 'interaktif web sitesi', 'yazılım stüdyosu'],
    intent: 'Marka / gezinme — stüdyoyu ve işleri tanıma'
  },
  title: 'Romix Studio — İşler'
};


/* --- Dosya yolu ----------------------------------------------------------- */

function fileFor(page) {
  if (page.file) return page.file;                       // ör. 404.html
  return path.join(page.path.replace(/^\/|\/$/g, ''), 'index.html');
}

function write(rel, content) {
  const abs = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, content, 'utf8');
  return rel.replace(/\\/g, '/');
}


/* --- Sayfaları üret ------------------------------------------------------- */

const written = [];

pages.forEach((page) => {
  const rel = fileFor(page);
  write(rel, T.render(page));
  written.push({ rel: rel.replace(/\\/g, '/'), page: page });
});


/* --- sitemap.xml ---------------------------------------------------------- */

/* Öncelik, sayfanın site içindeki derinliğine ve türüne göre */
function priorityFor(p) {
  if (p.path === '/hizmetler/') return '0.9';
  if (p.path.indexOf('/blog/') === 0 && p.path !== '/blog/') return '0.6';
  if (p.path.indexOf('/projeler/') === 0 && p.path !== '/projeler/') return '0.6';
  const depth = p.path.split('/').filter(Boolean).length;
  return depth <= 1 ? '0.8' : '0.7';
}

const sitemapEntries = [
  { loc: ORIGIN + '/', changefreq: 'monthly', priority: '1.0' }
].concat(
  pages
    .filter((p) => p.sitemap !== false && !p.canonicalSkip)
    .map((p) => ({
      loc: ORIGIN + p.path,
      changefreq: p.path.indexOf('/blog/') === 0 ? 'monthly' : 'monthly',
      priority: priorityFor(p)
    }))
);

write('sitemap.xml',
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  sitemapEntries.map((e) =>
    '  <url>\n' +
    '    <loc>' + e.loc + '</loc>\n' +
    '    <changefreq>' + e.changefreq + '</changefreq>\n' +
    '    <priority>' + e.priority + '</priority>\n' +
    '  </url>'
  ).join('\n') + '\n' +
  '</urlset>\n'
);


/* --- robots.txt ----------------------------------------------------------- */

write('robots.txt',
  '# Romix Studio — https://www.romixspace.com\n' +
  '# Tüm genel içerik taranabilir. CSS, JS, görsel ve video engellenmiyor;\n' +
  '# sayfaların doğru işlenmesi için bunlara erişim gerekiyor.\n' +
  '\n' +
  'User-agent: *\n' +
  'Allow: /\n' +
  '\n' +
  '# Kaynak ve şablon dosyaları — yayınlanan sayfa değil\n' +
  'Disallow: /build/\n' +
  '\n' +
  'Sitemap: ' + ORIGIN + '/sitemap.xml\n'
);


/* --- Anahtar kelime haritası ---------------------------------------------- */

const kwRows = [HOME_ENTRY].concat(
  pages.filter((p) => p.keywords).map((p) => p)
);

write('build/keyword-map.md',
  '# Anahtar kelime → URL eşlemesi\n\n' +
  'Her URL’in tek bir birincil anahtar kelimesi var. Aynı kelime iki sayfaya\n' +
  'verilmiyor; bu, sayfaların birbiriyle yarışmasını (yamyamlık) önlüyor.\n\n' +
  '| URL | Birincil anahtar kelime | İkincil kelimeler | Arama niyeti |\n' +
  '| --- | --- | --- | --- |\n' +
  kwRows.map((p) =>
    '| `' + p.path + '` | **' + p.keywords.primary + '** | ' +
    p.keywords.secondary.join(', ') + ' | ' + p.keywords.intent + ' |'
  ).join('\n') + '\n'
);


/* --- Özet ----------------------------------------------------------------- */

console.log('Üretilen sayfalar (' + written.length + '):');
written.forEach((w) => console.log('  ' + w.rel));
console.log('\nsitemap.xml — ' + sitemapEntries.length + ' URL');
console.log('robots.txt — güncellendi');
console.log('build/keyword-map.md — ' + kwRows.length + ' satır');
