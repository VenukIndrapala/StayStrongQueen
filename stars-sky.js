(function () {
  const canvas = document.getElementById("sky-canvas");
  const ctx = canvas.getContext("2d");
  let w = 0;
  let h = 0;
  let gradient = null;

  function buildGradient() {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, "#05070f");
    g.addColorStop(0.4, "#0f1938");
    g.addColorStop(0.75, "#1b2c66");
    g.addColorStop(1, "#28398f");
    gradient = g;
  }

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildGradient();
    initStars();
  }

  function randRange(min, max) {
    return min + Math.random() * (max - min);
  }

  let stars = [];

  function initStars() {
    const count = Math.floor((w * h) / 3200);
    stars = [];
    for (let i = 0; i < count; i++) {
      stars.push({
        x: randRange(0, w),
        y: randRange(0, h * 0.85),
        radius: randRange(0.4, 1.6),
        baseAlpha: randRange(0.35, 1),
        twinkleSpeed: randRange(0.01, 0.03),
        twinklePhase: randRange(0, Math.PI * 2),
        driftX: randRange(-0.045, -0.015),
        driftY: randRange(-0.01, 0.01),
      });
    }
  }

  function drawStars() {
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      s.twinklePhase += s.twinkleSpeed;
      const alpha = s.baseAlpha * (0.55 + 0.45 * Math.sin(s.twinklePhase));

      s.x += s.driftX;
      s.y += s.driftY;

      if (s.x < -5) s.x = w + 5;
      if (s.x > w + 5) s.x = -5;
      if (s.y < -5) s.y = h * 0.85;
      if (s.y > h * 0.85 + 5) s.y = -5;

      ctx.globalAlpha = Math.max(alpha, 0.05);
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fillStyle = "#f4f6ff";
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  let shootingStar = null;

  function maybeSpawnShootingStar() {
    if (shootingStar || Math.random() > 0.006) return;
    const startX = randRange(w * 0.2, w * 0.9);
    const startY = randRange(0, h * 0.3);
    shootingStar = {
      x: startX,
      y: startY,
      vx: randRange(-5, -3),
      vy: randRange(2, 3.2),
      life: 1,
    };
  }

  function drawShootingStar() {
    if (!shootingStar) return;
    const s = shootingStar;
    s.x += s.vx;
    s.y += s.vy;
    s.life -= 0.02;

    if (s.life <= 0) {
      shootingStar = null;
      return;
    }

    ctx.globalAlpha = Math.max(s.life, 0);
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x - s.vx * 4, s.y - s.vy * 4);
    ctx.strokeStyle = "#f4f6ff";
    ctx.lineWidth = 1.4;
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  function loop() {
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);
    drawStars();
    maybeSpawnShootingStar();
    drawShootingStar();
    requestAnimationFrame(loop);
  }

  window.addEventListener("resize", resize);
  resize();
  loop();
})();
