/* ==========================================================================
   ROMIX STUDIO — arka plan videosu

   Videolar olduğu gibi oynatılıyor; üzerine efekt, filtre ya da renk eklenmiyor.

   Masaüstü: yatay video karanlıktan başlayıp sisle doluyor. Bir kez baştan sona
   oynuyor, sonra başa dönmüyor — bitmesine az kala, aynı videonun kuyruğundan
   üretilmiş ileri-geri döngü tam eşleşen kareden devralıyor.

   Telefon: dikey video baştan sona dolu, yani korunacak bir giriş yok. Tamamı
   ileri-geri birleştirilip dikişsiz tek parça döngüye çevrildiği için doğrudan
   döngüyle başlıyor, devralmaya gerek kalmıyor.
   ========================================================================== */

(function () {
  const TAIL_START = 4.0;   // sn — bg-loop.mp4'ün orijinal videoda karşılık geldiği an
  const FADE       = 1.0;   // sn — masaüstündeki devralma geçişi

  const intro = document.querySelector('.bg-intro');
  const loop  = document.querySelector('.bg-loop');
  if (!intro || !loop) return;

  const narrow  = window.matchMedia('(max-width: 820px)').matches;
  const calm    = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let   playing = null;     // o an oynayan katman

  const play = (el) => el.play().catch(() => {
    // Tarayıcı otomatik oynatmayı engellerse ilk dokunuşta başlat
    document.addEventListener('pointerdown', () => el.play().catch(() => {}), { once: true });
  });

  // --- Telefon: tek parça dikişsiz döngü --------------------------------
  if (narrow) {
    intro.remove();
    loop.src = loop.dataset.narrow;
    loop.style.opacity = '1';
    playing = loop;

    if (calm) loop.addEventListener('loadeddata', () => loop.pause(), { once: true });
    else play(loop);

  // --- Masaüstü: giriş + bumerang devralma ------------------------------
  } else {
    intro.src = intro.dataset.wide;
    loop.src  = loop.dataset.wide;

    if (calm) {
      // Hareket azaltma: oynatma yok, sisin dolu olduğu tek kare sabit duruyor
      const freeze = () => { loop.currentTime = 0.1; loop.style.opacity = '1'; };
      if (loop.readyState >= 1) freeze();
      else loop.addEventListener('loadedmetadata', freeze, { once: true });
      return;
    }

    let handed = false;
    intro.addEventListener('timeupdate', () => {
      if (handed || !intro.duration) return;
      if (intro.currentTime < intro.duration - FADE) return;

      handed = true;
      loop.currentTime = Math.max(0, intro.currentTime - TAIL_START);
      play(loop);
      loop.style.opacity = '1';
      intro.style.opacity = '0';
      playing = loop;
      setTimeout(() => intro.pause(), FADE * 1000);
    });

    intro.style.opacity = '1';
    playing = intro;
    play(intro);
  }

  // Sekme arka plandayken oynatma (pil ve veri tasarrufu)
  if (calm) return;
  document.addEventListener('visibilitychange', () => {
    if (!playing) return;
    if (document.hidden) playing.pause();
    else playing.play().catch(() => {});
  });
})();
