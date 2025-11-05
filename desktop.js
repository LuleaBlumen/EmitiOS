/* =========== DESKTOP.JS — CLEAN & ORDERED (NEU) =========== */
(() => {
  "use strict";

  /* -----------------------------------------------
   * 0) Globals & Helpers
   * --------------------------------------------- */
  let __topZ = 1000;
  function bringToFront(win) {
    __topZ++;
    win.style.zIndex = __topZ;
  }
  window.bringToFront = bringToFront;

  // Drag für ein einzelnes Fenster aktivieren
  function attachDrag(win) {
    if (!win) return;
    const header = win.querySelector(".window-header") || win.querySelector(".title-bar");
    if (!header) return;

    let drag = false, offX = 0, offY = 0;

    // Fenster beim Klick nach vorn
    win.addEventListener("mousedown", () => bringToFront(win));

    header.addEventListener("mousedown", (e) => {
      drag = true;
      offX = e.clientX - win.offsetLeft;
      offY = e.clientY - win.offsetTop;
      win.style.position = "absolute";
      bringToFront(win);
      e.preventDefault();
    });

    document.addEventListener("mousemove", (e) => {
      if (!drag) return;
      win.style.left = `${e.clientX - offX}px`;
      win.style.top  = `${e.clientY - offY}px`;
    });

    document.addEventListener("mouseup", () => { drag = false; });
  }

  function makeWindowsDraggable() {
    document.querySelectorAll(".window").forEach(attachDrag);
  }

  function arrangeDesktopIcons() {
    // Reihenfolge oben→unten: Papierkorb → Internet → Arcade
    const order = ["recycleBin", "internetIcon", "arcadeIcon"];
    const startY = 16;
    const SLOT = 120; // muss zur Icon-Slot-Höhe im CSS passen

    order.forEach((id, i) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.style.position = "absolute";
      el.style.left = "16px";
      el.style.top  = (startY + i * SLOT) + "px";
      el.style.zIndex = 1;
    });
  }

  function updateClock() {
    const clock = document.getElementById("clock");
    if (!clock) return;
    const now = new Date();
    const h = String(now.getHours()).padStart(2,"0");
    const m = String(now.getMinutes()).padStart(2,"0");
    clock.textContent = `${h}:${m}`;
  }

  function showSleepScreen() {
    document.body.style.backgroundColor = "black";
    document.body.innerHTML = "";
    const msg = document.createElement("div");
    msg.textContent = "Emoti schläft. Versuche es später nochmal.";
    msg.style.position = "fixed";
    msg.style.top = "50%";
    msg.style.left = "50%";
    msg.style.transform = "translate(-50%, -50%)";
    msg.style.color = "white";
    msg.style.fontFamily = "monospace";
    msg.style.fontSize = "20px";
    msg.style.textAlign = "center";
    document.body.appendChild(msg);
  }

  /* -----------------------------------------------
   * 1) Start nach vollständigem Load
   * --------------------------------------------- */
  window.addEventListener("load", () => {
    // 1a) Schlaf-Lock prüfen (früh raus, nix initialisieren)
    const sleepUntil = Number(localStorage.getItem("emotiSleepUntil") || 0);
    if (Date.now() < sleepUntil) {
      showSleepScreen();
      return;
    }

    // 1b) Uhr starten (nur wenn wach)
    updateClock();
    setInterval(updateClock, 1000);

    // 1c) Startmenü & Systemsteuerung
    const startBtn        = document.getElementById("startBtn");
    const startMenu       = document.getElementById("startMenu");
    const controlPanel    = document.getElementById("controlPanel");
    const openCPBtn       = document.getElementById("openControlPanel");
    const openTerminalBtn = document.getElementById("openTerminal");
    const closeBtn        = controlPanel?.querySelector(".close");

    if (controlPanel) controlPanel.classList.add("hidden");

    startBtn?.addEventListener("click", (e) => {
      e.stopPropagation();
      startMenu?.classList.toggle("hidden");
    });

    document.addEventListener("click", (e) => {
      if (!startMenu) return;
      if (!startMenu.contains(e.target) && !startBtn?.contains(e.target)) {
        startMenu.classList.add("hidden");
      }
    });

    // Systemsteuerung öffnen
    openCPBtn?.addEventListener("click", () => {
      startMenu?.classList.add("hidden");
      if (!controlPanel) return;

      controlPanel.classList.remove("hidden");
      // Zentrieren
      const panelWidth   = controlPanel.offsetWidth;
      const panelHeight  = controlPanel.offsetHeight;
      const screenWidth  = window.innerWidth;
      const screenHeight = window.innerHeight;

      controlPanel.style.position = "absolute";
      controlPanel.style.left = `${(screenWidth - panelWidth) / 2}px`;
      controlPanel.style.top  = `${(screenHeight - panelHeight) / 2 - 40}px`;
      bringToFront(controlPanel);
    });

    closeBtn?.addEventListener("click", () => {
      controlPanel?.classList.add("hidden");
    });

    // Terminal öffnen (falls vorhanden)
    openTerminalBtn?.addEventListener("click", () => {
      startMenu?.classList.add("hidden");
      const term = document.getElementById("terminalWindow");
      if (term) {
        term.classList.add("active");
        term.style.display = "block";
        // Zentrieren, nach vorn, drag
        term.style.left = `${(window.innerWidth - term.offsetWidth) / 2}px`;
        term.style.top  = `${(window.innerHeight - term.offsetHeight) / 2 - 20}px`;
        bringToFront(term);
        attachDrag(term);
      } else {
        window.emotiOS?.typeText?.("Terminal ist (noch) nicht installiert.");
      }
    });

    // 1d) Fenster verschiebbar (bestehende)
    makeWindowsDraggable();

    // 1e) Desktop-Icons stapeln (Papierkorb → Internet → Arcade)
    arrangeDesktopIcons();

    // 1f) Papierkorb-Handling
    const recycleBin    = document.getElementById("recycleBin");
    const recycleMenu   = document.getElementById("recycleMenu");
    const emptyTrashBtn = document.getElementById("emptyTrashBtn");

    if (recycleBin) {
      recycleBin.addEventListener("click", (e) => {
        e.stopPropagation();
        recycleMenu?.classList.toggle("hidden");
      });

      document.addEventListener("click", (e) => {
        if (!recycleMenu) return;
        if (!recycleBin.contains(e.target) && !recycleMenu.contains(e.target)) {
          recycleMenu.classList.add("hidden");
        }
      });

      emptyTrashBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        recycleMenu?.classList.add("hidden");
        window.emotiOS?.interact?.("trash");
      });
    }

    // 1g) Internet-Icon
    document.getElementById("internetIcon")?.addEventListener("click", () => {
      window.emotiOS?.interact?.("internet");
    });

    // 1h) Arcade-Icon
    document.getElementById("arcadeIcon")?.addEventListener("click", () => {
      if (typeof openArcade === "function") openArcade();
    });

    // 1i) Energieoptionen (Neustart/Ruhe/Shutdown)
    const restartBtnMenu  = document.getElementById("restartBtnMenu");
    const sleepBtnMenu    = document.getElementById("sleepBtnMenu");
    const shutdownBtnMenu = document.getElementById("shutdownBtnMenu");

    restartBtnMenu?.addEventListener("click", () => {
      startMenu?.classList.add("hidden");
      const until = Number(localStorage.getItem("emotiSleepUntil") || 0);
      if (Date.now() < until) {
        window.emotiOS?.typeText?.("Emoti schläft. Versuche es später nochmal.");
        return;
      }
      window.emotiOS?.startRestart?.();
    });

    sleepBtnMenu?.addEventListener("click", () => {
      startMenu?.classList.add("hidden");
      const until = Number(localStorage.getItem("emotiSleepUntil") || 0);
      if (Date.now() < until) {
        window.emotiOS?.typeText?.("Emoti schläft. Versuche es später nochmal.");
        return;
      }
      window.emotiOS?.startSleepMode?.();
    });

    shutdownBtnMenu?.addEventListener("click", () => {
      startMenu?.classList.add("hidden");
      // 30-Minuten-Cooldown gegen Shutdown-Spam
      const last = Number(localStorage.getItem("emotiLastShutdown") || 0);
      const now = Date.now();
      const cooldown = 30 * 60 * 1000;

      if (now - last < cooldown) {
        window.emotiOS?.typeText?.("Hey, du hast mich gerade erst runtergefahren. Gib mir 30 Minuten Pause.");
        return;
      }
      window.emotiOS?.startShutdown?.();
    });

    // 1j) Installer/Erststart (nur wenn kein Name gesetzt)
    const overlay     = document.getElementById("installOverlay");
    const textArea    = document.getElementById("installText");
    const nameSection = document.getElementById("nameInputSection");
    const savedName   = localStorage.getItem("emotiUser");

    if (savedName) {
      overlay?.classList.add("hidden");
      setTimeout(() => {
        if (window.emotiOS) {
          const emotion = window.emotiOS.emotion || "Neutral";
          const gt = window.greetingTalk;
          const list = (gt && (gt[emotion] || gt.Neutral)) || ["Willkommen zurück, ${name}."];
          const msg = list[Math.floor(Math.random() * list.length)];
          window.emotiOS.typeText(msg.replace(/\$\{name\}/g, savedName));
        }
      }, 1500);
    } else {
      overlay?.classList.remove("hidden");
      const lines = [
        "> Initialisiere EmotiOS...",
        "> Lade emotionale Module...",
        "> Kalibriere neuronale Schnittstellen...",
        "> Synchronisiere Bewusstsein...",
        "> Installation abgeschlossen."
      ];
      let i = 0;
      function typeLine() {
        if (!textArea) return;
        if (i < lines.length) {
          textArea.textContent += lines[i] + "\n";
          i++;
          setTimeout(typeLine, 900);
        } else {
          nameSection?.classList.remove("hidden");
        }
      }
      typeLine();

      document.getElementById("confirmUserName")?.addEventListener("click", () => {
        const input = document.getElementById("userNameInput");
        const name = input?.value.trim();
        if (!name) return;
        localStorage.setItem("emotiUser", name);
        nameSection?.classList.add("hidden");
        if (textArea) textArea.textContent += `\n> Willkommen, ${name}. Starte Initialsequenz...`;
        setTimeout(() => {
          overlay?.classList.add("fade-out");
          setTimeout(() => {
            overlay?.classList.add("hidden");
            if (window.emotiOS) {
              window.emotiOS.typeText(`Hallo, ${name}. Ich bin EmotiOS, dein persönliches Betriebssystem.`);
              setTimeout(() => {
                window.emotiOS?.typeText?.("Ich hoffe, wir verstehen uns gut. Schau dich ruhig um.");
              }, 4500);
            }
          }, 1000);
        }, 2200);
      });
    }

    /* -----------------------------------------------
     * 2) Kontakt (E-Mail) – echter Versand via send_mail.php
     * --------------------------------------------- */
    const openContactBtn = document.getElementById("openContact");
    if (openContactBtn) {
      openContactBtn.addEventListener("click", () => {
        startMenu?.classList.add("hidden");
        openContactForm();
      });
    }
  });

  /* -----------------------------------------------
   * 3) Kontaktformular-Fenster
   *    – schickt per Fetch an send_mail.php
   * --------------------------------------------- */
  /* -----------------------------------------------
   * 3) Kontaktfenster (E-Mail-Style, Win98-Look)
   * --------------------------------------------- */
  function openContactForm() {
    let win = document.getElementById("contactWindow");
    if (win) { bringToFront(win); return; }

    win = document.createElement("div");
    win.className = "window";
    win.id = "contactWindow";
    win.innerHTML = `
      <div class="window-header">
        ✉️ Neue E-Mail
        <button class="closeBtn" title="Schließen">×</button>
      </div>
      <div class="window-body" style="width:460px;padding:10px;">
        <div style="display:grid;grid-template-columns:60px 1fr;row-gap:6px;column-gap:4px;font-size:13px;">
          <label>An:</label>
          <input type="text" id="mailTo" value="emoti.os@outlook.de" readonly style="background:#eee;border:inset 2px #808080;padding:2px;">
          <label>Von:</label>
          <input type="email" id="mailFrom" placeholder="deine@mail.de (optional)" style="border:inset 2px #808080;padding:2px;">
          <label>Betreff:</label>
          <input type="text" id="mailSubject" placeholder="Kurze Betreffzeile" style="border:inset 2px #808080;padding:2px;">
        </div>

        <textarea id="mailBody" placeholder="Nachricht schreiben..." 
          style="width:100%;height:160px;margin-top:8px;border:inset 2px #808080;
          background:#fff;font-family:'MS Sans Serif';font-size:13px;padding:4px;"></textarea>

        <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:8px;">
          <button id="sendMailBtn">Senden</button>
          <button id="cancelMailBtn">Abbrechen</button>
        </div>
        <div id="mailStatus" style="font-size:12px;margin-top:4px;color:#333;"></div>
      </div>
    `;
    document.body.appendChild(win);

    // Zentrieren & Vordergrund
    setTimeout(() => {
      const w = win.offsetWidth, h = win.offsetHeight;
      win.style.position = "absolute";
      win.style.left = `${(window.innerWidth - w) / 2}px`;
      win.style.top  = `${(window.innerHeight - h) / 2 - 20}px`;
      bringToFront(win);
    }, 10);

    attachDrag(win);
    win.querySelector(".closeBtn").addEventListener("click", () => win.remove());
    win.querySelector("#cancelMailBtn").addEventListener("click", () => win.remove());

    // === Versand ===
    const sendBtn = win.querySelector("#sendMailBtn");
    sendBtn.addEventListener("click", async () => {
      const to = "emoti.os@outlook.de";
      const from = document.getElementById("mailFrom").value.trim();
      const subject = document.getElementById("mailSubject").value.trim() || "(kein Betreff)";
      const message = document.getElementById("mailBody").value.trim();
      const status = document.getElementById("mailStatus");

      if (!message) {
        status.textContent = "Bitte schreibe eine Nachricht.";
        status.style.color = "#a00";
        return;
      }

      status.textContent = "Sende...";
      status.style.color = "#333";

      try {
        const res = await fetch("send_mail.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ to, from, subject, message })
        });
        const data = await res.json().catch(() => ({}));

        if (res.ok && data.success) {
          status.textContent = "Nachricht gesendet ✅";
          status.style.color = "#060";
          window.emotiOS?.typeText?.("E-Mail erfolgreich verschickt.");
          setTimeout(() => win.remove(), 1800);
        } else {
          throw new Error((data && data.error) || "Fehler beim Senden");
        }
      } catch (err) {
        status.textContent = "Fehler: Nachricht konnte nicht gesendet werden.";
        status.style.color = "#a00";
        window.emotiOS?.typeText?.("Der Mailserver antwortet nicht.");
      }
    });
  }


})();
