/* ==========================================================================
   ROMIX STUDIO — İÇERİK DOSYASI
   Sitedeki tüm yazılar ve projeler burada. Sadece bu dosyayı düzenlemen yeterli.
   ========================================================================== */

const SITE = {

  /* --- Stüdyo adı (sol üst köşe) --- */
  brand: 'Romix Studio',

  /* --- İletişim ve sosyal medya --------------------------------------------
     Kullanmadığın satırı sil. Linkleri kendi hesaplarınla değiştir.          */
  email: 'yolarkadasim872@gmail.com',
  social: [
    { label: 'Instagram', url: 'https://www.instagram.com/romix_studio/' },
    { label: 'LinkedIn',  url: 'https://www.linkedin.com/in/arda-furat-a9b642388/' },
    { label: 'GitHub',    url: 'https://github.com/ardafuratt' }
  ],

  /* --- Metinler (TR / EN) ------------------------------------------------ */
  t: {
    tr: {
      profile:  'Profil',
      contact:  'İletişim',
      featured: 'Öne Çıkanlar',
      full:     'Tümü',
      bio: 'Romix Studio; web tasarımı, arayüz geliştirme, mobil uygulama ve özel yazılım üzerine çalışan bağımsız bir dijital tasarım stüdyosudur. Markanın ihtiyacını tasarımdan yayına kadar tek elden kuruyoruz: arayüz tasarımı, ön yüz mimarisi, animasyon, içerik yönetim sistemi ve sonrasındaki bakım.',
      stats: '7 web proje · 3 mobil uygulama — Web · Arayüz · Mobil · Yazılım',
      contactText: 'Yeni bir proje, teklif ya da sadece merhaba demek için e-posta bırak; 24 saat içinde dönüş yapıyoruz.',
      emailPlaceholder: 'E-posta adresin',
      sending: 'Gönderiliyor…',
      sent: 'Aldık, teşekkürler. En kısa sürede dönüyoruz.',
      invalid: 'Geçerli bir e-posta adresi gir.',
      visit: 'Siteyi gör',
      projectPage: 'Proje sayfasını gör →',
      visitApp: 'Google Play’de gör',
      emailLabel: 'E-posta',
      close:      'Kapat',
      services:   'Hizmetler',
      whatsapp:   'WhatsApp’tan yazın',
      seoIntro: 'Romix Studio — web tasarımı, arayüz geliştirme, mobil uygulama ve özel yazılım üzerine çalışan dijital tasarım stüdyosu.'
    },
    en: {
      profile:  'Profile',
      contact:  'Contact',
      featured: 'Featured',
      full:     'Full',
      bio: 'Romix Studio is an independent digital design studio working across web design, interface development, mobile apps and custom software. We take a brand from first sketch to launch in one place: interface design, front-end architecture, animation, content management and everything after it goes live.',
      stats: '7 web projects · 3 mobile apps — Web · Interface · Mobile · Software',
      contactText: 'Drop your email for a new project, a quote, or just to say hello — we reply within 24 hours.',
      emailPlaceholder: 'Your email address',
      sending: 'Sending…',
      sent: 'Got it, thank you. We will be in touch shortly.',
      invalid: 'Please enter a valid email address.',
      visit: 'Visit site',
      projectPage: 'See project page →',
      visitApp: 'View on Google Play',
      emailLabel: 'Email',
      close:      'Close',
      services:   'Services',
      whatsapp:   'Message on WhatsApp',
      seoIntro: 'Romix Studio — a digital design studio working across web design, interface development, mobile apps and custom software.'
    }
  },

  /* --- PROJELER -------------------------------------------------------------
     image    : 'img/dosya.jpg'
     ratio    : kartın en/boy oranı — görsel bu orana kırpılarak sığdırılır
     featured : true ise ana ekrandaki şeritte görünür
     url      : canlı link — boş bırakırsan proje panelindeki buton görünmez
     app      : true ise buton "Google Play'de gör" yazar
     ------------------------------------------------------------------------- */
  projects: [
    {
      id: 'obsidian-security',
      slug: 'obsidian-security',
      title: 'Obsidian Security',
      year: '2025',
      image: 'img/obsidian-security.jpg', ratio: '16/9', hue: 200, featured: true,
      url: 'https://cyber-security-ten-delta.vercel.app',
      services: { tr: 'Web Tasarımı · Geliştirme', en: 'Web Design · Development' },
      desc: {
        tr: 'Siber güvenlik firması için tam ekran görsel anlatıma dayanan kurumsal site. Tehdit avcılığı hizmetlerini tek bir kaydırma hikâyesinde toplayan, koyu temalı bir arayüz kurduk.',
        en: 'A corporate site for a cyber security firm built on full-bleed imagery. A dark interface that gathers their threat-hunting services into a single scrolling story.'
      }
    },
    {
      id: 'makinafleo',
      slug: 'makinafleo',
      title: 'MakinaFleo',
      year: '2025',
      image: 'img/makinafleo.jpg', ratio: '16/10', hue: 180, featured: true,
      url: 'https://teknolojik-site.vercel.app',
      services: { tr: 'Web Tasarımı · Geliştirme · Ürün Kataloğu', en: 'Web Design · Development · Product Catalogue' },
      desc: {
        tr: 'İnsansız araçlar ve IoT teknolojileri üreten bir firma için ürün odaklı teknoloji sitesi. Her ürün için ayrı tanıtım bölümü, teknik özellik listeleri ve iletişim akışı içeriyor.',
        en: 'A product-led technology site for a maker of unmanned vehicles and IoT systems, with a dedicated section, spec list and enquiry flow for every product.'
      }
    },
    {
      id: 'utku-denizalti',
      slug: 'utku-denizalti',
      title: 'UTKU Denizaltısı',
      year: '2025',
      image: 'img/utku-denizalti.jpg', ratio: '16/9', hue: 205, featured: true,
      url: 'https://ss-tau-ashen.vercel.app/',
      services: { tr: 'Tanıtım Sitesi · Arayüz · Animasyon', en: 'Showcase Site · Interface · Motion' },
      desc: {
        tr: 'Yeni nesil bir denizaltı savaş yönetim sistemi için askerî arayüz estetiğinde tanıtım sitesi. HUD benzeri çerçeveler, sonar animasyonları ve teknik veri panelleriyle kurgulandı.',
        en: 'A showcase site for a next-generation submarine combat management system, built in a military interface idiom — HUD frames, sonar motion and technical data panels.'
      }
    },
    {
      id: 'sera-guzellik',
      slug: 'sera-guzellik',
      title: 'Sera Güzellik',
      year: '2025',
      image: 'img/sera-guzellik.jpg', ratio: '3/2', hue: 30, featured: true,
      url: 'https://guzellik-salonu-delta.vercel.app',
      services: { tr: 'Web Tasarımı · Geliştirme · Randevu', en: 'Web Design · Development · Booking' },
      desc: {
        tr: 'Konya’daki bir güzellik ve estetik merkezi için randevu akışını merkeze alan site. Hizmet sayfaları, yorumlar ve online randevu formu tek yapıda toplandı.',
        en: 'A site for a beauty and aesthetics clinic in Konya, built around the booking flow — service pages, reviews and an online appointment form in one structure.'
      }
    },
    {
      id: 'aslan-oto',
      slug: 'aslan-oto-kurtarma',
      title: 'Aslan Oto Kurtarma',
      year: '2025',
      image: 'img/aslan-oto.jpg', ratio: '3/2', hue: 35, featured: true,
      url: 'https://statik-websites.vercel.app/',
      services: { tr: 'Web Tasarımı · Geliştirme', en: 'Web Design · Development' },
      desc: {
        tr: 'Bingöl’de 7/24 çalışan bir oto kurtarma firması için hızlı arama odaklı site. Acil durumda tek dokunuşla telefon ve WhatsApp’a yönlendiren bir yapı kurduk.',
        en: 'A call-first site for a 24/7 vehicle recovery service in Bingöl, structured so that one tap reaches the phone line or WhatsApp in an emergency.'
      }
    },
    {
      id: 'kadirli-servis',
      slug: 'turkmenoglu-elektronik',
      title: 'Türkmenoğlu Elektronik',
      year: '2025',
      image: 'img/kadirli-servis.jpg', ratio: '4/3', hue: 160, featured: true,
      url: 'https://t-rkmeno-lu-ltd-ti.vercel.app/',
      services: { tr: 'Web Tasarımı · Geliştirme · Yerel SEO', en: 'Web Design · Development · Local SEO' },
      desc: {
        tr: 'Osmaniye Kadirli’deki klima ve beyaz eşya servisi için hizmet sitesi. Servis kategorileri, müşteri yorumları ve bölgesel arama görünürlüğü üzerine kuruldu.',
        en: 'A service site for an air-conditioning and appliance repair business in Kadirli, Osmaniye — service categories, customer reviews and regional search visibility.'
      }
    },
    {
      id: 'yolarkadasim-web',
      slug: 'yolarkadasim-web',
      title: 'YolArkadaşım Web',
      year: '2025',
      image: 'img/yolarkadasim-web.jpg', ratio: '16/10', hue: 320, featured: true,
      url: 'https://yol-arka-7sbm.vercel.app/',
      services: { tr: 'Ürün Sitesi · Geliştirme', en: 'Product Site · Development' },
      desc: {
        tr: 'YolArkadaşım uygulamasının tanıtım sitesi. Rota, yakıt ve HGS maliyeti hesaplama özelliklerini anlatan, mağaza indirmelerine yönlendiren tek sayfalık yapı.',
        en: 'The marketing site for the YolArkadaşım app — a single page explaining route, fuel and toll cost estimation, and driving downloads to the app stores.'
      }
    },
    {
      id: 'yolarkadasim-app',
      slug: 'yolarkadasim',
      title: 'YolArkadaşım',
      year: '2025',
      image: 'img/yolarkadasim-app.jpg', ratio: '16/10', hue: 40, featured: true, app: true,
      url: 'https://play.google.com/store/apps/details?id=com.yolarkadasi.yol_arkadasi&hl=tr',
      services: { tr: 'Mobil Uygulama · Arayüz · Yazılım', en: 'Mobile App · Interface · Software' },
      desc: {
        tr: 'A noktasından B noktasına en iyi rotayı, tahminî yakıt ve HGS/otoyol maliyetini hesaplayan navigasyon uygulaması. Güzergâh üzerindeki restoran, mescit, tuvalet ve oto yıkama molalarını da aynı ekranda gösteriyor.',
        en: 'A navigation app that works out the best route from A to B along with estimated fuel and toll costs, and shows restaurants, prayer rooms, restrooms and car washes along the way on the same screen.'
      }
    },
    {
      id: 'ramazan-imsakiyesi',
      slug: 'ramazan-imsakiyesi',
      title: 'Ramazan İmsakiyesi 2026',
      year: '2025',
      image: 'img/ramazan-imsakiyesi.jpg', ratio: '4/3', hue: 150, featured: true, app: true,
      url: 'https://play.google.com/store/apps/details?id=com.mobrixlabs.ramazanimsakiyesi2026',
      services: { tr: 'Mobil Uygulama · Arayüz', en: 'Mobile App · Interface' },
      desc: {
        tr: 'İftar ve sahur için geri sayım sayacı, kıble pusulası ve zikirmatik içeren Ramazan uygulaması. Konuma göre namaz vakitlerini hesaplayıp günlük imsakiyeyi tek ekranda topluyor.',
        en: 'A Ramadan companion app with countdowns to iftar and suhoor, a qibla compass and a dhikr counter, calculating prayer times by location and gathering the daily timetable on one screen.'
      }
    },
    {
      id: 'word-vortex',
      slug: 'word-vortex',
      title: 'Word Vortex',
      year: '2025',
      image: 'img/word-vortex.jpg', ratio: '3/2', hue: 265, featured: true, app: true,
      url: 'https://play.google.com/store/apps/details?id=com.wordvortex.app',
      services: { tr: 'Mobil Oyun · Arayüz · Yazılım', en: 'Mobile Game · Interface · Software' },
      desc: {
        tr: 'Harfleri birleştirerek kelime türetilen bölüm tabanlı kelime oyunu. Seviye haritası, günlük görevler, ipucu ekonomisi ve mağaza akışı uçtan uca tarafımızdan geliştirildi.',
        en: 'A level-based word game where letters are linked to form words. The level map, daily challenges, hint economy and store flow were all built end to end.'
      }
    }
  ]
};
