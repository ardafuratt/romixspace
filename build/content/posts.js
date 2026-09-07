/* ==========================================================================
   ROMIX STUDIO — blog yazıları

   Az sayıda, gerçekten işe yarayan yazı. Sayfa sayısını artırmak için
   doldurma içerik üretmiyoruz; yeni yazı eklemek için bu diziye bir kayıt
   eklemek yeterli.
   ========================================================================== */

module.exports = [

  /* ======================================================================== */
  {
    slug: 'kurumsal-web-sitesi-nasil-olmali',
    category: 'Web tasarım',
    date: '2026-02-10',
    dateText: '10 Şubat 2026',
    readTime: '8 dk okuma',
    keywords: {
      primary: 'kurumsal web sitesi nasıl olmalı',
      secondary: ['kurumsal web sitesinde neler olmalı', 'kurumsal site içeriği', 'kurumsal web sitesi özellikleri'],
      intent: 'Bilgilendirici — kurumsal site yaptırmadan önce araştırma'
    },
    title: 'Kurumsal Web Sitesi Nasıl Olmalı? | Romix Studio',
    description: 'Kurumsal bir web sitesinde hangi sayfalar olmalı, içerik nasıl bölünmeli, hangi hatalar dönüşümü düşürüyor? Site yaptırmadan önce okunacak pratik rehber.',
    h1: 'Kurumsal web sitesi nasıl olmalı?',
    excerpt: 'Hangi sayfalar olmalı, içerik nasıl bölünmeli ve hangi yaygın hatalar dönüşümü düşürüyor.',
    lead: 'Kurumsal site sorusunun cevabı çoğu zaman “modern ve şık olsun” diye başlıyor. Oysa bir kurumsal sitenin başarısını belirleyen şey görünüşünden çok yapısı: bilginin nasıl bölündüğü, ziyaretçinin aradığını kaç adımda bulduğu ve firmaya güvenmek için ihtiyaç duyduğu şeyleri bulup bulamadığı.',
    body:
      '<h2>Önce şu soruyu cevaplayın: site kimin için?</h2>' +
      '<p>Kurumsal sitelerin en yaygın sorunu, herkese aynı anda hitap etmeye çalışmaları. Aynı ana sayfa hem potansiyel müşteriye, hem iş başvurusu yapacak kişiye, hem tedarikçiye, hem de yatırımcıya sesleniyor. Sonuç, hiçbirine tam olarak seslenmeyen bir sayfa oluyor.</p>' +
      '<p>Çözüm bu grupları yok saymak değil, önceliklendirmek. Ana sayfanın birincil izleyicisi kim? Genellikle potansiyel müşteri. O halde ana sayfanın ilk ekranı ona konuşmalı; kariyer ve yatırımcı içerikleri menüden erişilebilir ama ana akışı bölmeyen sayfalarda durmalı.</p>' +

      '<h2>Her hizmet kendi sayfasında olmalı</h2>' +
      '<p>Bu, kurumsal sitelerde en çok atlanan ve en pahalıya mal olan karar. Firmalar çoğu zaman tüm hizmetlerini tek bir “Hizmetlerimiz” sayfasında listeliyor. Bunun iki sorunu var.</p>' +
      '<p>Birincisi arama tarafında: Google tek bir sayfayı tek bir konuya göre değerlendiriyor. Beş farklı hizmeti tek sayfaya koyduğunuzda, o sayfa beş konunun hiçbirinde güçlü olmuyor. Oysa her hizmetin kendi sayfası olduğunda her biri kendi aramasında yarışabiliyor.</p>' +
      '<p>İkincisi ziyaretçi tarafında: “iş güvenliği eğitimi” arayan kişi, içinde beş hizmetin özetlendiği bir sayfaya indiğinde aradığı bilgiyi bulmak için okumak zorunda kalıyor. Doğrudan o hizmetin sayfasına indiğinde ise soruları sırayla cevaplanıyor.</p>' +
      '<p>Hizmet sayfasında bulunması gerekenler oldukça standart: hizmetin ne olduğu, kimin için olduğu, kapsamına ne girip ne girmediği, süreç, sık sorulan sorular ve ilgili referanslara bağlantı. Fiyat verebiliyorsanız verin; veremiyorsanız fiyatı neyin belirlediğini yazın. “Fiyat için arayın” cümlesi, aramayı değil çıkışı tetikliyor.</p>' +

      '<h2>Güven, tasarımdan önce gelir</h2>' +
      '<p>Kurumsal alıcı, teklif istemeden önce firmanın gerçekten var olduğunu doğrulamak istiyor. Bu doğrulama birkaç saniyede ve çoğunlukla bilinçsizce yapılıyor. Sitede şunları bulamıyorsa geri dönüyor:</p>' +
      '<ul>' +
        '<li><strong>Gerçek bir iletişim bilgisi.</strong> Sadece form değil; telefon, e-posta ve mümkünse WhatsApp. Tek kanal olarak form bırakmak güveni düşürüyor.</li>' +
        '<li><strong>Yapılmış işler.</strong> Logo duvarı değil, ne yapıldığını anlatan proje sayfaları. Müşteri adı paylaşılamıyorsa sektör ve iş tanımıyla anlatın.</li>' +
        '<li><strong>Arkadaki insanlar.</strong> Ekip sayfası, küçük firmalarda bile fark yaratıyor; kimin çalıştığı görünen bir firma daha somut duruyor.</li>' +
        '<li><strong>Yasal bilgiler.</strong> Gizlilik politikası, KVKK aydınlatma metni ve çerez bildirimi. Bunların yokluğu, dikkatli alıcıda doğrudan bir kırmızı bayrak.</li>' +
      '</ul>' +
      '<p>Buna karşılık uydurulmuş güven unsurları ters teper: gerçek olmayan müşteri yorumları, hiç alınmamış ödül rozetleri, doğrulanamayan “Türkiye’nin lideri” iddiaları. Bunlar tespit edildiğinde geri kazanılması zor bir güven kaybı yaratıyor.</p>' +

      '<h2>Menü, sitenin içindekiler tablosudur</h2>' +
      '<p>Menüdeki başlık sayısı arttıkça her birinin tıklanma oranı düşüyor. Pratik bir sınır: üst menüde beş ile yedi arasında ana başlık. Fazlası varsa hizmetler alt menüye toplanmalı.</p>' +
      '<p>Menü etiketleri yaratıcı değil, tanıdık olmalı. “Çözümler” yerine “Hizmetler”, “Portföy” yerine “Projeler”, “Bize ulaşın” yerine “İletişim”. Ziyaretçi menüde okuduğu kelimeyi tanımıyorsa tıklamıyor.</p>' +

      '<h2>Mobil, tasarımın başlangıç noktasıdır</h2>' +
      '<p>Kurumsal sitelerde bile trafiğin önemli bölümü mobilden geliyor ve Google siteyi mobil sürümü üzerinden değerlendiriyor. Buna rağmen birçok site masaüstünde tasarlanıp mobile sıkıştırılıyor; sonuçta mobilde okunmayan tablolar, taşan görseller ve parmakla vurulamayan küçük düğmeler kalıyor.</p>' +
      '<p>Doğru sıra tersi: tasarıma mobil ekrandan başlayın. Mobilde işe yarayan bir yerleşim masaüstüne rahatça açılıyor, tersi ise neredeyse hiç çalışmıyor.</p>' +

      '<h2>Hız, artık bir tasarım kararıdır</h2>' +
      '<p>Sayfa yavaş açılıyorsa tasarımın ne kadar iyi olduğu önemsiz — kimse görmüyor. Kurumsal sitelerde yavaşlığın en yaygın üç sebebi şunlar: optimize edilmemiş büyük görseller, kullanılmayan özellikleri de yükleyen hazır temalar ve arka arkaya eklenmiş üçüncü taraf betikleri (canlı destek, ısı haritası, birden fazla analitik, reklam pikselleri).</p> ' +
      '<p>Bunların hepsinin bir maliyeti var ve maliyet kullanıcının bekleme süresi olarak ödeniyor. Her eklentiyi eklemeden önce sorulacak soru şu: bu, ziyaretçiye maliyeti kadar değer üretiyor mu?</p>' +

      '<h2>Sık yapılan yedi hata</h2>' +
      '<ol class="numbered">' +
        '<li><strong>Ana sayfada ne yaptığını söylememek.</strong> İlk ekranda “Geleceği birlikte inşa ediyoruz” yazan ama ne iş yaptığı üç ekran sonra anlaşılan siteler.</li>' +
        '<li><strong>Tüm hizmetleri tek sayfaya koymak.</strong> Hem arama hem okuma açısından zayıf.</li>' +
        '<li><strong>Giriş animasyonu koymak.</strong> İlk ziyarette hoş, ikincide engel.</li>' +
        '<li><strong>İçeriği görsele gömmek.</strong> Metin olarak yazılabilecek bilgiyi görsele yazmak; ne aranabiliyor ne ekran okuyucu okuyabiliyor.</li>' +
        '<li><strong>Tek iletişim kanalı bırakmak.</strong> Yalnızca form, güveni düşürüyor.</li>' +
        '<li><strong>Blogu açıp bırakmak.</strong> Son yazısı üç yıl önce olan bir blog, olmamasından daha kötü görünüyor.</li>' +
        '<li><strong>Yenilemede eski adresleri unutmak.</strong> Site yenilendiğinde eski adreslerden yenilerine kalıcı yönlendirme kurulmazsa birikmiş arama görünürlüğü sıfırlanıyor.</li>' +
      '</ol>' +

      '<h2>Kısa bir kontrol listesi</h2>' +
      '<p>Yeni bir kurumsal site yaptırıyorsanız ya da mevcut sitenizi değerlendiriyorsanız şunlara bakın:</p>' +
      '<ul>' +
        '<li>İlk ekranda ne iş yaptığınız yazıyor mu?</li>' +
        '<li>Her hizmetin kendi sayfası var mı?</li>' +
        '<li>Her sayfanın kendine ait bir başlık ve açıklama etiketi var mı?</li>' +
        '<li>Telefon, e-posta ve WhatsApp erişilebilir mi?</li>' +
        '<li>Yapılan işler, ne yapıldığını anlatacak şekilde yer alıyor mu?</li>' +
        '<li>Gizlilik ve KVKK metinleri var mı?</li>' +
        '<li>Mobilde yatay kaydırma oluyor mu? (Olmamalı.)</li>' +
        '<li>İçeriği kendiniz güncelleyebiliyor musunuz?</li>' +
        '<li>Search Console ve analitik kurulu mu?</li>' +
      '</ul>' +
      '<p>Bu listenin çoğuna “hayır” diyorsanız sorun tasarımda değil, yapıda. İyi haber şu ki yapı sorunları, tasarımı baştan yapmadan da düzeltilebiliyor.</p>',
    faq: [
      { q: 'Kurumsal web sitesi kaç sayfa olmalı?', a: 'Sayfa sayısı hedef değil sonuçtur. Her hizmet için bir sayfa, kurumsal bilgi, referanslar ve iletişim için birer sayfa tipik bir tabanı oluşturur. İçeriği olmayan sayfa açmak siteye zarar verir: ince içerikli sayfalar hem ziyaretçiyi hem arama motorunu yanıltır.' },
      { q: 'Kurumsal sitede fiyat yazmalı mıyım?', a: 'Verebiliyorsanız verin. Veremiyorsanız en azından fiyatı neyin belirlediğini ve bir başlangıç aralığını yazın. “Fiyat için arayın” cümlesi çoğu ziyaretçide aramayı değil çıkışı tetikliyor; rakam yerine kapsam anlatmak bile belirsizliği önemli ölçüde azaltıyor.' },
      { q: 'Kurumsal site yenilerken eski sayfalara ne olacak?', a: 'Adres yapısı değişecekse eski adreslerden yenilerine kalıcı (301) yönlendirme kurulmalı, site içi bağlantılar ve canonical etiketleri güncellenmeli. Bu yapılmazsa eski adreslerde birikmiş arama görünürlüğü kayboluyor ve site yenilendikten sonra trafiğin düştüğü o klasik tablo ortaya çıkıyor.' },
      { q: 'Kurumsal sitede blog gerekli mi?', a: 'Düzenli yazacaksanız gerekli, yazmayacaksanız değil. Son yazısı yıllar önce olan bir blog, olmamasından daha kötü bir izlenim bırakıyor. Ayda bir gerçekten işe yarayan bir yazı, haftada üç doldurma yazıdan daha değerli.' }
    ],
    related: [
      { title: 'Kurumsal web tasarım', desc: 'Bu yazıdaki yapının kurulduğu hizmet', path: '/web-tasarim/kurumsal-web-tasarim/' },
      { title: 'Web tasarım', desc: 'Tüm web tasarım hizmetlerine genel bakış', path: '/web-tasarim/' },
      { title: 'Obsidian Security', desc: 'Kurumsal site projesi örneği', path: '/projeler/obsidian-security/' },
      { title: 'Hizmetler ve fiyatlar', desc: 'Kapsamlar ve başlangıç fiyatları', path: '/hizmetler/' }
    ],
    closingH2: 'Sitenizi birlikte değerlendirelim',
    closingP: 'Mevcut sitenizin adresini gönderin; yukarıdaki başlıklara göre ücretsiz bir değerlendirme yapıp ne yapılması gerektiğini yazalım.',
    closingSubject: 'Site değerlendirme talebi'
  },


  /* ======================================================================== */
  {
    slug: 'mobil-uygulama-gelistirme-sureci',
    category: 'Mobil',
    date: '2026-03-04',
    dateText: '4 Mart 2026',
    readTime: '9 dk okuma',
    keywords: {
      primary: 'mobil uygulama geliştirme süreci',
      secondary: ['mobil uygulama nasıl yapılır', 'uygulama geliştirme aşamaları', 'native mi cross platform mu'],
      intent: 'Bilgilendirici — uygulama yaptırmadan önce süreci anlamak'
    },
    title: 'Mobil Uygulama Geliştirme Süreci | Romix Studio',
    description: 'Mobil uygulama geliştirme süreci adım adım: kapsam çıkarma, tasarım, geliştirme, test ve mağaza yayını. Native mi cross-platform mu, maliyeti ne belirler?',
    h1: 'Mobil uygulama geliştirme süreci: fikirden mağazaya',
    excerpt: 'Kapsam çıkarmadan mağaza yayınına kadar altı aşama, native/cross-platform kararı ve maliyeti belirleyen kalemler.',
    lead: 'Uygulama yaptırmayı düşünen çoğu kişi süreci “anlatırım, yaparsınız” olarak hayal ediyor. Gerçekte projenin kaderini belirleyen şey, kod yazılmadan önceki iki hafta: ekranların listelenmesi ve kapsamın netleşmesi. Bu yazı, sürecin tamamını sırasıyla anlatıyor.',
    body:
      '<h2>Aşama 1 — Kapsam ve ekran listesi</h2>' +
      '<p>Uygulamanın ne yapacağını cümlelerle değil, ekranlarla tanımlamak gerekiyor. “Kullanıcı üye olsun, ilan versin, mesajlaşsın” cümlesi kulağa üç işmiş gibi geliyor; ekran listesine döküldüğünde on beş ekran çıkıyor: kayıt, giriş, şifre sıfırlama, profil, profil düzenleme, ilan oluşturma, fotoğraf yükleme, ilan önizleme, ilan listesi, ilan detayı, mesaj listesi, mesaj ekranı, bildirim ayarları, arama, filtre.</p>' +
      '<p>Bu liste hem fiyatın hem takvimin temeli. Aynı aşamada cevaplanması gereken diğer soru sunucu tarafı: uygulama verileri kendi cihazında mı tutacak, yoksa üyelik, veritabanı ve bildirim gibi bir arka uç mu gerekiyor? Arka uç ihtiyacı, projenin büyüklüğünü belirleyen tek kalem olabiliyor.</p>' +
      '<p>Burada verilmesi gereken en zor karar, ilk sürüme neyin girmeyeceği. Her fikir haklıdır ama hepsi ilk sürüme girerse uygulama hiç yayınlanmaz. Pratik yöntem: uygulamanın var olma sebebini tek cümleyle yazın, o cümleye hizmet etmeyen her şeyi ikinci sürüme bırakın.</p>' +

      '<h2>Aşama 2 — Native mi, cross-platform mu?</h2>' +
      '<p>Bu kararın maliyete etkisi büyük. Native geliştirme, Android ve iOS için ayrı ayrı uygulama yazmak demek: iki kod tabanı, iki bakım hattı ve her yeni özellikte iki kat iş. Cross-platform ise tek kod tabanından her iki platforma birden çıkmak.</p>' +
      '<p>Uygulamaların büyük çoğunluğunda cross-platform doğru tercih: süre kısalıyor, maliyet düşüyor ve güncellemeler tek yerden yapılabiliyor. Kullanıcı açısından fark, çoğu uygulamada hissedilir düzeyde değil.</p>' +
      '<p>Native’in hâlâ doğru olduğu yerler var ve bunları baştan bilmekte fayda var: yoğun grafik işleyen oyunlar, cihazın alt seviye donanımına derinlemesine giren uygulamalar (gelişmiş kamera işleme, özel Bluetooth cihazlarıyla düşük seviye haberleşme) ve milisaniye hassasiyeti gerektiren işler. Projeniz bu tanıma girmiyorsa cross-platform’a itiraz etmek için pratik bir sebep kalmıyor.</p>' +

      '<h2>Aşama 3 — Arayüz tasarımı</h2>' +
      '<p>Tasarım aşamasının çıktısı bir resim değil, tıklanabilir bir prototip olmalı. Yani ekranlar arasında gerçekten gezinebildiğiniz, akışı telefonunuzda deneyebildiğiniz bir sürüm.</p>' +
      '<p>Sebebi basit: bir akışın sorunlu olduğu, resme bakarak değil deneyerek anlaşılıyor. “Buradan geri dönünce sepet boşalıyor” gibi bir sorun prototipte on saniyede fark ediliyor, kod yazıldıktan sonra ise günler alıyor.</p>' +
      '<p>Bu yüzden geliştirmeye, akış onaylanmadan başlanmamalı. Onay öncesi yapılan değişiklik ücretsizdir; onay sonrası yapılan değişiklik bir maliyet kalemidir.</p>' +

      '<h2>Aşama 4 — Geliştirme</h2>' +
      '<p>Geliştirmede takip edilmesi gereken tek kural şu: sonunda tek seferde teslim edilen proje, kötü giden projedir. İki haftada bir yüklenebilir bir test sürümü almalısınız ve bunu kendi telefonunuzda çalıştırabilmelisiniz.</p>' +
      '<p>Bunun sebebi denetim değil, maliyet. Yanlış anlaşılmış bir gereksinim iki hafta sonra fark edildiğinde iki haftalık iş yeniden yapılır; üç ay sonra fark edildiğinde proje yeniden kurulur.</p>' +
      '<p>Bu aşamada arka uç ve uygulama genellikle paralel ilerliyor. Push bildirim altyapısı, çevrimdışı çalışma, kullanım analitiği ve hata takibi de burada kuruluyor — özellikle hata takibi, yayın sonrası kullanıcıların yaşadığı çökmeleri görmenin tek yolu ve sonradan eklemek zor.</p>' +

      '<h2>Aşama 5 — Test</h2>' +
      '<p>Test, geliştiricinin kendi telefonunda denemesi değil. Üç ayrı boyut var: farklı ekran boyutları (küçük telefondan tablete), farklı işletim sistemi sürümleri (eski Android sürümleri hâlâ yaygın) ve gerçek kullanım koşulları (zayıf bağlantı, düşük pil, izin reddetme).</p> ' +
      '<p>Uygulamanın izin isteme davranışı özellikle test edilmeli: kullanıcı konum iznini reddettiğinde uygulama çökmemeli, ne yapacağını bilmeli. Mağaza incelemelerinde en sık takılınan noktalardan biri de bu.</p>' +

      '<h2>Aşama 6 — Mağaza yayını</h2>' +
      '<p>Bu aşama çoğu kişinin beklediğinden daha uzun sürüyor ve büyük kısmı sizin kontrolünüzde değil. Gerekenler:</p>' +
      '<ul>' +
        '<li><strong>Geliştirici hesapları.</strong> Google Play tek seferlik, App Store yıllık ücretli. Hesaplar uygulamanın sahibi olarak sizin adınıza açılmalı — geliştiricinin hesabında duran uygulama, ilerde ciddi bir sorun.</li>' +
        '<li><strong>Mağaza görselleri ve metinler.</strong> Simge, ekran görüntüleri, kısa ve uzun açıklama. Bunlar aynı zamanda mağaza içi aramada bulunmanızı sağlayan alanlar.</li>' +
        '<li><strong>Gizlilik politikası ve veri formu.</strong> İki mağaza da uygulamanın hangi veriyi topladığını beyan etmenizi istiyor. Beyan ile uygulamanın gerçek davranışı uyuşmuyorsa uygulama reddediliyor.</li>' +
        '<li><strong>İnceleme süreci.</strong> Birkaç gün ile birkaç hafta arasında değişebiliyor. Red gelirse gerekçeye göre düzeltip yeniden gönderiliyor; ilk yayında red almak sıra dışı değil.</li>' +
      '</ul>' +

      '<h2>Maliyeti ne belirliyor?</h2>' +
      '<p>Fiyat sorusunun cevabı dört kalemde toplanıyor:</p>' +
      '<ul>' +
        '<li><strong>Ekran sayısı.</strong> En doğrudan etken.</li>' +
        '<li><strong>Sunucu tarafı ihtiyacı.</strong> Üyelik, veritabanı ve bildirim gerekiyorsa proje belirgin şekilde büyüyor.</li>' +
        '<li><strong>Entegrasyonlar.</strong> Ödeme, harita, kimlik doğrulama, üçüncü taraf servisler.</li>' +
        '<li><strong>Mağaza yayınının kapsama dahil olup olmadığı.</strong></li>' +
      '</ul>' +
      '<p>Bir de sık atlanan kalem var: <strong>yayın sonrası.</strong> Uygulama yayınlandığında iş bitmiyor. İşletim sistemleri yılda bir büyük sürüm çıkarıyor ve uygulamanın bunlara uyumlu tutulması gerekiyor; mağazalar da zaman zaman yeni beyan ve kural zorunlulukları getiriyor. Bakımı planlamayan projeler bir–iki yıl içinde mağazadan düşüyor.</p>' +

      '<h2>Ne kadar sürer?</h2>' +
      '<p>Orta ölçekli bir uygulama için 6–12 hafta gerçekçi bir aralık. Buna mağaza inceleme süresi dahil değil, çünkü o süre mağazaların kontrolünde. Süreyi en çok uzatan iki şey: ilk sürüm kapsamının şişmesi ve içerik/veri hazırlığının gecikmesi.</p>',
    faq: [
      { q: 'Mobil uygulama geliştirme ne kadar sürer?', a: 'Orta ölçekli bir uygulama için 6–12 hafta gerçekçi bir aralık. Süreyi en çok ekran sayısı ve sunucu tarafı ihtiyacı belirliyor. Mağaza inceleme süreçleri buna ek olarak birkaç gün ile birkaç hafta arasında değişebiliyor ve bu süre tümüyle mağazaların kontrolünde.' },
      { q: 'Native mi cross-platform mu tercih etmeliyim?', a: 'Uygulamaların büyük çoğunluğunda cross-platform doğru tercih: tek kod tabanından iki platforma çıkıldığı için süre ve maliyet düşüyor, güncellemeler tek yerden yapılıyor. Native, yoğun grafik işleyen oyunlarda, cihazın alt seviye donanımına derinlemesine giren uygulamalarda ve milisaniye hassasiyeti gereken işlerde hâlâ doğru tercih.' },
      { q: 'Mağaza hesabı kimin adına açılmalı?', a: 'Kesinlikle sizin adınıza. Uygulamanın sahibi siz olmalısınız; geliştiricinin hesabında duran bir uygulama, ilerde ekip değiştirmek istediğinizde ciddi bir soruna dönüşüyor. Hesabın kurulumunu ve yayın sürecini geliştirici yürütebilir, ama mülkiyet sizde kalmalı.' },
      { q: 'Uygulama yayınlandıktan sonra ne yapmak gerekiyor?', a: 'İşletim sistemleri yılda bir büyük sürüm çıkarıyor ve uygulamanın bunlara uyumlu tutulması gerekiyor; mağazalar da zaman zaman yeni beyan ve kural zorunlulukları getiriyor. Bunun için bir bakım planı gerekiyor. Bakımı planlanmayan uygulamalar bir–iki yıl içinde mağazadan düşebiliyor.' },
      { q: 'İlk sürüme hangi özellikler girmeli?', a: 'Uygulamanın var olma sebebini tek cümleyle yazın; o cümleye doğrudan hizmet etmeyen her şeyi ikinci sürüme bırakın. Her fikir haklıdır ama hepsi ilk sürüme girerse uygulama hiç yayınlanmaz. İlk sürümün amacı eksiksiz olmak değil, gerçek kullanıcıyla temas etmek.' }
    ],
    related: [
      { title: 'Mobil uygulama geliştirme', desc: 'Bu sürecin yürütüldüğü hizmet', path: '/mobil-uygulama-gelistirme/' },
      { title: 'YolArkadaşım', desc: 'Yayında olan navigasyon uygulamamız', path: '/projeler/yolarkadasim/' },
      { title: 'Mobil oyun geliştirme', desc: 'Oyun projeleri için ayrı süreç', path: '/mobil-oyun-gelistirme/' },
      { title: 'Özel yazılım geliştirme', desc: 'Uygulamanın sunucu tarafı', path: '/ozel-yazilim/' }
    ],
    closingH2: 'Uygulamanızın ekran listesini birlikte çıkaralım',
    closingP: 'Uygulamanın ne yapmasını istediğinizi yazın; ekran listesi ve gerçekçi bir fiyat aralığı çıkarıp dönelim.',
    closingSubject: 'Mobil uygulama talebi'
  },


  /* ======================================================================== */
  {
    slug: 'isletme-otomasyonu-nedir',
    category: 'Otomasyon',
    date: '2026-04-15',
    dateText: '15 Nisan 2026',
    readTime: '8 dk okuma',
    keywords: {
      primary: 'işletme otomasyonu nedir',
      secondary: ['iş süreçleri otomasyonu nedir', 'hangi süreçler otomatikleştirilir', 'KOBİ otomasyon'],
      intent: 'Bilgilendirici — otomasyon kararı öncesi araştırma'
    },
    title: 'İşletme Otomasyonu Nedir? | Romix Studio',
    description: 'İşletme otomasyonu nedir, hangi süreçler otomatikleştirilmeye hazır, hangileri değil? Hazır ERP ile özel panel arasındaki fark ve projelerin başarısızlık sebepleri.',
    h1: 'İşletme otomasyonu nedir?',
    excerpt: 'Hangi süreçler otomasyona hazır, hangileri değil; hazır ERP ile özel panel arasındaki fark ve projelerin neden başarısız olduğu.',
    lead: 'İşletme otomasyonu, kulağa geldiğinden daha sade bir şey: bugün Excel dosyaları, WhatsApp grupları ve kâğıt fişler arasında yürüyen işleri tek bir yerde toplamak. Zor olan kısmı yazılım değil, hangi işin taşınmaya değer olduğuna doğru karar vermek.',
    body:
      '<h2>Tanım: dağınıklığı tek yere toplamak</h2>' +
      '<p>Çoğu küçük ve orta ölçekli işletmede aynı bilgi birkaç yerde birden yaşıyor. Bir iş emri WhatsApp grubunda konuşuluyor, bir Excel’e yazılıyor, sahada kâğıda not ediliyor ve ay sonunda muhasebeye başka bir dosyayla gidiyor. Her aktarımda bilgi ya kayboluyor ya değişiyor.</p>' +
      '<p>Otomasyon, bu akışı tek bir panele taşımak demek: iş emri açılıyor, saha ekibine atanıyor, ekip mobil cihazından kapatıyor, stok otomatik düşüyor, cari hesaba işleniyor ve ay sonu raporu tek tuşla çıkıyor. Bilgi bir kez giriliyor ve bir yerde duruyor.</p>' +

      '<h2>Otomasyona ihtiyaç duyduğunuzun işaretleri</h2>' +
      '<p>Karar genellikle tek bir krizle değil, biriken küçük sürtünmelerle geliyor. Aşağıdakilerden birkaçı size tanıdık geliyorsa süreç olgunlaşmış demektir:</p>' +
      '<ul>' +
        '<li>Aynı bilgi birden fazla yere giriliyor.</li>' +
        '<li>Bir işin hangi aşamada olduğunu öğrenmek için birini aramak gerekiyor.</li>' +
        '<li>Ay sonunda rapor çıkarmak dosyaları elle birleştirmeyi gerektiriyor.</li>' +
        '<li>Kimin neyi ne zaman değiştirdiği takip edilemiyor.</li>' +
        '<li>Ekip büyüdükçe iş hızlanmıyor; koordinasyon yükü artıyor.</li>' +
        '<li>Kritik bilgi tek bir kişinin kafasında ya da telefonunda duruyor.</li>' +
      '</ul>' +

      '<h2>Hangi süreçler otomatikleştirmeye hazır?</h2>' +
      '<p>Her süreç aynı ölçüde uygun değil. Otomasyona en hazır süreçlerin ortak özellikleri şunlar:</p>' +
      '<ul>' +
        '<li><strong>Tekrar ediyor.</strong> Ayda beş kez yapılan bir işi otomatikleştirmenin getirisi, günde elli kez yapılana göre çok düşük.</li>' +
        '<li><strong>Kuralı yazılabiliyor.</strong> “Şu olursa şunu yap” cümlesiyle tarif edilebiliyorsa otomatikleştirilebilir.</li>' +
        '<li><strong>Girdisi düzenli.</strong> Her seferinde aynı biçimde geliyor.</li>' +
        '<li><strong>Hatası pahalı.</strong> Elle yapıldığında hata riski taşıyor ve hatanın bedeli yüksek.</li>' +
      '</ul>' +
      '<p>Buna karşılık her seferinde farklı yürüyen, yoğun muhakeme gerektiren ve nadiren tekrarlanan işleri otomatikleştirmek genellikle zarar ediyor: yazılım maliyeti, kazandırdığı zamandan fazla oluyor. Bu durumda dürüst cevap “bu adım kâğıtta kalsın” olmalı — ve iyi bir yazılım ekibi bunu söyler.</p>' +

      '<h2>Otomasyon işten çıkarma demek mi?</h2>' +
      '<p>Pratikte gördüğümüz şey bu değil. Otomasyonun devraldığı işler genellikle kimsenin yapmayı sevmediği işler: aynı veriyi ikinci kez girmek, dosya birleştirmek, durum sormak için aramak. Bu işler ortadan kalktığında ekip küçülmüyor; aynı ekip daha fazla işi kaldırabiliyor.</p>' +
      '<p>Asıl değişen, ekibin zamanının nereye gittiği. Koordinasyona harcanan saatler asıl işe kayıyor.</p>' +

      '<h2>Hazır ERP mi, özel panel mi?</h2>' +
      '<p>Hazır kurumsal kaynak planlama yazılımlarının sorunu güçsüz olmaları değil, tam tersi. Her sektöre uymak zorunda oldukları için içlerinde sizin hiç kullanmayacağınız yüzlerce ekran taşıyorlar. Ekip bu ekranların arasında kaybolduğunda ortaya en yaygın başarısızlık tablosu çıkıyor: yazılım çalışıyor ama kimse kullanmıyor.</p>' +
      '<p>Karar için pratik bir ölçüt: <strong>akışınız sektörün standardına ne kadar benziyor?</strong> Standart bir akışınız varsa hazır çözüm hem hızlı hem ucuz. Akışınız firmaya özgüyse — ölçüye göre üretim, projeye özel fiyatlama, kendinize has bir onay zinciri — hazır sistemi kendinize benzetmeye çalışmak, sıfırdan yazdırmaktan pahalıya çıkabiliyor.</p>' +
      '<p>Üçüncü bir yol da var ve çoğu zaman en doğrusu bu: hazır muhasebe programınız yerinde kalıyor, üzerine yalnızca sizin akışınıza özgü ekranlar kuruluyor ve ikisi birbirine bağlanıyor.</p>' +

      '<h2>Projelerin çoğu neden başarısız oluyor?</h2>' +
      '<p>Teknik sebeplerden değil. Üç yaygın sebep var ve üçü de proje başında önlenebilir:</p>' +
      '<ol class="numbered">' +
        '<li><strong>Panel ekibin gerçek işine benzemiyor.</strong> Genel geçer ekranlarda ekip kendi işini tanımıyor, her kayıt için gereksiz alan dolduruyor. Önlemi: süreç çıkarımı. Paneldeki her alanın gerçek bir karşılığı olmalı.</li>' +
        '<li><strong>Geçiş bir günde yapılıyor.</strong> Eski sistem kapanıyor, yeni açılıyor, ilk aksaklıkta herkes Excel’e dönüyor. Önlemi: gerçek veriyle bir deneme dönemi ve iki sistemin bir süre paralel yürümesi.</li>' +
        '<li><strong>Kimse öğretmiyor.</strong> Yazılım teslim ediliyor, eğitim verilmiyor. Önlemi: ekip eğitimi, kullanım videosu, yazılı rehber ve devreye alma sonrası ilk haftada ulaşılabilir olmak.</li>' +
      '</ol>' +

      '<h2>Başlamadan önce hazırlanacak üç şey</h2>' +
      '<p>Projeye girmeden önce bu üçünü hazırlarsanız hem süre hem maliyet düşüyor:</p>' +
      '<ul>' +
        '<li><strong>Mevcut akışı yazın.</strong> Bir iş nasıl başlıyor, kimden kime geçiyor, nerede bekliyor, nasıl kapanıyor? Bunu yazarken bile bazı adımların gereksiz olduğunu fark edeceksiniz.</li>' +
        '<li><strong>Verinizi gözden geçirin.</strong> Dağınık veri olduğu gibi aktarılırsa yeni sistemde de dağınık kalır. Temizlik, aktarımdan önce yapılmalı.</li>' +
        '<li><strong>Bir sahip belirleyin.</strong> Projede karar verecek tek bir kişi olmalı. Kararların komiteye dağıldığı projeler uzuyor ve kapsamı şişiyor.</li>' +
      '</ul>' +

      '<h2>Ne kadar sürer, ne kadar tutar?</h2>' +
      '<p>Süreç otomasyonu panelleri için 4–10 hafta gerçekçi bir aralık; kapsamla doğru orantılı. Maliyeti belirleyen kalemler ekran sayısı, kullanıcı rolü çeşitliliği, rapor ihtiyacı, dış sistem entegrasyonları ve mevcut veriden aktarım yapılıp yapılmayacağı.</p>' +
      '<p>Kararı verirken bakılacak asıl rakam ise yazılımın fiyatı değil, mevcut dağınıklığın aylık maliyeti: tekrar eden veri girişine harcanan saatler, kaybolan iş emirleri, geç çıkan raporlar. Bu rakam hesaplanmadan yapılan otomasyon yatırımı, çoğu zaman yanlış yere yapılmış oluyor.</p>',
    faq: [
      { q: 'İşletme otomasyonu tam olarak ne demek?', a: 'Bugün Excel, WhatsApp ve kâğıt üzerinde yürüyen işleri tek bir panele taşımak demek: iş emri açma, saha ekibine atama, stok ve cari takibi, teklif ve fatura üretme, rapor alma. Amaç bilgiyi bir kez girip tek yerde tutmak.' },
      { q: 'Hangi süreçler otomatikleştirilmeye uygun?', a: 'Tekrar eden, kuralı yazılabilen, girdisi düzenli olan ve elle yapıldığında hata riski taşıyan süreçler. Her seferinde farklı yürüyen, yoğun muhakeme gerektiren ve nadiren tekrarlanan işleri otomatikleştirmek genellikle zarar ettiriyor; o adımların insanda kalması daha doğru.' },
      { q: 'Hazır ERP mi almalıyım, özel panel mi yaptırmalıyım?', a: 'Ölçüt şu: akışınız sektörün standardına ne kadar benziyor? Standart bir akışınız varsa hazır çözüm hem hızlı hem ucuz. Akışınız firmaya özgüyse hazır sistemi kendinize benzetmeye çalışmak sıfırdan yazdırmaktan pahalıya çıkabiliyor. Üçüncü ve çoğu zaman en doğru yol, hazır muhasebe programını yerinde bırakıp üzerine yalnızca size özgü ekranları kurmak ve ikisini bağlamak.' },
      { q: 'Otomasyon çalışan sayısını azaltır mı?', a: 'Pratikte gördüğümüz bu değil. Otomasyonun devraldığı işler genellikle kimsenin yapmayı sevmediği işler: aynı veriyi ikinci kez girmek, dosya birleştirmek, durum sormak için aramak. Bunlar kalkınca ekip küçülmüyor, aynı ekip daha fazla işi kaldırabiliyor.' },
      { q: 'Otomasyon projesi ne kadar sürer?', a: 'Süreç otomasyonu panelleri için 4–10 hafta gerçekçi bir aralık ve kapsamla doğru orantılı. Süreyi en çok süreç çıkarımının ne kadar net yapıldığı ve mevcut verinin ne kadar düzenli olduğu etkiliyor.' }
    ],
    related: [
      { title: 'İş süreçleri otomasyonu', desc: 'Bu yazıdaki yaklaşımın uygulandığı hizmet', path: '/otomasyon/' },
      { title: 'İşletme otomasyonu', desc: 'İş emri, stok, cari ve raporlama panelleri', path: '/otomasyon/isletme-otomasyonu/' },
      { title: 'Yapay zekâ otomasyonu', desc: 'Kural yazılamayan adımlar için', path: '/otomasyon/yapay-zeka-otomasyonu/' },
      { title: 'Özel yazılım geliştirme', desc: 'Firmaya özgü yazılım ihtiyaçları', path: '/ozel-yazilim/' }
    ],
    closingH2: 'Süreçlerinizi birlikte çıkaralım',
    closingP: 'Bugün en çok vakit kaybettiren süreci anlatın; yazılıma taşınmaya değer olup olmadığını dürüstçe söyleyelim. Değmiyorsa bunu da söyleriz.',
    closingSubject: 'Otomasyon talebi'
  }
];
