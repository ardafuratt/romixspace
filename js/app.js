/* ==========================================================================
   ROMIX STUDIO — Three.js + GSAP + custom GLSL

   Mimari: DOM yerleşimin tek kaynağı. Şeritteki her kart normal bir HTML
   elemanı; CSS onları diziyor, biz her karede getBoundingClientRect() ile
   koordinatlarını okuyup üzerlerine tam oturan PlaneGeometry mesh'lerini
   yerleştiriyoruz. Görseller bu mesh'lere texture olarak bağlı.

   Kamera perspektif; fov, 1 dünya birimi = 1 CSS pikseli olacak şekilde
   kamera mesafesinden hesaplanıyor. Böylece shader'da z eksenine verdiğimiz
   her değer gerçek perspektif tepkisi üretiyor.
   ========================================================================== */

/* ==========================================================================
   1. VERTEX SHADER — kavis, derinlik ve hover kubbesi

   x/y kaydırmaları normalize edilmiş düzlem birimlerinde (geometri -0.5..0.5
   aralığında ve mesh ölçekle büyütüldüğü için oradaki 0.06, kartın kendi
   yüksekliğinin %6'sı demek). z ise doğrudan piksel: mesh'in z ölçeği 1,
   dolayısıyla oraya yazdığımız sayı dünya pikseli olarak perspektife giriyor.
   ========================================================================== */

const VERTEX_SHADER = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uVelocity;     // şeridin anlık hızı, ~-1..1
  uniform float uHover;        // 0..1  (GSAP ile tween'leniyor)
  uniform vec2  uMouse;        // imlecin kart içindeki yeri, 0..1
  uniform float uRipple;       // imleç girdiği andaki sönen vuruş (GSAP)
  uniform vec2  uSize;         // kartın piksel ölçüsü
  uniform float uEnter;        // açılıştaki giriş animasyonu 0..1 (GSAP)
  uniform float uCamZ;         // sanal kamera mesafesi (px)
  uniform vec2  uTilt;         // imlece göre tüm şeridin eğilmesi

  varying vec2  vUv;
  varying float vDepth;
  varying float vRipple;

  const float PI = 3.141592653589793;

  void main() {
    vUv = uv;

    vec3 pos = position;
    float z  = 0.0;

    // --- 1. Sabit kavis -----------------------------------------------------
    // Düzlem x boyunca öne doğru bükülüyor: ortası izleyiciye yakın,
    // kenarları geride. Şeridin bir kurdele gibi okunmasını sağlayan taban.
    // sin'in [0,PI] üzerindeki ortalaması 2/PI; onu çıkarınca kartın ortalama
    // derinliği 0 kalıyor, yani düzlem DOM elemanının üstünden kaymıyor.
    float bow = sin(uv.x * PI);
    z += (bow - 0.6366) * 26.0;

    // --- 2. Hız tepkisi -----------------------------------------------------
    // Kaydırma hızlandıkça kartın arkaya kaçan kenarları daha da geriliyor,
    // gövde ise hareket yönüne savruluyor. Durunca kendiliğinden yatışıyor.
    float speed = abs(uVelocity);
    z   -= speed * (1.0 - bow) * 190.0;
    z   -= speed * 60.0;
    pos.y += uVelocity * bow * 0.075;
    pos.x -= uVelocity * (1.0 - bow) * 0.045;

    // --- 3. Hover kubbesi ---------------------------------------------------
    // İki parabolün çarpımı: merkezde 1, dört kenarda tam olarak 0. Kenarlar
    // yerinde kaldığı için silüet bozulmuyor, sadece yüzey şişiyor.
    vec2  q    = uv * 2.0 - 1.0;
    float dome = (1.0 - q.x * q.x) * (1.0 - q.y * q.y);

    // İmlecin bastığı noktadan dışa yayılan halka.
    float d    = distance(uv * vec2(uSize.x / uSize.y, 1.0),
                          uMouse * vec2(uSize.x / uSize.y, 1.0));
    float ring = sin(d * 20.0 - uTime * 4.5) * exp(-d * 3.2);

    z += uHover * dome * 78.0;
    z += (uHover * 0.30 + uRipple) * ring * 38.0 * dome;

    // İmleç merkezden uzaktayken kart hafifçe o yöne yatıyor.
    vec2 lean = (uMouse - 0.5) * uHover;
    z += (uv.x - 0.5) * lean.x * 80.0;
    z -= (uv.y - 0.5) * lean.y * 80.0;

    // --- 4. Giriş animasyonu ------------------------------------------------
    z -= (1.0 - uEnter) * 260.0;
    pos.y -= (1.0 - uEnter) * 0.10;

    // --- 5. Perspektif ------------------------------------------------------
    // Kamera ortografik ve 1 dünya birimi = 1 CSS pikseli; perspektif bölmesini
    // burada elle yapıyoruz. Böylece z = 0 olan her nokta DOM elemanının tam
    // üstüne düşüyor, fov/aspect uyuşmazlığı diye bir şey kalmıyor.
    vec4 world = modelMatrix * vec4(pos.x, pos.y, 0.0, 1.0);

    z += (world.x * uTilt.x - world.y * uTilt.y) * 0.05;

    float persp = uCamZ / max(uCamZ - z, 1.0);
    world.xy *= persp;

    vDepth  = z;
    vRipple = ring * (uHover + uRipple);

    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;


/* ==========================================================================
   2. FRAGMENT SHADER — sıvımsı bozulma

   Bozulma iki katmandan geliyor: imleçten dışa yayılan halkalar (suya
   dokunma) ve yüzeyin tamamında dolaşan yavaş bir akış (fırça darbesi).
   İkisi de uHover ile ölçekleniyor, yani imleç ayrılınca GSAP uHover'ı
   sıfıra çekerken bozulma da pürüzsüzce dağılıyor.
   ========================================================================== */

const FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  uniform sampler2D uTexture;
  uniform vec2  uSize;        // kartın piksel ölçüsü
  uniform vec2  uImage;       // görselin piksel ölçüsü
  uniform vec2  uMouse;
  uniform float uTime;
  uniform float uHover;
  uniform float uRipple;
  uniform float uAlpha;
  uniform float uRadius;

  varying vec2  vUv;
  varying float vDepth;
  varying float vRipple;

  // --- yumuşak gürültü ------------------------------------------------------
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }

  // görseli karta "cover" olarak oturt
  vec2 cover(vec2 uv) {
    float pr = uSize.x / uSize.y;
    float ir = uImage.x / uImage.y;
    vec2  s  = (pr < ir) ? vec2(uSize.y * ir, uSize.y) : vec2(uSize.x, uSize.x / ir);
    vec2  off = (s - uSize) * 0.5 / s;
    return uv * uSize / s + off;
  }

  void main() {
    float amp = uHover + uRipple;

    // --- sıvı bozulma -------------------------------------------------------
    vec2  dir = vUv - uMouse;
    float d   = length(dir);

    // imleçten yayılan halkalar, uzaklıkla sönüyor
    float ring = sin(d * 24.0 - uTime * 4.5) * exp(-d * 3.5);

    // yüzeyde dolaşan yavaş akış
    float flow = noise(vUv * 3.2 + vec2(uTime * 0.18, -uTime * 0.13)) - 0.5;

    vec2 offset = normalize(dir + 1e-5) * ring * 0.013 * amp
                + vec2(flow) * 0.006 * uHover;

    vec2 uv = cover(vUv + offset);

    // --- kırılma: kanalları birbirinden ayır -------------------------------
    float shift = 0.0022 * amp * (0.35 + abs(ring));
    vec3  col;
    col.r = texture2D(uTexture, uv + dir * shift).r;
    col.g = texture2D(uTexture, uv).g;
    col.b = texture2D(uTexture, uv - dir * shift).b;

    // --- derinliğe göre ışık ------------------------------------------------
    col *= 1.0 + vDepth * 0.0013;                  // yakın olan aydınlık
    col += vec3(0.09) * vRipple * uHover;          // dalga sırtlarında parlama

    // --- yuvarlak köşe ------------------------------------------------------
    vec2  p    = vUv * uSize;
    vec2  mid  = uSize * 0.5;                      // 'half' GLSL'de ayrılmış kelime
    float r    = min(uRadius, min(mid.x, mid.y));
    vec2  qq   = abs(p - mid) - mid + r;
    float sdf  = length(max(qq, 0.0)) + min(max(qq.x, qq.y), 0.0) - r;
    float mask = 1.0 - smoothstep(-1.0, 1.0, sdf);

    gl_FragColor = vec4(col, mask * uAlpha);
  }
`;


/* ==========================================================================
   3. GALERİ — DOM ↔ WebGL senkronizasyonu
   ========================================================================== */

(function () {
  'use strict';

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  var stage     = $('#stage');
  var track     = $('#track');
  var canvas    = $('#gl');
  var indexList = $('#indexList');
  var preview   = $('#indexPreview');
  var scrim     = $('#scrim');

  var featured = SITE.projects.filter(function (p) { return p.featured; });
  if (!featured.length) featured = SITE.projects.slice();

  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  var lang = store.get('romix-lang') || 'tr';
  var t    = function () { return SITE.t[lang]; };

  var ARROW = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  var CAM_Z = 900;               // kamera mesafesi (px) — perspektifin şiddeti
  var hasGL = !!(window.THREE && window.gsap);

  var renderer, scene, camera, group, geometry, planes = [];
  var vw = 0, vh = 0;


  /* Ölçüler canvas'ın kendi CSS kutusundan okunuyor: DOM dikdörtgenleriyle
     birebir aynı uzayda olmalı, yoksa mesh'ler elemanlarının üstüne oturmaz. */
  function viewW() { return canvas.clientWidth  || window.innerWidth; }
  function viewH() { return canvas.clientHeight || window.innerHeight; }

  /* --- Three.js sahnesi --------------------------------------------------- */

  function initThree() {
    if (!hasGL) { document.body.classList.add('no-gl'); return false; }

    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvas, alpha: true, antialias: true, powerPreference: 'high-performance'
      });
    } catch (e) {
      hasGL = false;
      document.body.classList.add('no-gl');
      return false;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    // Renk uzayı dönüşümü YOK: shader'lar ham ShaderMaterial, texture'daki
    // sRGB değerleri doğrudan ekrana gidiyor. Dönüşüm açılırsa görseller
    // kaynağın yarısı kadar karanlık çıkıyor.

    scene  = new THREE.Scene();
    group  = new THREE.Group();
    scene.add(group);

    camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -4000, 4000);
    camera.position.z = 1000;

    // 40 x 28 bölüm: kubbe ve dalga halkası köşeli görünmesin
    geometry = new THREE.PlaneGeometry(1, 1, 40, 28);

    return true;
  }

  function sizeThree() {
    if (!hasGL) return;
    renderer.setSize(vw, vh, false);
    camera.left   = -vw / 2;
    camera.right  =  vw / 2;
    camera.top    =  vh / 2;
    camera.bottom = -vh / 2;
    camera.updateProjectionMatrix();
  }

  var loader = hasGL ? new THREE.TextureLoader() : null;
  var texCache = {};

  /* Aynı görsel şeritteki kopyalarda tekrar tekrar kullanılıyor; texture'ı bir
     kez yükleyip paylaşıyoruz. Yükleme bitmeden gelen istekler sıraya giriyor,
     yoksa henüz image'ı olmayan bir texture ile devam edilirdi. */
  function texture(src, onReady) {
    var rec = texCache[src];

    if (rec) {
      if (rec.ready) { onReady(rec.tex); }
      else { rec.cbs.push(onReady); }
      return rec.tex;
    }

    rec = { tex: null, ready: false, cbs: [onReady] };
    texCache[src] = rec;

    rec.tex = loader.load(src, function (t) {
      t.needsUpdate = true;
      rec.ready = true;
      var cbs = rec.cbs.slice();
      rec.cbs.length = 0;
      cbs.forEach(function (cb) { cb(t); });
    });

    rec.tex.minFilter = THREE.LinearFilter;
    rec.tex.magFilter = THREE.LinearFilter;
    rec.tex.generateMipmaps = false;

    return rec.tex;
  }

  function makePlane(project, el) {
    var uniforms = {
      uTexture:  { value: null },
      uSize:     { value: new THREE.Vector2(1, 1) },
      uImage:    { value: new THREE.Vector2(1600, 1000) },
      uMouse:    { value: new THREE.Vector2(0.5, 0.5) },
      uTime:     { value: 0 },
      uVelocity: { value: 0 },
      uHover:    { value: 0 },
      uRipple:   { value: 0 },
      uEnter:    { value: 0 },
      uAlpha:    { value: 0 },
      uRadius:   { value: 20 },
      uCamZ:     { value: CAM_Z },
      uTilt:     { value: new THREE.Vector2(0, 0) }
    };

    var mat = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms: uniforms,
      transparent: true,
      depthWrite: false
    });

    var mesh = new THREE.Mesh(geometry, mat);
    mesh.frustumCulled = false;
    group.add(mesh);

    var item = {
      p: project, el: el, mesh: mesh, u: uniforms,
      ready: false, visible: false, rect: null
    };

    var tex = texture(project.image, function (tt) {
      var img = tt.image || {};
      uniforms.uTexture.value = tt;
      uniforms.uImage.value.set(img.naturalWidth || img.width || 1600,
                                img.naturalHeight || img.height || 1000);
      item.ready = true;
      textureReady();
      // görsel geldiğinde kart derinlikten öne süzülerek yerleşir
      gsap.to(uniforms.uEnter, { value: 1, duration: 1.6, ease: 'expo.out', delay: Math.random() * 0.25 });
      gsap.to(uniforms.uAlpha, { value: 1, duration: 1.0, ease: 'power2.out' });
    });
    uniforms.uTexture.value = tex;

    // GSAP ile yumuşatılmış imleç takibi
    item.moveX = gsap.quickTo(uniforms.uMouse.value, 'x', { duration: 0.5, ease: 'power3.out' });
    item.moveY = gsap.quickTo(uniforms.uMouse.value, 'y', { duration: 0.5, ease: 'power3.out' });

    /* --- hover: GSAP giriş / çıkış --------------------------------------
       Dokunmatikte bunlar bağlanmıyor: Chrome Android dokunuştan sonra sahte
       mouseenter/mousemove üretiyor ve bu olaylar uMouse'u dokunulan noktadan
       başka yere çekerek dokunmatik yolla kavga ediyordu. */

    if (!coarse) {
      el.addEventListener('mouseenter', function (e) {
        if (blocked()) return;
        el.classList.add('is-hover');
        mesh.renderOrder = 1;
        setMouse(item, e, true);
        gsap.killTweensOf(uniforms.uHover);
        gsap.to(uniforms.uHover, { value: 1, duration: 0.9, ease: 'expo.out' });
        gsap.fromTo(uniforms.uRipple, { value: 0.55 },
                                      { value: 0, duration: 1.4, ease: 'power3.out' });
      });

      el.addEventListener('mousemove', function (e) {
        if (blocked()) return;
        setMouse(item, e, false);
      });

      el.addEventListener('mouseleave', function () {
        el.classList.remove('is-hover');
        mesh.renderOrder = 0;
        gsap.killTweensOf(uniforms.uHover);
        gsap.to(uniforms.uHover, { value: 0, duration: 1.1, ease: 'expo.out' });
      });
    }

    return item;
  }

  function blocked() {
    return document.body.classList.contains('has-panel') ||
           document.body.classList.contains('view-full') ||
           drag.on;
  }

  /* Dokunmatik ekranda mouseenter/mouseleave ya hiç gelmiyor ya da güvenilmez
     geliyor; bu yüzden uHover sıfırda kalıp shader'daki sıvı bozulmayı tümüyle
     kapatıyordu (amp = uHover + uRipple). İmleç olmadığı için "hangi kartın
     üzerindeyiz" sorusunun karşılığını "hangi kart ekranın ortasında" alıyoruz:
     merkeze yaklaşan kartın uHover'ı yükseliyor, uzaklaşanınki sönüyor. */
  var coarse = window.matchMedia('(hover: none), (pointer: coarse)').matches;

  var AMBIENT     = 0.5;    // dokunmatikte sürekli duran dalgalanmanın şiddeti
  var RIPPLE_HOLD = 1.6;    // sn — dokunulan nokta bu süre boyunca sabit kalıyor

  function panelOpen() {
    return document.body.classList.contains('has-panel') ||
           document.body.classList.contains('view-full');
  }

  function planeOf(el) {
    for (var i = 0; i < planes.length; i++) {
      if (planes[i].el === el) return planes[i];
    }
    return null;
  }

  function setMouse(item, e, instant) {
    var r = item.el.getBoundingClientRect();
    var x = (e.clientX - r.left) / r.width;
    /* Dikeyi çeviriyoruz: shader vUv olarak düzlemin kendi koordinatını
       kullanıyor (vUv = uv), orada y=0 kartın ALTI. Ekran koordinatında ise
       y=0 kartın üstü. Çevrilmezse dalga, dokunulan noktanın dikey aynasında
       oluşuyor — üste basınca alt dalgalanıyor. */
    var y = 1 - (e.clientY - r.top) / r.height;
    if (instant) {
      item.u.uMouse.value.set(x, y);
    } else {
      item.moveX(x);
      item.moveY(y);
    }
  }


  /* --- Şerit yerleşimi (DOM) ---------------------------------------------- */

  var items = [], setW = 1;

  function build() {
    vw = viewW();
    vh = viewH();

    if (hasGL) {
      planes.forEach(function (it) { group.remove(it.mesh); it.mesh.material.dispose(); });
    }
    planes = [];
    items  = [];
    track.innerHTML = '';

    // önce tek set, genişliği ölçmek için
    featured.forEach(function (p) { track.appendChild(cardEl(p)); });
    var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    setW = track.scrollWidth + gap;
    if (!setW || setW < 10) setW = vw;

    var reps = Math.ceil(vw / setW) + 1;
    track.innerHTML = '';

    for (var r = 0; r < reps; r++) {
      featured.forEach(function (p) {
        var el = cardEl(p);
        track.appendChild(el);
        var item = hasGL ? makePlane(p, el) : { p: p, el: el };
        items.push(item);
        if (hasGL) planes.push(item);
      });
    }

    var radius = (parseFloat(getComputedStyle(document.documentElement).fontSize) || 10) * 2;
    planes.forEach(function (it) { it.u.uRadius.value = radius; });

  }

  function cardEl(p) {
    var el = document.createElement('article');
    el.className = 'card';
    el.dataset.id = p.id;
    el.style.setProperty('--r', p.ratio || '16/10');
    el.innerHTML =
      '<div class="card-media" style="background-image:url(\'' + p.image + '\')"></div>' +
      '<p class="card-foot">' +
        '<span class="card-title">' + p.title + '</span>' +
        '<span class="card-go" aria-hidden="true">' + ARROW + '</span>' +
      '</p>';
    return el;
  }

  var readyCount = 0;
  function textureReady() {
    readyCount++;
    if (readyCount >= Math.min(4, featured.length)) reveal();
  }


  /* --- Ana döngü: DOM'u oku, mesh'leri yerleştir -------------------------- */

  var target = 0, current = 0, prev = 0, velocity = 0, clock = 0;
  var tilt = { x: 0, y: 0 }, tiltNow = { x: 0, y: 0 };

  function wrap(v) { return ((v % setW) + setW) % setW; }

  function tick(time, deltaMs) {
    var dt = Math.min(0.05, deltaMs / 1000);
    clock += dt;

    // Görünüm ölçüsü her karede doğrulanıyor: kamera ile DOM aynı boyutu
    // görmezse mesh'ler elemanlarının üstünden kayar.
    if (viewW() !== vw || viewH() !== vh) {
      vw = viewW();
      vh = viewH();
      sizeThree();
    }

    current += (target - current) * 0.09;

    var raw = (current - prev) / (vw * 0.05);
    prev = current;
    velocity += (Math.max(-1.3, Math.min(1.3, raw)) - velocity) * 0.12;
    if (Math.abs(velocity) < 0.0004) velocity = 0;

    // şeridi kaydır — DOM yerleşimin tek kaynağı
    track.style.transform = 'translate3d(' + (-wrap(current)).toFixed(2) + 'px, -50%, 0)';

    if (!hasGL) return;

    // imlece göre şeridin eğilmesi (mouse hareketinde perspektif tepkisi)
    tiltNow.x += (tilt.x - tiltNow.x) * 0.05;
    tiltNow.y += (tilt.y - tiltNow.y) * 0.05;

    for (var i = 0; i < planes.length; i++) {
      var it = planes[i];

      // === DOM → WebGL ===
      var r = it.el.getBoundingClientRect();
      var on = r.right > -40 && r.left < vw + 40;

      it.mesh.visible = on && it.ready;
      if (!on) continue;

      it.mesh.scale.set(r.width, r.height, 1);
      it.mesh.position.set(
        r.left + r.width * 0.5 - vw * 0.5,
        -(r.top + r.height * 0.5) + vh * 0.5,
        0
      );

      it.u.uSize.value.set(r.width, r.height);
      it.u.uTime.value = clock;
      it.u.uVelocity.value = velocity;
      it.u.uTilt.value.set(tiltNow.x, tiltNow.y);

      /* Dokunmatikte hover'ı ekran merkezine olan yakınlık belirliyor.
         Masaüstündeki 1.0 burada kalıcı olacağı için kullanılamaz: flow
         gürültüsü ve RGB kırılması sürekli tam güçte çalışınca görselin
         kendisi eziliyor. Sürekli olan katman hafif tutuluyor, tam güç
         yalnızca dokunuşla gelen geçici uRipple vuruşunda oluşuyor. */
      if (coarse && !panelOpen()) {
        var cx    = r.left + r.width * 0.5;
        var near  = 1 - Math.min(Math.abs(cx - vw * 0.5) / (vw * 0.7), 1);
        var u     = it.u.uHover;
        u.value += (near * near * AMBIENT - u.value) * 0.07;

        // Dokunulan nokta halka sönene kadar sabit kalsın, sonra ortaya dönsün
        if (!drag.on && clock - (it.touchAt || -9) > RIPPLE_HOLD) {
          var m = it.u.uMouse.value;
          m.x += (0.5 - m.x) * 0.04;
          m.y += (0.5 - m.y) * 0.04;
        }
      }
    }

    renderer.render(scene, camera);
  }


  /* --- Sürükleme, tekerlek, klavye ---------------------------------------- */

  var drag = { on: false, x: 0, start: 0, moved: 0, id: null, card: null };

  stage.addEventListener('pointerdown', function (e) {
    if (document.body.classList.contains('has-panel')) return;
    drag.on = true;
    drag.x = e.clientX;
    drag.start = target;
    drag.moved = 0;
    drag.id = e.pointerId;
    drag.card = e.target.closest ? e.target.closest('.card') : null;
    stage.classList.add('is-dragging');
    stage.setPointerCapture(e.pointerId);

    // Dokunmatikte parmağın değdiği yerden halka yayılsın (masaüstünde bunu
    // mouseenter yapıyor; dokunmatikte o olay gelmediği için burada tetikliyoruz)
    if (coarse && drag.card) {
      var it = planeOf(drag.card);
      if (it) {
        it.touchAt = clock;          // uMouse bu noktada tutulsun
        setMouse(it, e, true);
        gsap.killTweensOf(it.u.uRipple);
        gsap.fromTo(it.u.uRipple, { value: 0.9 },
                                  { value: 0, duration: 1.5, ease: 'power3.out' });
      }
    }
  });

  stage.addEventListener('pointermove', function (e) {
    tilt.x = (e.clientX / vw) * 2 - 1;
    tilt.y = (e.clientY / vh) * 2 - 1;
    if (!drag.on) return;
    var dx = e.clientX - drag.x;
    drag.moved = Math.max(drag.moved, Math.abs(dx));
    target = drag.start - dx * 1.5;

    // Sürüklerken dalga merkezi parmağı izlesin
    if (coarse && drag.card) {
      var it = planeOf(drag.card);
      if (it) { it.touchAt = clock; setMouse(it, e, false); }
    }
  });

  function endDrag() {
    if (!drag.on) return;
    drag.on = false;
    stage.classList.remove('is-dragging');
    try { stage.releasePointerCapture(drag.id); } catch (err) {}
    if (drag.moved < 6 && drag.card) openProject(drag.card.dataset.id);
    drag.card = null;
  }

  stage.addEventListener('pointerup', endDrag);
  stage.addEventListener('pointercancel', endDrag);

  stage.addEventListener('wheel', function (e) {
    if (document.body.classList.contains('has-panel')) return;
    var d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    target += d * 1.1;
  }, { passive: true });

  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closePanels(); return; }
    if (document.body.classList.contains('has-panel')) return;
    if (e.key === 'ArrowRight') target += vw * 0.25;
    if (e.key === 'ArrowLeft')  target -= vw * 0.25;
  });


  /* --- "Tümü" listesi ----------------------------------------------------- */

  var pv = { tx: 0, ty: 0 };

  function buildIndex() {
    indexList.innerHTML = SITE.projects.map(function (p) {
      return '<li><button type="button" data-id="' + p.id + '">' +
               '<span class="index-name">' + p.title + '</span>' +
               '<span class="index-meta label">' + p.year + '</span>' +
             '</button></li>';
    }).join('');
  }

  indexList.addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (b) openProject(b.dataset.id);
  });

  indexList.addEventListener('pointerover', function (e) {
    var b = e.target.closest('button');
    if (!b) return;
    var p = byId(b.dataset.id);
    if (!p) return;
    preview.style.backgroundImage = 'url(\'' + p.image + '\')';
    preview.classList.add('is-on');
  });

  indexList.addEventListener('pointerout', function (e) {
    if (!e.relatedTarget || !e.relatedTarget.closest('#indexList')) {
      preview.classList.remove('is-on');
    }
  });

  var previewX = window.gsap ? gsap.quickTo(preview, 'x', { duration: 0.7, ease: 'power3.out' }) : null;
  var previewY = window.gsap ? gsap.quickTo(preview, 'y', { duration: 0.7, ease: 'power3.out' }) : null;

  window.addEventListener('pointermove', function (e) {
    pv.tx = e.clientX; pv.ty = e.clientY;
    if (previewX) { previewX(e.clientX); previewY(e.clientY); }
  });


  /* --- Paneller ----------------------------------------------------------- */

  function byId(id) {
    for (var i = 0; i < SITE.projects.length; i++) {
      if (SITE.projects[i].id === id) return SITE.projects[i];
    }
    return null;
  }

  function closePanels() {
    $$('.panel').forEach(function (p) {
      p.classList.remove('is-open');
      p.setAttribute('aria-hidden', 'true');
    });
    document.body.classList.remove('has-panel');
    clearHovers();
  }

  function clearHovers() {
    planes.forEach(function (it) {
      it.el.classList.remove('is-hover');
      gsap.killTweensOf(it.u.uHover);
      gsap.to(it.u.uHover, { value: 0, duration: 0.6, ease: 'power2.out' });
    });
  }

  function openPanel(el) {
    var already = el.classList.contains('is-open');
    closePanels();
    if (already) return;
    el.classList.add('is-open');
    el.setAttribute('aria-hidden', 'false');
    document.body.classList.add('has-panel');
  }

  function openProject(id) {
    var p = byId(id);
    if (!p) return;
    $('#projectMeta').textContent = p.year + ' — ' + (p.services ? p.services[lang] : '');
    $('#projectTitle').textContent = p.title;
    $('#projectDesc').textContent = p.desc ? p.desc[lang] : '';
    var link = $('#projectLink');
    if (p.url) {
      link.href = p.url;
      link.textContent = p.app ? t().visitApp : t().visit;
      link.hidden = false;
    } else {
      link.hidden = true;
    }

    // Projenin kendi sayfası — canlı linkin yanındaki ikinci çıkış
    var more = $('#projectMore');
    if (p.slug) {
      more.href = '/projeler/' + p.slug + '/';
      more.textContent = t().projectPage;
      more.hidden = false;
    } else {
      more.hidden = true;
    }

    openPanel($('#panelProject'));
  }

  $('#btnProfile').addEventListener('click', function () { openPanel($('#panelProfile')); });
  $('#btnContact').addEventListener('click', function () { openPanel($('#panelContact')); });
  scrim.addEventListener('click', closePanels);
  $('#btnClose').addEventListener('click', closePanels);

  $('#brand').addEventListener('click', function (e) {
    e.preventDefault();
    closePanels();
    showFeatured();
  });


  /* --- Görünüm değiştirme ------------------------------------------------- */

  function showFeatured() {
    document.body.classList.remove('view-full');
    $('#navFeatured').classList.add('is-active');
    $('#navFull').classList.remove('is-active');
    preview.classList.remove('is-on');
  }

  function showFull() {
    closePanels();
    document.body.classList.add('view-full');
    $('#navFull').classList.add('is-active');
    $('#navFeatured').classList.remove('is-active');
  }

  $('#navFeatured').addEventListener('click', showFeatured);
  $('#navFull').addEventListener('click', showFull);


  /* --- İletişim formu ----------------------------------------------------- */

  var form   = $('#contactForm');
  var status = $('#formStatus');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var value = form.email.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      status.textContent = t().invalid;
      return;
    }
    status.textContent = t().sending;

    /* --- Form servisi kullanacaksan burayı aç ---
    fetch('ENDPOINT', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: value })
    }).then(function () { status.textContent = t().sent; form.reset(); });
    return;
    ------------------------------------------- */

    window.location.href = 'mailto:' + SITE.email +
      '?subject=' + encodeURIComponent('Romix Studio — ' + value);
    status.textContent = t().sent;
    form.reset();
  });


  /* --- Dil ---------------------------------------------------------------- */

  function applyLang() {
    document.documentElement.lang = lang;
    store.set('romix-lang', lang);

    $$('[data-t]').forEach(function (el) { el.textContent = t()[el.dataset.t]; });
    $$('[data-ph]').forEach(function (el) { el.placeholder = t()[el.dataset.ph]; });

    $('#btnLang').innerHTML = lang === 'tr'
      ? 'TR<span class="sep">/</span><span class="dim">EN</span>'
      : '<span class="dim">TR</span><span class="sep">/</span>EN';

    $('#socialLinks').innerHTML = SITE.social.map(function (s) {
      return '<li><a href="' + s.url + '" target="_blank" rel="noopener">' + s.label + '</a></li>';
    }).join('') + '<li><a href="mailto:' + SITE.email + '">' + t().emailLabel + '</a></li>';

    status.textContent = '';
  }

  /* #seo bloğu artık index.html içinde statik duruyor: tuvalin metin karşılığı
     olduğu için sayfayla birlikte gelmesi, JavaScript'in üretmesinden daha
     doğru. Burada üzerine yazmıyoruz. */

  $('#btnLang').addEventListener('click', function () {
    lang = lang === 'tr' ? 'en' : 'tr';
    applyLang();
  });


  /* --- Başlat ------------------------------------------------------------- */

  var revealed = false;
  function reveal() {
    if (revealed) return;
    revealed = true;
    document.body.classList.remove('is-loading');
  }

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      var ratio = setW ? current / setW : 0;
      build();
      sizeThree();
      current = prev = target = ratio * setW;
    }, 200);
  });

  $('#brandText').textContent = SITE.brand;
  buildIndex();
  applyLang();
  initThree();
  build();
  sizeThree();

  if (window.gsap) {
    gsap.ticker.add(tick);
  } else {
    var last = performance.now();
    (function loop(now) {
      requestAnimationFrame(loop);
      tick(now, now - last);
      last = now;
    })(last);
  }

  setTimeout(reveal, 3500);
  if (!hasGL) setTimeout(reveal, 500);
})();
