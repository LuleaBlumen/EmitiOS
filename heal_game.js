// === Systemreparatur / Emoti-Puls (Final Fix) ===
(function () {
  const ROUND_PULSES = 15; // Anzahl der Pulse
  const PERFECT_ZONE = 0.1; // Perfekter Trefferbereich
  const TOLERANCE = 0.25; // Noch akzeptabler Bereich

  // Fenster erzeugen
  function createHealWindow() {
    const existing = document.getElementById("healWindow");
    if (existing) return existing;

    const win = document.createElement("div");
    win.className = "window heal";
    win.id = "healWindow";
    win.innerHTML = `
      <div class="window-header">
        <span>⚡ Systemreparatur – Emoti-Puls</span>
        <button id="healCloseBtn" title="Abbrechen">×</button>
      </div>
      <div class="window-body" style="width:420px;text-align:center;">
        <p id="healMsg">Drücke <b>Leertaste</b>, wenn der Punkt in der Mitte ist!</p>
        <canvas id="healCanvas" width="380" height="80"
          style="background:#000;border:inset 2px #808080;display:block;margin:10px auto;"></canvas>
        <p>Treffer: <span id="healHits">0</span> / ${ROUND_PULSES}</p>
        <p id="healStatus">Systemdiagnose läuft...</p>
      </div>
    `;
    document.body.appendChild(win);

    // Fenster zentrieren
    setTimeout(() => {
      const w = win.offsetWidth, h = win.offsetHeight;
      win.style.position = "absolute";
      win.style.left = `${(window.innerWidth - w) / 2}px`;
      win.style.top = `${(window.innerHeight - h) / 2}px`;
    }, 10);

    win.querySelector("#healCloseBtn").addEventListener("click", () => win.remove());
    if (typeof bringToFront === "function") bringToFront(win);
    else win.style.zIndex = 2000;
    return win;
  }

  // Spiel starten
  function startHealGame() {
    const c = window.emotiOS?.care;
    if (!c) return;

    // Check ob Heilung erlaubt
    if (c.gesundheit >= 40) {
      window.emotiOS?.typeText("Meine Systeme sind stabil, kein Eingriff nötig.");
      return;
    }

    const win = createHealWindow();
    const cvs = win.querySelector("#healCanvas");
    const ctx = cvs.getContext("2d");
    const hitsEl = win.querySelector("#healHits");
    const statusEl = win.querySelector("#healStatus");

    let running = true;
    let pulse = 0;
    let hits = 0;

    // Zeichenfunktion
    function draw(markerX, zoneCenter = 0.5, zoneSize = TOLERANCE) {
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, cvs.width, cvs.height);

      // Mittlere Zone
      const centerX = cvs.width * zoneCenter;
      const zoneW = cvs.width * zoneSize;
      ctx.fillStyle = "#0a0";
      ctx.fillRect(centerX - zoneW / 2, 0, zoneW, cvs.height);

      // Perfekte Zone
      const perfectW = cvs.width * PERFECT_ZONE;
      ctx.fillStyle = "#0f0";
      ctx.fillRect(centerX - perfectW / 2, 0, perfectW, cvs.height);

      // Marker
      ctx.fillStyle = "#fff";
      ctx.fillRect(markerX - 3, 0, 6, cvs.height);
    }

    // Bewegung
    let dir = 1;
    let pos = 0;
    let speed = 2.5;

	function loop() {
	  if (!running) return;
	  pos += dir * speed;
	  if (pos >= cvs.width - 3) dir = -1;
	  if (pos <= 3) dir = 1;

	  // Zeichnen
	  draw(pos);

	  // Geschwindigkeit langsam erhöhen, aber nicht zu krass
	  if (pulse < ROUND_PULSES) {
		speed += 0.0025; // kleiner Beschleunigungswert pro Frame
	  }

	  requestAnimationFrame(loop);
	}


	draw(cvs.width / 2);

    loop();

    // Tasteneingabe
    function onKey(e) {
      if (!running) return;
      if (e.code === "Space") {
        e.preventDefault();
        const center = cvs.width / 2;
        const distance = Math.abs(pos - center) / (cvs.width / 2);

        if (distance < PERFECT_ZONE) {
          hits++;
          statusEl.textContent = "Perfekt!";
        } else if (distance < TOLERANCE) {
          hits += 0.6;
          statusEl.textContent = "Gut getroffen.";
        } else {
          statusEl.textContent = "Daneben.";
        }

        pulse++;
        hitsEl.textContent = `${Math.round(hits)} / ${ROUND_PULSES}`;

        if (pulse >= ROUND_PULSES) endGame();
      }
    }

    document.addEventListener("keydown", onKey);

    function endGame() {
      running = false;
      document.removeEventListener("keydown", onKey);

      const rate = (hits / ROUND_PULSES) * 100;
      let heal = 0, sec = 0, energy = 0;
      let resultText = "";

      if (rate < 30) { heal = -10; resultText = "System überlastet..."; }
      else if (rate < 60) { heal = +10; resultText = "Stabilisierungsversuch erfolgreich."; }
      else if (rate < 80) { heal = +20; resultText = "Systemfunktion normalisiert."; }
      else if (rate < 95) { heal = +40; resultText = "Starke Erholung – Prozesse stabil."; }
      else { heal = +70; sec = +20; energy = +10; resultText = "Perfekte Synchronisation!"; }

      // Werte anwenden
      c.gesundheit = Math.min(c.gesundheit + heal, 100);
      c.sicherheit = Math.min(c.sicherheit + sec, 120);
      c.energie = Math.min(c.energie + energy, 100);
      window.emotiOS.updateStatusWindow?.();

      // Ergebnisanzeige
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, cvs.width, cvs.height);
      ctx.fillStyle = "#0f0";
      ctx.font = "14px monospace";
      ctx.fillText(`Trefferquote: ${Math.round(rate)}%`, 100, 40);
      ctx.fillText(resultText, 100, 60);

      setTimeout(() => {
        win.remove();
        window.emotiOS?.typeText(resultText);
      }, 3500);
    }
  }

  window.startHealGame = startHealGame;
})();
