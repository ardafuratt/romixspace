/* ==========================================================================
   ROMIX STUDIO — proje sayfaları

   Buradaki her alan js/content.js'teki gerçek proje kaydından geliyor.
   UYDURULMAYAN alanlar: müşteri sonuçları, ciro/dönüşüm/trafik rakamları,
   ödül, referans yorumu. Böyle veriler elimizde olmadığı için hiçbir proje
   sayfasında yer almıyor — yalnızca ne yaptığımız anlatılıyor.
   ========================================================================== */

module.exports = [
  {
    slug: 'obsidian-security',
    title: 'Obsidian Security',
    year: '2025',
    image: 'img/obsidian-security.jpg',
    url: 'https://cyber-security-ten-delta.vercel.app',
    kind: 'web',
    sector: 'Siber güvenlik',
    type: 'Kurumsal web sitesi',
    services: 'Web tasarımı · Geliştirme',
    metaTitle: 'Obsidian Security kurumsal web sitesi projesi | Romix Studio',
    metaDesc: 'Siber güvenlik firması Obsidian Security için tasarlanan koyu temalı, tam ekran görsel anlatıma dayanan kurumsal web sitesi projesi.',
    alt: 'Obsidian Security siber güvenlik firması için geliştirilen kurumsal web sitesinin ana sayfası',
    lead: 'Tehdit avcılığı hizmetlerini tek bir kaydırma hikâyesinde toplayan, koyu temalı kurumsal site.',
    brief: 'Siber güvenlik, anlatması zor bir hizmet: ürün fotoğrafı yok, sonuç görünmüyor, alıcı çoğu zaman teknik olmayan bir yönetici. Obsidian Security’nin ihtiyacı, hizmetlerini teknik bir katalog gibi listelemeyen ama ciddiyetini de kaybetmeyen bir kurumsal siteydi.',
    approach: 'Siteyi tek bir dikey anlatı olarak kurduk. Ziyaretçi yukarıdan aşağı indikçe tehdit avcılığı, olay müdahalesi ve sürekli izleme hizmetleri sırayla açılıyor; her bölüm kendi tam ekran görseliyle geliyor. Koyu tema burada dekoratif bir tercih değil: sektörün görsel dilini kullanıyor ve metnin okunurluğunu artırıyor.',
    built: [
      'Tam ekran görsel anlatıma dayanan ana sayfa kurgusu',
      'Hizmetlerin sırayla açıldığı tek kaydırmalık bölüm yapısı',
      'Koyu tema tipografi ve kontrast düzeni',
      'Teklif ve iletişim akışı',
      'Mobil ve masaüstünde aynı anlatıyı koruyan duyarlı yerleşim'
    ],
    tech: ['Statik site mimarisi', 'Vercel üzerinde yayın', 'Kaydırma tabanlı animasyon']
  },

  {
    slug: 'makinafleo',
    title: 'MakinaFleo',
    year: '2025',
    image: 'img/makinafleo.jpg',
    url: 'https://teknolojik-site.vercel.app',
    kind: 'web',
    sector: 'İnsansız araçlar ve IoT',
    type: 'Ürün kataloglu teknoloji sitesi',
    services: 'Web tasarımı · Geliştirme · Ürün kataloğu',
    metaTitle: 'MakinaFleo ürün odaklı teknoloji sitesi projesi | Romix Studio',
    metaDesc: 'İnsansız araçlar ve IoT teknolojileri üreten MakinaFleo için geliştirilen, her ürüne ayrı tanıtım bölümü ve teknik özellik listesi sunan web sitesi projesi.',
    alt: 'MakinaFleo insansız araçlar ve IoT teknolojileri firması için geliştirilen ürün odaklı web sitesi',
    lead: 'İnsansız araç ve IoT ürünlerinin her birini kendi teknik sayfasıyla anlatan, ürün odaklı teknoloji sitesi.',
    brief: 'MakinaFleo tek bir şey satmıyor: birbirinden farklı insansız araç ve IoT ürünleri var ve her birinin kendi teknik özellikleri, kendi alıcısı var. Hepsini tek bir “ürünlerimiz” sayfasına sıkıştırmak, hem ziyaretçiyi hem arama motorunu zorlayan bir yapı olurdu.',
    approach: 'Her ürüne kendi tanıtım bölümünü, kendi teknik özellik tablosunu ve kendi iletişim akışını verdik. Böylece bir ürünü arayan kişi doğrudan onun bölümüne inebiliyor; firma da yeni bir ürün çıkardığında siteyi baştan kurmak yerine aynı yapıya bir bölüm daha ekliyor.',
    built: [
      'Ürün başına ayrı tanıtım bölümü ve teknik özellik listesi',
      'Ürünler arasında gezinmeyi kolaylaştıran yapı',
      'Ürün bazlı teklif ve iletişim akışı',
      'Yeni ürün eklendiğinde tekrar kullanılabilen bölüm şablonu',
      'Teknik içeriğin mobilde de okunabildiği tablo düzeni'
    ],
    tech: ['Bileşen tabanlı sayfa yapısı', 'Vercel üzerinde yayın', 'Duyarlı teknik tablolar']
  },

  {
    slug: 'utku-denizalti',
    title: 'UTKU Denizaltısı',
    year: '2025',
    image: 'img/utku-denizalti.jpg',
    url: 'https://ss-tau-ashen.vercel.app/',
    kind: 'web',
    sector: 'Savunma sanayii',
    type: 'Tanıtım sitesi',
    services: 'Tanıtım sitesi · Arayüz · Animasyon',
    metaTitle: 'UTKU Denizaltısı tanıtım sitesi ve arayüz projesi | Romix Studio',
    metaDesc: 'Denizaltı savaş yönetim sistemi için askerî arayüz estetiğinde kurgulanan tanıtım sitesi: HUD çerçeveleri, sonar animasyonları ve teknik veri panelleri.',
    alt: 'UTKU denizaltı savaş yönetim sistemi tanıtım sitesinin HUD arayüzlü ekranı',
    lead: 'Yeni nesil bir denizaltı savaş yönetim sistemi için askerî arayüz estetiğinde kurgulanan tanıtım sitesi.',
    brief: 'Bir savaş yönetim sistemini anlatan site, ürünün kendisi gibi okunmalı. Buradaki mesele bilgiyi listelemek değil, ziyaretçiye sistemin nasıl bir şey olduğunu ilk saniyede hissettirmekti.',
    approach: 'Arayüzü, sistemin kendi görsel dilinden kurduk: HUD benzeri çerçeveler, sonar taramasını taklit eden animasyonlar ve gerçek panellerdeki gibi düzenlenmiş teknik veri blokları. Animasyonlar dekoratif değil; her biri anlatılan yeteneğin karşılığı. Hareketi azaltma tercihi açık olan ziyaretçilerde animasyonlar sakinleşiyor, içerik aynen kalıyor.',
    built: [
      'HUD çerçeveleri ve askerî arayüz tipografisi',
      'Sonar taramasını taklit eden animasyon katmanı',
      'Teknik veri panelleri ve yetenek bölümleri',
      'Kaydırmaya bağlı sahne geçişleri',
      'Hareketi azaltma tercihine saygı gösteren animasyon yapısı'
    ],
    tech: ['Özel animasyon katmanı', 'Kaydırma tabanlı sahne kurgusu', 'Vercel üzerinde yayın']
  },

  {
    slug: 'sera-guzellik',
    title: 'Sera Güzellik',
    year: '2025',
    image: 'img/sera-guzellik.jpg',
    url: 'https://guzellik-salonu-delta.vercel.app',
    kind: 'web',
    sector: 'Güzellik ve estetik',
    type: 'Randevu sistemli hizmet sitesi',
    services: 'Web tasarımı · Geliştirme · Randevu',
    city: 'Konya',
    metaTitle: 'Sera Güzellik randevu sistemli web sitesi projesi | Romix Studio',
    metaDesc: 'Konya’daki bir güzellik ve estetik merkezi için randevu akışı merkeze alınarak kurgulanan hizmet sitesi: hizmet sayfaları, yorumlar ve online randevu formu.',
    alt: 'Sera Güzellik estetik merkezi için online randevu sistemli web sitesi',
    lead: 'Konya’daki bir güzellik ve estetik merkezi için randevu akışını merkeze alan hizmet sitesi.',
    brief: 'Randevuyla çalışan bir işletmede sitenin tek bir işi var: ziyaretçiyi randevuya götürmek. Sera Güzellik’te hizmet çeşidi fazlaydı ve ziyaretçi çoğunlukla telefonundan, tek bir hizmeti aratarak geliyordu.',
    approach: 'Her hizmete kendi detay sayfasını verdik, ama her sayfanın sonunu aynı yere bağladık: randevu formuna. Formu kısa tuttuk — uzun form randevu kaybettiriyor. Yorum bölümünü hizmetlerin hemen ardına koyduk, çünkü bu sektörde karar çoğunlukla orada veriliyor.',
    built: [
      'Hizmet başına detay sayfası',
      'Online randevu formu ve talep akışı',
      'Müşteri yorumları bölümü',
      'Telefon ve WhatsApp’a tek dokunuşla erişim',
      'Mobil öncelikli yerleşim'
    ],
    tech: ['Randevu formu ve talep bildirimi', 'Vercel üzerinde yayın', 'Mobil öncelikli duyarlı yapı']
  },

  {
    slug: 'aslan-oto-kurtarma',
    title: 'Aslan Oto Kurtarma',
    year: '2025',
    image: 'img/aslan-oto.jpg',
    url: 'https://statik-websites.vercel.app/',
    kind: 'web',
    sector: 'Oto kurtarma ve çekici',
    type: 'Çağrı odaklı yerel hizmet sitesi',
    services: 'Web tasarımı · Geliştirme',
    city: 'Bingöl',
    metaTitle: 'Aslan Oto Kurtarma çağrı odaklı web sitesi projesi | Romix Studio',
    metaDesc: 'Bingöl’de 7/24 çalışan bir oto kurtarma firması için, acil durumda tek dokunuşla telefon ve WhatsApp’a yönlendiren hızlı açılan web sitesi projesi.',
    alt: 'Aslan Oto Kurtarma için 7/24 çağrı odaklı olarak kurgulanan web sitesi',
    lead: 'Bingöl’de 7/24 çalışan bir oto kurtarma firması için, tek dokunuşla aramaya yönlendiren site.',
    brief: 'Yolda kalmış bir sürücü site gezmiyor. Elinde telefon, muhtemelen kötü bir şebekede ve tek istediği numarayı bulmak. Bu yüzden burada “güzel site” ile “işe yarayan site” aynı şey değildi.',
    approach: 'Siteyi tek bir eyleme göre kurduk: aramak. Arama ve WhatsApp düğmeleri her ekranın ilk görünen alanında duruyor, sayfa ağır görsel yüklemeden açılıyor ve hizmet bölgesi ilk ekranda yazıyor. Statik bir yapı seçtik çünkü zayıf bağlantıda en hızlı açılan yapı bu.',
    built: [
      'Her ekranda görünen arama ve WhatsApp düğmeleri',
      'Zayıf bağlantıda hızlı açılan statik yapı',
      'Hizmet bölgesi ve çalışma saatlerinin ilk ekranda yer alması',
      'Hizmet listesi ve sık sorulanlar',
      'Yerel arama görünürlüğü için sayfa yapısı'
    ],
    tech: ['Statik site mimarisi', 'Vercel üzerinde yayın', 'Tıkla-ara ve WhatsApp derin bağlantıları']
  },

  {
    slug: 'turkmenoglu-elektronik',
    title: 'Türkmenoğlu Elektronik',
    year: '2025',
    image: 'img/kadirli-servis.jpg',
    url: 'https://t-rkmeno-lu-ltd-ti.vercel.app/',
    kind: 'web',
    sector: 'Klima ve beyaz eşya servisi',
    type: 'Yerel hizmet sitesi',
    services: 'Web tasarımı · Geliştirme · Yerel SEO',
    city: 'Kadirli, Osmaniye',
    metaTitle: 'Türkmenoğlu Elektronik yerel hizmet sitesi projesi | Romix Studio',
    metaDesc: 'Osmaniye Kadirli’deki bir klima ve beyaz eşya servisi için servis kategorileri, müşteri yorumları ve bölgesel arama görünürlüğü üzerine kurulan hizmet sitesi.',
    alt: 'Türkmenoğlu Elektronik klima ve beyaz eşya servisi için geliştirilen yerel hizmet sitesi',
    lead: 'Osmaniye Kadirli’deki bir klima ve beyaz eşya servisi için bölgesel arama görünürlüğüne göre kurulan site.',
    brief: 'Yerel bir servis için trafiğin tamamı “kadirli klima servisi” gibi bölge + hizmet aramalarından geliyor. Bu tür bir sitede tasarımdan önce çözülmesi gereken şey, sayfaların bu aramalara göre bölünmesi.',
    approach: 'Servis türlerini tek bir sayfada listelemek yerine kategorilere ayırdık ve her kategoriyi kendi başlığıyla, kendi içeriğiyle kurduk. Google İşletme Profili ile aynı bilgiyi verecek şekilde firma adı, telefon ve hizmet bölgesini sitenin tamamında tutarlı tuttuk — yerel aramada bu tutarlılık doğrudan işe yarıyor.',
    built: [
      'Servis türüne göre ayrılmış kategori sayfaları',
      'Firma adı, telefon ve bölge bilgisinin site genelinde tutarlılığı',
      'Müşteri yorumları bölümü',
      'Yerel arama için başlık ve içerik yapısı',
      'Tek dokunuşla arama'
    ],
    tech: ['Statik site mimarisi', 'Yerel SEO sayfa yapısı', 'Vercel üzerinde yayın']
  },

  {
    slug: 'yolarkadasim-web',
    title: 'YolArkadaşım Web',
    year: '2025',
    image: 'img/yolarkadasim-web.jpg',
    url: 'https://yol-arka-7sbm.vercel.app/',
    kind: 'web',
    sector: 'Mobil uygulama tanıtımı',
    type: 'Ürün tanıtım sitesi',
    services: 'Ürün sitesi · Geliştirme',
    metaTitle: 'YolArkadaşım uygulama tanıtım sitesi projesi | Romix Studio',
    metaDesc: 'YolArkadaşım navigasyon uygulamasının tanıtım sitesi: rota, yakıt ve HGS maliyeti hesaplama özelliklerini anlatan, mağaza indirmelerine yönlendiren tek sayfalık yapı.',
    alt: 'YolArkadaşım uygulamasının özelliklerini anlatan tanıtım web sitesi',
    lead: 'YolArkadaşım uygulamasının özelliklerini anlatan ve mağaza indirmelerine yönlendiren tanıtım sitesi.',
    brief: 'Bir uygulamanın tanıtım sitesinin tek bir görevi var: ziyaretçiyi mağazaya götürmek. Fazla bölüm, fazla anlatı ve fazla bağlantı bu görevi zayıflatıyor.',
    approach: 'Tek sayfalık bir yapı kurduk. Uygulamanın üç ana yeteneği — rota, yakıt maliyeti, HGS ve otoyol maliyeti — sırayla ekran görüntüleriyle anlatılıyor ve her bölümün sonunda aynı indirme düğmesi duruyor. Sayfanın uzunluğunu bilerek kısa tuttuk.',
    built: [
      'Tek hedefe odaklı tek sayfalık kurgu',
      'Uygulama yeteneklerinin ekran görüntüleriyle anlatımı',
      'Mağaza indirme yönlendirmeleri',
      'Uygulamanın görsel diliyle uyumlu arayüz',
      'Mobilde hızlı açılan yapı'
    ],
    tech: ['Tek sayfa yapısı', 'Vercel üzerinde yayın', 'Mağaza derin bağlantıları'],
    relatedProject: 'yolarkadasim'
  },

  {
    slug: 'yolarkadasim',
    title: 'YolArkadaşım',
    year: '2025',
    image: 'img/yolarkadasim-app.jpg',
    url: 'https://play.google.com/store/apps/details?id=com.yolarkadasi.yol_arkadasi&hl=tr',
    app: true,
    kind: 'mobil',
    sector: 'Navigasyon ve seyahat',
    type: 'Mobil uygulama',
    services: 'Mobil uygulama · Arayüz · Yazılım',
    metaTitle: 'YolArkadaşım navigasyon uygulaması projesi | Romix Studio',
    metaDesc: 'Rota, tahminî yakıt ve HGS maliyetini hesaplayan; güzergâh üzerindeki molaları gösteren YolArkadaşım navigasyon uygulamasının geliştirme süreci.',
    alt: 'YolArkadaşım mobil uygulamasının rota ve maliyet hesaplama ekranı',
    lead: 'Rota, yakıt ve HGS maliyetini birlikte hesaplayan, güzergâh üzerindeki molaları da gösteren navigasyon uygulaması.',
    brief: 'Yol tarifi veren uygulama çok, ama “bu yolculuk bana kaça mal olur” sorusunu net cevaplayan az. Sürücünün gerçek sorusu mesafe değil, maliyet — ve maliyet yakıt ile HGS’nin toplamı.',
    approach: 'Rota hesabını maliyet hesabıyla aynı ekranda birleştirdik. Kullanıcı A ve B noktasını girdiğinde mesafeyle beraber tahminî yakıt tutarını ve otoyol/HGS maliyetini görüyor. Buna ek olarak güzergâh üzerindeki restoran, mescit, tuvalet ve oto yıkama duraklarını aynı harita üzerinde gösterdik; uzun yolda bu üç bilgi ayrı ayrı aranıyordu, tek ekrana topladık.',
    built: [
      'Rota hesaplama ve harita entegrasyonu',
      'Tahminî yakıt maliyeti hesabı',
      'HGS ve otoyol maliyeti hesabı',
      'Güzergâh üzerinde restoran, mescit, tuvalet ve oto yıkama noktaları',
      'Google Play yayın süreci ve mağaza görselleri'
    ],
    tech: ['Tek kod tabanından Android ve iOS', 'Harita ve konum servisleri', 'Google Play yayını'],
    relatedProject: 'yolarkadasim-web'
  },

  {
    slug: 'ramazan-imsakiyesi',
    title: 'Ramazan İmsakiyesi 2026',
    year: '2025',
    image: 'img/ramazan-imsakiyesi.jpg',
    url: 'https://play.google.com/store/apps/details?id=com.mobrixlabs.ramazanimsakiyesi2026',
    app: true,
    kind: 'mobil',
    sector: 'Yaşam ve din',
    type: 'Mobil uygulama',
    services: 'Mobil uygulama · Arayüz',
    metaTitle: 'Ramazan İmsakiyesi uygulama projesi | Romix Studio',
    metaDesc: 'İftar ve sahur geri sayımı, kıble pusulası ve zikirmatik içeren; konuma göre namaz vakitlerini hesaplayan Ramazan İmsakiyesi uygulamasının geliştirme süreci.',
    alt: 'Ramazan İmsakiyesi uygulamasının iftar geri sayımı ve namaz vakitleri ekranı',
    lead: 'İftar ve sahur geri sayımı, kıble pusulası ve zikirmatiği tek ekranda toplayan Ramazan uygulaması.',
    brief: 'Ramazan boyunca aynı kullanıcı günde birkaç kez aynı üç şeye bakıyor: vakte ne kadar kaldı, kıble nerede, kaç çektim. Bu üçü çoğu uygulamada ayrı ekranlara dağılmış durumda.',
    approach: 'Uygulamayı günlük kullanıma göre kurduk. Açılış ekranı doğrudan bir sonraki vakte geri sayımı gösteriyor; kıble pusulası ve zikirmatik oradan tek dokunuşla ulaşılıyor. Namaz vakitleri kullanıcının konumuna göre hesaplanıyor, günlük imsakiye tek ekranda toplanıyor.',
    built: [
      'İftar ve sahur için geri sayım sayacı',
      'Konuma göre namaz vakti hesabı',
      'Kıble pusulası',
      'Zikirmatik',
      'Günlük imsakiye görünümü',
      'Google Play yayın süreci'
    ],
    tech: ['Tek kod tabanından Android ve iOS', 'Konum ve pusula sensörleri', 'Google Play yayını']
  },

  {
    slug: 'word-vortex',
    title: 'Word Vortex',
    year: '2025',
    image: 'img/word-vortex.jpg',
    url: 'https://play.google.com/store/apps/details?id=com.wordvortex.app',
    app: true,
    kind: 'oyun',
    sector: 'Mobil oyun',
    type: 'Mobil oyun',
    services: 'Mobil oyun · Arayüz · Yazılım',
    metaTitle: 'Word Vortex mobil kelime oyunu geliştirme projesi | Romix Studio',
    metaDesc: 'Harfleri birleştirerek kelime türetilen bölüm tabanlı mobil kelime oyunu Word Vortex: seviye haritası, günlük görevler, ipucu ekonomisi ve mağaza akışı.',
    alt: 'Word Vortex kelime oyunu uygulamasının bölüm ve oyun ekranları',
    lead: 'Harfleri birleştirerek kelime türetilen, bölüm tabanlı mobil kelime oyunu.',
    brief: 'Kelime oyununda mekanik kolay, asıl iş dengede: bölümler çok kolaysa oyuncu sıkılıyor, çok zorsa bırakıyor. Ayrıca oyunun kendini finanse etmesi gerekiyor ve bunu oyunu bozmadan yapmak gerek.',
    approach: 'Seviye haritasını, zorluk eğrisi kademeli yükselecek şekilde kurduk ve ipucu ekonomisini bu eğriye bağladık: takılınan noktada ipucu değerli oluyor, kolay bölümlerde gereksiz. Günlük görevler geri dönüşü teşvik ediyor. Reklam ve uygulama içi satın alma akışlarını oyunun ritmini kesmeyecek noktalara yerleştirdik.',
    built: [
      'Kelime türetme mekaniği ve harf bağlama arayüzü',
      'Bölüm tabanlı seviye haritası ve zorluk eğrisi',
      'Günlük görev sistemi',
      'İpucu ekonomisi ve mağaza akışı',
      'Reklam ve uygulama içi satın alma entegrasyonu',
      'Google Play yayın süreci'
    ],
    tech: ['Tek kod tabanından Android ve iOS', 'Uygulama içi satın alma', 'Google Play yayını']
  }
];
