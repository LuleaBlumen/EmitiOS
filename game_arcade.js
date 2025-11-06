// === Byte Runner – FPS-fix + flüssigere Levelkurve ===
(function () {
  const win = document.getElementById("arcadeWindow");
  const btnMin = win.querySelector(".minimize");
  const btnClose = win.querySelector(".close");
  const cvs = document.getElementById("arcadeCanvas");
  const hud = document.getElementById("arcadeHud");
  const ctx = cvs.getContext("2d");

  let running = false, paused = false, raf = 0;
  let lastTime = 0; // für Delta-Zeit

  const state = {
    t: 0,
    score: 0,
    best: Number(localStorage.getItem("arcadeBest") || 0),
    speed: 2.2,
    player: { x: 32, y: 160, w: 14, h: 14, vy: 0, onGround: true },
    gravity: 0.5,
    jump: -8.8,
    obstacles: [],
    particles: [],
    themeHue: 180
  };

  const rnd = (a, b) => Math.random() * (b - a) + a;
  const rect = (a, b, c, d, col) => { ctx.fillStyle = col; ctx.fillRect(a | 0, b | 0, c | 0, d | 0); };
  const text = (s, x, y) => { ctx.fillStyle = "#eee"; ctx.font = "12px monospace"; ctx.fillText(s, x, y); };

  function resetGame() {
    state.t = 0;
    state.score = 0;
    state.speed = 2.2;
    state.player.x = 32;
    state.player.y = 160;
    state.player.vy = 0;
    state.player.onGround = true;
    state.obstacles.length = 0;
    state.particles.length = 0;
    paused = false;
  }

  function spawnObstacle() {
    const h = rnd(14, 32);
    const w = rnd(10, 20);
    state.obstacles.push({ x: cvs.width + 10, y: 200 - h, w, h, hit: false });
  }

  function addDust(x, y) {
    for (let i = 0; i < 5; i++)
      state.particles.push({ x, y, vx: rnd(-1, 1), vy: rnd(-1, -3), life: rnd(10, 20) });
  }

  function collide(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
  }

  function update(timestamp) {
    if (!running || paused) return;
    const delta = (timestamp - lastTime) / 16.67; // ≈1 bei 60fps
    lastTime = timestamp;

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, cvs.width, cvs.height);
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(0, 200, cvs.width, 2);

    // Schwierigkeit steigt etwas schneller
    state.t += delta;
    if (state.t % 150 < 1) state.speed += 0.05 * delta;

    // Hindernisse regelmäßiger spawnen (früher ~1.5s → jetzt ~0.9s)
    if (state.t % Math.max(30, 80 - state.speed * 8) < 1) spawnObstacle();

    const p = state.player;
    p.vy += state.gravity * delta;
    p.y += p.vy * delta;
    if (p.y >= 186) {
      p.y = 186; p.vy = 0;
      if (!p.onGround) addDust(p.x + p.w / 2, p.y + p.h);
      p.onGround = true;
    }
    rect(p.x, p.y, p.w, p.h, `hsl(${state.themeHue},80%,60%)`);

    for (let i = state.particles.length - 1; i >= 0; i--) {
      const q = state.particles[i];
      q.x += q.vx * delta;
      q.y += q.vy * delta;
      q.vy += 0.15 * delta;
      q.life -= delta;
      rect(q.x, q.y, 2, 2, "#777");
      if (q.life <= 0) state.particles.splice(i, 1);
    }

    for (let i = state.obstacles.length - 1; i >= 0; i--) {
      const o = state.obstacles[i];
      o.x -= state.speed * delta;
      rect(o.x, o.y, o.w, o.h, "#d33");

      if (!o.hit && collide({ x: p.x, y: p.y, w: p.w, h: p.h }, o)) {
        o.hit = true;
        gameOver();
        return;
      }
if (o.x + o.w < 0) {
  state.obstacles.splice(i, 1);
  state.score++;

  // Positive Systemauswirkungen während des Spiels
  if (window.emotiOS && window.emotiOS.care) {
    const c = window.emotiOS.care;
    c.interaktion   = Math.min(c.interaktion + 0.8, 100);
    c.kommunikation = Math.min(c.kommunikation + 0.6, 100);
    c.temperatur    = Math.min(c.temperatur + 0.15, 120); // leichter Hitzeschub
    window.emotiOS.updateStatusWindow();
  }

  // Humorbonus bei anhaltendem Erfolg
  if (window.emotiHumor && state.score % 3 === 0) {
    window.emotiHumor.add(2);
  }

  // Farbübergang bei 5er-Schritten
  if (state.score % 5 === 0) {
    state.themeHue = (state.themeHue + 40) % 360;
  }
}

    }

    text(`Score: ${state.score}`, 10, 15);
    text(`Best: ${state.best}`, cvs.width - 90, 15);
    raf = requestAnimationFrame(update);
  }

  function gameOver() {
    cancelAnimationFrame(raf);
    running = false;
    if (state.score > state.best) {
      state.best = state.score;
      localStorage.setItem("arcadeBest", String(state.best));
    }
    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillRect(0, 0, cvs.width, cvs.height);
    ctx.fillStyle = "#fff";
    ctx.font = "16px monospace";
    ctx.fillText("GAME OVER", cvs.width / 2 - 60, cvs.height / 2 - 10);
    ctx.font = "12px monospace";
    ctx.fillText(`Score: ${state.score}   Best: ${state.best}`, cvs.width / 2 - 85, cvs.height / 2 + 10);
    ctx.fillText("Drücke R zum Neustart", cvs.width / 2 - 85, cvs.height / 2 + 30);
  }

  function start() {
    if (running) return;
    resetGame();
    running = true;
    lastTime = performance.now();
    update(lastTime);
    hud.textContent = "";
  }

  function onKey(e) {
    if (win.classList.contains("hidden")) return;
    if (e.code === "Space") {
      e.preventDefault();
      if (paused || !running) return;
      const p = state.player;
      if (p.onGround) {
        p.vy = state.jump;
        p.onGround = false;
        addDust(p.x + p.w / 2, p.y + p.h);
      }
    } else if (e.code === "KeyP") {
      if (!running) return;
      paused = !paused;
      if (!paused) { lastTime = performance.now(); update(lastTime); }
      hud.textContent = paused ? "Pausiert (P zum Fortsetzen)" : "";
    } else if (e.code === "KeyR") start();
  }

  window.addEventListener("keydown", onKey);
  btnClose.addEventListener("click", () => { win.classList.add("hidden"); cancelAnimationFrame(raf); running = false; });
  btnMin.addEventListener("click", () => win.classList.add("hidden"));

  window.openArcade = function () {
    win.classList.remove("hidden");
    win.style.zIndex = 99999;
    if (!running) start();
  };
})();
