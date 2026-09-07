/* ==========================================================================
   ROMIX STUDIO — hizmet dışı sayfalar

   Hizmetler merkezi, projeler indeksi, proje sayfaları, blog, hakkımızda,
   iletişim ve 404.
   ========================================================================== */

const T = require('../template');
const { ORIGIN, CONTACT, PRICES, wa } = require('../site');
const PROJECTS = require('./projects');
const POSTS = require('./posts');

const HOME = { name: 'Ana sayfa', path: '/' };
const HIZ  = { name: 'Hizmetler', path: '/hizmetler/' };
const PRJ  = { name: 'Projeler', path: '/projeler/' };
const BLG  = { name: 'Blog', path: '/blog/' };

const pages = [];


/* ==========================================================================
   /hizmetler/  —  hizmet merkezi ve fiyat listesi
   PRIMARY: web sitesi ve yazılım fiyatları
   ========================================================================== */

const priceCards = [
  { label: 'Web sitesi',            amount: PRICES.web,       note: 'Tanıtım ve kurumsal siteler, tek sayfadan çok sayfalı yapıya.', ticks: ['Özgün tasarım, hazır tema değil', 'Mobil uyumlu, hızlı açılan yapı', 'Teknik SEO ve iletişim formu'], path: '/web-tasarim/', waText: 'Merhaba, web sitesi yaptırmak istiyorum.' },
  { label: 'Yapay zekâ ajanlı site', amount: PRICES.aiSite,   note: 'Ziyaretçiyle konuşan, soru yanıtlayan ve talep toplayan asistanlı site.', ticks: ['Kendi içeriğinizle eğitilmiş asistan', '7/24 yanıt, otomatik talep kaydı', 'Web sitesi kapsamının tamamı dahil'], path: '/web-tasarim/yapay-zeka-ajanli-web-sitesi/', waText: 'Merhaba, yapay zekâ ajanlı site hakkında bilgi almak istiyorum.' },
  { label: 'Otomasyon yazılımı',    amount: PRICES.otomasyon,  note: 'İşin kendine özgü akışına göre kurulan panel ve süreç yazılımı.', ticks: ['Süreç analizi ve kapsam çıkarımı', 'Yetki rolleri, raporlar, kayıt geçmişi', 'Mevcut sistemlerle entegrasyon'], path: '/otomasyon/', waText: 'Merhaba, iş süreçlerimiz için otomasyon yazılımı istiyorum.' },
  { label: 'Mobil uygulama',        amount: PRICES.mobil,      note: 'Android ve iOS için tek kod tabanından geliştirme, mağaza yayını dahil.', ticks: ['Arayüz tasarımı ve geliştirme', 'Google Play ve App Store yayını', 'Bildirim altyapısı ve güncellemeler'], path: '/mobil-uygulama-gelistirme/', waText: 'Merhaba, mobil uygulama yaptırmak istiyorum.' },
  { label: 'Mobil oyun',            amount: PRICES.oyun,       note: 'Bölüm tabanlı oyun kurgusu, ekonomi tasarımı ve mağaza yayını.', ticks: ['Oyun mekaniği ve seviye yapısı', 'Reklam ve uygulama içi satın alma', 'Mağaza görselleri ve yayın süreci'], path: '/mobil-oyun-gelistirme/', waText: 'Merhaba, mobil oyun projesi hakkında konuşmak istiyorum.' }
];

function priceBlock() {
  return '<div class="prices">' + priceCards.map((c) =>
    '<article class="price">' +
      '<p class="label">' + T.esc(c.label) + '</p>' +
      '<p class="amount"><b>' + c.amount.toLocaleString('tr-TR') + '</b><span>₺</span><em>’den başlayan</em></p>' +
      '<p class="price-note">' + T.esc(c.note) + '</p>' +
      T.ticks(c.ticks) +
      '<a class="btn ghost wa" href="' + T.esc(wa(c.waText)) + '" target="_blank" rel="noopener">WhatsApp’tan sor</a>' +
      '<p class="price-more"><a href="' + c.path + '">Hizmet detayına gidin →</a></p>' +
    '</article>'
  ).join('') + '</div>';
}

pages.push({
  path: '/hizmetler/',
  crumbs: [HOME, HIZ],
  keywords: {
    primary: 'web sitesi ve yazılım fiyatları',
    secondary: ['web sitesi fiyatları', 'mobil uygulama fiyatları', 'otomasyon yazılımı fiyatı', 'yazılım stüdyosu'],
    intent: 'Ticari araştırma — fiyat ve kapsam karşılaştıran alıcı'
  },
  title: 'Hizmetler ve Fiyatlar: Web, Mobil ve Otomasyon | Romix Studio',
  description: 'Web sitesi 3.000 ₺’den, otomasyon 15.000 ₺’den, mobil uygulama 30.000 ₺’den başlıyor. Tüm hizmetlerin kapsamı, teslim süreleri ve başlangıç fiyatları.',
  ogImageAlt: 'Romix Studio hizmetleri ve fiyatları',
  label: 'Hizmetler',
  h1: 'Hizmetler, kapsamlar ve başlangıç fiyatları',
  lead: 'Romix Studio bağımsız bir dijital tasarım ve yazılım stüdyosu. Kurumsal web sitesinden e-ticarete, Android ve iOS uygulamalarından iş süreçleri otomasyonuna kadar işi tek elden kuruyoruz. Aşağıda her hizmetin kapsamını, ortalama teslim süresini ve başlangıç fiyatını bir arada bulacaksınız.',
  ctaSecond: 'Fiyatlara gidin',
  ctaSecondHref: '#fiyatlar',
  stats: [
    { n: '10', l: 'Tamamlanan proje' },
    { n: '3', l: 'Yayındaki mobil uygulama' },
    { n: '7', l: 'Canlı web projesi' },
    { n: '24 sa', l: 'Ortalama dönüş süresi' }
  ],
  sections: [
    T.section({
      id: 'hizmetler',
      label: 'Ne yapıyoruz',
      h2: 'Dokuz hizmet, üç ana hat',
      body:
        '<p>Her hizmetin kendi sayfası var; aşağıdaki kartlar özet, detay sayfalarda kapsam, süreç ve sık sorulan sorular yer alıyor.</p>' +
        '<h3 class="hub-h3">Web</h3>' +
        T.relatedBlock([
          { title: 'Web tasarım', desc: 'Markaya özel tasarlanan, içerik panelli ve teknik SEO’dan geçmiş siteler', path: '/web-tasarim/' },
          { title: 'Kurumsal web tasarım', desc: 'Hizmet sayfaları, referans, ekip, blog ve çoklu dil içeren kurumsal siteler', path: '/web-tasarim/kurumsal-web-tasarim/' },
          { title: 'E-ticaret web tasarım', desc: 'Ürün, stok, sanal POS ve kargo entegrasyonlu online satış siteleri', path: '/web-tasarim/e-ticaret-web-tasarim/' },
          { title: 'Yapay zekâ ajanlı web sitesi', desc: 'Ziyaretçiyle konuşan, soru yanıtlayan ve talep toplayan asistanlı siteler', path: '/web-tasarim/yapay-zeka-ajanli-web-sitesi/' }
        ]) +
        '<h3 class="hub-h3">Mobil ve yazılım</h3>' +
        T.relatedBlock([
          { title: 'Mobil uygulama geliştirme', desc: 'Android ve iOS için tek kod tabanından geliştirme, mağaza yayını dahil', path: '/mobil-uygulama-gelistirme/' },
          { title: 'Mobil oyun geliştirme', desc: 'Bölüm tabanlı oyun kurgusu, ekonomi tasarımı ve mağaza yayını', path: '/mobil-oyun-gelistirme/' },
          { title: 'Özel yazılım geliştirme', desc: 'Hazır çözümlerin yetmediği, firmaya özgü yazılım ihtiyaçları', path: '/ozel-yazilim/' }
        ]) +
        '<h3 class="hub-h3">Otomasyon</h3>' +
        T.relatedBlock([
          { title: 'İş süreçleri otomasyonu', desc: 'Excel ve kâğıt üzerindeki işleri tek panele taşıyan sistemler', path: '/otomasyon/' },
          { title: 'İşletme otomasyonu', desc: 'İş emri, saha ekibi, stok, cari, teklif ve raporlama panelleri', path: '/otomasyon/isletme-otomasyonu/' },
          { title: 'Yapay zekâ otomasyonu', desc: 'Belge okuma, sınıflandırma, özetleme ve taslak üretme', path: '/otomasyon/yapay-zeka-otomasyonu/' }
        ])
    }),

    T.section({
      id: 'sure',
      label: 'Süre',
      h2: 'Bir proje ne kadar sürer?',
      body:
        '<p>Saatlik değil, iş bazlı çalışıyoruz: kapsamı yazılı olarak çıkarıp sabit fiyat veriyoruz, böylece proje ortasında sürpriz kalem çıkmıyor. Aşağıdaki süreler, içeriğin (metin ve görsellerin) hazır olduğu projeler için geçerli ortalamalar.</p>' +
        T.table({
          caption: 'Proje tipine göre ortalama teslim süresi ve kapsam',
          head: ['Proje tipi', 'Ortalama süre', 'Kapsama giren'],
          rows: [
            ['Tek sayfalık tanıtım sitesi', '1–2 hafta', 'Tasarım, geliştirme, form, teknik SEO'],
            ['Kurumsal web sitesi', '3–5 hafta', 'Çok sayfa, içerik yönetim paneli, blog, çoklu dil'],
            ['E-ticaret sitesi', '5–8 hafta', 'Ürün yönetimi, ödeme ve kargo entegrasyonu'],
            ['Mobil uygulama', '6–12 hafta', 'Android + iOS, mağaza yayını, bildirim altyapısı'],
            ['Süreç otomasyonu paneli', '4–10 hafta', 'Süreç çıkarımı, panel, roller, raporlar, entegrasyon']
          ]
        }) +
        '<p>Fiyatı belirleyen ana kalemler: sayfa ya da ekran sayısı, tasarımın özgünlük derecesi, içerik yönetim paneli ihtiyacı, entegrasyonlar (ödeme, kargo, muhasebe, CRM), çoklu dil desteği ve yayın sonrası bakım kapsamı. Bütçe aralığınızı baştan söylerseniz kapsamı ona göre kurar, hangi kalemin ilk sürümde bekleyebileceğini açıkça belirtiriz.</p>'
    }),

    T.section({
      id: 'fiyatlar',
      label: 'Fiyatlar',
      h2: 'Başlangıç fiyatları',
      body:
        '<p>Aşağıdakiler her hizmetin en yalın kapsamdaki başlangıç fiyatı. Kesin rakam, kapsamı birlikte netleştirdikten sonra sabit teklif olarak veriliyor; proje ortasında ek kalem çıkarmıyoruz. Bütçenizi baştan söylerseniz kapsamı ona göre kurarız.</p>' +
        priceBlock() +
        '<p class="price-foot">Fiyatlar KDV hariçtir ve projenin kapsamına göre yukarı doğru değişir. Alan adı ve sunucu ücretleri fiyata dahil değildir; dilerseniz sizin adınıza kurup teslim ederiz. Mağaza geliştirici hesabı ücretleri (Google Play, App Store) ve yapay zekâ servis sağlayıcısı kullanım ücretleri de fiyata dahil değildir.</p>'
    }),

    T.section({
      id: 'isler',
      label: 'Referanslar',
      h2: 'Yayında olan işlerimiz',
      body:
        '<p>Aşağıdaki projelerin hepsi canlı. Tasarımdan yayına kadar tüm süreç tarafımızdan yürütüldü.</p>' +
        workGrid(PROJECTS.filter((p) => ['obsidian-security', 'makinafleo', 'sera-guzellik', 'aslan-oto-kurtarma', 'yolarkadasim', 'word-vortex'].indexOf(p.slug) > -1)) +
        '<p><a href="/projeler/">Tüm projeleri görün →</a></p>'
    }),

    T.section({
      id: 'bolgeler',
      label: 'Çalışma bölgesi',
      h2: 'Türkiye genelinde uzaktan çalışıyoruz',
      body:
        '<p>Görüşmeler çevrimiçi yürüdüğü için şehir fark etmiyor. Bugüne kadar Konya’da bir estetik merkezi, Osmaniye Kadirli’de bir klima ve beyaz eşya servisi, Bingöl’de bir oto kurtarma firması ve Türkiye genelinde hizmet veren teknoloji firmalarıyla çalıştık. Yerel işletmeler için Google İşletme Profili uyumu, harita görünürlüğü ve şehir bazlı içerik yapısını da kurulum kapsamına alıyoruz.</p>' +
        '<p>Fiziksel bir ofiste müşteri kabul etmiyoruz; bu yüzden şehir bazlı ayrı sayfalar açmıyoruz. Nerede olursanız olun çalışma biçimi aynı.</p>'
    })
  ],
  faq: [
    { q: 'Web sitesi yaptırmak ne kadar tutar?', a: 'Web siteleri 3.000 ₺’den, yapay zekâ asistanlı siteler 5.000 ₺’den başlıyor. Mobil uygulama ve mobil oyun projeleri 30.000 ₺’den, iş süreçleri otomasyonu 15.000 ₺’den başlıyor. Bunlar en yalın kapsamdaki başlangıç fiyatları ve KDV hariç; kesin rakam kapsamı netleştirdikten sonra sabit teklif olarak veriliyor.' },
    { q: 'Web sitesi fiyatı neye göre belirleniyor?', a: 'Sayfa sayısı, tasarımın hazır tema mı özgün mü olduğu, içerik yönetim paneli ihtiyacı, entegrasyonlar (ödeme, kargo, muhasebe, CRM), çoklu dil ve yayın sonrası bakım kapsamı fiyatı belirleyen ana kalemler. Her proje için kapsamı yazılı çıkarıp sabit fiyat veriyoruz; saatlik değil, iş bazlı çalışıyoruz.' },
    { q: 'Hangi şehirlerde çalışıyorsunuz?', a: 'Türkiye genelinde uzaktan çalışıyoruz. Konya, Osmaniye, Bingöl ve İstanbul’daki firmalarla tamamlanmış projelerimiz var. Görüşmeler çevrimiçi yürüyor, bu yüzden şehir fark etmiyor.' },
    { q: 'Teslimden sonra destek veriyor musunuz?', a: 'Teslimden sonraki 30 gün boyunca hata düzeltmeleri ücretsiz. Sonrası için aylık bakım anlaşması yapıyoruz: güncellemeler, yedekleme, güvenlik yamaları ve küçük içerik değişiklikleri bu kapsamda.' },
    { q: 'Alan adı ve hosting’i siz mi ayarlıyorsunuz?', a: 'İsterseniz biz kuruyoruz, isterseniz kendi hesabınıza yayınlıyoruz. Alan adı ve sunucu her zaman sizin adınıza kayıtlı oluyor; kaynak koda ve hesaplara tam erişiminiz kalıyor.' },
    { q: 'Projeye nasıl başlıyoruz?', a: 'E-posta atmanız ya da WhatsApp’tan yazmanız yeterli. Kısa bir görüşmede ihtiyacı ve bütçe aralığını netleştiriyoruz, ardından kapsam ve takvimi yazılı olarak paylaşıyoruz. Onay sonrası tasarımla başlıyoruz.' },
    { q: 'SEO çalışması dahil mi?', a: 'Teknik SEO her projeye dahil: başlık ve açıklama etiketleri, başlık hiyerarşisi, yapılandırılmış veri, site haritası, hız optimizasyonu ve mobil uyumluluk. Sürekli içerik üretimi ve link çalışması ayrı bir hizmet olarak isteğe bağlı yürütülüyor.' }
  ],
  closingBlock: {
    p: 'Aklınızdaki işi birkaç cümleyle yazın, 24 saat içinde dönüş yapalım. İlk görüşme ücretsiz; sonunda kapsam ve takvimi yazılı olarak paylaşıyoruz.',
    subject: 'Proje talebi'
  }
});


/* ==========================================================================
   /projeler/  —  proje indeksi
   ========================================================================== */

function workGrid(list) {
  return '<div class="work">' + list.map((p) =>
    '<a href="/projeler/' + p.slug + '/">' +
      '<img src="/' + p.image + '" alt="' + T.esc(p.alt) + '" width="1600" height="1000" loading="lazy" decoding="async">' +
      '<span class="meta"><b>' + T.esc(p.title) + '</b><span>' + T.esc(p.type + ' · ' + p.sector) + '</span></span>' +
    '</a>'
  ).join('') + '</div>';
}

pages.push({
  path: '/projeler/',
  crumbs: [HOME, PRJ],
  keywords: {
    primary: 'web tasarım referansları',
    secondary: ['yazılım projeleri', 'mobil uygulama referansları', 'portföy'],
    intent: 'Araştırma — yetkinlik doğrulayan alıcı'
  },
  title: 'Projeler ve Referanslar | Romix Studio',
  description: 'Romix Studio’nun tamamladığı web siteleri, mobil uygulamalar ve oyun projeleri. Her proje için ne yapıldığını anlatan ayrı sayfa.',
  ogImageAlt: 'Romix Studio projeleri',
  label: 'Projeler',
  h1: 'Projeler',
  lead: 'Aşağıdaki projelerin hepsi canlı. Her biri için ne istendiğini, nasıl yaklaştığımızı ve tam olarak neyi kurduğumuzu anlatan ayrı bir sayfa var. Müşteri sonucu, ciro ya da trafik rakamı yazmıyoruz — elimizde doğrulayabileceğimiz böyle bir veri yok.',
  cta: false,
  sections: [
    T.section({
      label: 'Web',
      h2: 'Web projeleri',
      body: workGrid(PROJECTS.filter((p) => p.kind === 'web'))
    }),
    T.section({
      label: 'Mobil',
      h2: 'Mobil uygulama ve oyun projeleri',
      body: workGrid(PROJECTS.filter((p) => p.kind !== 'web'))
    })
  ],
  related: [
    { title: 'Web tasarım', desc: 'Web projelerinin arkasındaki hizmet', path: '/web-tasarim/' },
    { title: 'Mobil uygulama geliştirme', desc: 'Mobil projelerin arkasındaki hizmet', path: '/mobil-uygulama-gelistirme/' },
    { title: 'Hizmetler ve fiyatlar', desc: 'Kapsamlar, teslim süreleri ve başlangıç fiyatları', path: '/hizmetler/' }
  ],
  closingBlock: {
    p: 'Benzer bir iş mi düşünüyorsunuz? Aklınızdakini yazın, kapsam ve fiyat aralığıyla dönelim.',
    subject: 'Proje talebi'
  },
  schema: [{
    '@type': 'ItemList',
    '@id': ORIGIN + '/projeler/#liste',
    name: 'Romix Studio projeleri',
    numberOfItems: PROJECTS.length,
    itemListElement: PROJECTS.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.title,
      url: ORIGIN + '/projeler/' + p.slug + '/'
    }))
  }]
});


/* ==========================================================================
   /projeler/<slug>/  —  proje sayfaları
   ========================================================================== */

PROJECTS.forEach((p) => {
  const linkLabel = p.app ? 'Google Play’de görün' : 'Siteyi görün';
  const svcPath = p.kind === 'oyun' ? '/mobil-oyun-gelistirme/'
                : p.kind === 'mobil' ? '/mobil-uygulama-gelistirme/'
                : '/web-tasarim/';
  const svcTitle = p.kind === 'oyun' ? 'Mobil oyun geliştirme'
                 : p.kind === 'mobil' ? 'Mobil uygulama geliştirme'
                 : 'Web tasarım';

  const others = PROJECTS
    .filter((o) => o.slug !== p.slug && o.kind === p.kind)
    .slice(0, 2)
    .map((o) => ({ title: o.title, desc: o.type + ' · ' + o.sector, path: '/projeler/' + o.slug + '/' }));

  pages.push({
    path: '/projeler/' + p.slug + '/',
    crumbs: [HOME, PRJ, { name: p.title, path: '/projeler/' + p.slug + '/' }],
    keywords: {
      primary: p.title.toLowerCase(),
      secondary: [p.type.toLowerCase(), p.sector.toLowerCase() + ' web sitesi'],
      intent: 'Araştırma — proje ve yetkinlik incelemesi'
    },
    title: p.metaTitle,
    description: p.metaDesc,
    ogImage: ORIGIN + '/' + p.image,
    ogImageAlt: p.alt,
    label: 'Proje · ' + p.year,
    h1: p.title,
    lead: p.lead,
    cta: false,
    body:
      '\n  <div class="wrap project-hero">\n' +
      '    <img src="/' + p.image + '" alt="' + T.esc(p.alt) + '" width="1600" height="1000" fetchpriority="high" decoding="async">\n' +
      '  </div>\n' +

      T.section({
        label: 'Künye',
        h2: 'Proje künyesi',
        body: T.table({
          caption: p.title + ' projesinin temel bilgileri',
          head: ['Alan', 'Bilgi'],
          rows: [
            ['Proje', T.esc(p.title)],
            ['Yıl', T.esc(p.year)],
            ['Sektör', T.esc(p.sector)],
            ['Tür', T.esc(p.type)],
            ['Verilen hizmetler', T.esc(p.services)]
          ].concat(p.city ? [['Bölge', T.esc(p.city)]] : [])
           .concat([['Durum', p.url ? '<a href="' + p.url + '" target="_blank" rel="noopener">Yayında — ' + linkLabel + ' →</a>' : 'Yayında']])
        })
      }) +

      T.section({
        label: '01 — İhtiyaç',
        h2: 'Neyi çözmek gerekiyordu?',
        body: '<p>' + p.brief + '</p>'
      }) +

      T.section({
        label: '02 — Yaklaşım',
        h2: 'Nasıl yaklaştık?',
        body: '<p>' + p.approach + '</p>'
      }) +

      T.section({
        label: '03 — Yapılanlar',
        h2: 'Ne kurduk?',
        body: T.ticks(p.built) +
              '<h3 class="hub-h3">Kullanılan yapı</h3>' + T.ticks(p.tech) +
              (p.url ? '<p class="cta-row"><a class="btn" href="' + p.url + '" target="_blank" rel="noopener">' + linkLabel + '</a></p>' : '')
      }) +

      T.section({
        label: 'İlgili',
        h2: 'İlgili hizmet ve projeler',
        body: T.relatedBlock(
          [{ title: svcTitle, desc: 'Bu projenin arkasındaki hizmet', path: svcPath }]
            .concat(p.relatedProject ? [(function () {
              const r = PROJECTS.filter((o) => o.slug === p.relatedProject)[0];
              return { title: r.title, desc: 'Aynı ürünün ' + (r.kind === 'web' ? 'tanıtım sitesi' : 'mobil uygulaması'), path: '/projeler/' + r.slug + '/' };
            })()] : [])
            .concat(others)
            .concat([{ title: 'Tüm projeler', desc: 'Yayında olan işlerin tamamı', path: '/projeler/' }])
        )
      }) +

      T.closing({
        h2: 'Benzer bir proje mi düşünüyorsunuz?',
        p: 'Aklınızdaki işi birkaç cümleyle yazın; kapsam ve fiyat aralığıyla 24 saat içinde dönelim.',
        subject: p.title + ' benzeri proje talebi'
      }),

    schema: [{
      '@type': 'CreativeWork',
      '@id': ORIGIN + '/projeler/' + p.slug + '/#proje',
      name: p.title,
      description: p.lead,
      dateCreated: p.year,
      inLanguage: 'tr-TR',
      creator: { '@id': ORIGIN + '/#studio' },
      image: ORIGIN + '/' + p.image,
      about: p.sector,
      genre: p.type,
      url: p.url || (ORIGIN + '/projeler/' + p.slug + '/')
    }]
  });
});


/* ==========================================================================
   /blog/  —  blog indeksi
   ========================================================================== */

pages.push({
  path: '/blog/',
  crumbs: [HOME, BLG],
  keywords: {
    primary: 'web tasarım ve yazılım rehberleri',
    secondary: ['web sitesi rehberi', 'mobil uygulama rehberi', 'otomasyon rehberi'],
    intent: 'Bilgilendirici — karar öncesi araştırma'
  },
  title: 'Blog: Web, Mobil ve Otomasyon Rehberleri | Romix Studio',
  description: 'Web sitesi, mobil uygulama ve iş süreçleri otomasyonu yaptırmadan önce bilinmesi gerekenler. Satış metni değil, karar vermeye yarayan rehberler.',
  ogImageAlt: 'Romix Studio blog',
  label: 'Blog',
  h1: 'Blog',
  lead: 'Burada satış metni yayınlamıyoruz. Yazdığımız her yazı, bir işi yaptırmadan önce cevabını bilmeniz gereken bir sorunun üzerine kurulu — bizimle çalışmasanız bile işinize yarasın diye.',
  cta: false,
  sections: [
    T.section({
      label: 'Yazılar',
      h2: 'Yayındaki yazılar',
      body: '<ul class="posts">' + POSTS.map((post) =>
        '<li><a href="/blog/' + post.slug + '/">' +
          '<span class="post-cat label">' + T.esc(post.category) + '</span>' +
          '<span class="post-title">' + T.esc(post.h1) + '</span>' +
          '<span class="post-desc">' + T.esc(post.excerpt) + '</span>' +
          '<span class="post-meta label">' + T.esc(post.readTime) + '</span>' +
        '</a></li>'
      ).join('') + '</ul>'
    })
  ],
  related: [
    { title: 'Hizmetler ve fiyatlar', desc: 'Kapsamlar, teslim süreleri ve başlangıç fiyatları', path: '/hizmetler/' },
    { title: 'Projeler', desc: 'Yayında olan işlerimiz', path: '/projeler/' }
  ],
  closingBlock: {
    p: 'Yazılarda cevabını bulamadığınız bir soru varsa doğrudan sorun; bilgi vermek için görüşme şartı koşmuyoruz.',
    subject: 'Soru'
  },
  schema: [{
    '@type': 'Blog',
    '@id': ORIGIN + '/blog/#blog',
    name: 'Romix Studio Blog',
    inLanguage: 'tr-TR',
    publisher: { '@id': ORIGIN + '/#studio' },
    blogPost: POSTS.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.h1,
      url: ORIGIN + '/blog/' + post.slug + '/',
      datePublished: post.date,
      author: { '@id': ORIGIN + '/#studio' }
    }))
  }]
});


/* ==========================================================================
   /blog/<slug>/  —  yazılar
   ========================================================================== */

POSTS.forEach((post) => {
  pages.push({
    path: '/blog/' + post.slug + '/',
    crumbs: [HOME, BLG, { name: post.h1, path: '/blog/' + post.slug + '/' }],
    keywords: post.keywords,
    title: post.title,
    description: post.description,
    ogType: 'article',
    ogImageAlt: post.h1,
    label: post.category,
    h1: post.h1,
    lead: post.lead,
    cta: false,
    body:
      '\n  <div class="wrap post-head">\n' +
      '    <p class="label">Yayın: <time datetime="' + post.date + '">' + post.dateText + '</time> · ' + T.esc(post.readTime) + ' · Romix Studio</p>\n' +
      '  </div>\n' +
      '\n  <article class="rise">\n    <div class="wrap prose">\n' + post.body + '\n    </div>\n  </article>\n' +
      (post.faq && post.faq.length
        ? T.section({ id: 'sss', label: 'SSS', h2: 'Sık sorulan sorular', body: T.faqBlock(post.faq) })
        : '') +
      T.section({
        label: 'İlgili',
        h2: 'İlgili hizmet ve içerikler',
        body: T.relatedBlock(post.related)
      }) +
      T.closing({
        h2: post.closingH2 || 'Projenizi konuşalım',
        p: post.closingP,
        subject: post.closingSubject
      }),
    faq: post.faq,
    schema: [{
      '@type': 'BlogPosting',
      '@id': ORIGIN + '/blog/' + post.slug + '/#yazi',
      headline: post.h1,
      description: post.description,
      inLanguage: 'tr-TR',
      datePublished: post.date,
      dateModified: post.date,
      author: { '@id': ORIGIN + '/#studio' },
      publisher: { '@id': ORIGIN + '/#studio' },
      mainEntityOfPage: { '@id': ORIGIN + '/blog/' + post.slug + '/#page' },
      image: ORIGIN + '/img/obsidian-security.jpg',
      isPartOf: { '@id': ORIGIN + '/blog/#blog' }
    }]
  });
});


/* ==========================================================================
   /hakkimizda/
   ========================================================================== */

pages.push({
  path: '/hakkimizda/',
  crumbs: [HOME, { name: 'Hakkımızda', path: '/hakkimizda/' }],
  keywords: {
    primary: 'Romix Studio hakkında',
    secondary: ['dijital tasarım stüdyosu', 'yazılım stüdyosu'],
    intent: 'Marka / güven doğrulama'
  },
  title: 'Hakkımızda | Romix Studio',
  description: 'Romix Studio, web tasarımı, mobil uygulama ve iş süreçleri otomasyonu üzerine çalışan bağımsız bir dijital tasarım ve yazılım stüdyosu. Nasıl çalıştığımız.',
  ogImageAlt: 'Romix Studio hakkında',
  label: 'Stüdyo',
  h1: 'Romix Studio',
  lead: 'Bağımsız bir dijital tasarım ve yazılım stüdyosuyuz. Web tasarımı, arayüz geliştirme, mobil uygulama ve iş süreçleri otomasyonu üzerine çalışıyoruz — markanın ihtiyacını tasarımdan yayına kadar tek elden kuruyoruz.',
  cta: false,
  sections: [
    T.section({
      label: '01 — Ne yapıyoruz',
      h2: 'Tasarımdan yayına tek elden',
      body:
        '<p>Bir projede arayüz tasarımı, ön yüz mimarisi, animasyon, içerik yönetim sistemi ve yayın sonrası bakım aynı yerde yürüyor. Bu, ajans–yazılımcı–hosting üçgeninde kaybolan zamanı ve “bu kimin işi” tartışmasını ortadan kaldırıyor.</p>' +
        '<p>Bugüne kadar tamamladığımız on projenin yedisi web, üçü mobil. Mobil tarafta geliştirdiğimiz üç uygulama Google Play’de yayında. Web projelerinin tamamı canlı ve <a href="/projeler/">projeler sayfasından</a> incelenebilir.</p>'
    }),
    T.section({
      label: '02 — Nasıl çalışıyoruz',
      h2: 'Çalışma ilkelerimiz',
      body: T.ticks([
        '<strong>İş bazlı, sabit fiyat.</strong> Saatlik çalışmıyoruz. Kapsamı yazılı çıkarıp sabit fiyat veriyoruz; proje ortasında ek kalem çıkarmıyoruz.',
        '<strong>Onay olmadan koda geçmiyoruz.</strong> Tasarım ve akış onaylanmadan geliştirme başlamıyor. Bu, sonradan dönüşün maliyetini büyük ölçüde ortadan kaldırıyor.',
        '<strong>İki haftada bir çalışan sürüm.</strong> Sonunda tek seferde teslim yapmıyoruz; ilerlemeyi süreç boyunca görüyorsunuz.',
        '<strong>Kod ve hesaplar sizin.</strong> Alan adı, sunucu, mağaza hesabı ve kaynak kod sizin adınıza. Bağımlılık kuran bir yapı kurmuyoruz.',
        '<strong>Hazır tema kullanmıyoruz.</strong> Yalnızca o projede kullanılan kodu yazıyoruz; kullanılmayan özelliklerin yükünü taşımıyorsunuz.',
        '<strong>Yapamayacağımızı söylüyoruz.</strong> Hazır bir çözüm işinizi görüyorsa özel yazılım satmaya çalışmıyoruz.'
      ])
    }),
    T.section({
      label: '03 — Nerede',
      h2: 'Türkiye genelinde uzaktan',
      body:
        '<p>Görüşmeler çevrimiçi yürüyor, bu yüzden şehir fark etmiyor. Konya’da bir estetik merkezi, Osmaniye Kadirli’de bir klima ve beyaz eşya servisi, Bingöl’de bir oto kurtarma firması ve Türkiye genelinde hizmet veren teknoloji firmalarıyla çalıştık.</p>' +
        '<p>Müşteri kabul ettiğimiz fiziksel bir ofisimiz yok ve olmayan bir adres yazmıyoruz. İletişim kanallarımız <a href="/iletisim/">iletişim sayfasında</a>.</p>'
    })
  ],
  related: [
    { title: 'Hizmetler ve fiyatlar', desc: 'Kapsamlar, teslim süreleri ve başlangıç fiyatları', path: '/hizmetler/' },
    { title: 'Projeler', desc: 'Yayında olan on proje', path: '/projeler/' },
    { title: 'İletişim', desc: 'WhatsApp, telefon ve e-posta', path: '/iletisim/' }
  ],
  closingBlock: {
    p: 'Aklınızdaki işi birkaç cümleyle yazın, 24 saat içinde dönüş yapalım. İlk görüşme ücretsiz.',
    subject: 'Proje talebi'
  },
  schema: [{
    '@type': 'AboutPage',
    '@id': ORIGIN + '/hakkimizda/#about',
    mainEntity: { '@id': ORIGIN + '/#studio' }
  }]
});


/* ==========================================================================
   /iletisim/
   ========================================================================== */

pages.push({
  path: '/iletisim/',
  crumbs: [HOME, { name: 'İletişim', path: '/iletisim/' }],
  keywords: {
    primary: 'Romix Studio iletişim',
    secondary: ['teklif alma', 'web tasarım teklif'],
    intent: 'İşlemsel — iletişime geçmek isteyen ziyaretçi'
  },
  title: 'İletişim ve Teklif | Romix Studio',
  description: 'Romix Studio ile WhatsApp, telefon veya e-posta üzerinden iletişime geçin. İlk görüşme ücretsiz; 24 saat içinde kapsam ve fiyat aralığıyla dönüş yapıyoruz.',
  ogImageAlt: 'Romix Studio iletişim',
  label: 'İletişim',
  h1: 'İletişim',
  lead: 'Aklınızdaki işi birkaç cümleyle yazmanız yeterli. İlk görüşme ücretsiz ve görüşmenin sonunda kapsamı ile takvimi yazılı olarak paylaşıyoruz. Ortalama dönüş süremiz 24 saat.',
  cta: false,
  sections: [
    T.section({
      label: 'Kanallar',
      h2: 'Nasıl ulaşabilirsiniz?',
      body:
        '<ul class="contact-cards">' +
          '<li><a href="' + T.esc(wa('Merhaba, Romix Studio — bir proje hakkında konuşmak istiyorum.')) + '" target="_blank" rel="noopener">' +
            '<span class="related-title">WhatsApp</span>' +
            '<span class="related-desc">' + CONTACT.phoneText + ' · En hızlı dönüş buradan</span></a></li>' +
          '<li><a href="tel:' + CONTACT.phone + '">' +
            '<span class="related-title">Telefon</span>' +
            '<span class="related-desc">' + CONTACT.phoneText + '</span></a></li>' +
          '<li><a href="mailto:' + CONTACT.email + '?subject=' + encodeURIComponent('Romix Studio — Proje talebi') + '">' +
            '<span class="related-title">E-posta</span>' +
            '<span class="related-desc">' + CONTACT.email + '</span></a></li>' +
        '</ul>' +
        '<p>Türkiye genelinde uzaktan çalışıyoruz; görüşmeler çevrimiçi yürüdüğü için bulunduğunuz şehir fark etmiyor. Müşteri kabul ettiğimiz fiziksel bir ofisimiz yok.</p>'
    }),
    T.section({
      label: 'Hazırlık',
      h2: 'İlk mesajda ne yazmanız yeterli?',
      body:
        '<p>Aşağıdakileri yazarsanız ilk dönüşte tahmin yerine gerçek bir kapsam önerisi paylaşabiliriz. Hiçbiri zorunlu değil — “bir web sitesi lazım” yazmanız da yeterli, gerisini görüşmede konuşuruz.</p>' +
        T.ticks([
          'Ne yaptırmak istiyorsunuz: web sitesi, mobil uygulama, otomasyon paneli?',
          'İşiniz ne? Ziyaretçinin sitede/uygulamada yapmasını istediğiniz ana şey ne?',
          'Elinizde hazır içerik (metin, görsel, ürün verisi) var mı?',
          'Bir tarih hedefiniz var mı?',
          'Bütçe aralığınız ne? Bunu bilmek kapsamı doğru kurmamızı sağlıyor.'
        ])
    })
  ],
  faq: [
    { q: 'İlk görüşme ücretli mi?', a: 'Hayır, ilk görüşme ücretsiz. Görüşmenin sonunda kapsam ve takvimi yazılı olarak paylaşıyoruz. Bilgi vermek için görüşme şartı koşmuyoruz; sorunuzu doğrudan WhatsApp’tan da sorabilirsiniz.' },
    { q: 'Ne kadar sürede dönüş yapıyorsunuz?', a: 'Ortalama dönüş süremiz 24 saat. WhatsApp genellikle en hızlı kanal.' },
    { q: 'Bütçemi söylemek zorunda mıyım?', a: 'Zorunda değilsiniz ama söylemeniz işinize yarıyor. Bütçe aralığını bilirsek kapsamı ona göre kurar, hangi kalemin ilk sürümde bekleyebileceğini açıkça belirtiriz. Aksi halde ikimiz de tahmin üzerinden konuşmuş oluruz.' },
    { q: 'Ofisinizde görüşebilir miyiz?', a: 'Müşteri kabul ettiğimiz fiziksel bir ofisimiz yok; Türkiye genelinde uzaktan çalışıyoruz. Görüşmeler çevrimiçi yürüyor.' }
  ],
  related: [
    { title: 'Hizmetler ve fiyatlar', desc: 'Kapsamlar, teslim süreleri ve başlangıç fiyatları', path: '/hizmetler/' },
    { title: 'Projeler', desc: 'Yayında olan işlerimiz', path: '/projeler/' },
    { title: 'Hakkımızda', desc: 'Nasıl çalıştığımız', path: '/hakkimizda/' }
  ],
  closingBlock: {
    p: 'Hazırsanız yazın — birkaç cümle yeterli.',
    subject: 'Proje talebi'
  },
  schema: [{
    '@type': 'ContactPage',
    '@id': ORIGIN + '/iletisim/#contact',
    mainEntity: { '@id': ORIGIN + '/#studio' }
  }]
});


/* ==========================================================================
   /gizlilik-politikasi/

   UYARI: Bu metin taslaktır. Yalnızca kullanıcının onayladığı gerçek bilgilere
   dayanıyor (veri sorumlusu, toplanan veri türleri, kullanılan servisler).
   Uydurulmayan alanlar: VKN/MERSİS, işyeri adresi, VERBİS kayıt durumu, kesin
   saklama süreleri — bunlar hakkında elimizde doğrulanmış bilgi olmadığı için
   metne yazılmadı. Yayından önce bir hukuk danışmanına gösterilmesi önerilir.
   ========================================================================== */

pages.push({
  path: '/gizlilik-politikasi/',
  crumbs: [HOME, { name: 'Gizlilik Politikası', path: '/gizlilik-politikasi/' }],
  keywords: {
    primary: 'Romix Studio gizlilik politikası',
    secondary: ['KVKK aydınlatma metni', 'kişisel verilerin korunması'],
    intent: 'Bilgilendirici — hukuki/güven sayfası'
  },
  title: 'Gizlilik Politikası ve KVKK Aydınlatma Metni | Romix Studio',
  description: 'Romix Studio’nun iletişim formu, Google Analytics ve site altyapısı aracılığıyla işlediği kişisel veriler, işlenme amaçları ve KVKK kapsamındaki haklarınız.',
  ogImageAlt: 'Romix Studio gizlilik politikası',
  label: 'Yasal',
  h1: 'Gizlilik Politikası ve KVKK Aydınlatma Metni',
  lead: 'Bu sayfa, romixspace.com’u ziyaret ettiğinizde ya da bizimle iletişime geçtiğinizde hangi kişisel verilerin, hangi amaçla ve nasıl işlendiğini anlatıyor. Son güncelleme: 7 Eylül 2026.',
  cta: false,
  sections: [
    T.section({
      label: '01 — Veri sorumlusu',
      h2: 'Veri sorumlusu kim?',
      body:
        '<p>romixspace.com (“Romix Studio”), Arda Furat tarafından bireysel olarak işletilen bir dijital tasarım ve yazılım stüdyosudur. 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) kapsamında bu site üzerinden toplanan kişisel veriler bakımından veri sorumlusu Arda Furat’tır.</p>' +
        '<p>Bu politika hakkındaki sorularınız için: <a href="mailto:' + CONTACT.email + '">' + CONTACT.email + '</a></p>'
    }),

    T.section({
      label: '02 — Toplanan veriler',
      h2: 'Hangi kişisel veriler, nasıl toplanıyor?',
      body:
        '<p>Bu sitede aşağıdaki kişisel veriler, belirtilen yollarla toplanıyor:</p>' +
        T.ticks([
          '<strong>İletişim formu, e-posta ve WhatsApp.</strong> Bizimle iletişime geçtiğinizde paylaştığınız ad, e-posta adresi, telefon numarası ve mesaj içeriği.',
          '<strong>Google Analytics (GA4).</strong> Siteyi ziyaret ettiğinizde IP adresinizden türetilen yaklaşık konum, kullandığınız cihaz ve tarayıcı bilgisi, ziyaret ettiğiniz sayfalar ve sitede gezinme davranışınız. Bu veriler Google LLC tarafından işlenir.',
          '<strong>Yazı tipi ve betik dosyaları.</strong> Sitenin görünümü ve etkileşimli öğeleri için Google Fonts ve cdnjs (Cloudflare) üzerinden dosya indiriliyor; bu sırada IP adresiniz bu servis sağlayıcılara ulaşıyor.',
          '<strong>Barındırma sunucusu günlükleri.</strong> Sitenin barındırıldığı Vercel Inc. altyapısı, standart sunucu erişim günlüklerinde erişim zamanını, IP adresini ve tarayıcı bilgisini tutuyor.'
        ]) +
        '<p>Sitede üyelik, kullanıcı girişi ya da ödeme sistemi bulunmuyor; bu nedenle şifre, ödeme ya da kimlik belgesi bilgisi toplanmıyor.</p>'
    }),

    T.section({
      label: '03 — İşlenme amaçları',
      h2: 'Verileriniz hangi amaçla işleniyor?',
      body: T.ticks([
        'İletişime geçtiğiniz talebi değerlendirmek ve size dönüş yapmak',
        'Sitenin nasıl kullanıldığını anlayarak içerik ve kullanılabilirliği geliştirmek',
        'Sitenin teknik olarak çalışmasını ve güvenliğini sağlamak',
        'Yasal yükümlülüklerin yerine getirilmesi (yetkili bir merciin talep etmesi hâlinde bilgi verilmesi)'
      ])
    }),

    T.section({
      label: '04 — Aktarım',
      h2: 'Verileriniz üçüncü taraflarla paylaşılıyor mu?',
      body:
        '<p>Yukarıda sayılan hizmet sağlayıcılar (Google, Cloudflare, Vercel Inc., WhatsApp/Meta) kendi altyapılarını kullandığı için verileriniz bu sağlayıcıların sunucuları üzerinden, kısmen Türkiye dışında işlenebiliyor. Bu paylaşım yalnızca yukarıda sayılan amaçların gerçekleştirilmesiyle sınırlı; verileriniz satılmıyor ve pazarlama amacıyla başka bir üçüncü tarafla paylaşılmıyor.</p>'
    }),

    T.section({
      label: '05 — Çerezler',
      h2: 'Site çerez kullanıyor mu?',
      body:
        '<p>Site, Google Analytics tarafından yerleştirilen ölçüm çerezlerini kullanıyor. Bu çerezler ziyaretçiyi tekilleştirmek ve site kullanımını ölçmek için kullanılıyor; reklam amaçlı üçüncü taraf çerezi kullanılmıyor. Çerezleri tarayıcınızın ayarlarından tamamen engelleyebilir ya da silebilirsiniz; bu durumda sitenin temel işlevleri etkilenmez, yalnızca ziyaret ölçümü yapılamaz.</p>'
    }),

    T.section({
      label: '06 — Saklama süresi',
      h2: 'Verileriniz ne kadar süreyle saklanıyor?',
      body:
        '<p>İletişim yoluyla paylaştığınız bilgiler, talebinizin değerlendirilmesi için gerekli süre boyunca ve sonrasında olası uyuşmazlıklara karşı makul bir süreyle sınırlı olarak saklanıyor. Google Analytics verileri, Google’ın kendi varsayılan saklama ayarlarına tabi.</p>'
    }),

    T.section({
      label: '07 — Haklarınız',
      h2: 'KVKK kapsamındaki haklarınız',
      body:
        '<p>KVKK’nın 11. maddesi uyarınca şu haklara sahipsiniz:</p>' +
        T.ticks([
          'Kişisel verilerinizin işlenip işlenmediğini öğrenme',
          'İşlenmişse buna ilişkin bilgi talep etme',
          'İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme',
          'Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme',
          'Eksik veya yanlış işlenmişse düzeltilmesini isteme',
          'KVKK’da öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme',
          'İşlenen verilerin münhasıran otomatik sistemlerle analiz edilmesi yoluyla aleyhinize bir sonuç doğması hâlinde buna itiraz etme',
          'Kanuna aykırı işleme nedeniyle zarara uğramanız hâlinde zararın giderilmesini talep etme'
        ])
    }),

    T.section({
      label: '08 — Başvuru',
      h2: 'Haklarınızı nasıl kullanabilirsiniz?',
      body:
        '<p>Yukarıdaki haklarınızı kullanmak için taleplerinizi <a href="mailto:' + CONTACT.email + '">' + CONTACT.email + '</a> adresine e-posta yoluyla iletebilirsiniz. Başvurunuzda kimliğinizi doğrulayabilmemiz ve talebinizi doğru değerlendirebilmemiz için ad-soyadınızı ve talebinizin konusunu açıkça belirtmenizi rica ederiz. Talepler, KVKK’da öngörülen süreler içinde yanıtlanır.</p>'
    }),

    T.section({
      label: '09 — Güncellemeler',
      h2: 'Bu politika değişir mi?',
      body:
        '<p>Bu politika, sitede sunulan hizmetler ya da kullanılan araçlar değiştikçe güncellenebilir. Güncel sürüm her zaman bu sayfada yer alır.</p>'
    })
  ],
  related: [
    { title: 'İletişim', desc: 'Sorularınız için doğrudan ulaşın', path: '/iletisim/' },
    { title: 'Hakkımızda', desc: 'Romix Studio kim, nasıl çalışıyor', path: '/hakkimizda/' }
  ]
});


/* ==========================================================================
   404
   ========================================================================== */

pages.push({
  file: '404.html',
  path: '/404/',
  canonicalSkip: true,
  robots: 'noindex, follow',
  sitemap: false,
  title: 'Sayfa bulunamadı | Romix Studio',
  description: 'Aradığınız sayfa bulunamadı.',
  label: '404',
  h1: 'Bu sayfa bulunamadı',
  lead: 'Adres yanlış yazılmış ya da sayfa taşınmış olabilir. Aşağıdaki bağlantılardan devam edebilirsiniz.',
  cta: false,
  sections: [
    T.section({
      label: 'Nereye gidelim',
      h2: 'Sık kullanılan sayfalar',
      body: T.relatedBlock([
        { title: 'Ana sayfa', desc: 'Öne çıkan projelerin yer aldığı giriş', path: '/' },
        { title: 'Hizmetler ve fiyatlar', desc: 'Kapsamlar, süreler ve başlangıç fiyatları', path: '/hizmetler/' },
        { title: 'Projeler', desc: 'Yayında olan on proje', path: '/projeler/' },
        { title: 'Blog', desc: 'Karar öncesi okunacak rehberler', path: '/blog/' },
        { title: 'İletişim', desc: 'WhatsApp, telefon ve e-posta', path: '/iletisim/' }
      ])
    })
  ]
});


/* --- Sayfaları tamamla ---------------------------------------------------- */

module.exports = pages.map((p) => {
  if (p.body) return p;

  const body =
    (p.sections || []).join('') +
    (p.faq && p.faq.length
      ? T.section({ id: 'sss', label: 'SSS', h2: 'Sık sorulan sorular', body: T.faqBlock(p.faq) })
      : '') +
    (p.related && p.related.length
      ? T.section({ label: 'İlgili', h2: 'İlgili sayfalar', body: T.relatedBlock(p.related) })
      : '') +
    (p.closingBlock ? T.closing(p.closingBlock) : '');

  return Object.assign({}, p, { body: body });
});
