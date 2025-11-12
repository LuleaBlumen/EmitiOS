// === Byte Runner – FPS-fix + flüssigere Levelkurve ===
(function () {
  const win = document.getElementById("arcadeWindow");
  const btnMin = win.querySelector(".minimize");
  const btnClose = win.querySelector(".close");
  const cvs = document.getElementById("arcadeCanvas");
  const hud = document.getElementById("arcadeHud");
  const ctx = cvs.getContext("2d");
  // === Cowboy Assets ===
	const imgCowboyRun = new Image();
	imgCowboyRun.src = "arcade/cowboy_run.png";

	const imgCowboyJump = new Image();
	imgCowboyJump.src = "arcade/cowboy_jump.png";
	
	// === VOGEL-SPRITE ===
	const birdSprite = new Image();
	birdSprite.src = "arcade/bird_sprite.png";
	const birdFrameWidth = 32;
	const birdFrameHeight = 24;
	const birdFrameCount = 2;
	let birdFrame = 0;
	let birdTimer = 0;
	
	// === POWERUP ICONS ===
const powerupIcons = {
  jump: new Image(),
  shotgun: new Image(),
  slowmo: new Image(),
  shield: new Image(),
  gold: new Image(),
  random: new Image(),
  dust: new Image(),
  whiskey: new Image(),
life: new Image()
};

// Bildpfade setzen
powerupIcons.jump.src = "arcade/powerup_jump.png";
powerupIcons.shotgun.src = "arcade/powerup_shotgun.png";
powerupIcons.slowmo.src = "arcade/powerup_slow.png";
powerupIcons.shield.src = "arcade/powerup_shield.png";
powerupIcons.gold.src = "arcade/powerup_gold.png";
powerupIcons.random.src = "arcade/powerup_random.png";
powerupIcons.dust.src = "arcade/powerup_dust.png";
powerupIcons.whiskey.src = "arcade/powerup_whiskey.png";
powerupIcons.life.src = "arcade/powerup_heart.png";

const powerupSize = 24;

// === HERZ ICON ===
const imgHeart = new Image();
imgHeart.src = "arcade/powerup_heart.png"; // dein Herz-Bild



	
	// === Hintergrund ===
	const imgBg = new Image();
	imgBg.src = "arcade/bg_west4.png";


  let running = false, paused = false, raf = 0;
  let lastTime = 0; // für Delta-Zeit
  let gameStartTime = 0;


  const state = {
    t: 0,
    score: 0,
    best: Number(localStorage.getItem("arcadeBest") || 0),
    speed: 2.2,
    player: { x: 32, y: 160, w: 42, h: 42, vy: 0, onGround: true },
    gravity: 0.5,
    jump: -8.8,
    obstacles: [],
    particles: [],
    themeHue: 180,
	lives: 3,        
	maxLives: 3      
  };
  
  state.bullets = []; // für Schüsse
  state.powerups = [];

const powerupTypes = [
  { name: "jump", positive: true },
  { name: "shotgun", positive: true },
  { name: "slowmo", positive: true },
  { name: "shield", positive: true },
  { name: "gold", positive: true },
  { name: "random", positive: true },
  { name: "dust", positive: false },
  { name: "whiskey", positive: false },
  { name: "life", positive: true }
];

let activeEffects = {}; // Aktive Buffs/Debuffs
let invincible = 0;
let jumpPressed = false;
let jumpCharge = 0;


  const rnd = (a, b) => Math.random() * (b - a) + a;
  const rect = (a, b, c, d, col) => { ctx.fillStyle = col; ctx.fillRect(a | 0, b | 0, c | 0, d | 0); };
  const text = (s, x, y) => { ctx.fillStyle = "#eee"; ctx.font = "12px monospace"; ctx.fillText(s, x, y); };

function resetGame() {
  state.t = 0;
  state.score = 0;
  state.speed = 2.2;

  // Leben richtig initialisieren
  state.lives = 3;
  state.maxLives = 3;

  state.player.x = 32;
  state.player.y = 160;
  state.player.vy = 0;
  state.player.onGround = true;

  // alles Spielfeld-Zeug leeren
  state.obstacles.length = 0;
  state.particles.length = 0;
  state.bullets.length = 0;
  state.powerups.length = 0;

  // Power-Up-Zustände zurücksetzen
  activeEffects = {};
  state.gravity = 0.5;
  state.jump = -8.8;
  state.scoreMultiplier = 1;
  state.shotSpread = false;

  paused = false;
}



function spawnObstacle() {
  const airborne = Math.random() < 0.5;

  if (airborne) {
    const h = birdFrameHeight;
    const w = birdFrameWidth;
    const y = rnd(80, 130);
    state.obstacles.push({ x: cvs.width + 10, y, w, h, hit: false, airborne: true });
  } else {
    const h = rnd(14, 32);
    const w = rnd(10, 20);
    const y = 200 - h;
    state.obstacles.push({ x: cvs.width + 10, y, w, h, hit: false, airborne: false });
  }
}

function spawnPowerup() {
  if (Math.random() < 0.1) { // 10% Chance
    const type = powerupTypes[Math.floor(Math.random() * powerupTypes.length)];
    const y = rnd(70, 150);
    state.powerups.push({
      x: cvs.width + 20,
      y,
      w: powerupSize,
      h: powerupSize,
      type
    });
  }
}

function shoot() {
  const p = state.player;

  // === Schrotflinte aktiv? ===
  if (activeEffects.shotgun) {
    const pelletCount = 6;  // Anzahl der Kugeln
    const spread = 0.6;     // Winkelbreite (größer = mehr Streu)
    const speed = 9;        // Grundgeschwindigkeit

    for (let i = 0; i < pelletCount; i++) {
      const angle = (Math.random() - 0.5) * spread; // z.B. -0.3 bis +0.3 rad
      const bullet = {
        x: p.x + p.w - 4,
        y: p.y + p.h / 2 - 2,
        w: 6,
        h: 2,
        vx: speed * Math.cos(angle),
        vy: speed * Math.sin(angle)   // leicht nach oben/unten
      };
      state.bullets.push(bullet);
    }
  } else {
    // === normaler Einzelschuss ===
    const bullet = {
      x: p.x + p.w - 4,
      y: p.y + p.h / 2 - 2,
      w: 6,
      h: 2,
      vx: 8,
      vy: 0
    };
    state.bullets.push(bullet);
  }
}




  function collide(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
  }
// === kleine Staubwolke bei Sprüngen oder Treffern ===
function addDust(x, y) {
  for (let i = 0; i < 6; i++) {
    state.particles.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 2,
      vy: Math.random() * -2,
      life: 15,
    });
  }
}

  function update(timestamp) {
    if (!running || paused) return;
	  // Sicherheits-Check: Falls activeEffects nach Game Over leer sein sollte
	  if (invincible > 0) invincible--;
	if (!activeEffects) activeEffects = {};
    const delta = (timestamp - lastTime) / 16.67; // ≈1 bei 60fps
    lastTime = timestamp;
// === Hintergrund zeichnen ===
const bgWidth = imgBg.width || cvs.width;
const offset = (state.t * 0.5) % bgWidth;

if (imgBg.complete) {
  ctx.drawImage(imgBg, -offset, 0, bgWidth, cvs.height);
  ctx.drawImage(imgBg, bgWidth - offset, 0, bgWidth, cvs.height);
} else {
  // Fallback-Farben falls Bild noch lädt
  const sky = ctx.createLinearGradient(0, 0, 0, cvs.height);
  sky.addColorStop(0, "#87ceeb");
  sky.addColorStop(1, "#c2a36b");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, cvs.width, cvs.height);
}

// Boden
ctx.fillStyle = "#c2a36b";
ctx.fillRect(0, 200, cvs.width, 4);


    // Schwierigkeit steigt etwas schneller
    state.t += delta;
    if (state.t % 150 < 1) state.speed += 0.05 * delta;

// Hindernisse & Power-Ups spawnen
if (state.t % Math.max(30, 80 - state.speed * 8) < 1) {
  spawnObstacle();   // bleibt wie gehabt
  spawnPowerup();    // neu hinzugefügt
}

    const p = state.player;
    p.vy += state.gravity * delta;
    p.y += p.vy * delta;
// === Variabler Sprung bei Flügel-Powerup ===
// === Variabler Sprung bei Flügel-Powerup ===
if (jumpPressed) {
  jumpCharge += delta;
  const maxCharge = activeEffects.jump ? 20 : 12;

  // Anfangsschub – einmalig beim ersten Drücken
  if (jumpCharge < 1) {
    state.player.vy = activeEffects.jump ? -7 : -8.8;
    state.player.onGround = false;
  }

  // Halten für längeren Sprung (nur mit Flügel)
  if (activeEffects.jump && jumpCharge < maxCharge) {
    state.player.vy -= 0.2 * delta;
  }

  // Beenden, wenn zu lange gehalten
  if (jumpCharge >= maxCharge) jumpPressed = false;
}



	const GROUND_Y = 160;  // oder 150, je nachdem wie hoch du willst

	if (p.y >= GROUND_Y) {
	  p.y = GROUND_Y;
	  p.vy = 0;
	  if (!p.onGround) addDust(p.x + p.w / 2, p.y + p.h);
	  p.onGround = true;
	}

// === Cowboy-Animation ===
const frameW = imgCowboyRun.width / 4;
if (p.onGround) {
  // Lauf-Frames
  const frame = Math.floor(state.t / 8) % 4;
  if (imgCowboyRun.complete) {
    ctx.drawImage(
      imgCowboyRun,
      frame * frameW, 0, frameW, imgCowboyRun.height,
      p.x, p.y, p.w, p.h
    );
  } else {
    // Fallback: brauner Klotz nur, wenn das Bild noch lädt
    rect(p.x, p.y, p.w, p.h, "#a0522d");
  }

} else {
  // Sprungbild
  if (imgCowboyJump.complete) {
    ctx.drawImage(
      imgCowboyJump,
      0, 0, imgCowboyJump.width, imgCowboyJump.height,
      p.x, p.y, p.w, p.h
    );
  } else {
    rect(p.x, p.y, p.w, p.h, "#d2691e");
  }
}
// === Schild-Effekt zeichnen (immer sichtbar) ===
if (activeEffects.shield && !activeEffects.shieldUsed) {
  const px = state.player.x + state.player.w / 2;
  const py = state.player.y + state.player.h / 2;
  ctx.beginPath();
  ctx.arc(px, py, state.player.w * 0.8, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(100,180,255,0.6)";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.closePath();
}


		// Vogel-Frames animieren
		birdTimer += delta;
		if (birdTimer > 9) {        // Zahl kleiner = schnelleres Flattern
		  birdFrame = (birdFrame + 1) % birdFrameCount;
		  birdTimer = 0;
		}

// === Hindernisse & Vögel bewegen, zeichnen, prüfen ===
for (let i = state.obstacles.length - 1; i >= 0; i--) {
  const o = state.obstacles[i];
  o.x -= state.speed * delta;

  if (o.airborne) {
    // sanftes Auf/Ab-Wackeln pro Vogel
    o.y += Math.sin(state.t / 8 + i) * 0.4;

    // Vogel zeichnen (leicht vergrößert)
    ctx.drawImage(
      birdSprite,
      birdFrame * birdFrameWidth, 0,
      birdFrameWidth, birdFrameHeight,
      o.x, o.y,
      birdFrameWidth * 1.8, birdFrameHeight * 1.8
    );

    // aktuelle Kollisiongröße merken
    o.w = birdFrameWidth * 1.6;
    o.h = birdFrameHeight * 1.6;
  } else {
    // Bodenhindernis zeichnen
    const grd = ctx.createLinearGradient(o.x, o.y, o.x, o.y + o.h);
    grd.addColorStop(0, "#4caf50");
    grd.addColorStop(1, "#2e7d32");
    ctx.fillStyle = grd;
    ctx.fillRect(o.x, o.y, o.w, o.h);
  }

  // aus dem Bild fliegen? löschen
  if (o.x + o.w < 0) state.obstacles.splice(i, 1);
}

// === Punkt für übersprungene Bodenhindernisse ===
// Bedingung: Bodenblock (nicht airborne), noch nicht gezählt, komplett hinter dem Spieler
for (const o of state.obstacles) {
  if (!o.airborne && !o.counted && (o.x + o.w) < state.player.x) {
    o.counted = true; // nur einmal zählen
    state.score += 1 * (state.scoreMultiplier || 1);
  }
}


// === Cowboy-Kollision (Cowboy UND Vogel-Hitbox verkleinert) ===
for (const o of state.obstacles) {
  let hit = false;

  // --- Cowboy-Hitbox leicht kleiner ---
  const cowboyShrink = 0.7; // 0.8 = 80% der sichtbaren Größe
  const c = {
    x: state.player.x + (state.player.w * (1 - cowboyShrink)) / 2,
    y: state.player.y + (state.player.h * (1 - cowboyShrink)) / 2,
    w: state.player.w * cowboyShrink,
    h: state.player.h * cowboyShrink
  };

  // --- Hindernis-Hitbox ---
  if (o.airborne) {
    // Vögel etwas kleiner treffen
    const birdShrink = 0.5;
    const offsetX = (o.w - o.w * birdShrink) / 2;
    const offsetY = (o.h - o.h * birdShrink) / 2;

    hit = collide(c, {
      x: o.x + offsetX,
      y: o.y + offsetY,
      w: o.w * birdShrink,
      h: o.h * birdShrink
    });
  } else {
    // Bodenblöcke ganz normal prüfen
    hit = collide(c, o);
  }

if (hit && invincible === 0) {
  if (activeEffects.shield) {
    activeEffects.shield = 60;
    activeEffects.shieldUsed = true;
    addDust(state.player.x + state.player.w / 2, state.player.y + state.player.h);
    continue;
  }

  invincible = 60; // 1 Sekunde (bei 60 FPS)
  state.lives--;
  if (state.lives > 0) {
    addDust(state.player.x + state.player.w / 2, state.player.y + state.player.h);
    state.player.vy = -4;
    continue;
  } else {
    gameOver();
    return;
  }
}


}


// === Power-Ups einsammeln ===
for (let i = state.powerups.length - 1; i >= 0; i--) {
  const pwr = state.powerups[i];
  if (collide(state.player, pwr)) {
    activatePowerup(pwr.type.name);
    state.powerups.splice(i, 1);
  }
}


// === Power-Ups bewegen & zeichnen ===
for (let i = state.powerups.length - 1; i >= 0; i--) {
  const pwr = state.powerups[i];
  pwr.x -= state.speed * delta;
  pwr.y += Math.sin(state.t / 10 + i) * 0.3;

  const icon = powerupIcons[pwr.type.name];
  if (icon && icon.complete) {
    ctx.drawImage(icon, pwr.x, pwr.y, powerupSize, powerupSize);
  } else {
    rect(pwr.x, pwr.y, powerupSize, powerupSize, pwr.type.positive ? "#0f0" : "#f00");
  }

  if (pwr.x + pwr.w < 0) state.powerups.splice(i, 1);
}



	
	// === Kugeln bewegen und zeichnen ===
for (let i = state.bullets.length - 1; i >= 0; i--) {
  const b = state.bullets[i];
b.x += b.vx;
if (b.vy) b.y += b.vy * 0.8; // leichte Streuung nach oben/unten

// sichtbarerer Schuss
const grad = ctx.createLinearGradient(b.x, b.y, b.x + b.w, b.y);
grad.addColorStop(0, "#fff8b0");
grad.addColorStop(1, "#ffcc00");
ctx.fillStyle = grad;
ctx.fillRect(b.x, b.y - 1, b.w + 2, b.h + 2);

// leichter Glanz
ctx.fillStyle = "rgba(255,255,150,0.4)";
ctx.fillRect(b.x - 2, b.y, b.w, b.h);


  // Entfernen, wenn außerhalb
  if (b.x > cvs.width) {
    state.bullets.splice(i, 1);
    continue;
  }


// Kollision mit Hindernissen (nur fliegende treffen)
for (let j = state.obstacles.length - 1; j >= 0; j--) {
  const o = state.obstacles[j];

  // Nur treffen, wenn als „airborne“ markiert
  if (o.airborne) {
    if (
      b.x < o.x + o.w &&
      b.x + b.w > o.x &&
      b.y < o.y + o.h &&
      b.y + b.h > o.y
    ) {
      // Treffer!
      state.obstacles.splice(j, 1);
      state.bullets.splice(i, 1);
	state.score += 2 * (state.scoreMultiplier || 1);
      addDust(o.x + o.w / 2, o.y + o.h / 2);
      break;
    }
  }
}




}


    text(`Score: ${state.score}`, 10, 15);
    text(`Best: ${state.best}`, cvs.width - 90, 15);
	
	// === Leben anzeigen ===
for (let i = 0; i < state.lives; i++) {
  if (imgHeart.complete) {
    ctx.drawImage(imgHeart, 10 + i * 20, 24, 16, 16);
  } else {
    // Fallback-Kreis
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(18 + i * 20, 32, 6, 0, Math.PI * 2);
    ctx.fill();
  }
}


// === Power-Up-Effekte verwalten ===
for (const eff in activeEffects) {
  if (activeEffects[eff] > 0) activeEffects[eff]--;
  else if (activeEffects[eff] === 0) {
    if (eff === "slowmo") state.speed *= 2; // normalisieren
	 state.jump = -8.8;  // Sprungstärke zurück auf normal
    delete activeEffects[eff];
  }
}

// Gravitation
state.gravity = activeEffects.jump ? 0.25 : activeEffects.whiskey ? 0.6 : 0.5;

// Shotgun aktiv?
state.shotSpread = !!activeEffects.shotgun;

// Goldrausch aktiv?
state.scoreMultiplier = activeEffects.gold ? 2 : 1;

// Staubsturm (Sicht verschlechtern)
if (activeEffects.dust) {
  ctx.fillStyle = "rgba(139,69,19,0.25)";
  ctx.fillRect(0, 0, cvs.width, cvs.height);
}

// Schild-Timer abbauen (wenn benutzt)
if (activeEffects.shieldUsed && activeEffects.shield > 0) {
  activeEffects.shield--;
  if (activeEffects.shield <= 0) {
    delete activeEffects.shield;
    delete activeEffects.shieldUsed;
  }
}
if (window.EmotiMemory && window.arcadeDialog && window.arcadeDialog.longplay) {
  const stats = EmotiMemory.load();
  const playSeconds = stats.gamingTime || 0;

  if (playSeconds > 300 && playSeconds < 900) {
    window.emotiOS?.typeText(randomItem(window.arcadeDialog.longplay.moderate));
  } else if (playSeconds >= 900) {
    window.emotiOS?.typeText(randomItem(window.arcadeDialog.longplay.extreme));
  }
}


function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

    raf = requestAnimationFrame(update);
	} // Ende update()

	function gameOver() {
		// === Spielzeit an Memory melden ===
	if (window.EmotiMemory && typeof gameStartTime !== "undefined") {
	  const playSeconds = Math.round((Date.now() - gameStartTime) / 1000);
	  EmotiMemory.record("gamingTime", playSeconds);
	}
    cancelAnimationFrame(raf);
    activeEffects = {};
    state.speed = 2.2; // Slowmo fix

    running = false;
	if (window.EmotiMemory) {
  const playSeconds = Math.round((Date.now() - gameStartTime) / 1000);
  EmotiMemory.record("gamingTime", playSeconds);
}
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

    window.lastArcadeScore = state.score;

    if (window.emotiOS && window.arcadeDialog) {
      const emo = window.emotiOS.emotion || "Neutral";
      const isPos = ["Freude","Lustig","Kokett","Neutral"].includes(emo);
      const pool = window.arcadeDialog.gameover?.[isPos ? "positive" : "negative"] || [];
      if (pool.length) {
        const msg = pool[Math.floor(Math.random() * pool.length)];
        const user = localStorage.getItem("emotiUser") || "Benutzer";
        window.emotiOS.typeText(msg.replace(/\$\{name\}/g, user));
      }

      const c = window.emotiOS.care;
      if (c) {
        c.anerkennung = Math.min(c.anerkennung + Math.min(state.score, 15), 100);
        window.emotiOS.updateStatusWindow?.();
      }
    }
	// === Game-Over-Screen sichtbar halten ===
	setTimeout(() => {
	  ctx.fillStyle = "rgba(0,0,0,0.6)";
	  ctx.fillRect(0, 0, cvs.width, cvs.height);
	  ctx.fillStyle = "#fff";
	  ctx.font = "16px monospace";
	  ctx.fillText("GAME OVER", cvs.width / 2 - 60, cvs.height / 2 - 10);
	  ctx.font = "12px monospace";
	  ctx.fillText(`Score: ${state.score}   Best: ${state.best}`, cvs.width / 2 - 85, cvs.height / 2 + 10);
	  ctx.fillText("Drücke R zum Neustart", cvs.width / 2 - 85, cvs.height / 2 + 30);
	}, 50);
  }

  function start() {
    if (running) return;
    resetGame();
	gameStartTime = Date.now();
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
      // Startimpuls für den Sprung (ohne den hebt er nie ab)
      p.vy = state.jump;
      p.onGround = false;
      addDust(p.x + p.w / 2, p.y + p.h);

      // Flags für den "länger halten = höher" Effekt
      jumpPressed = true;
      jumpCharge  = 0;
    }
  } else if (e.code === "KeyS") {
    if (running && !paused && !e.repeat) shoot();
  } else if (e.code === "KeyP") {
    if (!running) return;
    paused = !paused;
    if (!paused) { lastTime = performance.now(); update(lastTime); }
    hud.textContent = paused ? "Pausiert (P zum Fortsetzen)" : "";
  } else if (e.code === "KeyR") start();
}
window.addEventListener("keydown", onKey);

window.addEventListener("keyup", (e) => {
  if (e.code === "Space") jumpPressed = false;
});

  window.addEventListener("keydown", onKey);
  btnClose.addEventListener("click", () => {
    win.classList.add("hidden");
    cancelAnimationFrame(raf);
    running = false;
  });
  window.addEventListener("keyup", (e) => {
  if (e.code === "Space") jumpPressed = false;
});

  btnMin.addEventListener("click", () => win.classList.add("hidden"));

  function activatePowerup(name) {
    switch (name) {
      case "life":
        if (state.lives < state.maxLives) state.lives++;
        break;
      case "jump":
        activeEffects.jump = 10 * 60;
        break;
      case "shotgun":
        activeEffects.shotgun = 10 * 60;
        break;
      case "slowmo":
	  // Halbiere Speed nur beim Eintritt (nicht jedes Mal)
	  if (!activeEffects.slowmo) state.speed *= 0.5;
	  activeEffects.slowmo = 5 * 60; // 5 Sekunden bei 60 FPS

	  // Während Slowmo: etwas stärkerer Startsprung
	  // (wir erhöhen NICHT die Dauer, nur den initialen „Kick“)
	  state.jump = -10;  // normal war -8.8
	  break;

      case "shield":
        activeEffects.shield = 999;
        activeEffects.shieldUsed = false;
        break;
      case "gold":
        activeEffects.gold = 10 * 60;
        break;
      case "random":
        let random;
        do {
          random = powerupTypes[Math.floor(Math.random() * powerupTypes.length)];
        } while (random.name === "random");
        activatePowerup(random.name);
        break;
      case "dust":
        activeEffects.dust = 6 * 60;
        break;
      case "whiskey":
        activeEffects.whiskey = 6 * 60;
        break;
    }
  }

  window.openArcade = function () {
    win.classList.remove("hidden");
    win.style.zIndex = 99999;
    if (!running) start();
  };

// Wenn Space losgelassen wird → Sprung beenden
window.addEventListener("keyup", (e) => {
  if (e.code === "Space") jumpPressed = false;
});

})(); // schließt das IIFE korrekt
