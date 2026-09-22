/* The homepage hero's moonrise, desktop only (wider than the site's 900px breakpoint).
 *
 * A moon rises from behind the ridge in hero.jpg and lays a path of light across the lake. A click
 * on the water sends a ripple through the path; a click on the moon sets it and lets it rise again.
 * There are no controls: the picture itself is the interface.
 *
 * Drawn with the 2D canvas over the hero photograph. The ridge and shoreline were traced from
 * hero.jpg in its own pixels (1600 x 900), and are mapped through the same `center / cover` crop
 * the stylesheet applies, so the moon hides behind the real mountains at any hero size.
 *
 * Phones never load more than this file's first lines. Reduced motion shows the risen moon, still.
 * Nothing is drawn while the hero is off screen or the tab is hidden.
 */
(function () {
  'use strict';

  var hero = document.querySelector('.hero');
  if (!hero || !window.matchMedia) return;
  var probe = document.createElement('canvas');
  if (!probe.getContext || !probe.getContext('2d')) return;
  var wide = window.matchMedia('(min-width: 901px)');
  var still = window.matchMedia('(prefers-reduced-motion: reduce)');

  // hero.jpg, in its own pixels: the ridge (sky above it) and the shoreline (lake below it).
  var RIDGE = [[690, 518], [700, 519], [710, 520], [720, 522], [730, 524], [740, 527], [750, 525], [755, 516], [765, 515], [775, 510],
    [780, 510], [785, 520], [790, 530], [800, 527], [810, 523], [820, 518], [830, 514], [840, 509], [850, 507], [860, 508], [870, 502],
    [875, 497], [890, 499], [905, 498], [915, 492], [930, 491], [940, 494], [950, 495], [960, 489], [985, 491], [995, 486], [1005, 486],
    [1010, 483], [1030, 484], [1035, 477], [1040, 472], [1045, 467], [1050, 463], [1055, 460], [1060, 460], [1065, 463], [1070, 467],
    [1075, 470], [1080, 472], [1090, 472], [1095, 475], [1110, 477], [1130, 481], [1140, 484], [1145, 488], [1150, 491], [1160, 495],
    [1170, 499], [1180, 500], [1195, 505], [1215, 506], [1230, 504], [1235, 511], [1245, 511], [1255, 508], [1260, 504], [1275, 501],
    [1280, 498], [1285, 498], [1290, 501], [1310, 498], [1340, 499], [1345, 497], [1355, 497], [1370, 493], [1375, 493], [1380, 496],
    [1400, 495], [1410, 499], [1415, 503], [1420, 503], [1440, 499], [1450, 497], [1465, 494], [1480, 491], [1490, 487], [1500, 483],
    [1510, 481]];
  var SHORE = [[711, 626], [822, 614], [933, 611], [1044, 617], [1100, 623], [1156, 626], [1211, 626], [1267, 624], [1322, 622],
    [1378, 623], [1433, 622], [1489, 632]];
  var PHOTO_W = 1600, PHOTO_H = 900;

  function lineAt(pts, x) {
    if (x <= pts[0][0]) return pts[0][1];
    for (var i = 0; i < pts.length - 1; i++) {
      if (x <= pts[i + 1][0]) return pts[i][1] + (pts[i + 1][1] - pts[i][1]) * (x - pts[i][0]) / (pts[i + 1][0] - pts[i][0]);
    }
    return pts[pts.length - 1][1];
  }
  function smooth(a, b, x) { var t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); }
  function hash(n) { var s = Math.sin(n) * 43758.5453; return s - Math.floor(s); }

  // The moon's face, drawn once: a warm disc with soft maria and a softened limb.
  function moonFace(size) {
    var cv = document.createElement('canvas'); cv.width = cv.height = size;
    var c = cv.getContext('2d'), h = size / 2, r = size * 0.47;
    c.save(); c.beginPath(); c.arc(h, h, r, 0, Math.PI * 2); c.clip();
    var g = c.createRadialGradient(h - r * 0.12, h - r * 0.12, 0, h, h, r);
    g.addColorStop(0, '#fffaf0'); g.addColorStop(0.72, '#f7ead2'); g.addColorStop(1, '#e6d1ac');
    c.fillStyle = g; c.fillRect(0, 0, size, size);
    [[-0.32, -0.34, 0.27, 0.2], [0.1, -0.32, 0.16, 0.18], [0.3, -0.04, 0.2, 0.18], [0.62, -0.18, 0.1, 0.2], [-0.52, 0.06, 0.36, 0.16],
      [-0.14, 0.36, 0.2, 0.14], [0.44, 0.22, 0.14, 0.14], [-0.3, 0.55, 0.14, 0.1]].forEach(function (m) {
      var mx = h + m[0] * r, my = h + m[1] * r, mr = m[2] * r, mg = c.createRadialGradient(mx, my, 0, mx, my, mr);
      mg.addColorStop(0, 'rgba(128,114,100,' + m[3] + ')'); mg.addColorStop(0.65, 'rgba(128,114,100,' + (m[3] * 0.55) + ')'); mg.addColorStop(1, 'rgba(128,114,100,0)');
      c.fillStyle = mg; c.fillRect(0, 0, size, size);
    });
    c.restore();
    c.globalCompositeOperation = 'destination-in';
    var edge = c.createRadialGradient(h, h, r * 0.965, h, h, r * 1.005);
    edge.addColorStop(0, 'rgba(0,0,0,1)'); edge.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = edge; c.fillRect(0, 0, size, size);
    return cv;
  }

  function Scene() {
    var canvas = document.createElement('canvas');
    canvas.className = 'hero-moon';
    canvas.setAttribute('aria-hidden', 'true');
    hero.insertBefore(canvas, hero.firstChild);
    hero.classList.add('has-moon');
    var ctx = canvas.getContext('2d'), face = moonFace(256);
    var W = 0, H = 0, dpr = 1, L = null;
    var G = still.matches ? 1 : 0, mode = still.matches ? 'grown' : 'wait', wait = 0.6;
    var time = 0, last = 0, raf = 0, visible = true, alive = true;
    var ripples = [], overMoon = false, glow = 0, moon = { x: -1e4, y: -1e4, r: 0 }, rise = 0;

    // Everything that depends on the hero's size: the photo's crop, the ridge and shore on screen,
    // where the moon rises and sets, and how wide its path is.
    function layout() {
      var box = hero.getBoundingClientRect();
      W = Math.round(box.width); H = Math.round(box.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      var s = Math.max(W / PHOTO_W, H / PHOTO_H), ox = (W - PHOTO_W * s) / 2, oy = (H - PHOTO_H * s) / 2;
      var toX = function (x) { return x * s + ox; }, toY = function (y) { return y * s + oy; };
      var ridge = RIDGE.map(function (p) { return [toX(p[0]), toY(p[1]) - 1.5 * s]; });
      var shore = SHORE.map(function (p) { return [toX(p[0]), toY(p[1])]; });
      var inner = hero.querySelector('.hero-inner'), textRight = inner ? inner.getBoundingClientRect().right - box.left : W * 0.5;
      var mx = Math.min(W - 90, Math.max(W * 0.74, textRight + 150));
      var ridgeY = lineAt(ridge, mx);
      L = { ridge: ridge, shore: shore, from: [mx - 24, ridgeY + 70], to: [mx, Math.max(56, ridgeY * 0.3)],
        disc: Math.max(28, Math.min(40, H * 0.062)), path: Math.max(0.75, Math.min(1.1, W / 1440)) };
    }

    function shoreAt(x) { return lineAt(L.shore, x); }

    function drawMoon() {
      var e = 1 - Math.pow(1 - rise, 2);
      var x = L.from[0] + (L.to[0] - L.from[0]) * e, y = L.from[1] + (L.to[1] - L.from[1]) * e, D = L.disc * (1 + 0.03 * glow);
      moon.x = x; moon.y = y; moon.r = D / 2;
      var fadeIn = smooth(0, 0.12, G), g;
      ctx.globalCompositeOperation = 'lighter';
      // The wide glow is moonlit haze: it lies over the mountains too, so the ridge never cuts it.
      var R = D * 8.5;
      g = ctx.createRadialGradient(x, y, 0, x, y, R);
      g.addColorStop(0, 'rgba(255,228,190,' + (0.27 * rise).toFixed(3) + ')'); g.addColorStop(0.4, 'rgba(230,210,190,' + (0.063 * rise).toFixed(3) + ')'); g.addColorStop(1, 'rgba(220,200,180,0)');
      ctx.fillStyle = g; ctx.fillRect(x - R, y - R, R * 2, R * 2);
      // The corona and the disc hide behind the ridge.
      ctx.save();
      ctx.beginPath(); ctx.moveTo(-10, -10); ctx.lineTo(-10, L.ridge[0][1]);
      for (var i = 0; i < L.ridge.length; i++) ctx.lineTo(L.ridge[i][0], L.ridge[i][1]);
      ctx.lineTo(W + 10, L.ridge[L.ridge.length - 1][1]); ctx.lineTo(W + 10, -10); ctx.closePath(); ctx.clip();
      var C = D * 2.6 * (1 + 0.16 * glow), a = Math.min(1, 0.85 * smooth(0, 0.2, G) * (0.94 + 0.06 * Math.sin(time * 0.5)) * (1 + 0.25 * glow));
      g = ctx.createRadialGradient(x, y, 0, x, y, C);
      g.addColorStop(0, 'rgba(255,244,222,' + (0.9 * a).toFixed(3) + ')'); g.addColorStop(0.22, 'rgba(255,236,205,' + (0.35 * a).toFixed(3) + ')');
      g.addColorStop(0.55, 'rgba(255,225,185,' + (0.08 * a).toFixed(3) + ')'); g.addColorStop(1, 'rgba(255,220,170,0)');
      ctx.fillStyle = g; ctx.fillRect(x - C, y - C, C * 2, C * 2);
      ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = fadeIn;
      var F = D / 0.94; ctx.drawImage(face, x - F / 2, y - F / 2, F, F);
      ctx.globalAlpha = 1;
      ctx.restore();
    }

    function drawWater() {
      if (rise <= 0.01) return;
      var mx = moon.x, shore = shoreAt(mx), depth = H - shore;
      if (depth < 20) return;
      var elev = Math.max(0, Math.min(1, (shore - moon.y) / Math.max(60, L.from[1] - L.to[1] - 30))), mh = 1 - elev, PS = L.path;
      ctx.globalCompositeOperation = 'source-over';
      // A soft column of reflected light under the glints.
      ctx.save(); ctx.translate(mx, shore); ctx.scale((40 + 60 * mh) * PS, depth * 1.15);
      var cg = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
      cg.addColorStop(0, 'rgba(255,232,196,' + (0.2 * rise).toFixed(3) + ')'); cg.addColorStop(0.5, 'rgba(255,225,185,' + (0.07 * rise).toFixed(3) + ')'); cg.addColorStop(1, 'rgba(255,220,180,0)');
      ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(0, 0, 1, 0, Math.PI); ctx.fill(); ctx.restore();
      // A bright seam where the path meets the far shore.
      ctx.save(); ctx.translate(mx, shore + 2); ctx.scale((10 + 18 * mh) * PS, 3);
      var fg = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
      fg.addColorStop(0, 'rgba(255,240,212,' + (0.55 * rise).toFixed(3) + ')'); fg.addColorStop(1, 'rgba(255,230,190,0)');
      ctx.fillStyle = fg; ctx.beginPath(); ctx.arc(0, 0, 1, 0, Math.PI * 2); ctx.fill(); ctx.restore();
      // Ripples, in perspective: flatter near the far shore.
      var rip = ripples.map(function (r) {
        var f = Math.max(0, Math.min(1, (r.y - shore) / depth));
        return { x: r.x, y: r.y, rad: (6 + 150 * Math.pow(r.t, 0.8)) * (0.4 + 0.6 * f), flat: 0.1 + 0.22 * f, a: Math.max(0, 1 - r.t / 4.5) };
      });
      rip.forEach(function (r) {
        for (var ring = 0; ring < 3; ring++) {
          var rr = r.rad - ring * 12; if (rr <= 0) continue;
          ctx.strokeStyle = 'rgba(255,236,205,' + (0.22 * r.a * (1 - ring * 0.3)).toFixed(3) + ')'; ctx.lineWidth = 1.2 - ring * 0.3;
          ctx.beginPath(); ctx.ellipse(r.x, r.y, rr, rr * r.flat, 0, 0, Math.PI * 2); ctx.stroke();
        }
      });
      // Glints: dense and tiny at the far shore, larger and sparser toward the viewer. Each lives, fades and
      // comes back elsewhere in its band, clustered toward the centre of the path; a few are long streaks.
      var ROWS = 60;
      for (var row = 0; row < ROWS; row++) {
        var f0 = row / ROWS, f1 = (row + 1) / ROWS, y0 = shore + Math.pow(f0, 1.75) * depth, y1 = shore + Math.pow(f1, 1.75) * depth;
        var n = 3 + Math.floor(f0 * 8);
        for (var k = 0; k < n; k++) {
          var hs = hash(row * 12.9898 + k * 78.233), rate = 0.22 + hs * 0.5, cyc = time * rate + hs * 7.1, life = cyc - Math.floor(cyc), gen = Math.floor(cyc);
          var on = Math.pow(Math.sin(Math.PI * life), 1.5);
          var h1 = hash(hs * 91.7 + gen * 0.618), h2 = hash(hs * 13.3 + gen * 1.37), h3 = hash(hs * 5.1 + gen * 2.11);
          var xo = h1 * 2 - 1; xo = xo * (0.2 + 0.8 * Math.abs(xo));
          var f = f0 + (f1 - f0) * h2, yy = y0 + (y1 - y0) * h2;
          var halfW = (5 + 118 * Math.pow(f, 1.05)) * PS * (0.3 + 0.7 * rise) * (0.62 + 0.55 * (1 - mh));
          var gx = mx + xo * halfW + Math.sin(time * 0.3 + hs * 10) * 1.5, centre = 1 - Math.abs(xo);
          var boost = 0;
          for (var q = 0; q < rip.length; q++) {
            var R0 = rip[q], ex = (gx - R0.x) / R0.rad, ey = (yy - R0.y) / (R0.rad * R0.flat), d = Math.abs(Math.sqrt(ex * ex + ey * ey) - 1);
            boost += R0.a * Math.max(0, 1 - d / 0.12);
          }
          var a = Math.min(1, on * (0.18 + 0.82 * centre * centre) * (0.55 + 0.45 * f) * rise * (1 + 1.4 * boost));
          if (a < 0.02) continue;
          var len = (1.2 + 10 * f) * (0.55 + 0.45 * on) * (h3 > 0.88 ? 1.9 : 1) * (0.6 + 0.7 * h3), th = 0.45 + 1.05 * f;
          if (a > 0.3) {
            ctx.fillStyle = 'rgba(255,228,186,' + (a * 0.16).toFixed(3) + ')';
            ctx.beginPath(); ctx.ellipse(gx, yy, len * 1.9, th * 3.4, 0, 0, Math.PI * 2); ctx.fill();
          }
          ctx.fillStyle = 'rgba(255,' + (234 + Math.round(18 * on)) + ',' + (200 + Math.round(40 * on)) + ',' + a.toFixed(3) + ')';
          ctx.beginPath(); ctx.ellipse(gx, yy, len, th, 0, 0, Math.PI * 2); ctx.fill();
        }
      }
    }

    function draw() {
      rise = smooth(0.04, 0.8, G);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      if (G <= 0) return;
      drawMoon();
      drawWater();
    }

    function advance(dt) {
      if (mode === 'wait') { wait -= dt; if (wait <= 0) mode = 'rising'; }
      else if (mode === 'rising') { G = Math.min(1, G + dt / 8); if (G >= 1) mode = 'grown'; }
      else if (mode === 'setting') { G = Math.max(0, G - dt / 1.8); if (G <= 0) { mode = 'wait'; wait = 0.3; } }
      time += dt;
      glow += ((overMoon ? 1 : 0) - glow) * (1 - Math.exp(-dt * 5));
      ripples.forEach(function (r) { r.t += dt; });
      ripples = ripples.filter(function (r) { return r.t < 4.5; });
    }

    function frame(now) {
      raf = 0;
      if (!alive || !running()) return;
      var dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60; last = now;
      advance(dt); draw();
      raf = requestAnimationFrame(frame);
    }
    function running() { return visible && !document.hidden && !still.matches; }
    function sync() {
      if (running() && !raf) { last = 0; raf = requestAnimationFrame(frame); }
      if (!running()) { if (raf) cancelAnimationFrame(raf); raf = 0; if (still.matches) { G = 1; mode = 'grown'; } draw(); }
    }

    function local(e) { var b = canvas.getBoundingClientRect(); return { x: e.clientX - b.left, y: e.clientY - b.top }; }
    function onMoon(p) { return rise > 0.08 && Math.hypot(p.x - moon.x, p.y - moon.y) < Math.max(22, moon.r * 2.1); }
    function onWater(p) { return rise > 0.02 && p.y > shoreAt(p.x) + 4; }
    function move(e) { var p = local(e); overMoon = onMoon(p); canvas.style.cursor = overMoon || onWater(p) ? 'pointer' : ''; }
    function leave() { overMoon = false; canvas.style.cursor = ''; }
    function click(e) {
      if (still.matches) return;
      var p = local(e);
      if (onMoon(p)) { ripples = []; mode = 'setting'; }
      else if (onWater(p)) { ripples.push({ x: p.x, y: p.y, t: 0 }); if (ripples.length > 5) ripples.shift(); }
      sync();
    }
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerleave', leave);
    canvas.addEventListener('click', click);
    document.addEventListener('visibilitychange', sync);
    still.addEventListener ? still.addEventListener('change', sync) : still.addListener(sync);
    var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) { visible = es[0].isIntersecting; sync(); }) : null;
    if (io) io.observe(hero);
    // The hero's height settles when the web fonts arrive; re-measure then, and on any resize.
    function relayout() { if (alive) { layout(); draw(); } }
    var ro = 'ResizeObserver' in window ? new ResizeObserver(relayout) : null;
    if (ro) ro.observe(hero);
    window.addEventListener('resize', relayout);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(relayout);

    layout(); draw(); sync();

    this.destroy = function () {
      alive = false; if (raf) cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', sync);
      still.removeEventListener ? still.removeEventListener('change', sync) : still.removeListener(sync);
      if (io) io.disconnect(); if (ro) ro.disconnect();
      window.removeEventListener('resize', relayout);
      hero.classList.remove('has-moon'); canvas.remove();
    };
  }

  var scene = null;
  function fit() {
    if (wide.matches && !scene) scene = new Scene();
    else if (!wide.matches && scene) { scene.destroy(); scene = null; }
  }
  wide.addEventListener ? wide.addEventListener('change', fit) : wide.addListener(fit);
  fit();
})();
