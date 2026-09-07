/* ==========================================================================
   ROMIX STUDIO — hizmet iniş sayfaları

   Her sayfanın tek bir birincil anahtar kelimesi ve tek bir arama niyeti var.
   Aynı kelimeyi iki sayfaya vermiyoruz (yamyamlık); sayfalar birbirine
   "İlgili hizmetler" bloğuyla bağlanıyor.

   Fiyat, süre ve destek bilgileri hizmetler sayfasındaki gerçek rakamlarla
   aynı kaynaktan (build/site.js) geliyor.
   ========================================================================== */

const T = require('../template');
const { ORIGIN, PRICES } = require('../site');

const HOME = { name: 'Ana sayfa', path: '/' };
const HIZ  = { name: 'Hizmetler', path: '/hizmetler/' };

/* Service düğümü — hizmet sayfalarının yapılandırılmış verisi */
function serviceNode(path, o) {
  const node = {
    '@type': 'Service',
    '@id': ORIGIN + path + '#service',
    name: o.name,
    description: o.description,
    serviceType: o.serviceType,
    provider: { '@id': ORIGIN + '/#studio' },
    areaServed: { '@type': 'Country', name: 'Türkiye' },
    url: ORIGIN + path
  };
  if (o.price) {
    node.offers = {
      '@type': 'Offer',
      priceCurrency: 'TRY',
      url: ORIGIN + path,
      priceSpecification: {
        '@type': 'PriceSpecification',
        minPrice: o.price,
        priceCurrency: 'TRY',
        valueAddedTaxIncluded: false
      }
    };
  }
  return node;
}

/* Fiyat satırı — sayfa içinde tekrar eden başlangıç fiyatı bloğu */
function priceNote(amount, note) {
  return '<p class="price-inline"><span class="label">Başlangıç fiyatı</span>' +
         '<b>' + amount.toLocaleString('tr-TR') + ' ₺</b>' +
         '<em>’den başlıyor · KDV hariç</em></p>' +
         '<p class="price-foot">' + note + '</p>';
}

const pages = [];


/* ==========================================================================
   /web-tasarim/  —  PRIMARY: web tasarım
   ========================================================================== */

pages.push({
  path: '/web-tasarim/',
  crumbs: [HOME, HIZ, { name: 'Web tasarım', path: '/web-tasarim/' }],
  keywords: {
    primary: 'web tasarım',
    secondary: ['web tasarım ajansı', 'web sitesi yaptırma', 'profesyonel web sitesi', 'özgün web tasarım'],
    intent: 'Ticari — hizmet sağlayıcı arayan işletme'
  },
  title: 'Web Tasarım ve Web Sitesi Geliştirme | Romix Studio',
  description: 'Hazır tema değil, markaya özel web tasarım. Kurumsal site, e-ticaret ve yapay zekâ ajanlı siteler; içerik paneli, teknik SEO ve yayın sonrası bakım dahil.',
  ogImageAlt: 'Romix Studio web tasarım projeleri',
  label: 'Web',
  h1: 'Web tasarım: markanın kendi diliyle kurulan siteler',
  lead: 'Şablon üzerine renk değiştirip teslim etmiyoruz. Her projede tasarımı markanın kendi görsel dilinden kuruyor, sayfaları hem ziyaretçinin hem arama motorunun okuyabileceği bir yapıya oturtuyoruz — tasarımdan yayına ve sonrasındaki bakıma kadar tek elden.',
  waText: 'Merhaba, web sitesi yaptırmak istiyorum.',
  stats: [
    { n: '7', l: 'Canlı web projesi' },
    { n: '1–5', l: 'Hafta teslim süresi' },
    { n: '30 gün', l: 'Ücretsiz hata desteği' },
    { n: '24 sa', l: 'Ortalama dönüş süresi' }
  ],
  service: {
    name: 'Web tasarım ve web sitesi geliştirme',
    description: 'Markaya özel tasarlanan, içerik yönetim panelli, teknik SEO kontrolünden geçmiş web siteleri.',
    serviceType: 'Web tasarım',
    price: PRICES.web
  },
  sections: [
    T.section({
      label: '01 — Yaklaşım',
      h2: 'Web tasarımda ilk soru “nasıl görünsün” değil',
      body:
        '<p>Bir web sitesi projesine tasarımla başlamıyoruz. Önce şu soruyu netleştiriyoruz: bu siteye gelen kişi ne yapsın? Teklif mi istesin, randevu mu alsın, ürün mü satın alsın, sizi mi arasın? Cevap değiştikçe sayfa yapısı da, tasarım da değişiyor. Bu yüzden aynı sektördeki iki firmaya aynı siteyi kurmuyoruz.</p>' +
        '<p>Hazır tema kullanmamamızın sebebi estetik bir inat değil. Hazır temalar sizin içeriğinizi değil, kendi düzenlerini merkeze alıyor; sonuçta anlatmak istediğiniz şeyi temanın izin verdiği kadar anlatabiliyorsunuz. Ayrıca çoğu tema, kullanılmayan onlarca özelliğin kodunu da beraberinde taşıdığı için sayfa gereğinden yavaş açılıyor. Biz yalnızca o projede kullanılan kodu yazıyoruz.</p>' +
        '<p>Tasarım onayı alınmadan geliştirmeye başlamıyoruz. Önce yerleşimi ve akışı paylaşıyoruz, üzerinde konuşuyoruz; kod ancak akış oturduktan sonra yazılıyor. Bu sıra, projenin ortasında “aslında burası şöyle olmalıydı” demenin maliyetini büyük ölçüde ortadan kaldırıyor.</p>'
    }),

    T.section({
      label: '02 — Site tipleri',
      h2: 'Hangi tür siteyi kuruyoruz?',
      body:
        '<p>Web tasarım tek bir iş değil. Aşağıdaki dört yapının kurulumu, içerik mimarisi ve ölçüsü birbirinden farklı; hangisine ihtiyacınız olduğunu ilk görüşmede birlikte netleştiriyoruz.</p>' +
        T.cards([
          {
            h3: 'Kurumsal web sitesi',
            p: 'Hizmetlerini, ekibini ve referanslarını anlatan; teklif formuna yönlendiren firmalar için.',
            ticks: [
              'Hizmet başına detay sayfası',
              'Ekip, referans ve kurumsal bilgi bölümleri',
              'Blog altyapısı ve çoklu dil',
              '<a href="/web-tasarim/kurumsal-web-tasarim/">Kurumsal web tasarım sayfası →</a>'
            ]
          },
          {
            h3: 'E-ticaret sitesi',
            p: 'Ürün satan işletmeler için; sitenin işi tanıtım değil doğrudan satış.',
            ticks: [
              'Ürün, varyant ve stok yönetimi',
              'Sanal POS ve kargo entegrasyonu',
              'Kampanya, kupon ve sepet akışı',
              '<a href="/web-tasarim/e-ticaret-web-tasarim/">E-ticaret sayfası →</a>'
            ]
          },
          {
            h3: 'Yapay zekâ ajanlı site',
            p: 'Ziyaretçiyle konuşan, sorularını yanıtlayan ve talep toplayan asistanlı siteler.',
            ticks: [
              'Kendi içeriğinizle eğitilmiş asistan',
              '7/24 yanıt ve otomatik talep kaydı',
              'Web sitesi kapsamının tamamı dahil',
              '<a href="/web-tasarim/yapay-zeka-ajanli-web-sitesi/">Yapay zekâ ajanlı site sayfası →</a>'
            ]
          },
          {
            h3: 'Hizmet, randevu ve kampanya sayfaları',
            p: 'Klinik, servis ve atölye gibi randevuyla çalışan işletmeler ile reklam trafiğini dönüşüme çeviren tek hedefli sayfalar.',
            ticks: [
              'Online randevu ve teklif formu',
              'Tek dokunuşla arama ve WhatsApp',
              'Yerel arama görünürlüğü',
              'A/B testine uygun kampanya sayfası kurulumu'
            ]
          }
        ])
    }),

    T.section({
      label: '03 — Kapsam',
      h2: 'Her web tasarım projesinde standart olan işler',
      body:
        '<p>Aşağıdakiler ayrı kalem olarak fiyatlandırılmıyor; her projede varsayılan olarak yapılıyor. Bunları ekstra olarak satan yerler var, biz bunları işin kendisi sayıyoruz.</p>' +
        T.ticks([
          '<strong>İçerik yönetim paneli.</strong> Yazıyı, görseli, ürünü ve fiyatı koda dokunmadan kendiniz değiştirirsiniz.',
          '<strong>Teknik SEO kurulumu.</strong> Başlık ve açıklama etiketleri, başlık hiyerarşisi, yapılandırılmış veri, site haritası, robots.txt ve canonical yapısı.',
          '<strong>Mobil uyum.</strong> Tasarım mobil ekrandan başlıyor; masaüstü ondan sonra geliyor.',
          '<strong>Hız çalışması.</strong> Görsel optimizasyonu, modern görsel formatları, gereksiz betiklerin ayıklanması ve Core Web Vitals ölçümü.',
          '<strong>Erişilebilirlik temeli.</strong> Anlamlı başlık sırası, klavyeyle gezinme, görsellere alt metin, yeterli renk kontrastı.',
          '<strong>Analitik kurulumu.</strong> Google Analytics ve Search Console bağlantısı, site haritasının gönderilmesi.',
          '<strong>Alan adı ve sunucu teslimi.</strong> Her ikisi de sizin adınıza kayıtlı olur; kaynak koda tam erişiminiz kalır.'
        ])
    }),

    T.section({
      label: '04 — Süreç',
      h2: 'Bir web tasarım projesi nasıl ilerliyor?',
      body:
        T.steps([
          { h3: 'Kapsam görüşmesi', p: 'Sitenin ne için var olduğunu, kimi hedeflediğini ve bütçe aralığını konuşuyoruz. Sonunda kapsamı ve takvimi yazılı olarak paylaşıyoruz — saatlik değil, iş bazlı ve sabit fiyatla çalışıyoruz.' },
          { h3: 'İçerik mimarisi', p: 'Hangi sayfaların olacağını, hangi başlığın hangi sayfaya gireceğini ve site içi bağlantıların nasıl kurulacağını çıkarıyoruz. SEO açısından en belirleyici adım burası.' },
          { h3: 'Tasarım', p: 'Yerleşim, tipografi ve görsel dil üzerinde çalışıyoruz. Onay almadan koda geçmiyoruz.' },
          { h3: 'Geliştirme', p: 'Sayfalar, içerik paneli, formlar ve entegrasyonlar kuruluyor. Ara sürümleri canlı bir önizleme adresinden takip edebiliyorsunuz.' },
          { h3: 'Yayın ve devir', p: 'Alan adı ve sunucu bağlanıyor, analitik ve Search Console kuruluyor, panelin kullanımını ekran paylaşarak anlatıyoruz ve kısa bir kullanım videosu bırakıyoruz.' },
          { h3: 'Sonrası', p: 'Teslimden sonraki 30 gün boyunca hata düzeltmeleri ücretsiz. Devamı için aylık bakım anlaşması yapıyoruz: güncelleme, yedekleme, güvenlik yaması ve küçük içerik değişiklikleri.' }
        ])
    }),

    T.section({
      label: '05 — Fiyat',
      h2: 'Web tasarım fiyatı',
      body:
        priceNote(PRICES.web,
          'Bu, tek sayfalık tanıtım sitesinin en yalın kapsamdaki başlangıç fiyatı. Kesin rakamı belirleyen kalemler: sayfa sayısı, tasarımın özgünlük derecesi, içerik paneli ihtiyacı, entegrasyonlar (ödeme, kargo, muhasebe, CRM), çoklu dil ve bakım kapsamı. Kapsamı yazılı çıkarıp sabit teklif veriyoruz; proje ortasında ek kalem çıkarmıyoruz. Tüm hizmetlerin başlangıç fiyatlarını <a href="/hizmetler/#fiyatlar">hizmetler sayfasında</a> bir arada görebilirsiniz.')
    }),

    T.section({
      label: '06 — Referanslar',
      h2: 'Yayında olan web projelerimiz',
      body:
        '<p>Aşağıdaki projelerin hepsi canlı ve tasarımdan yayına kadar tüm süreç tarafımızdan yürütüldü.</p>' +
        T.relatedBlock([
          { title: 'Obsidian Security', desc: 'Siber güvenlik firması için koyu temalı kurumsal site', path: '/projeler/obsidian-security/' },
          { title: 'MakinaFleo', desc: 'İnsansız araç ve IoT ürünleri için ürün kataloglu site', path: '/projeler/makinafleo/' },
          { title: 'Sera Güzellik', desc: 'Konya’da bir estetik merkezi için randevu sistemli site', path: '/projeler/sera-guzellik/' },
          { title: 'UTKU Denizaltısı', desc: 'Askerî arayüz estetiğinde tanıtım sitesi ve animasyon', path: '/projeler/utku-denizalti/' }
        ]) +
        '<p><a href="/projeler/">Tüm projeleri görün →</a></p>'
    })
  ],
  faq: [
    { q: 'Web tasarım fiyatı neye göre belirleniyor?', a: 'Sayfa sayısı, tasarımın hazır tema mı özgün mü olduğu, içerik yönetim paneli ihtiyacı, entegrasyonlar (ödeme, kargo, muhasebe, CRM), çoklu dil desteği ve yayın sonrası bakım kapsamı fiyatı belirleyen ana kalemler. Her proje için kapsamı yazılı çıkarıp sabit fiyat veriyoruz; saatlik değil, iş bazlı çalışıyoruz.' },
    { q: 'Web sitesi yaptırmak ne kadar sürer?', a: 'Tek sayfalık tanıtım siteleri 1–2 hafta, çok sayfalı kurumsal siteler 3–5 hafta, e-ticaret projeleri 5–8 hafta sürüyor. Süreyi en çok içeriğin hazır olması etkiliyor: metin ve görseller baştan hazırsa teslim belirgin şekilde kısalıyor.' },
    { q: 'Hazır tema mı kullanıyorsunuz?', a: 'Hayır. Tasarımı her proje için markanın kendi görsel diline göre kuruyoruz ve yalnızca o projede kullanılan kodu yazıyoruz. Hazır temalar kullanılmayan özelliklerin kodunu da taşıdığı için hem sayfayı yavaşlatıyor hem de anlatımı temanın izin verdiği kalıba sokuyor.' },
    { q: 'Sitenin içeriğini sonradan kendim güncelleyebilir miyim?', a: 'Evet. Projeleri içerik yönetim paneliyle teslim ediyoruz; yazı, görsel, ürün ve fiyatları koda dokunmadan değiştirebiliyorsunuz. Teslimde panelin kullanımını ekranınızı paylaşarak anlatıyoruz ve kısa bir kullanım videosu bırakıyoruz.' },
    { q: 'SEO çalışması web tasarım fiyatına dahil mi?', a: 'Teknik SEO her projeye dahil: başlık ve açıklama etiketleri, başlık hiyerarşisi, yapılandırılmış veri, site haritası, hız optimizasyonu ve mobil uyumluluk. Sürekli içerik üretimi ve link çalışması ayrı bir hizmet olarak isteğe bağlı yürütülüyor.' },
    { q: 'Alan adı ve hosting’i siz mi ayarlıyorsunuz?', a: 'İsterseniz biz kuruyoruz, isterseniz kendi hesabınıza yayınlıyoruz. Alan adı ve sunucu her zaman sizin adınıza kayıtlı oluyor; kaynak koda ve hesaplara tam erişiminiz kalıyor.' }
  ],
  related: [
    { title: 'Kurumsal web tasarım', desc: 'Çok sayfalı kurumsal siteler için detaylı kapsam', path: '/web-tasarim/kurumsal-web-tasarim/' },
    { title: 'E-ticaret web tasarım', desc: 'Ürün, ödeme ve kargo entegrasyonlu satış siteleri', path: '/web-tasarim/e-ticaret-web-tasarim/' },
    { title: 'Yapay zekâ ajanlı web sitesi', desc: 'Ziyaretçiyle konuşan ve talep toplayan asistanlı site', path: '/web-tasarim/yapay-zeka-ajanli-web-sitesi/' },
    { title: 'Mobil uygulama geliştirme', desc: 'Android ve iOS için tek kod tabanından uygulama', path: '/mobil-uygulama-gelistirme/' }
  ],
  closing: {
    p: 'Aklınızdaki siteyi birkaç cümleyle yazın; 24 saat içinde kapsam ve fiyat aralığıyla dönelim. İlk görüşme ücretsiz.',
    subject: 'Web tasarım talebi'
  }
});


/* ==========================================================================
   /web-tasarim/kurumsal-web-tasarim/  —  PRIMARY: kurumsal web tasarım
   ========================================================================== */

pages.push({
  path: '/web-tasarim/kurumsal-web-tasarim/',
  crumbs: [HOME, HIZ, { name: 'Web tasarım', path: '/web-tasarim/' }, { name: 'Kurumsal web tasarım', path: '/web-tasarim/kurumsal-web-tasarim/' }],
  keywords: {
    primary: 'kurumsal web tasarım',
    secondary: ['kurumsal web sitesi', 'kurumsal site yaptırma', 'firma web sitesi', 'kurumsal internet sitesi'],
    intent: 'Ticari — kurumsal site yaptırmak isteyen firma'
  },
  title: 'Kurumsal Web Tasarım ve Kurumsal Web Sitesi | Romix Studio',
  description: 'Kurumsal web tasarım: hizmet sayfaları, referans ve ekip bölümleri, blog, çoklu dil ve içerik paneli. Teklif formuna yönlendiren, aranabilir kurumsal siteler.',
  ogImageAlt: 'Romix Studio kurumsal web tasarım projesi',
  label: 'Web / Kurumsal',
  h1: 'Kurumsal web tasarım',
  lead: 'Kurumsal site, çoğu firma için ilk izlenimin oluştuğu yer — ve çoğu zaman ilk satış görüşmesinin de başladığı yer. Buradaki iş, firmayı olduğundan başka göstermek değil; ne yaptığını arayan kişinin anlayacağı netlikte anlatmak.',
  waText: 'Merhaba, kurumsal web sitesi yaptırmak istiyorum.',
  stats: [
    { n: '3–5', l: 'Hafta ortalama teslim' },
    { n: '7', l: 'Canlı web projesi' },
    { n: '30 gün', l: 'Ücretsiz hata desteği' }
  ],
  service: {
    name: 'Kurumsal web sitesi tasarımı ve geliştirme',
    description: 'Marka odaklı, mobil uyumlu, içerik yönetim panelli kurumsal web siteleri.',
    serviceType: 'Kurumsal web tasarım',
    price: PRICES.web
  },
  sections: [
    T.section({
      label: '01 — Neden ayrı bir iş',
      h2: 'Kurumsal site, büyük bir tanıtım sitesi değildir',
      body:
        '<p>Tek sayfalık bir tanıtım sitesinde bütün mesele bir mesajı iyi anlatmaktır. Kurumsal sitede ise anlatılacak çok şey vardır ve asıl zorluk, bunları birbirini boğmadan yerleştirmektir: hizmetler, sektörler, referanslar, ekip, kariyer, blog, iletişim. Yanlış kurulduğunda ortaya “her şey var ama hiçbir şey bulunmuyor” diyebileceğimiz bir site çıkıyor.</p>' +
        '<p>Bu yüzden kurumsal projelerde işe içerik mimarisiyle başlıyoruz. Her hizmetin kendi sayfası oluyor, çünkü arama motorunda “kurumsal danışmanlık” arayan kişiyle “iş güvenliği eğitimi” arayan kişi aynı sayfaya inmemeli. Sayfalar arasındaki bağlantıları da rastgele değil, ziyaretçinin doğal olarak soracağı bir sonraki soruya göre kuruyoruz.</p>' +
        '<p>İkinci mesele güven. Kurumsal alıcı, karar vermeden önce firmanın gerçekten var olduğunu doğrulamak istiyor: kim çalışıyor, hangi işler yapılmış, nasıl ulaşılıyor, yasal bilgiler nerede. Bunlar sitede net durduğunda dönüşüm oranı, tasarımın kendisinden daha çok değişiyor.</p>'
    }),

    T.section({
      label: '02 — Yapı',
      h2: 'Kurumsal bir sitede hangi sayfalar olmalı?',
      body:
        '<p>Aşağıdaki yapı bir başlangıç noktası. Sektöre göre bölüm ekliyor ya da çıkarıyoruz; gereksiz sayfa açmak, ince içerikli sayfalar ürettiği için siteye zarar veriyor.</p>' +
        T.cards([
          {
            h3: 'Ana sayfa',
            p: 'Firmanın ne yaptığını ilk ekranda söyleyen, ziyaretçiyi doğru hizmet sayfasına dağıtan giriş.',
            ticks: ['Net değer önerisi', 'Hizmetlere dağıtım', 'Öne çıkan referanslar', 'Tek bir birincil çağrı']
          },
          {
            h3: 'Hizmet sayfaları',
            p: 'Her hizmet için ayrı sayfa. Aramada karşılığı olan asıl sayfalar bunlar.',
            ticks: ['Hizmetin kapsamı ve kimin için olduğu', 'Süreç anlatımı', 'Sık sorulan sorular', 'İlgili referanslara bağlantı']
          },
          {
            h3: 'Kurumsal ve ekip',
            p: 'Firmanın hikâyesi, çalışma biçimi ve arkasındaki insanlar.',
            ticks: ['Hakkımızda', 'Ekip ve uzmanlıklar', 'Belge ve yetkinlikler', 'Kariyer']
          },
          {
            h3: 'Referans ve blog',
            p: 'Yapılan işler ve firmanın alanında ne bildiğini gösteren içerik.',
            ticks: ['Proje ve vaka sayfaları', 'Sektör bazlı filtreleme', 'Blog altyapısı', 'Çoklu dil desteği']
          }
        ])
    }),

    T.section({
      label: '03 — Kapsam',
      h2: 'Kurumsal projelerde standart kapsam',
      body:
        T.ticks([
          '<strong>Özgün tasarım.</strong> Hazır tema kullanılmıyor; yerleşim ve tipografi markanın kendi diline göre kuruluyor.',
          '<strong>İçerik yönetim paneli.</strong> Sayfa, blog yazısı, referans ve ekip kayıtlarını kendiniz yönetirsiniz.',
          '<strong>Çoklu dil.</strong> Türkçe ve İngilizce ayrı adreslerde yayınlanır, hreflang ilişkileri doğru kurulur.',
          '<strong>Teklif ve iletişim formları.</strong> Gelen talep e-posta ve/veya WhatsApp bildirimi olarak size düşer.',
          '<strong>Teknik SEO.</strong> Sayfa başına benzersiz başlık ve açıklama, başlık hiyerarşisi, yapılandırılmış veri, site haritası.',
          '<strong>Analitik.</strong> Google Analytics ve Search Console kurulumu, site haritasının gönderilmesi.',
          '<strong>Yasal sayfalar.</strong> Gizlilik politikası, KVKK aydınlatma metni ve çerez bildirimi için sayfa yapısı.'
        ])
    }),

    T.section({
      label: '04 — Örnek',
      h2: 'Bir kurumsal proje: Obsidian Security',
      body:
        '<p>Siber güvenlik gibi anlatması zor bir hizmette kurumsal sitenin işi, teknik bir katalog üretmek değil ciddiyeti ve yetkinliği hissettirmek. Obsidian Security projesinde hizmetleri tek bir dikey anlatı olarak kurduk: ziyaretçi aşağı indikçe tehdit avcılığı, olay müdahalesi ve sürekli izleme sırayla açılıyor.</p>' +
        '<p><a href="/projeler/obsidian-security/">Obsidian Security proje sayfasını inceleyin →</a></p>'
    }),

    T.section({
      label: '05 — Fiyat ve süre',
      h2: 'Kurumsal web sitesi fiyatı ve teslim süresi',
      body:
        priceNote(PRICES.web,
          'Kurumsal projeler tek sayfalık sitelere göre daha geniş kapsamlı olduğu için gerçekleşen rakam bu başlangıcın üzerinde çıkıyor; sayfa sayısı, çoklu dil ve entegrasyonlar belirleyici. Ortalama teslim süresi 3–5 hafta. Kesin fiyatı, kapsamı yazılı olarak çıkardıktan sonra sabit teklif olarak veriyoruz.') +
        '<p><a href="/hizmetler/#fiyatlar">Tüm hizmetlerin başlangıç fiyatlarını görün →</a></p>'
    })
  ],
  faq: [
    { q: 'Kurumsal web sitesi ile tanıtım sitesi arasındaki fark ne?', a: 'Tanıtım sitesi tek bir mesajı anlatır ve genellikle tek sayfadır. Kurumsal sitede hizmetler, sektörler, referanslar, ekip, blog ve kariyer gibi birbirinden ayrı içerikler vardır; asıl iş bunları birbirini boğmadan yerleştiren bir içerik mimarisi kurmaktır. Kurumsal sitelerde her hizmetin kendi sayfası olur, çünkü aramada karşılığı olan sayfalar bunlardır.' },
    { q: 'Kurumsal web sitesi kaç sayfa olmalı?', a: 'Sayfa sayısını hedef değil sonuç olarak görüyoruz. Her hizmet için bir sayfa, kurumsal bilgi için bir sayfa, referanslar ve iletişim için birer sayfa tipik bir tabanı oluşturuyor. İçeriği olmayan sayfa açmak siteye zarar veriyor: ince içerikli sayfalar hem ziyaretçiyi hem arama motorunu yanıltıyor.' },
    { q: 'Kurumsal sitede çoklu dil nasıl kuruluyor?', a: 'Türkçe ve İngilizce içerik ayrı adreslerde yayınlanıyor ve aralarındaki hreflang ilişkisi karşılıklı olarak tanımlanıyor. Otomatik çeviriyle sayfa çoğaltmıyoruz; İngilizce içerik gerçekten hazırlanacaksa kuruyoruz, aksi halde tek dille kalmak siteye daha iyi geliyor.' },
    { q: 'Mevcut kurumsal sitemizi yenileyebilir misiniz?', a: 'Evet. Bu durumda önce mevcut adreslerin hangilerinin aramada karşılığı olduğunu çıkarıyoruz. Adres yapısı değişecekse eski adreslerden yenilerine kalıcı yönlendirme kuruyoruz ve site içi bağlantılarla canonical etiketlerini güncelliyoruz; böylece yenileme sırasında birikmiş arama görünürlüğü kaybolmuyor.' },
    { q: 'KVKK ve gizlilik metinlerini siz mi hazırlıyorsunuz?', a: 'Sayfa yapısını ve teknik altyapıyı (çerez bildirimi, form onayları, veri saklama süresi ayarları) biz kuruyoruz. Metinlerin hukuki içeriğinin sizin tarafınızdan ya da hukuk danışmanınız tarafından verilmesi gerekiyor; hazır metin uydurmuyoruz.' }
  ],
  related: [
    { title: 'Web tasarım', desc: 'Tüm web tasarım hizmetlerine genel bakış', path: '/web-tasarim/' },
    { title: 'E-ticaret web tasarım', desc: 'Ürün satan işletmeler için satış odaklı siteler', path: '/web-tasarim/e-ticaret-web-tasarim/' },
    { title: 'Yapay zekâ ajanlı web sitesi', desc: 'Kurumsal siteye ziyaretçiyle konuşan asistan ekleyin', path: '/web-tasarim/yapay-zeka-ajanli-web-sitesi/' },
    { title: 'Kurumsal web sitesi nasıl olmalı?', desc: 'Blog: kurumsal sitede nelerin bulunması gerektiği', path: '/blog/kurumsal-web-sitesi-nasil-olmali/' }
  ],
  closing: {
    p: 'Firmanızı ve sitenin ne yapmasını istediğinizi yazın; kapsam önerisi ve fiyat aralığıyla 24 saat içinde dönelim.',
    subject: 'Kurumsal web sitesi talebi',
    waText: 'Merhaba, kurumsal web sitesi yaptırmak istiyorum.'
  }
});


/* ==========================================================================
   /web-tasarim/e-ticaret-web-tasarim/  —  PRIMARY: e-ticaret sitesi kurma
   ========================================================================== */

pages.push({
  path: '/web-tasarim/e-ticaret-web-tasarim/',
  crumbs: [HOME, HIZ, { name: 'Web tasarım', path: '/web-tasarim/' }, { name: 'E-ticaret web tasarım', path: '/web-tasarim/e-ticaret-web-tasarim/' }],
  keywords: {
    primary: 'e-ticaret sitesi kurma',
    secondary: ['e-ticaret web tasarım', 'online satış sitesi', 'e-ticaret sitesi yaptırma', 'sanal mağaza kurulumu'],
    intent: 'Ticari — online satışa geçmek isteyen işletme'
  },
  title: 'E-Ticaret Sitesi Kurma ve E-Ticaret Web Tasarım | Romix Studio',
  description: 'Ürün ve stok yönetimi, sanal POS, kargo ve e-fatura entegrasyonlu e-ticaret sitesi kurulumu. Sepet, arama ve filtreleme akışları satış odaklı kurgulanır.',
  ogImageAlt: 'Romix Studio e-ticaret web tasarım projesi',
  label: 'Web / E-ticaret',
  h1: 'E-ticaret sitesi kurma',
  lead: 'Ürün satan bir işletmede sitenin işi tanıtım değil, satış. Bu yüzden e-ticaret projelerinde tasarımdan önce konuştuğumuz şey akış: ziyaretçi ürünü nasıl bulacak, sepete nasıl gidecek, ödemede nerede takılacak.',
  waText: 'Merhaba, e-ticaret sitesi kurdurmak istiyorum.',
  service: {
    name: 'E-ticaret sitesi kurulumu',
    description: 'Ürün yönetimi, ödeme ve kargo entegrasyonlu online satış siteleri.',
    serviceType: 'E-ticaret sitesi kurulumu',
    price: PRICES.web
  },
  sections: [
    T.section({
      label: '01 — Öncelik',
      h2: 'E-ticarette tasarımdan önce gelen üç akış',
      body:
        '<p>Bir e-ticaret sitesinde ciroyu belirleyen şey çoğu zaman ana sayfanın görünüşü değil, üç akışın ne kadar pürüzsüz çalıştığı: ürünü bulma, sepete ekleme ve ödemeyi tamamlama. Bu üçünün her birinde kaybedilen ziyaretçi, reklam bütçesiyle geri alınmak zorunda kalınıyor.</p>' +
        '<p><strong>Ürünü bulma.</strong> Katalog büyüdükçe arama ve filtreleme, menüden daha önemli hale geliyor. Arama kutusunun yazım hatasını tolere etmesi, filtrelerin gerçekten kullanılan özelliklere göre kurulması ve kategori sayfalarının kendi içeriğine sahip olması gerekiyor — kategori sayfaları aynı zamanda aramadan en çok trafik alan sayfalar.</p>' +
        '<p><strong>Sepet ve ödeme.</strong> Sepeti terk etme oranı çoğunlukla teknik sebeplerden yükseliyor: zorunlu üyelik, sürpriz kargo ücreti, uzun form, mobilde bozulan ödeme ekranı. Kurulumda bu noktaların hepsini tek tek ele alıyoruz; misafir alışverişi varsayılan oluyor ve kargo ücreti sepette baştan görünüyor.</p>' +
        '<p><strong>Ürün sayfası.</strong> Varyant seçimi (renk, beden, adet), stok durumunun net görünmesi, kargo süresi ve iade koşulunun sayfada olması — bunlar dekoratif detaylar değil, satın alma kararının verildiği yerler.</p>'
    }),

    T.section({
      label: '02 — Kapsam',
      h2: 'E-ticaret kurulumunda neler var?',
      body:
        T.cards([
          {
            h3: 'Ürün ve katalog',
            ticks: ['Ürün, varyant ve stok yönetimi', 'Kategori ve koleksiyon yapısı', 'Toplu ürün aktarımı', 'Arama ve filtreleme', 'Ürün yapılandırılmış verisi']
          },
          {
            h3: 'Satış ve ödeme',
            ticks: ['Sanal POS ve ödeme sağlayıcı entegrasyonu', 'Kampanya, kupon ve indirim kuralları', 'Misafir alışverişi ve üyelik', 'Sepeti terk hatırlatması', 'Taksit seçenekleri']
          },
          {
            h3: 'Sipariş ve lojistik',
            ticks: ['Kargo firması ve takip numarası entegrasyonu', 'Sipariş durumu bildirimleri', 'İade ve değişim akışı', 'Muhasebe ve e-fatura programlarına bağlanma']
          },
          {
            h3: 'Büyüme',
            ticks: ['Google Merchant Center beslemesi', 'Reklam pikselleri ve dönüşüm takibi', 'Kategori sayfası SEO yapısı', 'Ürün konfigüratörü gibi özel satış akışları']
          }
        ])
    }),

    T.section({
      label: '03 — Karar',
      h2: 'Hazır platform mu, özel kurulum mu?',
      body:
        '<p>Bu soruya peşin bir cevabımız yok; ikisini de kuruyoruz ve hangisinin doğru olduğu ürün yapınıza bağlı. Standart bir katalog satıyorsanız ve akışınız sektördeki diğerlerine benziyorsa hazır bir platform üzerine kurulum hem daha hızlı hem daha ucuz oluyor. Buna karşılık ürününüz yapılandırılabiliyorsa (ölçüye göre üretim, parça seçimli montaj, projeye özel fiyatlama) hazır platformlar hızla yetersiz kalıyor; orada özel kurulum gerekiyor.</p>' +
        '<p>Kararı ilk görüşmede birlikte veriyoruz. Amacı olmayan bir özel yazılım maliyeti çıkarmak da, ilerde duvara toslayacak bir hazır kurulum yapmak da işinize yaramaz.</p>'
    }),

    T.section({
      label: '04 — Fiyat ve süre',
      h2: 'E-ticaret sitesi fiyatı ve teslim süresi',
      body:
        priceNote(PRICES.web,
          'E-ticaret projeleri ürün sayısı, varyant yapısı ve entegrasyon adedine göre bu başlangıcın belirgin şekilde üzerine çıkıyor. Ortalama teslim süresi 5–8 hafta; süreyi en çok ürün verisinin (görsel, açıklama, varyant, stok) hazır olması etkiliyor. Sanal POS başvurusu ve e-fatura entegrasyonu gibi kalemler üçüncü tarafların onay süresine bağlı olduğu için takvime ayrı yazılıyor.')
    })
  ],
  faq: [
    { q: 'E-ticaret sitesi kurmak ne kadar sürer?', a: 'Ortalama 5–8 hafta. Süreyi en çok ürün verisinin hazır olması belirliyor: görseller, açıklamalar, varyantlar ve stok bilgisi baştan düzenli geldiyse teslim kısalıyor. Sanal POS başvurusu ve e-fatura entegrasyonu üçüncü tarafların onayına bağlı olduğu için bu kalemler takvimde ayrı gösteriliyor.' },
    { q: 'Hangi ödeme ve kargo firmalarıyla çalışıyorsunuz?', a: 'Türkiye’de yaygın kullanılan sanal POS ve ödeme sağlayıcılarıyla, kargo firmalarının standart entegrasyon servisleriyle çalışıyoruz. Hangi sağlayıcıyla çalışacağınız sizin bankanız ve anlaşmanızla ilgili bir karar; biz seçtiğiniz sağlayıcının entegrasyonunu kuruyoruz.' },
    { q: 'Mevcut ürünlerimizi yeni siteye aktarabilir misiniz?', a: 'Evet. Ürünler Excel/CSV ya da mevcut platformun dışa aktarım dosyası olarak geldiğinde toplu aktarım yapıyoruz. Aktarım öncesi veriyi birlikte gözden geçiriyoruz; dağınık kategori ve varyant yapısı aktarım sırasında düzeltilmezse yeni sitede de aynı şekilde kalıyor.' },
    { q: 'E-fatura ve muhasebe programımıza bağlanabilir mi?', a: 'Programınız bir API ya da entegrasyon servisi sunuyorsa bağlanabiliyor. İlk görüşmede kullandığınız programı ve sürümünü öğrenip entegrasyonun mümkün olup olmadığını netleştiriyoruz; mümkün değilse bunu baştan söylüyoruz.' },
    { q: 'Sepeti terk edenlere otomatik hatırlatma kurulabiliyor mu?', a: 'Evet. Sepette ürün bırakıp ayrılan kullanıcılara e-posta hatırlatması kurulabiliyor. Bunun çalışması için kullanıcının e-posta adresini vermiş olması ve pazarlama iletisi onayının alınmış olması gerekiyor; onay akışını KVKK’ya uygun şekilde kuruyoruz.' }
  ],
  related: [
    { title: 'Web tasarım', desc: 'Tüm web tasarım hizmetlerine genel bakış', path: '/web-tasarim/' },
    { title: 'Kurumsal web tasarım', desc: 'Çok sayfalı kurumsal siteler', path: '/web-tasarim/kurumsal-web-tasarim/' },
    { title: 'İşletme otomasyonu', desc: 'Sipariş, stok ve cari takibini tek panelde toplayın', path: '/otomasyon/isletme-otomasyonu/' },
    { title: 'Özel yazılım geliştirme', desc: 'Standart platformların yetmediği satış akışları için', path: '/ozel-yazilim/' }
  ],
  closing: {
    p: 'Ne sattığınızı, kaç ürününüz olduğunu ve hangi entegrasyonlara ihtiyacınız olduğunu yazın; kapsamı çıkarıp fiyat aralığıyla dönelim.',
    subject: 'E-ticaret sitesi talebi',
    waText: 'Merhaba, e-ticaret sitesi kurdurmak istiyorum.'
  }
});


/* ==========================================================================
   /web-tasarim/yapay-zeka-ajanli-web-sitesi/
   PRIMARY: yapay zeka ajanlı web sitesi
   ========================================================================== */

pages.push({
  path: '/web-tasarim/yapay-zeka-ajanli-web-sitesi/',
  crumbs: [HOME, HIZ, { name: 'Web tasarım', path: '/web-tasarim/' }, { name: 'Yapay zekâ ajanlı web sitesi', path: '/web-tasarim/yapay-zeka-ajanli-web-sitesi/' }],
  keywords: {
    primary: 'yapay zeka ajanlı web sitesi',
    secondary: ['yapay zeka asistanlı site', 'web sitesi yapay zeka chatbot', 'ai asistanlı web sitesi'],
    intent: 'Ticari — sitesine yapay zekâ asistanı ekletmek isteyen işletme'
  },
  title: 'Yapay Zekâ Ajanlı Web Sitesi | Romix Studio',
  description: 'Kendi hizmet ve fiyatlarınızla eğitilmiş bir asistanın ziyaretçiyle konuştuğu, soruları yanıtladığı ve talep topladığı web siteleri. Web sitesi kapsamının tamamı dahil.',
  ogImageAlt: 'Romix Studio yapay zekâ ajanlı web sitesi hizmeti',
  label: 'Web / Yapay zekâ',
  h1: 'Yapay zekâ ajanlı web sitesi',
  lead: 'Sıradan bir site ziyaretçiye yalnızca yazılanı gösterir; ajanlı site onunla konuşur. Sitenize kendi hizmetleriniz ve fiyatlarınızla eğitilmiş bir asistan yerleştiriyoruz — “bu iş bende ne kadar tutar”, “ne kadar sürer” sorularının yanıtı, siz uykudayken bile anında veriliyor.',
  waText: 'Merhaba, yapay zekâ ajanlı site hakkında bilgi almak istiyorum.',
  service: {
    name: 'Yapay zekâ ajanlı web sitesi',
    description: 'Ziyaretçiyle konuşan, soruları yanıtlayan ve talep toplayan yapay zekâ asistanlı web siteleri.',
    serviceType: 'Yapay zekâ ajanlı web sitesi',
    price: PRICES.aiSite
  },
  sections: [
    T.section({
      label: '01 — Sorun',
      h2: 'Cevapsız kalan soru, kaybedilen taleptir',
      body:
        '<p>Bir hizmet sitesine gelen ziyaretçilerin çoğu, formu doldurmadan önce cevabını bilmek istediği bir soruyla geliyor: fiyat aralığı, süre, kapsamın içinde ne var. Bu sorunun cevabı sitede yoksa ya da bulunamıyorsa ziyaretçi form doldurmuyor — bir sonraki sekmedeki firmaya geçiyor. Mesai dışında gelen trafikte bu kayıp daha da büyük.</p>' +
        '<p>Klasik canlı destek bu sorunu çözmüyor, sadece erteliyor: “en kısa sürede döneceğiz” mesajı, ziyaretçinin o an aradığı cevap değil. Yapay zekâ ajanı, bu boşluğu kapatmak için var.</p>'
    }),

    T.section({
      label: '02 — Çalışma biçimi',
      h2: 'Asistan tam olarak ne yapıyor?',
      body:
        T.cards([
          {
            h3: 'Soruyu yanıtlıyor',
            p: 'Ziyaretçinin sorusunu anlıyor ve yanıtı sizin verdiğiniz içerikten üretiyor.',
            ticks: ['Hizmet, kapsam ve fiyat soruları', 'Süreç ve teslim süresi soruları', 'Türkçe ve İngilizce konuşabilme', '7/24 yanıt, bekleme yok']
          },
          {
            h3: 'Talep topluyor',
            p: 'Konuşmanın sonunda kişinin adını, telefonunu ve ne istediğini toparlayıp size iletiyor.',
            ticks: ['İletişim bilgisi ve talep kaydı', 'WhatsApp veya e-posta bildirimi', 'Konuşma dökümünün saklanması']
          },
          {
            h3: 'Sınırını biliyor',
            p: 'Yalnızca sizin verdiğiniz bilgilerle konuşuyor.',
            ticks: ['Bilmediği konuda uydurmuyor', 'Sizi devreye alıyor', 'Fiyat ve taahhüt sınırları önceden tanımlanıyor']
          },
          {
            h3: 'Geri bildirim veriyor',
            p: 'Ziyaretçilerin gerçekte ne sorduğunu görünür kılıyor.',
            ticks: ['Sık sorulanların raporu', 'Yanıtsız kalan soruların listesi', 'İçeriğin buna göre güncellenmesi']
          }
        ])
    }),

    T.section({
      label: '03 — Sınırlar',
      h2: 'Neyi yapmıyor, açıkça söylüyoruz',
      body:
        '<p>Asistanı kurarken en çok zaman harcadığımız iş, ne söyleyeceğini değil <em>ne söylemeyeceğini</em> tanımlamak. Yapay zekâ asistanlarının bilinen riski, bilmediği bir şeyi emin bir dille uydurması. Kurulumda bunu üç şekilde sınırlıyoruz: asistan yalnızca sizin verdiğiniz içerikten yanıtlıyor, kesin fiyat ve tarih taahhüdü vermesi engelleniyor, ve kapsamı aşan sorularda konuşmayı size aktarıyor.</p>' +
        '<p>Bu, asistanın her soruyu cevaplayacağı anlamına gelmiyor — zaten istediğimiz de bu değil. İstediğimiz, verdiği her cevabın sizin arkasında durabileceğiniz bir cevap olması. Yayına almadan önce gerçek sorularla test ediyor, çıkan yanıtları birlikte gözden geçiriyoruz.</p>' +
        '<p>Asistanın kullandığı içerik sizin kontrolünüzde kalıyor: fiyat değiştiğinde ya da yeni bir hizmet eklendiğinde bilgi tabanını panelden güncelliyorsunuz, asistan bir sonraki konuşmadan itibaren yeni bilgiyle çalışıyor.</p>'
    }),

    T.section({
      label: '04 — Fiyat',
      h2: 'Yapay zekâ ajanlı site fiyatı',
      body:
        priceNote(PRICES.aiSite,
          'Bu rakama web sitesinin tamamı dahil: özgün tasarım, geliştirme, içerik paneli ve teknik SEO. Asistanın kurulumu, bilgi tabanının hazırlanması ve yayın öncesi test de kapsamda. Mevcut bir siteye yalnızca asistan eklenmesi ayrıca değerlendiriliyor. Yapay zekâ servis sağlayıcısının kullanım ücreti (kullanım hacmine göre değişen aylık gider) fiyata dahil değil; hangi hacimde ne kadar tutacağını kurulum öncesi hesaplayıp paylaşıyoruz.')
    })
  ],
  faq: [
    { q: 'Asistan yanlış bilgi verir mi?', a: 'Asistan yalnızca sizin verdiğiniz içerikten yanıtlıyor; kesin fiyat ve tarih taahhüdü vermesi engelleniyor ve kapsamı aşan sorularda konuşmayı size aktarıyor. Yayına almadan önce gerçek sorularla test edip çıkan yanıtları birlikte gözden geçiriyoruz. Buna rağmen asistanların bilmediğini uydurma riski tümüyle sıfırlanamaz; bu yüzden taahhüt gerektiren konuları baştan kapsam dışında bırakıyoruz.' },
    { q: 'Asistanın bilgilerini sonradan güncelleyebilir miyim?', a: 'Evet. Bilgi tabanı içerik panelinden yönetiliyor; fiyat değiştiğinde ya da yeni hizmet eklendiğinde oradan güncelliyorsunuz ve asistan bir sonraki konuşmadan itibaren yeni bilgiyle çalışıyor.' },
    { q: 'Gelen talepler bana nasıl ulaşıyor?', a: 'Konuşmanın sonunda toplanan ad, telefon ve talep bilgisi e-posta ya da WhatsApp bildirimi olarak size düşüyor. Konuşma dökümü de panelde saklanıyor, böylece görüşmeye kişinin neyi sorduğunu bilerek başlıyorsunuz.' },
    { q: 'Mevcut siteme sadece asistan eklenebilir mi?', a: 'Çoğu durumda evet, ama mevcut sitenin yapısına bağlı. İlk görüşmede sitenizi inceleyip eklenip eklenemeyeceğini ve fiyatını söylüyoruz.' },
    { q: 'Asistanın aylık bir maliyeti var mı?', a: 'Evet. Yapay zekâ servis sağlayıcısı kullanım hacmine göre ücretlendiriyor, bu aylık bir gider oluşturuyor ve kurulum fiyatına dahil değil. Sitenizin trafiğine göre yaklaşık aylık tutarı kurulum öncesi hesaplayıp paylaşıyoruz, böylece sürpriz olmuyor.' }
  ],
  related: [
    { title: 'Web tasarım', desc: 'Tüm web tasarım hizmetlerine genel bakış', path: '/web-tasarim/' },
    { title: 'Kurumsal web tasarım', desc: 'Asistanı kurumsal sitenizin üzerine kurun', path: '/web-tasarim/kurumsal-web-tasarim/' },
    { title: 'Yapay zekâ otomasyonu', desc: 'Yapay zekâyı iç süreçlerinizde kullanın', path: '/otomasyon/yapay-zeka-otomasyonu/' },
    { title: 'İşletme otomasyonu', desc: 'Gelen talebi panelde takip edin', path: '/otomasyon/isletme-otomasyonu/' }
  ],
  closing: {
    p: 'Ziyaretçilerinizin en çok sorduğu üç soruyu yazın; asistanın bunları nasıl yanıtlayacağını örnekleyerek dönelim.',
    subject: 'Yapay zekâ ajanlı site talebi',
    waText: 'Merhaba, yapay zekâ ajanlı site hakkında bilgi almak istiyorum.'
  }
});


/* ==========================================================================
   /mobil-uygulama-gelistirme/  —  PRIMARY: mobil uygulama geliştirme
   ========================================================================== */

pages.push({
  path: '/mobil-uygulama-gelistirme/',
  crumbs: [HOME, HIZ, { name: 'Mobil uygulama geliştirme', path: '/mobil-uygulama-gelistirme/' }],
  keywords: {
    primary: 'mobil uygulama geliştirme',
    secondary: ['mobil uygulama yaptırma', 'Android uygulama geliştirme', 'iOS uygulama geliştirme', 'mobil uygulama fiyatları'],
    intent: 'Ticari — uygulama yaptırmak isteyen işletme veya girişimci'
  },
  title: 'Mobil Uygulama Geliştirme: Android ve iOS | Romix Studio',
  description: 'Tek kod tabanından Android ve iOS mobil uygulama geliştirme. Google Play ve App Store yayın süreci, bildirim altyapısı ve güncellemeler dahil.',
  ogImage: ORIGIN + '/img/yolarkadasim-app.jpg',
  ogImageAlt: 'YolArkadaşım mobil uygulamasının rota ve maliyet hesaplama ekranı',
  label: 'Mobil',
  h1: 'Mobil uygulama geliştirme',
  lead: 'Android ve iOS uygulamalarını tek kod tabanından geliştiriyoruz; bu, iki ayrı native uygulama yazdırmaya göre hem süreyi hem maliyeti düşürüyor. Uygulamayı yalnızca yazmıyoruz: mağaza görselleri, açıklama metinleri, yayın süreci ve sonraki sürümler de bize ait.',
  waText: 'Merhaba, mobil uygulama yaptırmak istiyorum.',
  stats: [
    { n: '3', l: 'Google Play’de yayında uygulama' },
    { n: '6–12', l: 'Hafta ortalama teslim' },
    { n: '2', l: 'Platform, tek kod tabanı' }
  ],
  service: {
    name: 'Mobil uygulama geliştirme',
    description: 'Android ve iOS için tek kod tabanından geliştirilen, mağazaya yayınlanan mobil uygulamalar.',
    serviceType: 'Mobil uygulama geliştirme',
    price: PRICES.mobil
  },
  sections: [
    T.section({
      label: '01 — Yayındaki işler',
      h2: 'Google Play’de yayında olan üç uygulamamız var',
      body:
        '<p>Mobil tarafta anlattığımız her şeyin karşılığı mağazada duruyor. Üçü de arayüzden yayına kadar tarafımızdan geliştirildi.</p>' +
        T.relatedBlock([
          { title: 'YolArkadaşım', desc: 'Rota, yakıt ve HGS maliyetini birlikte hesaplayan navigasyon uygulaması', path: '/projeler/yolarkadasim/' },
          { title: 'Ramazan İmsakiyesi', desc: 'Geri sayım, kıble pusulası ve zikirmatik içeren Ramazan uygulaması', path: '/projeler/ramazan-imsakiyesi/' },
          { title: 'Word Vortex', desc: 'Bölüm tabanlı kelime oyunu; seviye haritası ve ipucu ekonomisi', path: '/projeler/word-vortex/' }
        ])
    }),

    T.section({
      label: '02 — Yaklaşım',
      h2: 'Neden tek kod tabanı?',
      body:
        '<p>Android ve iOS için ayrı ayrı native uygulama yazdırmak, aynı işi iki kez yaptırmak demek: iki ekip, iki takvim, iki bakım hattı ve her yeni özellikte iki kat iş. Bunun karşılığında elde edilen fark, uygulamaların büyük çoğunluğunda kullanıcının fark edemeyeceği kadar küçük.</p>' +
        '<p>Bu yüzden uygulamayı tek kod tabanından her iki platforma birden geliştiriyoruz. Süre kısalıyor, maliyet düşüyor ve — belki en önemlisi — güncellemeler tek yerden yapılabiliyor. İki platformu ayrı ayrı fiyatlandırmıyoruz.</p>' +
        '<p>Bunun bir sınırı var ve baştan söylüyoruz: yoğun grafik işleyen, cihazın alt seviye donanımına derinlemesine giren ya da milisaniye hassasiyeti gerektiren işlerde native geliştirme hâlâ doğru tercih. Projeniz bu tanıma giriyorsa bunu ilk görüşmede belirtiyoruz.</p>'
    }),

    T.section({
      label: '03 — Kapsam',
      h2: 'Sık kurduğumuz uygulama tipleri ve standart kapsam',
      body:
        T.cards([
          {
            h3: 'Sık kurduğumuz uygulama tipleri',
            ticks: [
              'Saha ekibi ve kurye takip uygulamaları',
              'Üyelik, rezervasyon ve QR ile giriş',
              'Sipariş ve QR menü sistemleri',
              'Konum ve harita tabanlı uygulamalar',
              'Oyun ve bölüm tabanlı uygulamalar'
            ]
          },
          {
            h3: 'Her uygulamada standart',
            ticks: [
              'Push bildirim altyapısı',
              'Çevrimdışı çalışma ve veri eşitleme',
              'Kullanım analitiği ve hata takibi',
              'Mağaza yayın ve güncelleme yönetimi',
              'Uygulama içi satın alma kurulumu'
            ]
          }
        ])
    }),

    T.section({
      label: '04 — Süreç',
      h2: 'Mobil uygulama geliştirme süreci',
      body:
        T.steps([
          { h3: 'Kapsam ve ekran listesi', p: 'Uygulamanın ne yapacağını ekran ekran çıkarıyoruz. Fiyatı ve süreyi belirleyen ilk kalem bu liste; sunucu tarafı ihtiyacı (üyelik, veritabanı, bildirim) da burada netleşiyor.' },
          { h3: 'Arayüz tasarımı', p: 'Ekranları tıklanabilir tasarım olarak paylaşıyoruz. Uygulamayı yayına almadan önce elinizde gezebiliyorsunuz; geliştirmeye akış onaylandıktan sonra başlıyoruz.' },
          { h3: 'Geliştirme', p: 'Uygulama ve gerekiyorsa sunucu tarafı birlikte kuruluyor. İki haftada bir yüklenebilir bir test sürümü gönderiyoruz, ilerlemeyi kendi telefonunuzdan görüyorsunuz.' },
          { h3: 'Test', p: 'Farklı ekran boyutları ve işletim sistemi sürümlerinde deneme, hata takibi kurulumu ve düzeltmeler.' },
          { h3: 'Mağaza yayını', p: 'Google Play ve App Store hesap kurulumu, mağaza görselleri, açıklama metinleri, gizlilik formu ve inceleme sürecinin yürütülmesi.' },
          { h3: 'Yayın sonrası', p: 'İlk 30 gün hata düzeltmeleri ücretsiz. Sonrasında güncellemeler, işletim sistemi sürüm uyumu ve yeni özellikler bakım anlaşması kapsamında ilerliyor.' }
        ])
    }),

    T.section({
      label: '05 — Fiyat',
      h2: 'Mobil uygulama fiyatı',
      body:
        priceNote(PRICES.mobil,
          'Fiyatı belirleyen ana kalemler: ekran sayısı, sunucu tarafı ihtiyacı (üyelik, veritabanı, bildirim), ödeme ya da harita gibi entegrasyonlar ve mağaza yayın sürecinin kapsama dahil olup olmadığı. Android ve iOS tek kod tabanından geliştirildiği için iki platform ayrı ayrı fiyatlandırılmıyor. Mağaza geliştirici hesabı ücretleri (Google Play tek seferlik, App Store yıllık) fiyata dahil değil ve doğrudan sizin adınıza açılıyor.')
    })
  ],
  faq: [
    { q: 'Mobil uygulama yaptırmak ne kadar tutar?', a: 'Mobil uygulamalar 30.000 ₺’den başlıyor. Fiyatı belirleyen ana kalemler ekran sayısı, sunucu tarafı ihtiyacı (üyelik, veritabanı, bildirim), ödeme ya da harita gibi entegrasyonlar ve mağaza yayın sürecinin kapsama dahil olup olmadığı. Android ve iOS’u tek kod tabanından geliştirdiğimiz için iki platform ayrı ayrı fiyatlandırılmıyor.' },
    { q: 'Uygulamayı hem Android hem iOS için mi geliştiriyorsunuz?', a: 'Evet. Tek kod tabanından her iki platforma birden geliştiriyoruz; bu, iki ayrı native uygulama yazdırmaya göre hem süreyi hem maliyeti düşürüyor. Google Play ve App Store yayın süreçlerini, mağaza görsellerini ve güncellemeleri de biz yürütüyoruz.' },
    { q: 'Mobil uygulama geliştirme ne kadar sürer?', a: 'Ortalama 6–12 hafta. Süreyi en çok ekran sayısı ve sunucu tarafı ihtiyacı belirliyor. Mağaza inceleme süreçleri buna ek olarak birkaç gün ile birkaç hafta arasında değişebiliyor ve bu süre tümüyle mağazaların kontrolünde.' },
    { q: 'Mağaza hesaplarını kim açıyor?', a: 'Hesaplar sizin adınıza açılıyor ve size ait kalıyor — uygulamanın sahibi siz olursunuz. Kurulumu ve yayın sürecini biz yürütüyoruz. Google Play geliştirici hesabı tek seferlik, App Store hesabı yıllık ücretli; bu ücretler geliştirme fiyatına dahil değil.' },
    { q: 'Uygulama yayınlandıktan sonra güncelleme yapıyor musunuz?', a: 'Teslimden sonraki 30 gün boyunca hata düzeltmeleri ücretsiz. Sonrası için aylık bakım anlaşması yapıyoruz: işletim sistemi sürüm uyumu, güvenlik güncellemeleri ve küçük iyileştirmeler bu kapsamda. Yeni özellik geliştirmeleri ayrıca kapsamlanıyor.' },
    { q: 'Uygulamanın kaynak kodu bize ait mi?', a: 'Evet. Proje teslim edildiğinde kaynak koda ve mağaza hesaplarına tam erişiminiz olur. Bizimle çalışmaya devam etmek zorunda kalacağınız bir bağımlılık kurmuyoruz.' }
  ],
  related: [
    { title: 'Mobil oyun geliştirme', desc: 'Bölüm tabanlı oyun kurgusu ve mağaza yayını', path: '/mobil-oyun-gelistirme/' },
    { title: 'Özel yazılım geliştirme', desc: 'Uygulamanın sunucu tarafı ve yönetim paneli', path: '/ozel-yazilim/' },
    { title: 'Web tasarım', desc: 'Uygulamanız için tanıtım sitesi', path: '/web-tasarim/' },
    { title: 'Mobil uygulama geliştirme süreci', desc: 'Blog: fikirden mağaza yayınına kadar adım adım', path: '/blog/mobil-uygulama-gelistirme-sureci/' }
  ],
  closing: {
    p: 'Uygulamanın ne yapmasını istediğinizi birkaç cümleyle yazın; ekran listesi ve fiyat aralığı çıkarıp 24 saat içinde dönelim.',
    subject: 'Mobil uygulama talebi',
    waText: 'Merhaba, mobil uygulama yaptırmak istiyorum.'
  }
});


/* ==========================================================================
   /mobil-oyun-gelistirme/  —  PRIMARY: mobil oyun geliştirme
   ========================================================================== */

pages.push({
  path: '/mobil-oyun-gelistirme/',
  crumbs: [HOME, HIZ, { name: 'Mobil oyun geliştirme', path: '/mobil-oyun-gelistirme/' }],
  keywords: {
    primary: 'mobil oyun geliştirme',
    secondary: ['mobil oyun yaptırma', 'Android oyun geliştirme', 'oyun geliştirme stüdyosu'],
    intent: 'Ticari — oyun yaptırmak isteyen girişimci veya marka'
  },
  title: 'Mobil Oyun Geliştirme | Romix Studio',
  description: 'Bölüm tabanlı mobil oyun geliştirme: oyun mekaniği, seviye haritası, ipucu ekonomisi, reklam ve uygulama içi satın alma, mağaza yayını dahil.',
  ogImage: ORIGIN + '/img/word-vortex.jpg',
  ogImageAlt: 'Word Vortex kelime oyunu uygulamasının bölüm ve oyun ekranları',
  label: 'Mobil / Oyun',
  h1: 'Mobil oyun geliştirme',
  lead: 'Oyunda mekanik bulmak kolay; asıl iş dengede. Bölümler çok kolaysa oyuncu sıkılıyor, çok zorsa bırakıyor. Üstelik oyunun kendini finanse etmesi gerekiyor ve bunu oyunun ritmini bozmadan yapmak gerekiyor.',
  waText: 'Merhaba, mobil oyun projesi hakkında konuşmak istiyorum.',
  service: {
    name: 'Mobil oyun geliştirme',
    description: 'Bölüm tabanlı oyun kurgusu, ekonomi tasarımı ve mağaza yayını dahil mobil oyun geliştirme.',
    serviceType: 'Mobil oyun geliştirme',
    price: PRICES.oyun
  },
  sections: [
    T.section({
      label: '01 — Yayındaki oyun',
      h2: 'Word Vortex: yayında olan bölüm tabanlı kelime oyunumuz',
      body:
        '<p>Harfleri birleştirerek kelime türetilen, bölüm tabanlı bir mobil oyun. Seviye haritası, günlük görevler, ipucu ekonomisi ve mağaza akışı uçtan uca tarafımızdan geliştirildi ve Google Play’de yayında.</p>' +
        '<p><a href="/projeler/word-vortex/">Word Vortex proje sayfasını inceleyin →</a></p>'
    }),

    T.section({
      label: '02 — Kapsam',
      h2: 'Bir oyun projesinde neler var?',
      body:
        T.cards([
          {
            h3: 'Oyun tasarımı',
            ticks: ['Temel mekanik ve kontrol şeması', 'Bölüm yapısı ve zorluk eğrisi', 'İlerleme ve ödül döngüsü', 'Günlük görev sistemi']
          },
          {
            h3: 'Ekonomi',
            ticks: ['İpucu, can ve para birimi dengesi', 'Reklam yerleşimi ve ödüllü reklam', 'Uygulama içi satın alma paketleri', 'Oyunun ritmini kesmeyen yerleştirme']
          },
          {
            h3: 'Yapım',
            ticks: ['Arayüz ve görsel dil', 'Ses ve geri bildirim katmanı', 'Kayıt ve ilerleme senkronizasyonu', 'Farklı ekran boyutlarında test']
          },
          {
            h3: 'Yayın',
            ticks: ['Mağaza görselleri ve tanıtım metinleri', 'Google Play ve App Store yayını', 'Kullanım analitiği ve hata takibi', 'Sürüm güncellemeleri']
          }
        ])
    }),

    T.section({
      label: '03 — Gerçekçi beklenti',
      h2: 'Oyun projelerinde ne söz veriyor, ne söz vermiyoruz',
      body:
        '<p>Oyun geliştirmede sonuç, diğer yazılım işlerinden farklı olarak büyük ölçüde oyuncunun tepkisine bağlı. Bir oyunun ne kadar indirileceğini, ne kadar gelir getireceğini ya da mağazada nereye çıkacağını kimse baştan bilemez; böyle bir taahhüt veren varsa gerçeği söylemiyordur.</p>' +
        '<p>Söz verdiğimiz şey şu: oyun teknik olarak çalışır, dengesi üzerinde çalışılmış olur, ekonomisi tanımlı olur ve mağazada yayında olur. Yayın sonrasında elimizde gerçek veri olur — hangi bölümde bırakılıyor, hangi ödül işe yarıyor, hangi paket satın alınıyor. Bundan sonrası, bu veriye bakarak yapılan sürüm güncellemeleriyle ilerleyen bir iş.</p>'
    }),

    T.section({
      label: '04 — Fiyat',
      h2: 'Mobil oyun fiyatı',
      body:
        priceNote(PRICES.oyun,
          'Fiyatı belirleyen kalemler: bölüm sayısı, mekaniğin karmaşıklığı, görsel varlıkların hazır mı üretilecek mi olduğu, çok oyunculu yapı ihtiyacı ve ekonominin genişliği. Mağaza geliştirici hesabı ücretleri fiyata dahil değil.')
    })
  ],
  faq: [
    { q: 'Mobil oyun yaptırmak ne kadar tutar?', a: 'Mobil oyun projeleri 30.000 ₺’den başlıyor. Fiyatı belirleyen kalemler bölüm sayısı, mekaniğin karmaşıklığı, görsel varlıkların hazır mı üretilecek mi olduğu, çok oyunculu yapı ihtiyacı ve ekonominin genişliği.' },
    { q: 'Oyunun kaç indirme alacağını öngörebiliyor musunuz?', a: 'Hayır ve böyle bir tahmin veren kimseye güvenmemenizi öneririz. İndirme ve gelir, oyuncunun tepkisine, mağaza görünürlüğüne ve pazarlama bütçesine bağlı; bunlar geliştirme aşamasında bilinemez. Bizim taahhüdümüz oyunun teknik olarak çalışması, dengesinin üzerinde çalışılmış olması ve mağazada yayınlanması.' },
    { q: 'Oyun görsellerini siz mi üretiyorsunuz?', a: 'Arayüz tasarımını ve görsel dili biz kuruyoruz. Karakter ve sahne varlıkları gibi özel illüstrasyon gerektiren işler kapsama göre ayrıca değerlendiriliyor; hazır varlık kütüphanesi kullanılacaksa bu maliyeti belirgin şekilde düşürüyor.' },
    { q: 'Oyunda reklam mı, satın alma mı olmalı?', a: 'Çoğu bölüm tabanlı oyunda ikisi birlikte çalışıyor: ödüllü reklam ilerlemeye takılan oyuncuyu tutuyor, satın alma ise reklam izlemek istemeyene alternatif sunuyor. Hangisinin ağırlıklı olacağını oyunun türüne ve hedef kitlesine göre birlikte belirliyoruz.' }
  ],
  related: [
    { title: 'Mobil uygulama geliştirme', desc: 'Oyun dışı Android ve iOS uygulamaları', path: '/mobil-uygulama-gelistirme/' },
    { title: 'Word Vortex', desc: 'Yayında olan bölüm tabanlı kelime oyunumuz', path: '/projeler/word-vortex/' },
    { title: 'Özel yazılım geliştirme', desc: 'Oyunun sunucu tarafı ve yönetim paneli', path: '/ozel-yazilim/' }
  ],
  closing: {
    p: 'Aklınızdaki oyunun mekaniğini birkaç cümleyle anlatın; kapsam ve fiyat aralığıyla dönelim.',
    subject: 'Mobil oyun talebi',
    waText: 'Merhaba, mobil oyun projesi hakkında konuşmak istiyorum.'
  }
});


/* ==========================================================================
   /otomasyon/  —  PRIMARY: iş süreçleri otomasyonu
   ========================================================================== */

pages.push({
  path: '/otomasyon/',
  crumbs: [HOME, HIZ, { name: 'Otomasyon', path: '/otomasyon/' }],
  keywords: {
    primary: 'iş süreçleri otomasyonu',
    secondary: ['otomasyon yazılımı', 'süreç otomasyonu', 'iş akışı otomasyonu'],
    intent: 'Ticari — süreçlerini yazılıma taşımak isteyen işletme'
  },
  title: 'İş Süreçleri Otomasyonu ve Otomasyon Yazılımı | Romix Studio',
  description: 'Excel, WhatsApp ve kâğıt üzerinde yürüyen işleri tek panele taşıyan otomasyon yazılımları. Hazır ERP değil; firmanın kendi akışına göre kurulan ekranlar.',
  ogImageAlt: 'Romix Studio iş süreçleri otomasyonu hizmeti',
  label: 'Otomasyon',
  h1: 'İş süreçleri otomasyonu',
  lead: 'Çoğu KOBİ’de işler Excel dosyaları, WhatsApp grupları ve kâğıt fişler arasında yürüyor. Süreç otomasyonu bu dağınıklığı tek bir panele taşımak demek — hazır bir ERP satın almak değil, sizin akışınıza göre yalnızca ihtiyaç duyduğunuz ekranları kurmak.',
  waText: 'Merhaba, iş süreçlerimiz için otomasyon yazılımı istiyorum.',
  stats: [
    { n: '4–10', l: 'Hafta ortalama teslim' },
    { n: '2', l: 'Haftada bir çalışan sürüm' },
    { n: '0', l: 'Kurulum — tarayıcıdan çalışır' }
  ],
  service: {
    name: 'İş süreçleri otomasyonu ve özel yazılım',
    description: 'Excel ve kâğıt üzerindeki süreçlerin yerine geçen panel, takip ve raporlama sistemleri.',
    serviceType: 'İş süreçleri otomasyonu',
    price: PRICES.otomasyon
  },
  sections: [
    T.section({
      label: '01 — Belirti',
      h2: 'Otomasyona ihtiyacınız olduğunu nereden anlarsınız?',
      body:
        '<p>Otomasyon kararı genellikle tek bir büyük sorunla değil, biriken küçük sürtünmelerle geliyor. Aşağıdakilerin birkaçı size tanıdık geliyorsa, süreç yazılıma taşınacak olgunluğa gelmiş demektir.</p>' +
        T.ticks([
          'Aynı bilgi birden fazla yere giriliyor: bir Excel’e, bir deftere, bir de WhatsApp grubuna.',
          'Bir işin hangi aşamada olduğunu öğrenmek için birini aramak gerekiyor.',
          'Ay sonunda rapor çıkarmak, dosyaları elle birleştirmeyi gerektiriyor.',
          'Kimin neyi ne zaman değiştirdiği takip edilemiyor.',
          'Ekip büyüdükçe iş hızlanmıyor, tam tersine koordinasyon yükü artıyor.',
          'Excel dosyası o kadar büyüdü ki artık açılması bile zaman alıyor.'
        ])
    }),

    T.section({
      label: '02 — Alanlar',
      h2: 'Hangi otomasyonu kuruyoruz?',
      body:
        '<p>Otomasyon geniş bir başlık. İki ana hatta çalışıyoruz; hangisinin size uyduğunu ilk görüşmede birlikte netleştiriyoruz.</p>' +
        T.relatedBlock([
          { title: 'İşletme otomasyonu', desc: 'İş emri, saha ekibi, stok, cari, teklif ve fatura akışlarını tek panelde toplayan sistemler', path: '/otomasyon/isletme-otomasyonu/' },
          { title: 'Yapay zekâ otomasyonu', desc: 'Belge okuma, sınıflandırma, özetleme ve yanıt taslağı gibi işlerin yapay zekâyla otomatikleştirilmesi', path: '/otomasyon/yapay-zeka-otomasyonu/' },
          { title: 'Özel yazılım geliştirme', desc: 'Hazır çözümlerin yetmediği, firmaya özgü yazılım ihtiyaçları', path: '/ozel-yazilim/' }
        ])
    }),

    T.section({
      label: '03 — Yaklaşım',
      h2: 'Hazır ERP satmıyoruz',
      body:
        '<p>Hazır kurumsal kaynak planlama yazılımlarının sorunu güçsüz olmaları değil, tam tersi: her sektöre uymak zorunda oldukları için içlerinde sizin hiç kullanmayacağınız yüzlerce ekran taşıyorlar. Ekibin bu ekranların arasında kaybolması, projelerin en yaygın başarısızlık sebebi — yazılım çalışıyor ama kimse kullanmıyor.</p>' +
        '<p>Biz tersinden başlıyoruz. Önce mevcut akışınızı adım adım yazıya döküyoruz, sonra hangi adımın gerçekten yazılıma taşınması gerektiğini birlikte belirliyoruz. Bazı adımların kâğıtta kalması daha doğru olabiliyor; bunu da açıkça söylüyoruz. Ortaya çıkan panel yalnızca sizin ihtiyacınız olan ekranlardan oluşuyor, bu yüzden ekip yeni bir program öğrenmek yerine zaten bildiği işi daha hızlı yapıyor.</p>' +
        '<p>Sistem tarayıcı üzerinden çalışıyor, kurulum gerektirmiyor ve mevcut muhasebe programınıza bağlanabiliyor.</p>'
    }),

    T.section({
      label: '04 — Süreç',
      h2: 'Otomasyon projesi nasıl ilerliyor?',
      body:
        T.steps([
          { h3: 'Süreç çıkarımı', p: 'Mevcut akışı sizinle birlikte adım adım yazıyoruz; hangi adımın gerçekten yazılıma taşınması gerektiğini birlikte belirliyoruz.' },
          { h3: 'Ekran tasarımı', p: 'Panelin nasıl görüneceğini tıklanabilir tasarım olarak paylaşıyoruz. Geliştirmeye ancak akış onaylandıktan sonra başlıyoruz.' },
          { h3: 'Geliştirme ve entegrasyon', p: 'Panel, kullanıcı rolleri, raporlar ve dış sistem bağlantıları kuruluyor. İki haftada bir çalışan sürüm gösteriyoruz.' },
          { h3: 'Devreye alma ve eğitim', p: 'Gerçek veriyle deneme dönemi, ardından ekip eğitimi. Kullanım videosu ve yazılı rehber teslimde veriliyor.' }
        ])
    }),

    T.section({
      label: '05 — Fiyat',
      h2: 'Otomasyon yazılımı fiyatı',
      body:
        priceNote(PRICES.otomasyon,
          'Fiyatı belirleyen kalemler: ekran sayısı, kullanıcı rolü çeşitliliği, rapor ihtiyacı, dış sistem entegrasyonları (muhasebe, e-fatura, kargo, CRM) ve mevcut veriden aktarım yapılıp yapılmayacağı. Ortalama teslim süresi 4–10 hafta. Süreç çıkarımı adımını ayrı fiyatlandırmıyoruz; kapsamın doğru çıkması ikimizin de yararına.')
    })
  ],
  faq: [
    { q: 'İş süreçleri otomasyonu tam olarak ne demek?', a: 'Şu an Excel, WhatsApp ve kâğıt üzerinde yürüyen işleri tek bir panele taşımak demek: iş emri açma, saha ekibine atama, stok ve cari takibi, teklif ve fatura üretme, rapor alma. Hazır bir ERP satmıyoruz; firmanın kendi akışına göre yalnızca ihtiyacı olan ekranları kuruyoruz.' },
    { q: 'Mevcut muhasebe programımıza bağlanabilir mi?', a: 'Programınız bir API ya da entegrasyon servisi sunuyorsa bağlanabiliyor. İlk görüşmede kullandığınız programı ve sürümünü öğrenip entegrasyonun mümkün olup olmadığını netleştiriyoruz; mümkün değilse bunu baştan söylüyoruz, sonradan sürpriz çıkarmıyoruz.' },
    { q: 'Ekibimiz yeni sisteme alışabilir mi?', a: 'Bu, projenin en kritik sorusu ve tasarımı buna göre kuruyoruz: panel yalnızca sizin kullandığınız ekranlardan oluşuyor, gereksiz alan yok. Devreye alırken gerçek veriyle bir deneme dönemi geçiriyoruz, ardından ekip eğitimi veriyoruz ve teslimde kullanım videosuyla yazılı rehber bırakıyoruz.' },
    { q: 'Mevcut Excel verilerimiz aktarılabilir mi?', a: 'Evet, çoğu durumda aktarılabiliyor. Aktarım öncesi veriyi birlikte gözden geçiriyoruz; dağınık ya da tutarsız veri olduğu gibi aktarılırsa yeni sistemde de aynı dağınıklık devam eder, bu yüzden temizlik adımını sürecin parçası sayıyoruz.' },
    { q: 'Veriler nerede tutuluyor?', a: 'Sunucu tercihini birlikte belirliyoruz; sistem sizin adınıza açılan bir hesapta çalışıyor ve veritabanına tam erişiminiz oluyor. Yedekleme düzeni kurulumun parçası. Verinizin bizde rehin kaldığı bir yapı kurmuyoruz.' },
    { q: 'Otomasyon yazılımı kaç kullanıcıya kadar çalışıyor?', a: 'Kullanıcı sayısına göre lisans satmıyoruz; sistem sizin sunucunuzda çalıştığı için kullanıcı ekledikçe ek ücret çıkmıyor. Ölçek büyüdüğünde sunucu kaynağının artırılması gerekebilir, bunu kurulumda öngörüp planlıyoruz.' }
  ],
  related: [
    { title: 'İşletme otomasyonu', desc: 'İş emri, stok, cari ve raporlama panelleri', path: '/otomasyon/isletme-otomasyonu/' },
    { title: 'Yapay zekâ otomasyonu', desc: 'Belge okuma, sınıflandırma ve yanıt taslağı', path: '/otomasyon/yapay-zeka-otomasyonu/' },
    { title: 'Özel yazılım geliştirme', desc: 'Firmaya özgü yazılım ihtiyaçları', path: '/ozel-yazilim/' },
    { title: 'İşletme otomasyonu nedir?', desc: 'Blog: hangi süreçler otomasyona hazır, hangileri değil', path: '/blog/isletme-otomasyonu-nedir/' }
  ],
  closing: {
    p: 'Şu an en çok vakit kaybettiren süreci birkaç cümleyle anlatın; yazılıma taşınmaya değer olup olmadığını dürüstçe söyleyelim.',
    subject: 'Otomasyon talebi',
    waText: 'Merhaba, iş süreçlerimiz için otomasyon yazılımı istiyorum.'
  }
});


/* ==========================================================================
   /otomasyon/isletme-otomasyonu/  —  PRIMARY: işletme otomasyonu
   ========================================================================== */

pages.push({
  path: '/otomasyon/isletme-otomasyonu/',
  crumbs: [HOME, HIZ, { name: 'Otomasyon', path: '/otomasyon/' }, { name: 'İşletme otomasyonu', path: '/otomasyon/isletme-otomasyonu/' }],
  keywords: {
    primary: 'işletme otomasyonu',
    secondary: ['KOBİ otomasyon yazılımı', 'stok takip programı', 'cari takip yazılımı', 'iş emri takip sistemi'],
    intent: 'Ticari — operasyonunu panele taşımak isteyen KOBİ'
  },
  title: 'İşletme Otomasyonu ve Yönetim Paneli | Romix Studio',
  description: 'İş emri, saha ekibi ataması, stok ve cari takibi, teklif ve fatura üretimi ile yönetici raporlarını tek panelde toplayan işletme otomasyonu yazılımları.',
  ogImageAlt: 'Romix Studio işletme otomasyonu hizmeti',
  label: 'Otomasyon / İşletme',
  h1: 'İşletme otomasyonu',
  lead: 'İşletme otomasyonu, günlük operasyonun tamamını tek bir panele taşımak demek: iş emrinin açılması, sahaya atanması, stoğun düşülmesi, cari hesabın işlenmesi ve ay sonunda raporun tek tuşla çıkması.',
  waText: 'Merhaba, işletme otomasyonu yaptırmak istiyorum.',
  service: {
    name: 'İşletme otomasyonu',
    description: 'İş emri, saha ekibi, stok, cari, teklif ve raporlama akışlarını tek panelde toplayan işletme yönetim sistemleri.',
    serviceType: 'İşletme otomasyonu',
    price: PRICES.otomasyon
  },
  sections: [
    T.section({
      label: '01 — Modüller',
      h2: 'Panelde neler olabiliyor?',
      body:
        '<p>Aşağıdakiler sık kurduğumuz ekranlar. Hepsi birden kurulmuyor — hangilerinin gerektiğini süreç çıkarımında belirliyoruz ve yalnızca onları kuruyoruz.</p>' +
        T.cards([
          {
            h3: 'İş ve saha',
            ticks: ['İş emri açma ve durum takibi', 'Saha ekibine atama ve bildirim', 'Mobil cihazdan iş kapatma', 'Fotoğraf ve not ekleme', 'Servis geçmişi']
          },
          {
            h3: 'Stok ve cari',
            ticks: ['Stok giriş/çıkış ve kritik seviye uyarısı', 'Depo ve lokasyon takibi', 'Cari hesap ve bakiye', 'Tahsilat ve ödeme kaydı']
          },
          {
            h3: 'Satış ve belge',
            ticks: ['Teklif hazırlama ve PDF çıktısı', 'Teklif–sipariş–fatura akışı', 'E-fatura programına bağlanma', 'Belge şablonlarının markaya göre düzenlenmesi']
          },
          {
            h3: 'Yönetim',
            ticks: ['Rol bazlı yetkilendirme', 'Kim neyi ne zaman değiştirdi kaydı', 'Yönetici raporları ve grafikler', 'Excel’e dışa aktarma']
          }
        ])
    }),

    T.section({
      label: '02 — Kritik nokta',
      h2: 'Otomasyon projelerinin çoğu neden başarısız oluyor?',
      body:
        '<p>Teknik sebeplerden değil. Yazılım çalışıyor, ekip kullanmıyor. Bunun genellikle üç sebebi oluyor ve üçünü de proje başında ele alıyoruz.</p>' +
        '<p><strong>Birincisi, panel ekibin gerçek işine benzemiyor.</strong> Hazır sistemlerde ekranlar genel geçer olduğu için ekip kendi işini orada tanımıyor; her kayıt için gereksiz alan doldurmak zorunda kalıyor. Biz süreç çıkarımını bu yüzden yapıyoruz: paneldeki her alanın gerçek bir karşılığı olsun diye.</p>' +
        '<p><strong>İkincisi, geçiş bir günde yapılıyor.</strong> Eski sistem kapanıyor, yeni açılıyor ve ilk aksaklıkta herkes Excel’e geri dönüyor. Bunun yerine gerçek veriyle bir deneme dönemi geçiriyoruz; iki sistem bir süre paralel yürüyor ve ekip yeni panelde güven kazandıktan sonra eski akış kapanıyor.</p>' +
        '<p><strong>Üçüncüsü, kimse öğretmiyor.</strong> Teslimde ekip eğitimi veriyoruz, kullanım videosu ve yazılı rehber bırakıyoruz. Devreye alma sonrası ilk hafta soruların en yoğun geldiği dönem; o dönemde ulaşılabilir oluyoruz.</p>'
    }),

    T.section({
      label: '03 — Fiyat',
      h2: 'İşletme otomasyonu fiyatı',
      body:
        priceNote(PRICES.otomasyon,
          'Fiyatı belirleyen kalemler: ekran sayısı, kullanıcı rolü çeşitliliği, rapor ihtiyacı, entegrasyonlar ve veri aktarımı. Ortalama teslim süresi 4–10 hafta. Kullanıcı başına lisans ücreti almıyoruz; sistem sizin sunucunuzda çalışıyor ve kullanıcı ekledikçe ek ücret çıkmıyor.')
    })
  ],
  faq: [
    { q: 'İşletme otomasyonu ile hazır ERP arasındaki fark ne?', a: 'Hazır ERP her sektöre uymak zorunda olduğu için içinde hiç kullanmayacağınız yüzlerce ekran taşıyor; ekip bu ekranlar arasında kaybolduğunda yazılım çalışsa da kullanılmıyor. Biz önce sizin akışınızı çıkarıp yalnızca ihtiyaç duyduğunuz ekranları kuruyoruz, böylece ekip yeni bir program öğrenmek yerine zaten bildiği işi daha hızlı yapıyor.' },
    { q: 'Saha ekibi telefondan kullanabiliyor mu?', a: 'Evet. Panel tarayıcı üzerinden çalıştığı için saha ekibi telefondan iş emrini görüp kapatabiliyor, fotoğraf ve not ekleyebiliyor. Ayrı bir uygulama kurulumu gerekmiyor; ihtiyaç halinde mobil uygulama olarak da geliştirilebiliyor.' },
    { q: 'Mevcut verilerimizi aktarabilir misiniz?', a: 'Evet, çoğu durumda aktarılabiliyor. Excel ya da mevcut programın dışa aktarım dosyası olarak geldiğinde toplu aktarım yapıyoruz. Aktarım öncesi veriyi birlikte gözden geçiriyoruz; dağınık veri olduğu gibi aktarılırsa yeni sistemde de aynı şekilde kalır.' },
    { q: 'Yetkilendirme yapabiliyor muyuz?', a: 'Evet. Rol bazlı yetkilendirme standart: hangi rolün hangi ekranı görebileceğini, hangi alanı değiştirebileceğini tanımlıyoruz. Ayrıca kim neyi ne zaman değiştirdi kaydı tutuluyor.' },
    { q: 'Devreye alma ne kadar sürüyor?', a: 'Geliştirme ortalama 4–10 hafta. Devreye alma bunun sonunda gerçek veriyle bir deneme dönemi olarak başlıyor; iki sistem bir süre paralel yürüyor ve ekip yeni panelde güven kazandıktan sonra eski akış kapanıyor.' }
  ],
  related: [
    { title: 'Otomasyon çözümleri', desc: 'Tüm otomasyon hizmetlerine genel bakış', path: '/otomasyon/' },
    { title: 'Yapay zekâ otomasyonu', desc: 'Belge okuma ve sınıflandırmayı otomatikleştirin', path: '/otomasyon/yapay-zeka-otomasyonu/' },
    { title: 'Özel yazılım geliştirme', desc: 'Panelin ötesine geçen yazılım ihtiyaçları', path: '/ozel-yazilim/' },
    { title: 'Mobil uygulama geliştirme', desc: 'Saha ekibi için mobil uygulama', path: '/mobil-uygulama-gelistirme/' }
  ],
  closing: {
    p: 'Bugün en çok vakit kaybettiren süreci anlatın; hangi adımların panele taşınmaya değdiğini birlikte çıkaralım.',
    subject: 'İşletme otomasyonu talebi',
    waText: 'Merhaba, işletme otomasyonu yaptırmak istiyorum.'
  }
});


/* ==========================================================================
   /otomasyon/yapay-zeka-otomasyonu/  —  PRIMARY: yapay zeka otomasyonu
   ========================================================================== */

pages.push({
  path: '/otomasyon/yapay-zeka-otomasyonu/',
  crumbs: [HOME, HIZ, { name: 'Otomasyon', path: '/otomasyon/' }, { name: 'Yapay zekâ otomasyonu', path: '/otomasyon/yapay-zeka-otomasyonu/' }],
  keywords: {
    primary: 'yapay zeka otomasyonu',
    secondary: ['AI otomasyon', 'yapay zeka iş süreçleri', 'yapay zeka ile otomasyon'],
    intent: 'Ticari — tekrarlayan işlerini yapay zekâyla azaltmak isteyen işletme'
  },
  title: 'Yapay Zekâ Otomasyonu (AI Otomasyon) | Romix Studio',
  description: 'Belge okuma, sınıflandırma, özetleme ve yanıt taslağı gibi tekrarlayan işlerin yapay zekâyla otomatikleştirilmesi. İnsan onayı akışın içinde kalır.',
  ogImageAlt: 'Romix Studio yapay zekâ otomasyonu hizmeti',
  label: 'Otomasyon / Yapay zekâ',
  h1: 'Yapay zekâ otomasyonu',
  lead: 'Klasik otomasyon kuralları yazabildiğiniz işleri devralır. Yapay zekâ otomasyonu ise kural yazılamayan işlerde devreye giriyor: gelen bir belgeyi okumak, bir talebi sınıflandırmak, uzun bir yazışmayı özetlemek, bir yanıtın taslağını çıkarmak.',
  waText: 'Merhaba, yapay zekâ otomasyonu hakkında bilgi almak istiyorum.',
  service: {
    name: 'Yapay zekâ otomasyonu',
    description: 'Belge okuma, sınıflandırma, özetleme ve taslak üretme gibi tekrarlayan işlerin yapay zekâyla otomatikleştirilmesi.',
    serviceType: 'Yapay zekâ otomasyonu',
    price: PRICES.otomasyon
  },
  sections: [
    T.section({
      label: '01 — Ayrım',
      h2: 'Hangi iş klasik otomasyona, hangisi yapay zekâya gider?',
      body:
        '<p>Bu ayrım, projenin doğru kurulmasındaki en önemli karar. Bir iş “eğer şu olursa şunu yap” diye yazılabiliyorsa yapay zekâya ihtiyacı yok; klasik otomasyon hem daha ucuz, hem daha hızlı, hem de sonucu her seferinde aynı. Yapay zekâyı buraya sokmak, çözülmüş bir işi belirsiz hale getiriyor.</p>' +
        '<p>Yapay zekâ, girdi serbest metin ya da düzensiz belge olduğunda anlamlı: her müşterinin farklı yazdığı e-postalar, farklı düzenlerde gelen faturalar, uzun toplantı notları, serbest formatlı talepler. Buralarda kural yazmak mümkün değil, insanın okuyup karar vermesi gerekiyor — otomatikleştirilebilecek olan da tam olarak bu okuma ve ilk değerlendirme adımı.</p>' +
        '<p>İlk görüşmede süreçlerinizi bu ayrıma göre ikiye bölüyoruz. Çoğu projede işin büyük kısmı klasik otomasyona gidiyor ve yapay zekâ yalnızca birkaç adımda kullanılıyor; bu, hem maliyeti hem riski düşürüyor.</p>'
    }),

    T.section({
      label: '02 — Kullanım',
      h2: 'Yapay zekâ otomasyonu nerelerde işe yarıyor?',
      body:
        T.cards([
          {
            h3: 'Belge ve veri girişi',
            p: 'Farklı düzenlerde gelen belgelerden alanları okuyup sisteme yazmak.',
            ticks: ['Fatura ve irsaliye okuma', 'Formdan veri çıkarma', 'Tabloya dönüştürme', 'Şüpheli kayıtları onaya düşürme']
          },
          {
            h3: 'Talep sınıflandırma',
            p: 'Gelen e-posta ve mesajları konusuna göre ayırıp doğru kişiye yönlendirmek.',
            ticks: ['Konu ve aciliyet etiketleme', 'İlgili birime yönlendirme', 'Tekrar eden talepleri gruplama']
          },
          {
            h3: 'Özetleme',
            p: 'Uzun yazışma ve notları okunabilir özete indirmek.',
            ticks: ['Görüşme notu özeti', 'Uzun e-posta zincirlerinin özeti', 'Aksiyon maddelerinin çıkarılması']
          },
          {
            h3: 'Taslak üretme',
            p: 'İnsanın onaylayıp göndereceği ilk taslağı hazırlamak.',
            ticks: ['Yanıt taslağı', 'Teklif metni taslağı', 'Ürün açıklaması taslağı', 'Gönderim öncesi insan onayı']
          }
        ])
    }),

    T.section({
      label: '03 — Sınırlar',
      h2: 'İnsan onayı akışın içinde kalıyor',
      body:
        '<p>Yapay zekâ otomasyonunda kurduğumuz temel kural şu: sonucu geri alınamayan hiçbir adım otomatik yapılmıyor. Sınıflandırma, özetleme ve taslak üretme otomatik ilerliyor; para transferi, fatura kesme, müşteriye mesaj gönderme gibi adımlarda önüne bir onay ekranı koyuyoruz.</p>' +
        '<p>Bunun sebebi teknik ihtiyatlılık değil, bu teknolojinin bilinen davranışı: yapay zekâ modelleri zaman zaman yanlış bir sonucu emin bir dille üretiyor. Sistem, düşük güvenle ürettiği çıktıları işaretleyip insana düşürecek şekilde kuruluyor; böylece hata yakalanabilir kalıyor.</p>' +
        '<p>Veri tarafında da açık olmakta fayda var: işlenen içeriğin bir yapay zekâ servis sağlayıcısına gönderilmesi gerekiyor. Hangi verinin gönderilip hangisinin gönderilmeyeceğini kurulumdan önce birlikte belirliyoruz; kişisel veri içeren alanların maskelenmesi ya da sürecin dışında bırakılması mümkün. KVKK açısından bu kararı yazılı olarak kayda alıyoruz.</p>'
    }),

    T.section({
      label: '04 — Fiyat',
      h2: 'Yapay zekâ otomasyonu fiyatı',
      body:
        priceNote(PRICES.otomasyon,
          'Kurulum fiyatı, otomatikleştirilecek adım sayısına ve mevcut sistemlerinizle kurulacak entegrasyona göre belirleniyor. Buna ek olarak yapay zekâ servis sağlayıcısının kullanım ücreti aylık gider oluşturuyor ve kurulum fiyatına dahil değil; işlem hacminize göre yaklaşık aylık tutarı kurulum öncesi hesaplayıp paylaşıyoruz.')
    })
  ],
  faq: [
    { q: 'Yapay zekâ otomasyonu ile klasik otomasyon arasındaki fark ne?', a: 'Klasik otomasyon, kuralı yazılabilen işleri devralır: “şu olursa şunu yap”. Yapay zekâ otomasyonu ise girdi serbest metin ya da düzensiz belge olduğunda, yani kural yazılamadığında devreye girer — farklı düzenlerde gelen faturaları okumak, serbest yazılmış talepleri sınıflandırmak gibi. Kuralı yazılabilen bir işe yapay zekâ sokmak gereksiz maliyet ve gereksiz belirsizlik üretir.' },
    { q: 'Yapay zekâ yanlış karar verirse ne olur?', a: 'Sonucu geri alınamayan hiçbir adımı otomatik yapmıyoruz. Sınıflandırma, özetleme ve taslak üretme otomatik ilerliyor; para transferi, fatura kesme ve müşteriye mesaj gönderme gibi adımların önüne onay ekranı koyuyoruz. Ayrıca sistem, düşük güvenle ürettiği çıktıları işaretleyip insana düşürüyor.' },
    { q: 'Verilerimiz nereye gidiyor?', a: 'İşlenen içeriğin bir yapay zekâ servis sağlayıcısına gönderilmesi gerekiyor. Hangi verinin gönderilip hangisinin gönderilmeyeceğini kurulumdan önce birlikte belirliyoruz; kişisel veri içeren alanların maskelenmesi ya da sürecin tümüyle dışında bırakılması mümkün. Bu kararı KVKK açısından yazılı olarak kayda alıyoruz.' },
    { q: 'Aylık maliyeti ne kadar olur?', a: 'Yapay zekâ servis sağlayıcısı işlem hacmine göre ücretlendiriyor, bu yüzden aylık tutar süreçten sürece değişiyor. Kurulum öncesi sizin hacminize göre yaklaşık bir hesap çıkarıp paylaşıyoruz; rakamı görmeden başlamak istemezsiniz, biz de istemeyiz.' },
    { q: 'Mevcut otomasyon panelimize eklenebilir mi?', a: 'Panelin bir API’si varsa ya da veritabanına erişim sağlanabiliyorsa çoğu durumda eklenebiliyor. Mevcut sisteminizi inceleyip mümkün olup olmadığını ilk görüşmede söylüyoruz.' }
  ],
  related: [
    { title: 'Otomasyon çözümleri', desc: 'Tüm otomasyon hizmetlerine genel bakış', path: '/otomasyon/' },
    { title: 'İşletme otomasyonu', desc: 'Operasyonun tamamını tek panelde toplayın', path: '/otomasyon/isletme-otomasyonu/' },
    { title: 'Yapay zekâ ajanlı web sitesi', desc: 'Yapay zekâyı müşteriye bakan tarafta kullanın', path: '/web-tasarim/yapay-zeka-ajanli-web-sitesi/' },
    { title: 'Özel yazılım geliştirme', desc: 'Otomasyonun bağlanacağı sistemin kendisi', path: '/ozel-yazilim/' }
  ],
  closing: {
    p: 'Ekibinizin en çok tekrar ettiği işi anlatın; yapay zekâya mı yoksa klasik otomasyona mı gitmesi gerektiğini dürüstçe söyleyelim.',
    subject: 'Yapay zekâ otomasyonu talebi',
    waText: 'Merhaba, yapay zekâ otomasyonu hakkında bilgi almak istiyorum.'
  }
});


/* ==========================================================================
   /ozel-yazilim/  —  PRIMARY: özel yazılım geliştirme
   ========================================================================== */

pages.push({
  path: '/ozel-yazilim/',
  crumbs: [HOME, HIZ, { name: 'Özel yazılım geliştirme', path: '/ozel-yazilim/' }],
  keywords: {
    primary: 'özel yazılım geliştirme',
    secondary: ['firmaya özel yazılım', 'kurumsal yazılım geliştirme', 'ısmarlama yazılım'],
    intent: 'Ticari — hazır çözümün yetmediği firma'
  },
  title: 'Özel Yazılım Geliştirme | Romix Studio',
  description: 'Hazır programların karşılamadığı ihtiyaçlar için firmaya özel yazılım geliştirme. Web tabanlı paneller, entegrasyonlar ve mevcut sistemlere bağlanan servisler.',
  ogImageAlt: 'Romix Studio özel yazılım geliştirme hizmeti',
  label: 'Yazılım',
  h1: 'Özel yazılım geliştirme',
  lead: 'Özel yazılım, hazır bir programın işi görmediği yerde başlıyor. Bu karar hafife alınacak bir karar değil: hazır çözüm varsa ve işinizi görüyorsa, özel yazılım yaptırmak paranızı boşa harcamaktır. Ne zaman gerekli olduğunu birlikte netleştiriyoruz.',
  waText: 'Merhaba, özel yazılım geliştirme hakkında konuşmak istiyorum.',
  service: {
    name: 'Özel yazılım geliştirme',
    description: 'Hazır çözümlerin karşılamadığı ihtiyaçlar için firmaya özel geliştirilen web tabanlı yazılımlar ve entegrasyonlar.',
    serviceType: 'Özel yazılım geliştirme',
    price: PRICES.otomasyon
  },
  sections: [
    T.section({
      label: '01 — Karar',
      h2: 'Özel yazılım ne zaman gerekiyor?',
      body:
        '<p>Aşağıdaki durumlar, hazır çözümün duvara tosladığı tipik noktalar. Biri bile size tanıdık gelmiyorsa muhtemelen özel yazılıma ihtiyacınız yok ve bunu söylemekten çekinmeyiz.</p>' +
        T.ticks([
          '<strong>Akışınız sektörün standardına benzemiyor.</strong> Ürününüz ölçüye göre üretiliyor, projeye özel fiyatlanıyor ya da parça seçimiyle yapılandırılıyor.',
          '<strong>Birden fazla sistem birbiriyle konuşmuyor.</strong> Muhasebe, e-ticaret ve saha ekibi ayrı programlarda; veri elle taşınıyor.',
          '<strong>Hazır programın lisans maliyeti ölçekle birlikte anlamsızlaşıyor.</strong> Kullanıcı başına ücretlendirme, ekip büyüdükçe bütçeyi yiyor.',
          '<strong>İhtiyacınız olan özellik hiçbir üründe yok.</strong> Talep ettiğiniz özellik yol haritasında bile değil.',
          '<strong>Veriniz üzerinde tam denetim gerekiyor.</strong> Sözleşme ya da mevzuat gereği verinin nerede tutulacağını siz belirlemek zorundasınız.'
        ])
    }),

    T.section({
      label: '02 — Kapsam',
      h2: 'Ne tür yazılımlar geliştiriyoruz?',
      body:
        T.cards([
          {
            h3: 'Web tabanlı paneller',
            p: 'Tarayıcıdan çalışan, kurulum gerektirmeyen yönetim sistemleri.',
            ticks: ['Rol bazlı yetkilendirme', 'Rapor ve grafik ekranları', 'Kayıt geçmişi ve denetim izi']
          },
          {
            h3: 'Entegrasyonlar',
            p: 'Ayrı çalışan sistemlerin birbirine bağlanması.',
            ticks: ['Muhasebe ve e-fatura', 'E-ticaret ve pazaryeri', 'Kargo ve lojistik', 'CRM ve pazarlama araçları']
          },
          {
            h3: 'Hesaplama ve konfigüratör',
            p: 'Fiyat, ölçü ya da parça seçimine göre sonuç üreten araçlar.',
            ticks: ['Ürün konfigüratörü', 'Fiyat ve maliyet hesaplayıcı', 'Teklif üretimi', 'Kural tabanlı doğrulama']
          },
          {
            h3: 'Uygulama sunucu tarafı',
            p: 'Mobil uygulamaların arkasında çalışan servisler.',
            ticks: ['Üyelik ve kimlik doğrulama', 'Veritabanı ve API', 'Push bildirim altyapısı', 'Yönetim paneli']
          }
        ])
    }),

    T.section({
      label: '03 — Çalışma biçimi',
      h2: 'Nasıl çalışıyoruz?',
      body:
        '<p><strong>İş bazlı ve sabit fiyat.</strong> Saatlik çalışmıyoruz. Kapsamı yazılı olarak çıkarıp sabit fiyat veriyoruz; böylece proje ortasında sürpriz kalem çıkmıyor. Kapsam sonradan genişlerse bunu ayrı bir iş olarak fiyatlandırıyoruz ve onayınızı almadan başlamıyoruz.</p>' +
        '<p><strong>İki haftada bir çalışan sürüm.</strong> Projenin sonunda tek seferde teslim yapmıyoruz. İki haftada bir çalışan bir sürüm görüyorsunuz; bu, yanlış anlaşılmış bir gereksinimi haftalar sonra değil, birkaç gün içinde yakalamayı sağlıyor.</p>' +
        '<p><strong>Kod ve veri sizin.</strong> Kaynak koda, veritabanına ve sunucu hesaplarına tam erişiminiz olur. Bizimle çalışmaya devam etmek zorunda kalacağınız bir bağımlılık kurmuyoruz — bu, işin bizde kalmasını istiyorsak iyi iş çıkarmamız gerektiği anlamına da geliyor.</p>' +
        '<p><strong>Teslim sonrası.</strong> İlk 30 gün hata düzeltmeleri ücretsiz. Sonrası için aylık bakım anlaşması yapıyoruz: güncellemeler, yedekleme, güvenlik yamaları ve küçük değişiklikler bu kapsamda.</p>'
    }),

    T.section({
      label: '04 — Fiyat',
      h2: 'Özel yazılım fiyatı',
      body:
        priceNote(PRICES.otomasyon,
          'Fiyatı belirleyen kalemler: ekran sayısı, kullanıcı rolü çeşitliliği, entegrasyon adedi, veri aktarımı ve raporlama derinliği. Kapsamı çıkarmadan rakam vermiyoruz; ilk görüşmede ihtiyaç netleştikten sonra yazılı ve sabit teklif geliyor.')
    })
  ],
  faq: [
    { q: 'Özel yazılım mı, hazır program mı?', a: 'Hazır bir çözüm varsa ve akışınızı gerçekten karşılıyorsa hazır programı öneririz — özel yazılım hem daha pahalı hem daha uzun sürer. Özel yazılım, akışınız sektör standardına benzemediğinde, birden fazla sistemin birbirine bağlanması gerektiğinde, lisans maliyeti ölçekle anlamsızlaştığında ya da veri üzerinde tam denetim gerektiğinde anlamlı hale geliyor.' },
    { q: 'Kaynak kod bize ait mi?', a: 'Evet. Kaynak koda, veritabanına ve sunucu hesaplarına tam erişiminiz olur. Başka bir ekiple devam etmek isterseniz bunu yapabilirsiniz; bağımlılık kuran bir yapı kurmuyoruz.' },
    { q: 'Proje ortasında kapsam değişirse ne oluyor?', a: 'Kapsamı baştan yazılı çıkarıyor ve sabit fiyat veriyoruz. Kapsam sonradan genişlerse bunu ayrı bir iş olarak fiyatlandırıyoruz ve onayınızı almadan başlamıyoruz. Sürpriz fatura çıkarmıyoruz.' },
    { q: 'Geliştirme sürecini nasıl takip ediyoruz?', a: 'İki haftada bir çalışan bir sürüm görüyorsunuz — canlı bir önizleme adresinden ya da yüklenebilir bir test sürümüyle. Bu düzen, yanlış anlaşılmış bir gereksinimin haftalar sonra değil birkaç gün içinde yakalanmasını sağlıyor.' },
    { q: 'Mevcut yazılımımızı devralabilir misiniz?', a: 'Mevcut kodun durumuna bağlı. Önce bir inceleme yapıp devralmanın mı yoksa yeniden yazmanın mı daha az maliyetli olduğunu söylüyoruz. Bu değerlendirmeyi, sonucunda bizimle çalışmasanız bile dürüstçe veriyoruz.' }
  ],
  related: [
    { title: 'İşletme otomasyonu', desc: 'Operasyonu tek panelde toplayan hazır çerçeve', path: '/otomasyon/isletme-otomasyonu/' },
    { title: 'Yapay zekâ otomasyonu', desc: 'Kural yazılamayan adımlar için', path: '/otomasyon/yapay-zeka-otomasyonu/' },
    { title: 'Mobil uygulama geliştirme', desc: 'Yazılımın mobil tarafı', path: '/mobil-uygulama-gelistirme/' },
    { title: 'E-ticaret web tasarım', desc: 'Özel satış akışları ve konfigüratörler', path: '/web-tasarim/e-ticaret-web-tasarim/' }
  ],
  closing: {
    p: 'İhtiyacınızı birkaç cümleyle anlatın; hazır bir çözümle mi yoksa özel yazılımla mı çözülmesi gerektiğini açıkça söyleyelim.',
    subject: 'Özel yazılım talebi',
    waText: 'Merhaba, özel yazılım geliştirme hakkında konuşmak istiyorum.'
  }
});


/* --- Sayfaları tamamla ---------------------------------------------------- */

module.exports = pages.map((p) => {
  const body =
    p.sections.join('') +
    (p.faq && p.faq.length
      ? T.section({ id: 'sss', label: 'SSS', h2: 'Sık sorulan sorular', body: T.faqBlock(p.faq) })
      : '') +
    (p.related && p.related.length
      ? T.section({ label: 'İlgili', h2: 'İlgili hizmetler ve içerikler', body: T.relatedBlock(p.related) })
      : '') +
    T.closing({
      h2: p.closing.h2,
      p: p.closing.p,
      subject: p.closing.subject,
      waText: p.closing.waText || p.waText
    });

  return Object.assign({}, p, {
    body: body,
    schema: [serviceNode(p.path, p.service)]
  });
});
