// Byte Runner – Arcade-Spiel mit EmotiOS-Reaktionen
(function () {
  const win = document.getElementById("arcadeWindow");
  const btnMin = win.querySelector(".minimize");
  const btnClose = win.querySelector(".close");
  const cvs = document.getElementById("arcadeCanvas");
  const hud = document.getElementById("arcadeHud");
  const ctx = cvs.getContext("2d");

  let running = false, paused = false, raf = 0;

  // Spielzustand
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

  // Hilfsfunktionen
  const rnd = (a, b) => Math.random() * (b - a) + a;
  const rect = (a, b, c, d, col) => { ctx.fillStyle = col; ctx.fillRect(a | 0, b | 0, c | 0, d | 0); };
  const text = (s, x, y) => { ctx.fillStyle = "#eee"; ctx.font = "12px monospace"; ctx.fillText(s, x, y); };

  // Reset
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

  // Hindernisse + Partikel
  function spawnObstacle() {
    const h = rnd(14, 32);
    const w = rnd(10, 20);
    state.obstacles.push({ x: cvs.width + 10, y: 200 - h, w, h, hit: false });
  }

  function addDust(x, y) {
    for (let i = 0; i < 5; i++) {
      state.particles.push({ x, y, vx: rnd(-1, 1), vy: rnd(-1, -3), life: rnd(10, 20) });
    }
  }

  function collide(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
  }

  // Haupt-Update
  function update() {
    if (!running || paused) return;
    state.t++;

    // Hintergrund
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, cvs.width, cvs.height);
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(0, 200, cvs.width, 2);

    // Schwierigkeit
    if (state.t % 180 === 0) state.speed += 0.15;
    if (state.t % Math.max(40, 90 - state.speed * 10) === 0) spawnObstacle();

    // Spieler
    const p = state.player;
    p.vy += state.gravity;
    p.y += p.vy;
    if (p.y >= 186) {
      p.y = 186; p.vy = 0;
      if (!p.onGround) addDust(p.x + p.w / 2, p.y + p.h);
      p.onGround = true;
    }
    rect(p.x, p.y, p.w, p.h, `hsl(${state.themeHue},80%,60%)`);

    // Partikel
    for (let i = state.particles.length - 1; i >= 0; i--) {
      const q = state.particles[i];
      q.x += q.vx; q.y += q.vy; q.vy += 0.15; q.life--;
      rect(q.x, q.y, 2, 2, "#777");
      if (q.life <= 0) state.particles.splice(i, 1);
    }

    // Hindernisse
    for (let i = state.obstacles.length - 1; i >= 0; i--) {
      const o = state.obstacles[i];
      o.x -= state.speed;
      rect(o.x, o.y, o.w, o.h, "#d33");

      if (!o.hit && collide({ x: p.x, y: p.y, w: p.w, h: p.h }, o)) {
        o.hit = true;
        gameOver();
        return;
      }
      if (o.x + o.w < 0) {
        state.obstacles.splice(i, 1);
        state.score++;

        // Kommentar während des Spiels
        if (state.score > 0 && state.score % 8 === 0 && window.emotiOS && window.arcadeDialog) {
          const emo = window.emotiOS.emotion || "Neutral";
          const list = ["Freude", "Lustig", "Kokett", "Neutral"].includes(emo)
            ? arcadeDialog.mid.positive
            : arcadeDialog.mid.negative;
          window.emotiOS.typeText(list[Math.floor(Math.random() * list.length)]);
        }

        if (state.score % 5 === 0) state.themeHue = (state.themeHue + 40) % 360;
      }
    }

    // HUD
    text(`Score: ${state.score}`, 10, 15);
    text(`Best: ${state.best}`, cvs.width - 90, 15);
    raf = requestAnimationFrame(update);
  }

  // Game Over
  function gameOver() {
    cancelAnimationFrame(raf);
    running = false;

    if (state.score > state.best) {
      state.best = state.score;
      localStorage.setItem("arcadeBest", String(state.best));
    }

    // Dialog bei Game Over
    if (window.emotiOS && window.arcadeDialog) {
      const emo = window.emotiOS.emotion || "Neutral";
      const list = ["Freude", "Lustig", "Kokett", "Neutral"].includes(emo)
        ? arcadeDialog.gameover.positive
        : arcadeDialog.gameover.negative;
      window.emotiOS.typeText(list[Math.floor(Math.random() * list.length)]);
    }

    drawGameOver();
  }

  function drawGameOver() {
    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillRect(0, 0, cvs.width, cvs.height);
    ctx.fillStyle = "#fff";
    ctx.font = "16px monospace";
    ctx.fillText("GAME OVER", cvs.width / 2 - 60, cvs.height / 2 - 10);
    ctx.font = "12px monospace";
    ctx.fillText(`Score: ${state.score}   Best: ${state.best}`, cvs.width / 2 - 85, cvs.height / 2 + 10);
    ctx.fillText("Drücke R zum Neustart", cvs.width / 2 - 85, cvs.height / 2 + 30);
  }

  // Start
  function start() {
    if (running) return;
    resetGame();

    // Dialog beim Start
    if (window.emotiOS && window.arcadeDialog) {
      const emo = window.emotiOS.emotion || "Neutral";
      const list = ["Freude", "Lustig", "Kokett", "Neutral"].includes(emo)
        ? arcadeDialog.start.positive
        : arcadeDialog.start.negative;
      window.emotiOS.typeText(list[Math.floor(Math.random() * list.length)]);
    }

    running = true;
    update();
    hud.textContent = "";
  }

  // Steuerung
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
      if (!paused) update();
      hud.textContent = paused ? "Pausiert (P zum Fortsetzen)" : "";
    } else if (e.code === "KeyR") {
      start();
    }
  }
  window.addEventListener("keydown", onKey);

  // Fenstersteuerung
  btnClose.addEventListener("click", () => {
    win.classList.add("hidden");
    cancelAnimationFrame(raf);
    running = false;
  });
  btnMin.addEventListener("click", () => win.classList.add("hidden"));

  // Öffnen vom Desktop
  window.openArcade = function () {
    win.classList.remove("hidden");
    win.style.zIndex = 99999;
    if (!running) start();
  };
})();

// === Emotionale Effekte während des Spielens ===
(function () {
  const arcadeWindow = document.getElementById("arcadeWindow");
  const closeBtn = arcadeWindow.querySelector(".close");

  function applyArcadeEffects() {
    if (!window.emotiOS) return;
    if (arcadeWindow.classList.contains("hidden")) return;

    const c = window.emotiOS.care;
    if (window.emotiHumor) window.emotiHumor.add(5);
    c.interaktion = Math.min(c.interaktion + 5, 100);
    c.anerkennung = Math.max(c.anerkennung - 2, 0);
    c.temperatur = Math.min(c.temperatur + 1, 120);

    window.emotiOS.updateStatusWindow?.();
    window.emotiOS.updateEmotion?.();
    window.emotiOS.updateEmotionDisplay?.();
  }

  setInterval(applyArcadeEffects, 5000);

  closeBtn.addEventListener("click", () => {
    if (window.arcadeEffectInterval) {
      clearInterval(window.arcadeEffectInterval);
      window.arcadeEffectInterval = null;
    }
  });
})();
