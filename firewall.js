// === Firewall Defense (Integration für EmotiOS) ===
(function () {
  // === KONFIGURATION ===
  const ROUND_DURATION = 30 * 1000; // 30 Sekunden pro Runde
  const SPAWN_INTERVAL = 2000; // alle 2 Sekunden neuer Eintrag
  const LS_KEY = "emoti_firewall_last";

  const GOOD_LIST = [
    "system32/core.dll",
    "audio_driver.dll",
    "update_service.exe",
    "emotionsync.sys",
    "auth_manager.dll",
    "display_driver.sys",
    "network_adapter.exe",
    "backup_agent.exe",
    "settings_ui.exe",
    "core/trust.dll"
  ];

  const BAD_LIST = [
    "malware.exe",
    "crypto_miner.bat",
    "pornad.exe",
    "trojan_loader.exe",
    "wormhole.bat",
    "keylogger_agent.exe",
    "ransomware_lock.exe",
    "ad_injector.exe",
    "botnet_client.exe",
    "fakeupdate_installer.exe"
  ];

  const ALL = [...GOOD_LIST, ...BAD_LIST];

  function clamp(n, a, b) {
    return Math.max(a, Math.min(b, n));
  }

  function now() {
    return Date.now();
  }

  // === FENSTER ERSTELLEN ===
  function createFirewallWindow() {
    const existing = document.querySelector(".window.firewall");
    if (existing) return existing;

    const win = document.createElement("div");
    win.className = "window firewall";
    win.id = "firewallWindow";
    win.innerHTML = `
      <div class="window-header">
        <span>🧱 Firewall Defense – Abwehrmodus</span>
        <button id="fwCloseBtn" title="Schließen">×</button>
      </div>
      <div class="window-body" style="width:480px; box-sizing:border-box; overflow:hidden;">
        <div class="firewall-console" id="fwConsole"></div>
        <div class="firewall-controls">
          <div class="buttons">
            <button id="fwAllowBtn">ZULASSEN</button>
            <button id="fwBlockBtn">BLOCKIEREN</button>
            <button id="fwQuitBtn">ABBRECHEN</button>
          </div>
          <div class="status">
            Score: <span id="fwScore">0</span>
            &nbsp;|&nbsp;
            Sicherheit: <span id="fwSec">--</span>
            &nbsp;|&nbsp;
            Zeit: <span id="fwTime">30</span>s
          </div>
        </div>
        <div class="firewall-footer firewall-small">
          Entscheide schnell, aber überleg. Richtige Aktion geben mehr Sicherheit. Fehler schaden.
        </div>
      </div>
    `;

    document.body.appendChild(win);
	
	// Drag aktivieren wie bei anderen Fenstern
	if (typeof attachDrag === "function") attachDrag(win);
	if (typeof bringToFront === "function") bringToFront(win);
setTimeout(() => {
  const w = win.offsetWidth, h = win.offsetHeight;
  win.style.position = "absolute";
  win.style.left = `${(window.innerWidth - w) / 2}px`;
  win.style.top  = `${(window.innerHeight - h) / 2 - 20}px`;
}, 0);



    // Position mittig setzen
    setTimeout(() => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const w = win.offsetWidth;
      const h = win.offsetHeight;
      win.style.position = "absolute";
      win.style.left = `${(screenWidth - w) / 2}px`;
      win.style.top = `${(screenHeight - h) / 2}px`;
    }, 10);

    // Schließen
    win.querySelector("#fwCloseBtn").addEventListener("click", () => win.remove());

    // Fokus nach vorne holen
    if (typeof bringToFront === "function") bringToFront(win);
    else win.style.zIndex = 2000;

    return win;
  }

  // === SPIELLOGIK ===
  function FirewallGame() {
    this.overlay = null;
    this.consoleEl = null;
    this.allowBtn = null;
    this.blockBtn = null;
    this.quitBtn = null;
    this.scoreEl = null;
    this.secEl = null;
    this.timeEl = null;
    this.currentItem = null;
    this.score = 0;
    this.entriesSpawned = 0;
    this.spawnTimer = null;
    this.roundTimer = null;
    this.timeLeftTimer = null;
  }

  FirewallGame.prototype.open = function () {
    if (this.overlay) return;
    this.overlay = createFirewallWindow();

    this.consoleEl = document.getElementById("fwConsole");
    this.allowBtn = document.getElementById("fwAllowBtn");
    this.blockBtn = document.getElementById("fwBlockBtn");
    this.quitBtn = document.getElementById("fwQuitBtn");
    this.scoreEl = document.getElementById("fwScore");
    this.secEl = document.getElementById("fwSec");
    this.timeEl = document.getElementById("fwTime");

    const sec = window.emotiOS?.care?.sicherheit ?? 50;
    this.secEl.textContent = Math.round(sec);

    this.allowBtn.addEventListener("click", () => this.handleChoice("allow"));
    this.blockBtn.addEventListener("click", () => this.handleChoice("block"));
    this.quitBtn.addEventListener("click", () => this.quit());

    this.startRound();
  };

  FirewallGame.prototype.startRound = function () {
    this.score = 0;
    this.entriesSpawned = 0;
    const start = now();
    const end = start + ROUND_DURATION;
    this.consoleEl.innerHTML = "";
    this.updateScore();
    this.updateSecDisplay();

    // Spawn
    this.spawnTimer = setInterval(() => this.spawnEntry(), SPAWN_INTERVAL);

    // Countdown
    this.timeLeftTimer = setInterval(() => {
      const t = Math.ceil((end - now()) / 1000);
      this.timeEl.textContent = t > 0 ? t : 0;
      if (t <= 0) {
        clearInterval(this.timeLeftTimer);
        this.endRound();
      }
    }, 250);

    this.spawnEntry();
  };

FirewallGame.prototype.spawnEntry = function () {
  // Wenn schon eine Datei aktiv ist, nichts Neues anzeigen
  if (this.currentItem) return;

  const idx = Math.floor(Math.random() * ALL.length);
  const name = ALL[idx];
  this.currentItem = name;
  this.entriesSpawned++;

  this.consoleEl.innerHTML = `<div>&gt;&nbsp; ${name}</div>`;
  this.consoleEl.scrollTop = this.consoleEl.scrollHeight;

  // Nächsten Spawn erst nach Ablauf von 3 Sekunden (wenn keine Aktion kommt)
  clearTimeout(this.spawnTimer);
  this.spawnTimer = setTimeout(() => {
    this.currentItem = null;
    this.spawnEntry();
  }, SPAWN_INTERVAL);
};


  FirewallGame.prototype.handleChoice = function (choice) {
    if (!this.currentItem) return;
    const isBad = BAD_LIST.includes(this.currentItem);
    const correct = (isBad && choice === "block") || (!isBad && choice === "allow");

    if (correct) {
      this.score++;
      this.applySecurityDelta(+5);
      this.appendConsole(`✅ Richtig: ${this.currentItem}`);
    } else {
      this.applySecurityDelta(-5);
      this.appendConsole(`❌ Falsch: ${this.currentItem}`);
    }

    this.currentItem = null;
    this.updateScore();
    this.updateSecDisplay();
  };

  FirewallGame.prototype.applySecurityDelta = function (delta) {
    const c = window.emotiOS?.care;
    if (!c) return;
    c.sicherheit = clamp(Math.round(c.sicherheit + delta), 0, 120);

    if (window.emotiOS.updateStatusWindow) window.emotiOS.updateStatusWindow();
    if (window.emotiOS.typeText)
      window.emotiOS.typeText(delta > 0 ? "Firewall: Treffer." : "Firewall: Fehler.");
  };

  FirewallGame.prototype.appendConsole = function (txt) {
    this.consoleEl.innerHTML += `<div class="firewall-small">${txt}</div>`;
    this.consoleEl.scrollTop = this.consoleEl.scrollHeight;
  };

  FirewallGame.prototype.updateScore = function () {
    this.scoreEl.textContent = this.score;
  };

  FirewallGame.prototype.updateSecDisplay = function () {
    const sec = window.emotiOS?.care?.sicherheit ?? "--";
    this.secEl.textContent = Math.round(sec);
  };

  FirewallGame.prototype.endRound = function () {
    clearInterval(this.spawnTimer);
    clearInterval(this.timeLeftTimer);

    this.appendConsole("");
    this.appendConsole(`--- Runde beendet. Treffer: ${this.score} / ${this.entriesSpawned} ---`);

    if (window.emotiOS?.typeText) {
      const msg =
        this.score >= Math.floor(this.entriesSpawned * 0.7)
          ? "Gut gemacht. Ich fühl mich sicherer."
          : "Da sind noch Lücken. Bitte nachbessern.";
      window.emotiOS.typeText(msg);
    }

    localStorage.setItem(LS_KEY, String(now()));
    setTimeout(() => this.close(), 4000);
  };

  FirewallGame.prototype.quit = function () {
    this.applySecurityDelta(-10);
    this.appendConsole("--- Abgebrochen ---");
    if (window.emotiOS?.typeText)
      window.emotiOS.typeText("Firewall abgebrochen. Konsequenzen folgen.");
    clearInterval(this.spawnTimer);
    clearInterval(this.timeLeftTimer);
    setTimeout(() => this.close(), 1000);
  };

  FirewallGame.prototype.close = function () {
    if (!this.overlay) return;
    this.overlay.remove();
    this.overlay = null;
    this.currentItem = null;
  };

  // === STARTFUNKTION ===
  function tryStartFirewall() {
    const g = new FirewallGame();
    g.open();
  }

  // === INTEGRATION ===
  window.addEventListener("load", () => {
    const btn = document.getElementById("firewallBtn");
    if (btn) btn.addEventListener("click", tryStartFirewall);
  });
})();

