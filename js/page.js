/* ==========================================================================
   ROMIX STUDIO — içerik sayfaları betiği

   hizmetler.html içinde satır içi duran betiğin ortak hâli. Tek işi yıl
   damgasını tazelemek ve bölümleri göründükçe belirtmek; içeriğin hiçbiri
   bu betiğe bağlı değil, JavaScript kapalıyken de sayfa tam okunur.
   ========================================================================== */

(function () {
  'use strict';

  var yil = document.getElementById('yil');
  if (yil) yil.textContent = new Date().getFullYear();

  var rise = document.querySelectorAll('.rise');
  if (!rise.length) return;

  // Hareketi azaltma tercihi varsa animasyon yok, içerik doğrudan görünür
  var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (calm || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(rise, function (el) { el.classList.add('is-in'); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -12% 0px' });

  Array.prototype.forEach.call(rise, function (el) { io.observe(el); });
})();
