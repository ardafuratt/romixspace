#!/usr/bin/env node
/* ==========================================================================
   ROMIX STUDIO — yayın öncesi denetim

   Kullanım:  node build/check.js

   Kontroller:
     · her iç bağlantının karşılığı bir dosya mı
     · canonical www'lu ve sayfanın kendi adresi mi
     · başlık ve açıklama benzersiz mi, uzunlukları makul mü
     · sayfa başına tam bir h1 var mı
     · her img'de alt var mı, boyut verilmiş mi
     · JSON-LD geçerli mi
     · sitemap'teki her adres bir dosyaya karşılık geliyor mu
     · eski adreslere (hizmetler.html, www'suz) atıf kalmış mı
   ========================================================================== */

'use strict';

const fs   = require('fs');
const path = require('path');

const ROOT   = path.join(__dirname, '..');
const ORIGIN = 'https://www.romixspace.com';
const SKIP   = new Set(['.git', 'build', 'node_modules']);

const problems = [];
const warnings = [];
const fail = (f, m) => problems.push(f + ' — ' + m);
const warn = (f, m) => warnings.push(f + ' — ' + m);

function walk(dir, out) {
  out = out || [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

/* Bir URL yolunun karşılığı olan dosya var mı? */
function resolves(urlPath) {
  const clean = urlPath.split('#')[0].split('?')[0];
  if (!clean || clean === '/') return fs.existsSync(path.join(ROOT, 'index.html'));
  const rel = clean.replace(/^\//, '');
  if (fs.existsSync(path.join(ROOT, rel)) && fs.statSync(path.join(ROOT, rel)).isFile()) return true;
  return fs.existsSync(path.join(ROOT, rel, 'index.html')) ||
         fs.existsSync(path.join(ROOT, rel.replace(/\/$/, '') + '.html'));
}

const files = walk(ROOT);
const titles = new Map();
const descs  = new Map();
const seenPaths = [];

files.forEach((abs) => {
  const f = path.relative(ROOT, abs).replace(/\\/g, '/');
  const h = fs.readFileSync(abs, 'utf8');
  const is404 = f === '404.html';

  /* --- başlık --- */
  const title = (h.match(/<title>([\s\S]*?)<\/title>/) || [])[1];
  if (!title) fail(f, 'title yok');
  else {
    if (titles.has(title)) fail(f, 'title benzersiz değil, aynısı: ' + titles.get(title));
    titles.set(title, f);
    if (title.length > 65) warn(f, 'title ' + title.length + ' karakter (65+ kısalabilir)');
  }

  /* --- açıklama --- */
  const desc = (h.match(/<meta name="description" content="([\s\S]*?)">/) || [])[1];
  if (!desc) fail(f, 'meta description yok');
  else {
    if (descs.has(desc)) fail(f, 'description benzersiz değil, aynısı: ' + descs.get(desc));
    descs.set(desc, f);
    if (desc.length < 70 && !is404) warn(f, 'description kısa (' + desc.length + ')');
    if (desc.length > 170) warn(f, 'description uzun (' + desc.length + ')');
  }

  /* --- canonical --- */
  const canon = (h.match(/<link rel="canonical" href="([^"]+)"/) || [])[1];
  if (!canon) {
    if (!is404) fail(f, 'canonical yok');
  } else {
    if (canon.indexOf(ORIGIN) !== 0) fail(f, 'canonical www\'suz veya yanlış köken: ' + canon);
    const expected = f === 'index.html' ? '/' : '/' + f.replace(/index\.html$/, '');
    if (canon !== ORIGIN + expected) fail(f, 'canonical sayfanın adresiyle uyuşmuyor: ' + canon + ' ≠ ' + ORIGIN + expected);
    seenPaths.push(expected);
  }

  /* --- robots --- */
  const robots = (h.match(/<meta name="robots" content="([^"]+)"/) || [])[1] || '';
  if (is404 && robots.indexOf('noindex') === -1) fail(f, '404 sayfasında noindex yok');
  if (!is404 && robots.indexOf('noindex') > -1) fail(f, 'beklenmedik noindex');

  /* --- h1 --- */
  const h1s = h.match(/<h1[\s>]/g) || [];
  if (h1s.length !== 1) fail(f, 'h1 sayısı ' + h1s.length + ' (tam 1 olmalı)');

  /* --- başlık sırası: h2 öncesi h1 gelmeli --- */
  const firstH1 = h.search(/<h1[\s>]/);
  const firstH2 = h.search(/<h2[\s>]/);
  if (firstH2 > -1 && firstH1 > -1 && firstH2 < firstH1 && f !== 'index.html') {
    warn(f, 'h2, h1\'den önce geliyor');
  }

  /* --- görseller --- */
  (h.match(/<img[^>]*>/g) || []).forEach((img) => {
    if (!/\salt=/.test(img)) fail(f, 'alt niteliği olmayan img: ' + img.slice(0, 80));
    if (!/\swidth=/.test(img) || !/\sheight=/.test(img)) warn(f, 'boyutsuz img (CLS riski): ' + img.slice(0, 70));
  });

  /* --- JSON-LD --- */
  const ld = [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (!ld.length && !is404) warn(f, 'JSON-LD yok');
  ld.forEach((m) => {
    try { JSON.parse(m[1]); } catch (e) { fail(f, 'JSON-LD geçersiz: ' + e.message); }
  });

  /* --- iç bağlantılar --- */
  (h.match(/href="(\/[^"#][^"]*)"/g) || []).forEach((raw) => {
    const url = raw.slice(6, -1);
    if (!resolves(url)) fail(f, 'kırık iç bağlantı: ' + url);
  });

  /* --- eski adres kalıntıları --- */
  if (/hizmetler\.html/.test(h)) fail(f, 'eski adrese atıf: hizmetler.html');
  if (/https:\/\/romixspace\.com/.test(h)) fail(f, 'www\'suz mutlak adrese atıf');
  if (/href="(?!\/|https?:|mailto:|tel:|#)[^"]/.test(h) && f !== 'index.html') {
    warn(f, 'göreli bağlantı var (kök yollu olması tercih edilir)');
  }
});

/* --- sitemap --- */
const sm = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
locs.forEach((loc) => {
  if (loc.indexOf(ORIGIN) !== 0) fail('sitemap.xml', 'www\'suz adres: ' + loc);
  const p = loc.slice(ORIGIN.length);
  if (!resolves(p)) fail('sitemap.xml', 'karşılığı olmayan adres: ' + loc);
});
const inSitemap = new Set(locs.map((l) => l.slice(ORIGIN.length)));
seenPaths.forEach((p) => {
  if (p === '/404.html') return;                 // noindex, sitemap'e girmemeli
  if (!inSitemap.has(p)) warn('sitemap.xml', 'sitemap dışında kalan indekslenebilir sayfa: ' + p);
});
if (new Set(locs).size !== locs.length) fail('sitemap.xml', 'tekrar eden adres var');

/* --- rapor --- */
console.log('Taranan sayfa: ' + files.length + ' · sitemap: ' + locs.length + ' adres\n');
if (warnings.length) {
  console.log('UYARI (' + warnings.length + ')');
  warnings.forEach((w) => console.log('  · ' + w));
  console.log('');
}
if (problems.length) {
  console.log('HATA (' + problems.length + ')');
  problems.forEach((p) => console.log('  ✗ ' + p));
  process.exit(1);
}
console.log('Hata yok.');
