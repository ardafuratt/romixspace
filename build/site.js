/* ==========================================================================
   ROMIX STUDIO — site geneli sabitler

   Buradaki bilgiler tüm sayfaların head'ine, yapılandırılmış verisine ve
   alt bilgisine giriyor. Tek yerden değiştirilir.

   ÖNEMLİ: ORIGIN www'lu. Alan adı apex'ten (romixspace.com) www'ya 308 ile
   yönleniyor; canonical'ın yönlenen değil, yönlenilen adresi göstermesi
   gerekiyor.
   ========================================================================== */

const ORIGIN = 'https://www.romixspace.com';

/* Google Search Console mülk doğrulama kodu. Mülk www'lu URL öneki olarak
   eklendi; bu etiket her sayfada durabilir, tek bir yerde tutulması yeterli. */
const GOOGLE_SITE_VERIFICATION = 'h_aI9H-UP1krvOFIwYOFU1B_mkMduNo80O0kUVKPEeU';

/* Google Analytics 4 ölçüm kimliği. */
const GA_MEASUREMENT_ID = 'G-069419XKSR';

const CONTACT = {
  email: 'yolarkadasim872@gmail.com',
  phone: '+905466352571',
  phoneText: '0546 635 25 71',
  phoneSchema: '+90 546 635 25 71',
  whatsapp: 'https://wa.me/905466352571'
};

/* Sosyal hesaplar — js/content.js ile aynı kaynak */
const SAME_AS = [
  'https://www.instagram.com/romix_studio/',
  'https://www.linkedin.com/in/arda-furat-a9b642388/',
  'https://github.com/ardafuratt'
];

/* Üst menü — her sayfada aynı */
const NAV = [
  { label: 'İşler',     path: '/' },
  { label: 'Hizmetler', path: '/hizmetler/' },
  { label: 'Projeler',  path: '/projeler/' },
  { label: 'Blog',      path: '/blog/' },
  { label: 'İletişim',  path: '/iletisim/' }
];

/* Başlangıç fiyatları (₺, KDV hariç) — hizmetler sayfasındaki rakamlarla aynı */
const PRICES = {
  web:       3000,
  aiSite:    5000,
  otomasyon: 15000,
  mobil:     30000,
  oyun:      30000
};

const OG_IMAGE = ORIGIN + '/img/obsidian-security.jpg';

/* WhatsApp linki — mesaj metni sayfaya göre değişiyor */
function wa(message) {
  return CONTACT.whatsapp + '?text=' + encodeURIComponent(message);
}

module.exports = { ORIGIN, CONTACT, SAME_AS, NAV, PRICES, OG_IMAGE, GOOGLE_SITE_VERIFICATION, GA_MEASUREMENT_ID, wa };
