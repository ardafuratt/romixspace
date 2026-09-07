/* ==========================================================================
   ROMIX STUDIO — sayfa şablonu ve bölüm yardımcıları

   İçerik sayfalarının tamamı (hizmetler, projeler, blog, iletişim) buradan
   üretiliyor. Ana sayfa kendi WebGL yapısını koruduğu için ayrı tutuluyor.
   ========================================================================== */

const { ORIGIN, CONTACT, SAME_AS, NAV, OG_IMAGE, GOOGLE_SITE_VERIFICATION, wa } = require('./site');

/* --- Kaçış ---------------------------------------------------------------- */

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* Yapılandırılmış veriye giren metinden etiketleri temizle */
function plain(s) {
  return String(s).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

const url = (p) => ORIGIN + p;


/* --- Bölüm yardımcıları --------------------------------------------------- */

/* Madde listesi */
function ticks(items) {
  return '<ul class="ticks">' +
    items.map((i) => '<li>' + i + '</li>').join('') +
    '</ul>';
}

/* Kart ızgarası — { h3, p, ticks[] } */
function cards(list) {
  return '<div class="grid">' + list.map((c) =>
    '<article class="card">' +
      '<h3>' + esc(c.h3) + '</h3>' +
      (c.p ? '<p>' + c.p + '</p>' : '') +
      (c.ticks ? ticks(c.ticks) : '') +
    '</article>'
  ).join('') + '</div>';
}

/* Numaralı süreç adımları — { h3, p } */
function steps(list) {
  return '<div class="steps">' + list.map((s) =>
    '<div class="step"><div><h3>' + esc(s.h3) + '</h3><p>' + s.p + '</p></div></div>'
  ).join('') + '</div>';
}

/* Tablo — { caption, head[], rows[][] } (her satırın ilk hücresi başlık) */
function table(t) {
  return '<div class="table-wrap"><table>' +
    '<caption>' + esc(t.caption) + '</caption>' +
    '<thead><tr>' + t.head.map((h) => '<th scope="col">' + esc(h) + '</th>').join('') + '</tr></thead>' +
    '<tbody>' + t.rows.map((r) =>
      '<tr><th scope="row">' + esc(r[0]) + '</th>' +
      r.slice(1).map((c) => '<td>' + c + '</td>').join('') + '</tr>'
    ).join('') + '</tbody>' +
  '</table></div>';
}

/* Açılır SSS — { q, a } */
function faqBlock(list) {
  return '<div class="faq">' + list.map((f) =>
    '<details><summary>' + esc(f.q) + '</summary><p>' + f.a + '</p></details>'
  ).join('') + '</div>';
}

/* İlgili sayfa bağlantıları — iç bağlantı mimarisinin taşıyıcısı */
function relatedBlock(list) {
  return '<ul class="related">' + list.map((r) =>
    '<li><a href="' + r.path + '">' +
      '<span class="related-title">' + esc(r.title) + '</span>' +
      '<span class="related-desc">' + esc(r.desc) + '</span>' +
    '</a></li>'
  ).join('') + '</ul>';
}

/* Sayfa içi bölüm sarmalayıcı */
function section(o) {
  return '\n  <section' + (o.id ? ' id="' + o.id + '"' : '') + ' class="rise">\n' +
    '    <div class="wrap">\n' +
    (o.label ? '      <p class="label">' + esc(o.label) + '</p>\n' : '') +
    (o.h2 ? '      <h2>' + esc(o.h2) + '</h2>\n' : '') +
    '      ' + o.body + '\n' +
    '    </div>\n  </section>\n';
}

/* Kapanış çağrısı — her hizmet sayfasının sonunda */
function closing(o) {
  const msg = o.waText || 'Merhaba, Romix Studio — bir proje hakkında konuşmak istiyorum.';
  return '\n  <section id="iletisim" class="rise closing">\n' +
    '    <div class="wrap">\n' +
    '      <p class="label">İletişim</p>\n' +
    '      <h2>' + esc(o.h2 || 'Projenizi konuşalım') + '</h2>\n' +
    '      <p>' + o.p + '</p>\n' +
    '      <div class="cta-row">\n' +
    '        <a class="btn wa" href="' + esc(wa(msg)) + '" target="_blank" rel="noopener">WhatsApp’tan yazın</a>\n' +
    '        <a class="btn ghost" href="mailto:' + CONTACT.email + '?subject=' +
             encodeURIComponent('Romix Studio — ' + (o.subject || 'Proje talebi')) + '">E-posta gönderin</a>\n' +
    '      </div>\n' +
    '      <p class="contact-direct">\n' +
    '        <a href="tel:' + CONTACT.phone + '">' + CONTACT.phoneText + '</a>\n' +
    '        <span aria-hidden="true">·</span>\n' +
    '        <a href="mailto:' + CONTACT.email + '">' + CONTACT.email + '</a>\n' +
    '      </p>\n' +
    '    </div>\n  </section>\n';
}


/* --- Yapılandırılmış veri ------------------------------------------------- */

/* Tek bir Organization düğümü; tüm sayfalar buna @id ile bağlanıyor */
function orgNode() {
  return {
    '@type': 'Organization',
    '@id': url('/#studio'),
    name: 'Romix Studio',
    alternateName: 'Romix Space',
    description: 'Web sitesi tasarımı, mobil uygulama geliştirme ve iş süreçleri otomasyonu üzerine çalışan bağımsız dijital tasarım ve yazılım stüdyosu.',
    url: url('/'),
    logo: {
      '@type': 'ImageObject',
      '@id': url('/#logo'),
      url: url('/img/logo.png'),
      width: 179,
      height: 105
    },
    image: OG_IMAGE,
    email: CONTACT.email,
    telephone: CONTACT.phoneSchema,
    areaServed: { '@type': 'Country', name: 'Türkiye' },
    knowsLanguage: ['tr', 'en'],
    sameAs: SAME_AS,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: CONTACT.email,
      telephone: CONTACT.phoneSchema,
      availableLanguage: ['Turkish', 'English']
    }
  };
}

function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': url('/#website'),
    url: url('/'),
    name: 'Romix Studio',
    inLanguage: 'tr-TR',
    publisher: { '@id': url('/#studio') }
  };
}

function breadcrumbNode(page) {
  if (!page.crumbs || !page.crumbs.length) return null;
  return {
    '@type': 'BreadcrumbList',
    '@id': url(page.path) + '#crumbs',
    itemListElement: page.crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: url(c.path)
    }))
  };
}

function webPageNode(page) {
  const node = {
    '@type': page.pageType || 'WebPage',
    '@id': url(page.path) + '#page',
    url: url(page.path),
    name: page.title,
    description: page.description,
    inLanguage: 'tr-TR',
    isPartOf: { '@id': url('/#website') },
    about: { '@id': url('/#studio') },
    primaryImageOfPage: page.ogImage || OG_IMAGE
  };
  if (page.crumbs && page.crumbs.length) {
    node.breadcrumb = { '@id': url(page.path) + '#crumbs' };
  }
  return node;
}

function faqNode(page) {
  if (!page.faq || !page.faq.length) return null;
  return {
    '@type': 'FAQPage',
    '@id': url(page.path) + '#sss',
    mainEntity: page.faq.map((f) => ({
      '@type': 'Question',
      name: plain(f.q),
      acceptedAnswer: { '@type': 'Answer', text: plain(f.a) }
    }))
  };
}

function graphFor(page) {
  const nodes = [orgNode(), websiteNode(), webPageNode(page)];
  const bc = breadcrumbNode(page);
  if (bc) nodes.push(bc);
  const fq = faqNode(page);
  if (fq) nodes.push(fq);
  if (page.schema) nodes.push.apply(nodes, page.schema);
  return { '@context': 'https://schema.org', '@graph': nodes };
}


/* --- Head ----------------------------------------------------------------- */

function head(page) {
  const canonical = url(page.path);
  const ogImage = page.ogImage || OG_IMAGE;
  const css = page.css || '/css/page.css';

  return '<!DOCTYPE html>\n' +
'<html lang="tr">\n' +
'<head>\n' +
'<meta charset="utf-8">\n' +
'<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
'\n' +
'<title>' + esc(page.title) + '</title>\n' +
'<meta name="description" content="' + esc(page.description) + '">\n' +
/* 404 gibi indekslenmeyen sayfalara canonical konmuyor: gerçek bir adresi
   yok ve canonical vermek yanlış sinyal üretir. */
(page.canonicalSkip ? '' : '<link rel="canonical" href="' + canonical + '">\n') +
'<meta name="robots" content="' + (page.robots || 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1') + '">\n' +
'<meta name="theme-color" content="#000000">\n' +
'<meta name="author" content="Romix Studio">\n' +
'<meta name="google-site-verification" content="' + GOOGLE_SITE_VERIFICATION + '" />\n' +
'\n' +
'<link rel="icon" href="/img/logo.png" type="image/png">\n' +
'<link rel="apple-touch-icon" href="/img/logo.png">\n' +
'\n' +
'<meta property="og:type" content="' + (page.ogType || 'website') + '">\n' +
'<meta property="og:locale" content="tr_TR">\n' +
'<meta property="og:site_name" content="Romix Studio">\n' +
'<meta property="og:title" content="' + esc(page.ogTitle || page.title) + '">\n' +
'<meta property="og:description" content="' + esc(page.ogDescription || page.description) + '">\n' +
(page.canonicalSkip ? '' : '<meta property="og:url" content="' + canonical + '">\n') +
'<meta property="og:image" content="' + ogImage + '">\n' +
'<meta property="og:image:width" content="1600">\n' +
'<meta property="og:image:height" content="1000">\n' +
'<meta property="og:image:alt" content="' + esc(page.ogImageAlt || 'Romix Studio') + '">\n' +
'<meta name="twitter:card" content="summary_large_image">\n' +
'<meta name="twitter:title" content="' + esc(page.ogTitle || page.title) + '">\n' +
'<meta name="twitter:description" content="' + esc(page.ogDescription || page.description) + '">\n' +
'<meta name="twitter:image" content="' + ogImage + '">\n' +
'\n' +
'<link rel="preconnect" href="https://fonts.googleapis.com">\n' +
'<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
'<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600&display=swap" rel="stylesheet">\n' +
'<link rel="stylesheet" href="' + css + '">\n' +
'\n' +
'<script type="application/ld+json">\n' + JSON.stringify(graphFor(page), null, 2) + '\n</script>\n' +
'\n' +
'<!-- Belirme animasyonu yalnızca JavaScript varken uygulanır; kapalıyken\n' +
'     içerik gizlenmeden görünür kalır. -->\n' +
'<script>document.documentElement.className=\'js\';</script>\n' +
'</head>\n';
}


/* --- Üst çubuk ------------------------------------------------------------ */

function header(page) {
  const nav = NAV.map((n) => {
    // Alt sayfada da üst kategori işaretli kalsın (ör. /projeler/word-vortex/ → Projeler)
    const active = n.path === page.path ||
                   (n.path !== '/' && page.path.indexOf(n.path) === 0);
    return '<a href="' + n.path + '"' + (active ? ' aria-current="page"' : '') + '>' + esc(n.label) + '</a>';
  }).join('\n      ');

  return '<body>\n\n' +
'<a class="skip" href="#main">İçeriğe geç</a>\n\n' +
'<header class="topbar">\n' +
'  <div class="wrap topbar-in">\n' +
'    <a class="brand" href="/" aria-label="Romix Studio ana sayfa">\n' +
'      <img src="/img/logo.png" alt="" width="179" height="105" onerror="this.remove()">\n' +
'      <span>Romix Studio</span>\n' +
'    </a>\n' +
'    <nav class="topnav" aria-label="Ana menü">\n' +
'      ' + nav + '\n' +
'    </nav>\n' +
'  </div>\n' +
'</header>\n';
}


/* --- Kırıntı yolu --------------------------------------------------------- */

function crumbs(page) {
  if (!page.crumbs || page.crumbs.length < 2) return '';
  const last = page.crumbs.length - 1;
  const items = page.crumbs.map((c, i) =>
    i === last
      ? '<li><span aria-current="page">' + esc(c.name) + '</span></li>'
      : '<li><a href="' + c.path + '">' + esc(c.name) + '</a></li>'
  ).join('');
  return '  <nav class="crumbs" aria-label="Kırıntı yolu">\n' +
         '    <div class="wrap"><ol>' + items + '</ol></div>\n' +
         '  </nav>\n';
}


/* --- Giriş bloğu ---------------------------------------------------------- */

function hero(page) {
  let h = '  <div class="wrap hero">\n';
  if (page.label) h += '    <p class="label">' + esc(page.label) + '</p>\n';
  h += '    <h1>' + esc(page.h1) + '</h1>\n';
  if (page.lead) h += '    <p class="lead">' + page.lead + '</p>\n';

  if (page.cta !== false) {
    const msg = page.waText || 'Merhaba, Romix Studio — bir proje hakkında konuşmak istiyorum.';
    h += '    <div class="cta-row">\n' +
         '      <a class="btn wa" href="' + esc(wa(msg)) + '" target="_blank" rel="noopener">' +
              esc(page.ctaPrimary || 'WhatsApp’tan teklif alın') + '</a>\n' +
         '      <a class="btn ghost" href="' + (page.ctaSecondHref || '/hizmetler/#fiyatlar') + '">' +
              esc(page.ctaSecond || 'Fiyatları görün') + '</a>\n' +
         '    </div>\n';
  }

  if (page.stats) {
    h += '    <div class="stats">\n' + page.stats.map((s) =>
      '      <div class="stat"><b>' + esc(s.n) + '</b><span class="label">' + esc(s.l) + '</span></div>'
    ).join('\n') + '\n    </div>\n';
  }

  h += '  </div>\n';
  return h;
}


/* --- Alt bilgi ------------------------------------------------------------ */

function footer() {
  return '\n<footer>\n' +
'  <div class="wrap">\n' +
'    <div class="foot-cols">\n' +
'      <div class="foot-col">\n' +
'        <p class="label">Hizmetler</p>\n' +
'        <ul>\n' +
'          <li><a href="/web-tasarim/">Web tasarım</a></li>\n' +
'          <li><a href="/web-tasarim/kurumsal-web-tasarim/">Kurumsal web tasarım</a></li>\n' +
'          <li><a href="/web-tasarim/e-ticaret-web-tasarim/">E-ticaret sitesi</a></li>\n' +
'          <li><a href="/web-tasarim/yapay-zeka-ajanli-web-sitesi/">Yapay zekâ ajanlı site</a></li>\n' +
'        </ul>\n' +
'      </div>\n' +
'      <div class="foot-col">\n' +
'        <p class="label">Yazılım</p>\n' +
'        <ul>\n' +
'          <li><a href="/mobil-uygulama-gelistirme/">Mobil uygulama geliştirme</a></li>\n' +
'          <li><a href="/mobil-oyun-gelistirme/">Mobil oyun geliştirme</a></li>\n' +
'          <li><a href="/ozel-yazilim/">Özel yazılım geliştirme</a></li>\n' +
'        </ul>\n' +
'      </div>\n' +
'      <div class="foot-col">\n' +
'        <p class="label">Otomasyon</p>\n' +
'        <ul>\n' +
'          <li><a href="/otomasyon/">Otomasyon çözümleri</a></li>\n' +
'          <li><a href="/otomasyon/isletme-otomasyonu/">İşletme otomasyonu</a></li>\n' +
'          <li><a href="/otomasyon/yapay-zeka-otomasyonu/">Yapay zekâ otomasyonu</a></li>\n' +
'        </ul>\n' +
'      </div>\n' +
'      <div class="foot-col">\n' +
'        <p class="label">Stüdyo</p>\n' +
'        <ul>\n' +
'          <li><a href="/hakkimizda/">Hakkımızda</a></li>\n' +
'          <li><a href="/projeler/">Projeler</a></li>\n' +
'          <li><a href="/blog/">Blog</a></li>\n' +
'          <li><a href="/iletisim/">İletişim</a></li>\n' +
'        </ul>\n' +
'      </div>\n' +
'    </div>\n' +
'    <div class="foot-in">\n' +
'      <span class="label">© <span id="yil">2026</span> Romix Studio</span>\n' +
'      <nav aria-label="Alt menü">\n' +
'        <a href="' + CONTACT.whatsapp + '" target="_blank" rel="noopener">WhatsApp</a>\n' +
'        <a href="tel:' + CONTACT.phone + '">' + CONTACT.phoneText + '</a>\n' +
'        <a href="mailto:' + CONTACT.email + '">E-posta</a>\n' +
'      </nav>\n' +
'    </div>\n' +
'  </div>\n' +
'</footer>\n' +
'\n<script src="/js/page.js" defer></script>\n' +
'\n</body>\n</html>\n';
}


/* --- Sayfayı birleştir ---------------------------------------------------- */

function render(page) {
  return head(page) +
         header(page) +
         crumbs(page) +
         '\n<main id="main">\n\n' +
         hero(page) +
         (page.body || '') +
         '\n</main>\n' +
         footer();
}

module.exports = {
  esc, plain, url, render,
  ticks, cards, steps, table, faqBlock, relatedBlock, section, closing
};
