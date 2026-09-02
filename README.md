# Romix Studio — portfolyo sitesi

Tek sayfalık, siyah zeminli, yatay sürüklenen proje şeridi olan portfolyo sitesi.
Kartlar Three.js ile WebGL'de çiziliyor, geçişleri GSAP sürüyor; ikisi de CDN'den
geliyor, derleme adımı yok — dosyaları bir sunucuya atman yeterli.

```
romix-studio/
├─ index.html          → ana sayfa (WebGL şerit)
├─ hizmetler.html      → SEO sayfası — metinler doğrudan bu dosyanın içinde
├─ robots.txt          → arama motoru yönergesi
├─ sitemap.xml         → site haritası
├─ css/style.css       → ana sayfanın tasarımı
├─ css/page.css        → hizmetler sayfasının tasarımı
├─ js/content.js       → ★ YAZILAR VE PROJELER — düzenleyeceğin dosya bu
├─ js/app.js           → ★ Three.js sahnesi, GLSL shader'lar, tüm etkileşim
└─ img/                → proje görsellerini buraya at
```

## Siteyi bilgisayarda açmak

`index.html` dosyasına çift tıklaman yeterli. Yerel sunucuyla açmak istersen:

```
cd romix-studio
python -m http.server 8000
```

Sonra tarayıcıda `http://localhost:8000` adresine git.

## İçeriği değiştirmek

Her şey `js/content.js` içinde:

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
form servisine bağlamak istersen `js/main.js` içindeki **"Form servisi
kullanacaksan burayı aç"** yorumunu bul, `ENDPOINT` yerine servisinin adresini
yaz (örneğin Formspree'den aldığın adres) ve alttaki `mailto` satırlarını sil.

## Yayına almak

Sunucu tarafı kod olmadığı için herhangi bir statik hosting çalışır:

- **Netlify / Vercel** — klasörü sürükleyip bırakman yeterli.
- **GitHub Pages** — depoya yükle, Settings → Pages'ten aç.
- **Normal hosting (cPanel)** — dosyaları `public_html` içine at.

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

## SEO sayfası (hizmetler.html)

Ana sayfa WebGL üzerine kurulu olduğu için arama motorlarına verecek metni sınırlı.
`hizmetler.html` bu boşluğu kapatıyor: normal kaydırmalı, metin ağırlıklı, aynı
tasarım diliyle kurulmuş bir hizmet sayfası. Üst menüdeki **Hizmetler** bağlantısı
buraya gidiyor.

**Hedeflenen aramalar.** Türkiye'de bu alandaki aramaların büyük kısmı fiyat ve süre
sorularıyla geliyor ("web sitesi yaptırma fiyatları", "mobil uygulama ne kadar",
"iş süreçleri otomasyonu"). Sayfa bu soruları başlık düzeyinde karşılıyor: her
hizmet için ayrı H2, süre tablosu, fiyatın neye göre belirlendiğini anlatan bölüm ve
on soruluk SSS.

**Sayfada ne var:** tek H1, atlamasız H2/H3 hiyerarşisi, 63 karakterlik title,
157 karakterlik açıklama, canonical, Open Graph ve Twitter kartları, ProfessionalService
+ OfferCatalog + WebPage + BreadcrumbList + FAQPage yapılandırılmış verisi, görsellerde
açıklayıcı alt metinleri, `loading="lazy"` ve CLS'i önleyen width/height değerleri.

> **Not:** Google, FAQ zengin sonuçlarını Mayıs 2026'da kaldırdı. FAQPage verisi
> sayfada duruyor çünkü hâlâ konuyu anlamaya yarıyor, ama artık arama sonucunda
> açılır soru listesi olarak görünmeyecek. SSS bölümünü ziyaretçi için tuttuk.

### Yayına almadan önce mutlaka yap

1. ~~**Alan adını değiştir.**~~ Yapıldı — tüm dosyalarda `https://romixspace.com` kullanılıyor.
2. **Google Search Console'a ekle** ve `sitemap.xml` adresini gönder.
3. **Google İşletme Profili** aç — yerel aramalarda görünürlük için sayfadaki
   şehir bilgileriyle aynı olmasına dikkat et.
4. **Fiyat bilgisi.** Sayfada süre tablosu var ama rakam yok; fiyat aralıklarını
   yazmak istersen "Bir proje ne kadar sürer" bölümüne ekleyebilirsin. Arama
   hacminin büyük kısmı fiyat sorgularında olduğu için bu, sıralamayı belirgin
   şekilde etkiler.
5. **İngilizce sürüm.** Şu an sayfa yalnızca Türkçe. İngilizce bir kopya
   (`services.html`) açılırsa iki sayfaya karşılıklı `hreflang` etiketi eklenmeli.

## Notlar

- **Font:** Google Fonts'tan Inter Tight çekiliyor. İnternet olmadan da site
  çalışır, sadece yazı tipi sistem fontuna düşer.
- **Dil:** Sağ üstteki `TR / EN` düğmesi. Seçim tarayıcıda hatırlanır.
- **Klavye:** Sağ/sol ok tuşları şeridi kaydırır, `Esc` açık paneli kapatır.
- **Türkçe büyük harf:** Arayüzdeki minik yazılar CSS ile büyütülüyor. Marka adı
  ve sosyal medya linkleri `lang="en"` işaretli, böylece "Romix" → "ROMİX"
  olmuyor. Türkçe kelimeler (İLETİŞİM, ÖNE ÇIKANLAR) doğru büyüyor.
