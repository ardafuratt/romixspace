# Romix Studio — portfolyo sitesi

Siyah zeminli, yatay sürüklenen proje şeridi olan bir ana sayfa ve onun etrafında
kurulmuş metin ağırlıklı içerik sayfaları. Ana sayfadaki kartlar Three.js ile
WebGL'de çiziliyor, geçişleri GSAP sürüyor; ikisi de CDN'den geliyor.

İçerik sayfaları (hizmetler, projeler, blog) `build/` içindeki üreticiden
çıkıyor. Çıktı depoya işlendiği için yayın hâlâ tamamen statik — Vercel'de
derleme adımı çalışmıyor.

```
romix-studio/
├─ index.html                → ana sayfa (WebGL şerit) — elle bakımda
├─ vercel.json               → yönlendirmeler, önbellek ve güvenlik başlıkları
├─ robots.txt                → ÜRETİLİYOR — build/build.js yazıyor
├─ sitemap.xml               → ÜRETİLİYOR — build/build.js yazıyor
├─ 404.html                  → ÜRETİLİYOR
│
├─ hizmetler/                → ÜRETİLİYOR — hizmet merkezi ve fiyatlar
├─ web-tasarim/              → ÜRETİLİYOR — 4 sayfa
├─ mobil-uygulama-gelistirme/, mobil-oyun-gelistirme/, ozel-yazilim/
├─ otomasyon/                → ÜRETİLİYOR — 3 sayfa
├─ projeler/                 → ÜRETİLİYOR — indeks + 10 proje sayfası
├─ blog/                     → ÜRETİLİYOR — indeks + yazılar
├─ hakkimizda/, iletisim/    → ÜRETİLİYOR
│
├─ build/
│  ├─ build.js               → ★ üreticiyi çalıştırır
│  ├─ check.js               → ★ yayın öncesi denetim
│  ├─ serve.js               → yerel önizleme sunucusu
│  ├─ site.js                → alan adı, iletişim, fiyatlar — tek kaynak
│  ├─ template.js            → head, menü, alt bilgi, JSON-LD şablonu
│  ├─ keyword-map.md         → ÜRETİLİYOR — anahtar kelime → URL eşlemesi
│  └─ content/
│     ├─ services.js         → ★ HİZMET SAYFALARININ METİNLERİ
│     ├─ projects.js         → ★ PROJE SAYFALARININ METİNLERİ
│     ├─ posts.js            → ★ BLOG YAZILARI
│     └─ pages.js            → hizmet merkezi, indeksler, hakkımızda, iletişim
│
├─ css/style.css             → ana sayfanın tasarımı
├─ css/page.css              → içerik sayfalarının tasarımı
├─ js/content.js             → ★ ANA SAYFADAKİ YAZILAR VE PROJELER
├─ js/app.js                 → ★ Three.js sahnesi, GLSL shader'lar, etkileşim
├─ js/page.js                → içerik sayfalarının küçük betiği
└─ img/                      → proje görsellerini buraya at
```

## Siteyi bilgisayarda açmak

```
node build/serve.js
```

Sonra tarayıcıda `http://localhost:4321` adresine git. Bu sunucu Vercel'in
davranışını taklit ediyor: dizinler `index.html` ile karşılanıyor, sondaki eğik
çizgi zorunlu, bulunamayan adresler `404.html`e düşüyor ve `vercel.json`daki
kalıcı yönlendirmeler uygulanıyor. `index.html`e çift tıklamak da çalışır ama
kök yollu bağlantılar (`/hizmetler/`) o şekilde açılmaz.

## İçerik sayfalarını değiştirmek

Metinler `build/content/` altındaki dosyalarda. Düzenledikten sonra:

```
node build/build.js     # sayfaları, sitemap'i ve robots.txt'i yeniden yazar
node build/check.js     # kırık bağlantı, canonical, başlık, alt metin denetimi
```

`check.js` hata verirse yayınlama. Kontrol ettikleri: her iç bağlantının
karşılığı var mı, canonical www'lu ve doğru mu, başlık/açıklama benzersiz mi,
sayfa başına tam bir `h1` var mı, her `img`'de `alt` var mı, JSON-LD geçerli mi,
sitemap'teki her adres bir dosyaya karşılık geliyor mu.

**Yeni blog yazısı eklemek:** `build/content/posts.js` içindeki diziye bir kayıt
ekle, `build.js` çalıştır. Sayfa, blog indeksindeki kart, sitemap kaydı ve
BlogPosting verisi kendiliğinden oluşur.

**Yeni hizmet sayfası:** `build/content/services.js` içindeki diziye ekle. Her
sayfanın `keywords.primary` alanı benzersiz olmalı — aynı kelimeyi iki sayfaya
verirsen sayfalar birbiriyle yarışır.

## Ana sayfayı değiştirmek

Ana sayfadaki her şey `js/content.js` içinde:

- **`brand`** — sol üstteki stüdyo adı.
- **`email` ve `social`** — Profil panelindeki linkler. Kullanmadığın satırı sil.
- **`t.tr` / `t.en`** — arayüzdeki tüm yazılar. Stüdyo tanıtım metni (`bio`) ve
  altındaki kısa satır (`stats`) burada.
- **`projects`** — proje listesi. Her proje için:

| Alan | Ne işe yarar |
| --- | --- |
| `id` | Kendine özgü kısa ad, boşluksuz. |
| `title` | Kartın üzerinde görünen isim. |
| `year` | "Tümü" listesinde sağda görünen yıl. |
| `image` | `'img/proje.jpg'` gibi. Kart görseli. |
| `ratio` | Kartın en/boy oranı: `'16/10'`, `'4/3'`, `'1/1'`… |
| `app` | `true` ise proje panelindeki buton "Google Play'de gör" yazar. |
| `featured` | `true` → ana ekrandaki şeritte görünür. `false` → sadece "Tümü" listesinde. |
| `url` | Canlı site linki. Boş bırakırsan proje panelindeki buton görünmez. |
| `services` | Proje panelinde başlığın üstündeki hizmet satırı (TR/EN). |
| `desc` | Proje açıklaması (TR/EN). |

Görselleri `img/` klasörüne at, sonra `image: 'img/dosyaadi.jpg'` yaz.
Kartlar büyük göründüğü için görselleri en az 1600px genişlikte tut.

## İletişim formu

Şu an form, ziyaretçinin e-posta programını açıp sana mail atıyor. Gerçek bir
form servisine bağlamak istersen `js/app.js` içindeki **"Form servisi
kullanacaksan burayı aç"** yorumunu bul, `ENDPOINT` yerine servisinin adresini
yaz (örneğin Formspree'den aldığın adres) ve alttaki `mailto` satırlarını sil.

## Yayına almak

Site Vercel'de, `https://www.romixspace.com` alan adında yayında. Sunucu tarafı
kod yok; depoya işlenen dosyalar olduğu gibi sunuluyor, derleme adımı
çalışmıyor. Yayına almadan önce `node build/build.js && node build/check.js`
çalıştır ve üretilen dosyaları da işle.

`vercel.json` şunları yapıyor:

- **`trailingSlash: true`** — eğik çizgisiz adresler eğik çizgiliye 308'leniyor,
  böylece aynı içerik iki adreste görünmüyor.
- **Kalıcı yönlendirmeler** — `/hizmetler.html` → `/hizmetler/`,
  `/index.html` → `/`.
- **Önbellek başlıkları** — görsel ve videolar 30 gün, CSS/JS 1 saat.
- **Güvenlik başlıkları** — `X-Content-Type-Options`, `Referrer-Policy`,
  `X-Frame-Options`.

Başka bir statik hostinge taşınırsa bu davranışların elle kurulması gerekiyor;
özellikle eğik çizgi kuralı ve `/hizmetler.html` yönlendirmesi atlanırsa
yinelenen içerik ve kırık bağlantı oluşur.

## Efektler nasıl çalışıyor

`js/app.js` üç parçadan oluşuyor: vertex shader, fragment shader ve galeri.

**DOM → WebGL senkronizasyonu.** Yerleşimin tek kaynağı DOM. Şeritteki her kart
normal bir `<article>`; onları CSS diziyor. Her karede `getBoundingClientRect()`
ile koordinatları okunup üzerlerine tam oturan `PlaneGeometry` mesh'leri
yerleştiriliyor, görseller bu mesh'lere texture olarak bağlanıyor. Kamera
ortografik ve 1 dünya birimi = 1 CSS pikseli; perspektif bölmesi
(`uCamZ / (uCamZ - z)`) vertex shader'ın içinde elle yapılıyor. Böylece z = 0 olan
her nokta DOM elemanının tam üstüne düşüyor — fov/aspect uyuşmazlığı olmuyor.

**Vertex shader — kavis ve derinlik.**

1. *Kavis*: düzlem x boyunca öne bükülüyor, ortası izleyiciye yakın.
2. *Hız tepkisi*: şerit hızlandıkça kartın kenarları geriye kaçıyor, gövde
   hareket yönüne savruluyor.
3. *Hover kubbesi*: iki parabolün çarpımı — merkezde 1, dört kenarda tam 0.
   Kenarlar yerinde kaldığı için silüet bozulmuyor, sadece yüzey şişiyor.
4. *Eğilme*: imleç ekranda gezerken tüm şerit z ekseninde o yöne yatıyor.
5. *Giriş*: kartlar derinlikten öne süzülerek yerleşiyor.

**Fragment shader — sıvımsı bozulma.** İki katman: imlecin bastığı noktadan dışa
yayılıp uzaklıkla sönen halkalar (suya dokunma) ve yüzeyin tamamında dolaşan
yavaş bir value-noise akışı (fırça darbesi). İkisi de `uHover` ile ölçekleniyor.
Üstüne kırmızı ve mavi kanallar birbirinden hafifçe ayrılıyor, bu da suyun
kırılma hissini veriyor. Görselin karta oturtulması ("cover") ve yuvarlak köşe
maskesi de burada.

**GSAP.** `mouseenter` anında `uHover` 0→1 (`expo.out`), `mouseleave` anında
1→0; ayrıca girişte `uRipple` bir kez 0.55'ten 0'a sönerek tek bir dalga vuruşu
yaratıyor. İmlecin kart içindeki konumu `gsap.quickTo` ile yumuşatılıyor, ana
döngü de `gsap.ticker` üzerinde dönüyor.

Şiddeti değiştirmek istersen `js/app.js` başındaki shader'larda: vertex tarafında
`26.0` (durgun kavis), `78.0` (hover kubbesi), `38.0` (dalga), `260.0` (giriş);
fragment tarafında `0.013` (halka genliği), `0.006` (akış) ve `0.0022` (kanal
ayrımı) sayıları.

WebGL ya da CDN'ler yüklenmezse site `body.no-gl` moduna düşüp kartları düz CSS
ile gösteriyor.

## SEO mimarisi

Ana sayfa WebGL üzerine kurulu olduğu için arama motorlarına verebileceği metin
sınırlı. Bu yüzden arama görünürlüğü ana sayfaya değil, etrafındaki içerik
sayfalarına yaslanıyor. Her hizmetin kendi sayfası var; her sayfanın tek bir
birincil anahtar kelimesi var ve aynı kelime iki sayfaya verilmiyor.

Anahtar kelime → URL eşlemesinin tamamı `build/keyword-map.md` dosyasında
(üretiliyor, elle düzenleme).

**Alan adı.** Site `https://www.romixspace.com` üzerinden yayında; www'suz adres
buraya 308 ile yönleniyor. Bu yüzden bütün canonical, og:url, sitemap ve JSON-LD
adresleri **www'lu**. Alan adı tek yerden yönetiliyor: `build/site.js` içindeki
`ORIGIN`. Değiştirirsen `node build/build.js` çalıştır, sonra `index.html`
içindeki mutlak adresleri elle güncelle (ana sayfa üreticinin dışında).

**Her sayfada standart olan:** benzersiz title ve açıklama, canonical, robots,
Open Graph ve Twitter kartları, kırıntı yolu, tek `h1`, atlamasız `h2`/`h3`
hiyerarşisi, Organization + WebSite + WebPage + BreadcrumbList JSON-LD,
görsellerde açıklayıcı alt metni ve CLS'i önleyen width/height, "İçeriğe geç"
bağlantısı ve görünür odak halkası.

**URL yapısı.** Bütün içerik sayfaları eğik çizgiyle biten dizin adreslerinde
(`/web-tasarim/kurumsal-web-tasarim/`). `vercel.json` içindeki
`trailingSlash: true` eğik çizgisiz istekleri 308 ile buraya yönlendiriyor,
böylece aynı içerik iki adreste görünmüyor. Eski `hizmetler.html` adresi 301 ile
`/hizmetler/` adresine taşındı.

**Ana sayfadaki metin katmanı.** `index.html` içindeki `#seo` bölümü, WebGL
tuvalinin metin karşılığı: aynı projeler, aynı bağlantılar, düz metin olarak.
İki önemli nokta:

1. **Statik.** JavaScript üretmiyor; sayfayla birlikte geliyor. (Eskiden
   `js/app.js` içindeki `buildSeo()` üretiyordu, o kaldırıldı.)
2. **JavaScript kapalıyken görünür.** `<noscript>` içindeki stil onu normal akışa
   döndürüyor. Tuval çizilmiyorsa metin görünüyor — yani gizli metin değil,
   tuvalin erişilebilir alternatifi.

Bu katmanı büyütme. Ekleyeceğin her SEO metni içerik sayfalarına gitmeli.

> **Not:** Google, FAQ zengin sonuçlarını gov/health dışındaki sitelerde
> göstermiyor. FAQPage verisi sayfalarda duruyor çünkü hâlâ konuyu anlamaya
> yarıyor ve görünen bir SSS bölümünün birebir karşılığı; ama arama sonucunda
> açılır soru listesi olarak görünmeyecek.

### Yayına almadan önce

1. `node build/build.js && node build/check.js` — denetim temiz olmalı.
2. **Google Search Console.** Mülkü www'lu adresle doğrula ve `sitemap.xml`
   adresini gönder. Eski www'suz mülk varsa onu da tut; yönlendirme oradan
   buraya taşınmayı gösterir.
3. **Analitik.** Şu an sitede analitik yok. Google Analytics kurulacaksa ölçüm
   kimliği (G-XXXXXXXXXX) gerekiyor; uydurma kimlik yazma.
4. **Google İşletme Profili.** Fiziksel ofis yok, bu yüzden adres girme. Hizmet
   bölgesi olarak Türkiye tanımlanabilir.
5. **İngilizce sürüm.** Ana sayfadaki TR/EN düğmesi yalnızca görünen arayüzü
   çeviriyor, ayrı bir adres üretmiyor — dolayısıyla İngilizce içerik
   indekslenmiyor. İngilizce sayfalar istenirse gerçek metinle yazılmalı ve
   karşılıklı hreflang kurulmalı; makine çevirisiyle sayfa çoğaltmak siteye
   zarar verir.

## Notlar

- **Font:** Google Fonts'tan Inter Tight çekiliyor. İnternet olmadan da site
  çalışır, sadece yazı tipi sistem fontuna düşer.
- **Dil:** Sağ üstteki `TR / EN` düğmesi. Seçim tarayıcıda hatırlanır.
- **Klavye:** Sağ/sol ok tuşları şeridi kaydırır, `Esc` açık paneli kapatır.
- **Türkçe büyük harf:** Arayüzdeki minik yazılar CSS ile büyütülüyor. Marka adı
  ve sosyal medya linkleri `lang="en"` işaretli, böylece "Romix" → "ROMİX"
  olmuyor. Türkçe kelimeler (İLETİŞİM, ÖNE ÇIKANLAR) doğru büyüyor.
