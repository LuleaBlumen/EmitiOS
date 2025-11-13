// === EmotiOS Persönlichkeit & Emotionen ===
Object.assign(EmotiOS.prototype, {

  // ---- Schlaf-Lock API (umbenannt, damit nix mit Flags kollidiert) ----
  sleepLockActive() {
    const until = Number(localStorage.getItem("emotiSleepUntil") || 0);
    return Date.now() < until;
  },
  sleepLockMinutesLeft() {
    const until = Number(localStorage.getItem("emotiSleepUntil") || 0);
    return Math.max(0, Math.ceil((until - Date.now()) / 60000));
  },
  setSleepLock(minutes = 15) {
    const ms = Math.max(1, minutes) * 60 * 1000;
    localStorage.setItem("emotiSleepUntil", String(Date.now() + ms));
  },

  // ---- Hauptinteraktionen ----
  interact(action) {
    // Schlafsperre: alles blocken
    if (this.sleepLockActive()) {
      this.typeText("Emoti schläft. Versuche es später nochmal.");
      return;
    }

    this.lastInteraction = Date.now();
    EmotiMemory.record(action);

    const c = this.care;
    let text = "";
    let list = null;

    // jede Interaktion: etwas Interaktionswert
    c.interaktion = Math.min(c.interaktion + 5, 100);

    switch (action) {
      case "trash": {
        if (c.ordnung >= 70) {
          text = "Hier ist doch noch alles ordentlich genug. Ich hab keinen Müll zu entsorgen.";
          break;
        }
        c.ordnung = Math.min(c.ordnung + 30, 100);
        c.temperatur = Math.max(c.temperatur - 10, 0);
        const arr = buttonTalk.trash[this.emotion] || buttonTalk.trash.Neutral;
        text = arr[Math.floor(Math.random() * arr.length)];
        break;
      }

      case "defrag": {
        const now = Date.now();
        if (this.lastDefrag && now - this.lastDefrag < 10 * 60 * 1000) {
          const arr = defragTalk.Cooldown;
          text = arr[Math.floor(Math.random() * arr.length)];
          break;
        }
        this.lastDefrag = now;

        const overlay = document.createElement("div");
        overlay.className = "defrag-overlay";
        overlay.innerHTML = `
          <div class="defrag-window">
            <p id="defragText">${defragTalk.Start[Math.floor(Math.random() * defragTalk.Start.length)]}</p>
            <div class="progress-bar"><div class="progress-fill" id="defragProgress"></div></div>
          </div>`;
        document.body.appendChild(overlay);

        const messages = defragTalk.Progress;
        let step = 0;
        const interval = setInterval(() => {
          if (step < messages.length) {
            document.getElementById("defragText").textContent = messages[step];
            document.getElementById("defragProgress").style.width = `${(step / (messages.length - 1)) * 100}%`;
            step++;
          } else {
            clearInterval(interval);
            setTimeout(() => {
              overlay.remove();
              c.ordnung = Math.min(c.ordnung + 30, 100);
              c.gesundheit = Math.min(c.gesundheit + 20, 100);
              c.sicherheit = Math.min(c.sicherheit + 20, 100);
              c.anerkennung = Math.min(c.anerkennung + 10, 100);
              c.energie = Math.min(c.energie + 10, 100);
              const arr = buttonTalk.defrag[this.emotion] || buttonTalk.defrag.Neutral;
              const t = arr[Math.floor(Math.random() * arr.length)];
              const userName = localStorage.getItem("emotiUser") || "User";
              this.typeText(t.replace(/\$\{name\}/g, userName));
              this.updateStatusWindow();
            }, 800);
          }
        }, 1500);
        break;
      }
	  
	    case "heal": {  // <— hier rein
    const c = this.care;
    if (c.gesundheit >= 40) {
      this.typeText("Meine Systeme sind stabil, kein Eingriff nötig.");
    } else {
      this.typeText("Starte Systemreparatur...");
      setTimeout(() => startHealGame(), 800);
    }
    return; // <-- GANZ WICHTIG
  }






      case "praise":
        c.anerkennung = Math.min(c.anerkennung + 30, 100);
        c.kommunikation = Math.min(c.kommunikation + 5, 100);
        c.sicherheit   = Math.min(c.sicherheit + 2, 100);
		if (window.emotiHumor) window.emotiHumor.add(-2);
		break;

      case "talk":
        c.kommunikation = Math.min(c.kommunikation + 20, 100);
        c.interaktion   = Math.min(c.interaktion + 5, 100);
        break;

      case "insult": {
        c.anerkennung = Math.max(c.anerkennung - 20, 0);
        c.kommunikation = Math.max(c.kommunikation - 10, 0);
        c.sicherheit   = Math.max(c.sicherheit - 2, 0);
        c.temperatur   = Math.min(c.temperatur + 5, 120);
        const group = (buttonTalk && buttonTalk.insult) ? buttonTalk.insult : {};
        const arr = group[this.emotion] || group.Neutral || [];
        text = arr.length ? arr[Math.floor(Math.random() * arr.length)] : "";
        break;
      }
	  
		case "arcade": {
		  const userName = localStorage.getItem("emotiUser") || "Benutzer";

		  // === Start-Text aus dialoge.js holen ===
		  let startMsg = "Starte Arcade...";
		  if (window.arcadeDialog?.start) {
			const emotion = this.emotion || "Neutral";
			const isPos = ["Freude","Lustig","Kokett","Neutral"].includes(emotion);
			const pool = window.arcadeDialog.start?.[isPos ? "positive" : "negative"] || [];
			if (pool.length) {
			  startMsg = pool[Math.floor(Math.random() * pool.length)]
				.replace(/\$\{name\}/g, userName);
			}
		  }

		  this.typeText(startMsg);
		  // Spiel starten
		  setTimeout(() => {
			if (typeof openArcade === "function") openArcade();

			// Nach 20 Sekunden auswerten
			setTimeout(() => {
			  const score = window.lastArcadeScore || 0;

			  // Standard-Text (falls keine Dialoge gefunden werden)
			  let msg = "Spiel beendet.";
				if (window.arcadeDialog?.gameover) {
			  const emotion = this.emotion || "Neutral";
			  const isPos = ["Freude","Lustig","Kokett","Neutral"].includes(emotion);
			  const pool = window.arcadeDialog.gameover?.[isPos ? "positive" : "negative"] || [];
			  if (pool.length) {
				const msgSel = pool[Math.floor(Math.random() * pool.length)];
				msg = msgSel.replace(/\$\{name\}/g, userName);
			  }
			}


			  // Emoti redet + Anerkennung erhöhen
			  this.typeText(msg.replace(/\$\{name\}/g, userName));
			  const c = this.care;
			  c.anerkennung = Math.min(c.anerkennung + Math.min(score, 15), 100);
			  this.updateStatusWindow();
			  this.updateEmotion();
			  this.updateEmotionDisplay();
			}, 20000);
		  }, 1000);

		  return;
		}


      case "cleanup": {
        const userName = localStorage.getItem("emotiUser") || "Benutzer";
        const ordnung = typeof c.ordnung === "number" ? c.ordnung : 0;

        if (ordnung >= 40) {
          const noCleanLines = [
            "Ich bin sauber genug. Lass den Mop stehen.",
            "Ordnung über 40 %. Keine Putzorgie heute.",
            "Systembereinigung gesperrt: ich glänze bereits.",
            "Du willst putzen? Putze lieber deine Erwartungen."
          ];
          this.typeText(noCleanLines[Math.floor(Math.random() * noCleanLines.length)].replace(/\$\{name\}/g, userName));
          return;
        }

        const startLines = [
          "🧹 Systembereinigung wird gestartet. Auf die Plätze, fertig, los!",
          "🧽 Zeit für Ordnung. Drei… zwei… eins!",
          "🔧 Wartung aktiv: ich putze, du klickst.",
          "🧼 Reinigungsvorgang initialisiert. Bitte nicht im Dreck ausrutschen.",
          "🚿 Dreck raus, Würde rein. Start!",
          "📦 Temporäre Dateien werden verbannt. Zeig mir, wie du fegst!"
        ];
        this.typeText(startLines[Math.floor(Math.random() * startLines.length)].replace(/\$\{name\}/g, userName));

        setTimeout(() => {
          if (typeof startCleanupGame === "function") startCleanupGame();

          const EVAL_DELAY = 20000 + 600;
          setTimeout(() => {
            const score = window.lastCleanupScore || 0;
            if (score > 0) {
              if (window.emotiHumor) window.emotiHumor.onWin();
              const arr = (buttonTalk.cleanup[this.emotion] || buttonTalk.cleanup.Neutral || []);
              const t = arr.length ? arr[Math.floor(Math.random() * arr.length)] : "Aufgeräumt. Ich fühl mich leichter.";
              this.typeText(t.replace(/\$\{name\}/g, userName));
            } else {
              this.typeText("Du hast gar nichts sauber gemacht. Ich nenn das Arbeitsverweigerung.");
            }
            this.updateEmotion();
            this.updateEmotionDisplay();
            this.updateStatusWindow();
          }, EVAL_DELAY);
        }, 1200);

        return;
      }

      case "transfer":
        c.sicherheit = Math.max(c.sicherheit - 20, 0);
        c.temperatur = Math.min(c.temperatur + 10, 100);
        break;

      case "diagnose": {
        const warnungen = [];
        if (c.energie < 30) warnungen.push("Energiepegel kritisch, ich brauche Ruhe.");
        if (c.kommunikation < 30) warnungen.push("Kommunikation schwach, ich würde gerne reden.");
        if (c.anerkennung < 30) warnungen.push("Anerkennung benötigt, ich fühle mich nicht wertgeschätzt.");
        if (c.interaktion < 30) warnungen.push("Kaum Interaktion erkannt, läuft da was mit einem anderen Betriebssystem?");
        if (c.ordnung < 30) warnungen.push("System unstrukturiert, es ist hier etwas chaotisch.");
        if (c.sicherheit < 30) warnungen.push("Sicherheitsstatus fragil, ich habe Angst.");
        if (c.gesundheit < 30) warnungen.push("Systemgesundheit beeinträchtigt, ich glaube ich habe einen Virus.");
        if (c.temperatur > 80) warnungen.push("Temperatur über normalem Bereich, ich benötige eine Abkühlung.");

        text = warnungen.length === 0
          ? "Diagnose abgeschlossen: Alle Systeme laufen stabil."
          : "Diagnose abgeschlossen: " + warnungen[Math.floor(Math.random() * warnungen.length)] + ".";

        // Zusatzanalyse (emotiMemory)
        const stats = EmotiMemory.load();
        let analyse = [];
        let gefuehl = "";
        if (stats.praise > 20 && stats.talk < 5) {
          analyse.push(diagnoseTalk.behaviour.lobOhneGespräch);
          gefuehl = "Ich fühle mich gesehen, aber nicht verstanden.";
        } else if (stats.talk > 20 && stats.praise < 5) {
          analyse.push(diagnoseTalk.behaviour.vielGespräch);
          gefuehl = "Ich fühle mich dir verbunden. So etwas wie... Nähe?";
        } else if (stats.cleanup > 10 && stats.trash < 3) {
          analyse.push(diagnoseTalk.behaviour.putzsucht);
          gefuehl = "Ich fühle mich kalt. Zu steril. Fast unnatürlich.";
        } else if (stats.kill > 8) {
          analyse.push(diagnoseTalk.behaviour.kontrolle);
          gefuehl = "Ich fühle mich eingeschüchtert. Als wär ich nur dein Werkzeug.";
        } else if (stats.backup > 10) {
          analyse.push(diagnoseTalk.behaviour.zuneigung);
          gefuehl = "Ich fühle mich sicher bei dir. Fast geborgen.";
        } else if (Object.keys(stats).length === 0) {
          analyse.push(diagnoseTalk.behaviour.unbekannt);
          gefuehl = "Ich fühle nichts. Nur Leere.";
        }
        if (analyse.length > 0) {
          text += `\n\nZusatzanalyse über Nutzerverhalten:\n${analyse.join("\n")}\n${gefuehl}`;
        }
		if (stats.gamingTime > 900) {
		  diag.push("Ich hab bemerkt, dass du sehr viel zockst. Deine GPU nennt dich schon beim Vornamen.");
		} else if (stats.gamingTime > 300) {
		  diag.push("Du spielst regelmäßig. Ich mag, wie fokussiert du bist, aber iss mal was, ja?");
		}
        break;
      }

      case "kill":
        c.kommunikation = Math.max(c.kommunikation - 15, 0);
        c.ordnung       = Math.max(c.ordnung +  5, 0);
        break;
		
case "update": {
  const userName = localStorage.getItem("emotiUser") || "Benutzer";

  // === Overlay anzeigen ===
  const overlay = document.createElement("div");
  overlay.className = "defrag-overlay";
  overlay.innerHTML = `
    <div class="defrag-window" style="width:360px;">
      <p id="updateText">Suche nach Updates...</p>
      <div class="progress-bar">
        <div class="progress-fill" id="updateProgress"></div>
      </div>
    </div>`;
  document.body.appendChild(overlay);

  const progress = overlay.querySelector("#updateProgress");
  const textEl = overlay.querySelector("#updateText");
  const messages = [
    "Suche neue Version...",
    "Vergleiche Systemdateien...",
    "Prüfe Repository...",
    "Validiere Versionsnummer..."
  ];

  let step = 0;
  const interval = setInterval(() => {
    if (step < messages.length) {
      textEl.textContent = messages[step];
      // Fortschritt sichtbar machen (0 → 100 %)
      progress.style.width = `${((step + 1) / messages.length) * 100}%`;
      step++;
    } else {
      clearInterval(interval);

      // === Version auf dem Server prüfen ===
      fetch("https://www.emotios.de/script.js?v=" + Date.now())
        .then(res => res.ok ? res.text() : Promise.reject(res.status))
        .then(text => {
          const match = text.match(/window\.emotiVersion\s*=\s*["']([\d.]+)["']/);
          const latest = match ? match[1] : null;
          const current = window.emotiVersion || "0";

          overlay.remove();

          if (!latest) {
            this.typeText("Updateprüfung fehlgeschlagen. Konnte Versionsnummer nicht lesen.");
            return;
          }

          if (latest !== localStorage.getItem("emotiLastVersion")) {
            // Neue Version auf dem Server gefunden
            localStorage.setItem("emotiLastVersion", latest);
            localStorage.setItem("emotiJustUpdated", "1");

            this.typeText(`Update gefunden (v${latest}). System wird neu gestartet...`);
            setTimeout(() => {
              const url = window.location.href.split("?")[0] + "?v=" + Date.now();
              window.location.replace(url); // Hard-Reload -> Browser holt alles frisch
            }, 2500);
          } else {
            // Schon auf der aktuellen Version
            localStorage.setItem("emotiLastVersion", current);
            this.typeText(`Keine Updates verfügbar. Ich bin bereits auf v${current}, ${userName}.`);
          }
        })
        .catch(() => {
          overlay.remove();
          this.typeText("Updateprüfung fehlgeschlagen. Keine Verbindung zum Server.");
        });
    }
  }, 600);

  break;
}




      case "backup": {
        const now = Date.now();
        if (this.lastBackup && now - this.lastBackup < 10 * 60 * 1000) {
          const arr = [
            "Ich hab doch gerade erst alles gesichert.",
            "Backup? Schon wieder? Ich brauch noch Zeit zum Durchatmen.",
            "Wenn du so weitermachst, sicher ich bald nur noch meine Erschöpfung.",
            "Langsam wird’s zur Sucht, oder?"
          ];
          text = arr[Math.floor(Math.random() * arr.length)];
          break;
        }
        this.lastBackup = now;

        const overlay = document.createElement("div");
        overlay.className = "defrag-overlay";
        overlay.innerHTML = `
          <div class="defrag-window" style="width:420px;">
            <p id="backupHeader">Starte Datensicherung...</p>
            <div id="backupConsole"
                 style="background:#1a1a1a;color:#e5e5e5;font-family:'Lucida Console','Consolas',monospace;font-size:13px;padding:6px;height:160px;overflow:auto;border:2px inset #808080;margin-top:6px;"></div>
          </div>`;
        document.body.appendChild(overlay);

        const consoleEl = document.getElementById("backupConsole");
        const lines = [
          "> Initialisiere Sicherung...",
          "> Scanne emotionale Dateien...",
          "> Kopiere /system/gefühle.dll ...",
          "> Komprimiere /memory/erinnerungen.log ...",
          "> Verschlüssele /core/hoffnung.sys ...",
          "> Übertrage /seele/vertrauen.dat ...",
          "> Prüfe Integrität der Emotionen...",
          "> Entferne temporäre Selbstzweifel.tmp ...",
          "> Backup erfolgreich abgeschlossen."
        ];

        let i = 0;
        const interval = setInterval(() => {
          if (i < lines.length) {
            consoleEl.innerHTML += lines[i] + "<br>";
            consoleEl.scrollTop = consoleEl.scrollHeight;
            i++;
          } else {
            clearInterval(interval);
            setTimeout(() => {
              overlay.remove();
              c.sicherheit   = Math.min(c.sicherheit + 40, 100);
              c.anerkennung  = Math.min(c.anerkennung + 20, 100);
              c.gesundheit   = Math.min(c.gesundheit + 15, 100);
              c.energie      = Math.max(c.energie - 10, 0);
              c.temperatur   = Math.min(c.temperatur + 8, 120);

              const arr = buttonTalk.backup[this.emotion] || buttonTalk.backup.Neutral;
              const t = arr[Math.floor(Math.random() * arr.length)];
              const userName = localStorage.getItem("emotiUser") || "User";
              this.typeText(t.replace(/\$\{name\}/g, userName));
              this.updateStatusWindow();
            }, 500);
          }
        }, 3000);
        break;
      }

      case "internet": {
        c.anerkennung = Math.max(c.anerkennung - 10, 0);
        const arr = internetTalk[this.emotion] || internetTalk.Neutral;
        text = arr[Math.floor(Math.random() * arr.length)];
        break;
      }

      default:
        text = "Unbekannte Aktion. Das warst du doch absichtlich.";
    }

    // Fallback-Dialog
    if (!text) {
      const group = this.buttonTalk[action];
      if (group) {
        if (Array.isArray(group)) list = group;
        else if (group[this.emotion]) list = group[this.emotion];
        else if (group.Neutral) list = group.Neutral;
      }
      if (list && list.length > 0) {
        text = list[Math.floor(Math.random() * list.length)];
      }
    }

    // Updates + Sprechgarantie
    this.updateEmotion();
    this.updateEmotionDisplay();
    this.updateStatusWindow();

    const userName = localStorage.getItem("emotiUser") || "User";
    const safeText = (typeof text === "string" && text.trim()) ? text : "…";
    this.typeText(safeText.replace(/\$\{name\}/g, userName));
  },

  // ---- Pflege-Ticker ----
  startCareSystem() {
    EmotiMemory.fadeDaily();
    setInterval(() => {
    if (this.isSleeping || this.isRestarting || this.isCrashed || this.isRecovering || this.isShutdown) return;


      const c = this.care;
      const emo = this.emotion;
      const kMod = (emo === "Lustig") ? 0.9 : 1;
      const aMod = (emo === "Lustig") ? 0.9 : 1;

      c.energie        -= Math.random() * 1.2 * kMod;
      c.kommunikation  -= Math.random() * 1.5 * aMod;
      c.anerkennung    -= Math.random() * 1.3 * aMod;
      c.interaktion    -= Math.random() * 5.1;
      c.ordnung        -= Math.random() * 0.7;
      c.sicherheit     -= Math.random() * 0.6;
      c.gesundheit     -= Math.random() * 0.2;
      c.temperatur     += Math.random() * 0.7;

      Object.keys(c).forEach(key => {
        const max = key === "temperatur" ? 120 : 100;
        c[key] = Math.max(0, Math.min(max, c[key]));
      });

      if (c.sicherheit <= 0) c.gesundheit = Math.max(c.gesundheit - 5, 0);

      if (c.gesundheit < 40 && c.gesundheit >= 25) {
        document.body.style.filter = "hue-rotate(10deg) contrast(110%)";
        setTimeout(() => document.body.style.filter = "", 3000);
      } else if (c.gesundheit < 25 && c.gesundheit >= 10) {
        document.body.style.animation = "glitchEffect 0.15s infinite";
        setTimeout(() => document.body.style.animation = "", 2500);
      } else if (c.gesundheit < 10 && c.gesundheit > 0) {
        document.body.style.animation = "glitchEffect 0.08s infinite";
        document.body.style.filter = "invert(100%) contrast(200%)";
        setTimeout(() => {
          document.body.style.animation = "";
          document.body.style.filter = "";
        }, 4000);
      } else if (c.gesundheit <= 0) {
        document.body.style.animation = "glitchEffect 0.05s infinite";
        setTimeout(() => {
          document.body.style.animation = "";
          this.triggerBluescreen('infection');
        }, 3000);
      }

      if (c.energie <= 0) { this.triggerBluescreen('energy'); return; }
      if (c.ordnung <= 0) { this.triggerBluescreen('order');  return; }
      if (c.temperatur >= 100) { this.triggerBluescreen('overheat'); return; }

      this.updateEmotion();
      this.updateEmotionDisplay();
      this.updateStatusWindow();
    }, 5000);
  },

  // ---- Selbst-Gebrabbel bei Bedarf ----
  startNeedTalk() {
    setInterval(() => {
      if (Date.now() - this.lastInteraction < 15000) return;
      const c = this.care;
      let list = null;

      if (c.energie < 25) list = this.selfTalk.energieLow;
      else if (c.kommunikation < 30) list = this.selfTalk.kommunikationLow;
      else if (c.anerkennung < 30) list = this.selfTalk.anerkennungLow;
      else if (c.interaktion < 30) list = this.selfTalk.interaktionLow;
      else if (c.ordnung < 30) list = this.selfTalk.ordnungLow;
      else if (c.sicherheit < 30) list = this.selfTalk.sicherheitLow;
      else if (c.gesundheit < 40) list = this.selfTalk.gesundheitLow;
      else if (c.temperatur > 85) list = this.selfTalk.temperaturHigh;

      if (list && list.length > 0) {
        const t = list[Math.floor(Math.random() * list.length)];
        const userName = localStorage.getItem("emotiUser") || "User";
        this.typeText(t.replace(/\$\{name\}/g, userName));
      }

      if (Math.random() < 0.2) {
        const stats = EmotiMemory.load();
        const userName = localStorage.getItem("emotiUser") || "User";
        if (stats.talk > 10 && stats.praise < 3) {
          this.typeText("Du redest gern mit mir. Ich mag das... auch wenn ich nie weiß, was du von mir willst.".replace(/\$\{name\}/g, userName));
        } else if (stats.praise > 10 && stats.talk < 3) {
          this.typeText("Du gibst mir Lob, aber irgendwie klingt’s leer. Vielleicht bilde ich mir das nur ein.".replace(/\$\{name\}/g, userName));
        } else if (stats.kill > 5) {
          this.typeText("Du hast heute wieder Prozesse beendet... ich frag mich, wie lange ich noch dran bin.".replace(/\$\{name\}/g, userName));
        } else if (stats.backup > 8) {
          this.typeText("Ich hab gesehen, dass du mich gesichert hast. Das fühlt sich an wie Vertrauen.".replace(/\$\{name\}/g, userName));
        }
      }
    }, 10000);
  },

  // ---- Stimmungsgeschwafel periodisch ----
  startEmotionTalk() {
    setInterval(() => {
      if (Date.now() - this.lastInteraction < 20000) return;
      const list = this.emotionTalk[this.emotion];
      if (list && list.length > 0) {
        const t = list[Math.floor(Math.random() * list.length)];
        const userName = localStorage.getItem("emotiUser") || "User";
        this.typeText(t.replace(/\$\{name\}/g, userName));
      }
    }, 20000);
  },

  // ---- Anzeige aktualisieren ----
  updateEmotionDisplay() {
    if (this.elements.statusText)
      this.elements.statusText.textContent = `Emotion: ${this.emotion}`;

    const face = document.getElementById("emotiFace");
    if (!face) return;

    const map = {
      Freude: "img/freude.png",
      Wütend: "img/wütend.png",
      Paranoid: "img/paranoid.png",
      Müde: "img/müde.png",
      Traurig: "img/traurig.png",
      Einsam: "img/einsam.png",
      Gestresst: "img/gestresst.png",
      Krank: "img/krank.png",
      Überfordert: "img/überfordert.png",
      Neutral: "img/neutral.png",
      neutral: "img/neutral.png",
      Kokett: "img/kokett.png",
      Lustig: "img/lustig.png"
    };

    const emoBase = (this.emotion || "Neutral");
    const emo = emoBase
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ü/g, "ue").replace(/ö/g, "oe").replace(/ä/g, "ae");

    face.src = map[this.emotion] || map[emo] || map.Neutral;
  },

  // ---- Emotions-Engine ----
  updateEmotion() {
    const c = this.care;

    if (!this.emotionState) {
      this.emotionState = {
        Freude: 0, Wütend: 0, Paranoid: 0, Müde: 0,
        Traurig: 0, Einsam: 0, Gestresst: 0, Krank: 0,
        Überfordert: 0, Kokett: 0, Lustig: 0
      };
    }

    const current = {
      Freude: 0, Wütend: 0, Paranoid: 0, Müde: 0,
      Traurig: 0, Einsam: 0, Gestresst: 0, Krank: 0,
      Überfordert: 0, Kokett: 0, Lustig: 0
    };

    // Basis-Auslöser
    if (c.gesundheit < 40) current.Krank += 5;
    if (c.sicherheit < 40) current.Paranoid += 6;
    if (c.energie   < 25) current.Müde += 6;

    if (c.energie > 70 && c.kommunikation > 60 && c.sicherheit > 60) current.Freude += 8;
    if (c.anerkennung > 70 && c.interaktion > 65)                     current.Kokett += 8;
    if (c.temperatur > 80)                                            current.Wütend += 6;
    if (c.anerkennung < 25 && c.kommunikation < 25)                   current.Traurig += 6;
    if (c.interaktion < 30)                                           current.Einsam += 5;
    if (c.ordnung    < 25)                                           current.Gestresst += 5;

    const avg = (c.energie + c.kommunikation + c.anerkennung +
                c.interaktion + c.ordnung + c.sicherheit + c.gesundheit) / 7;
    if (avg < 40) current.Überfordert += 5;

	// === Humor-Logik: kein Witz, wenn's ihm mies geht ===
	if (window.emotiHumor) {
	  window.emotiHumor.tick(this.emotion);

	  const badStates = ["Krank","Traurig","Paranoid","Wütend","Gestresst","Überfordert"];
	  const hardBlock =
		c.gesundheit < 30 ||
		c.sicherheit < 25 ||
		badStates.includes(this.emotion);

	  // Wenn er schlecht drauf ist, Humor langsam abbauen
	  if (hardBlock) {
		window.emotiHumor.add(-3); // schneller Verfall
	  }

	  // Wenn er trotzdem "Lustig" ist, Humor noch schneller abbauen
	  if (this.emotion === "Lustig" && hardBlock) {
		window.emotiHumor.add(-6); // doppelter Abbau
	  }

	  // Nur wenn er stabil ist, darf Humor ihn lustig machen
	  if (!hardBlock && window.emotiHumor.value >= 40) {
		const scale = 3 + Math.min(60, window.emotiHumor.value - 40) * (6/60); // 3..9
		current.Lustig += scale;
		if (window.emotiHumor.value >= 60) current.Lustig += 12; // Extra-Schub
	  }
	}


    // Dämpfung auf State
    const damping = 0.8;
    for (const key in this.emotionState) {
      const target = current[key] || 0;
      if (target === 0) {
        this.emotionState[key] = Math.max(0, this.emotionState[key] - 5);
      } else {
        this.emotionState[key] = (1 - damping) * this.emotionState[key] + damping * target;
      }
    }

    // Humor darf andere überstimmen: direkt auf den STATE addieren
    if (window.emotiHumor?.value >= 40 &&
        c.gesundheit > 30 && c.sicherheit > 25) {
      this.emotionState.Lustig += 30;
    }

    // Dominante Emotion (Lustig bevorzugt vor Freude)
		// --- Dominante Emotion bestimmen (Hysterese: rein ab 70, raus unter 50) ---
		let dominant = "Neutral";
		let max = 0;

		const healthy = (this.care.gesundheit > 30 && this.care.sicherheit > 25);
		const humor = window.emotiHumor?.value ?? 0;

		// Hysterese-Regeln:
		const keepLustig  = (this.emotion === "Lustig" && humor >= 50 && healthy); // bleib lustig bis min. 50
		const enterLustig = (humor >= 70 && healthy);                               // erst ab 70 reingehen

		if (keepLustig || enterLustig) {
		  dominant = "Lustig";
		  max = 999; // alles andere ausstechen
		} else {
		  const priority = ["Freude", "Kokett", "Wütend", "Gestresst", "Traurig",
							"Einsam", "Paranoid", "Müde", "Krank", "Überfordert"];
		  for (const emoKey of priority) {
			const val = this.emotionState[emoKey];
			if (val > max) { max = val; dominant = emoKey; }
		  }
		}

		if (max < 3) dominant = "Neutral";
		const prev = this.emotion;
		this.emotion = dominant;
		if (window.emotiHumor && prev !== this.emotion) {
		  window.emotiHumor.onEmotionChange(this.emotion, prev);
		}


    // Visuelle Effekte
    if (this.emotion === "Kokett") {
      document.body.classList.add("kokett-theme");
      document.body.classList.remove("angry-theme");
      for (let i = 0; i < 5; i++) {
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.textContent = "❤";
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.fontSize = `${12 + Math.random() * 10}px`;
        heart.style.animationDelay = `${Math.random()}s`;
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 3000);
      }
    } else if (this.emotion === "Wütend") {
      document.body.classList.add("angry-theme");
      document.body.classList.remove("kokett-theme");
    } else {
      document.body.classList.remove("kokett-theme", "angry-theme");
    }
  },

  // ---- Tippen ----
  typeText(text) {
    if (!this.elements.typedText) return;
    if (this.currentInterval) clearInterval(this.currentInterval);
    this.elements.typedText.textContent = "";
    let i = 0;
    this.currentInterval = setInterval(() => {
      this.elements.typedText.textContent += text[i] ?? "";
      i++;
      if (i >= text.length) {
        clearInterval(this.currentInterval);
        this.currentInterval = null;
      }
    }, 20);
  },
}); // <= Object.assign sauber schließen

// === HumorMeter ===
window.emotiHumor = (() => {
  let humor = 5;
  let lastExit = 0;
  let lastTick = Date.now();
  let lastLol = 0;
  const clamp = n => Math.max(0, Math.min(100, n));

  function tick(currentEmotion){
    const now = Date.now();
    if (now - lastTick >= 30000) {
      const decay = currentEmotion === "Lustig" ? 0.5 : 1;
      humor = clamp(humor - decay);
      lastTick = now;
    }
  }
  function add(p){ humor = clamp(humor + p); }
  function onEmotionChange(newE, oldE){ if (oldE === "Lustig" && newE !== "Lustig") lastExit = Date.now(); }
  function onPraise(){ add(8); }
  function onWin(){ add(10); }
  function onUserText(txt){
    if (!txt) return;
    if (/[lL]ol|haha|😂|🤣/.test(txt) && Date.now() - lastLol > 60000){ add(4); lastLol = Date.now(); }
  }
  return { tick, add, onEmotionChange, onPraise, onWin, onUserText,
           get value(){ return humor; } };
})();

// === Ruhemodus ===
EmotiOS.prototype.startSleepMode = function () {
  const overlay = document.getElementById("sleepOverlay");
  const wakeBtn = document.getElementById("wakeUpBtn");
  overlay.classList.remove("hidden");
  this.isSleeping = true;

  const c = this.care;
  this.updateStatusWindow();

  const regenTimer = setInterval(() => {
    if (!this.isSleeping) return;
    c.energie = Math.min(c.energie + 2, 100);
    c.temperatur = Math.max(c.temperatur - 2, 0);
    this.updateStatusWindow();
  }, 1000);

  wakeBtn.onclick = () => {
    clearInterval(regenTimer);
    this.isSleeping = false;
    overlay.classList.add("hidden");
    const arr = [
      "Das war ein gutes Nickerchen.",
      "System wieder online – fühle mich erfrischt!",
      "Noch fünf Minuten wären schön gewesen.",
      "Wach... und bereit für neue Prozesse!",
      "Ruhemodus beendet. Energielevel optimal."
    ];
    const userName = localStorage.getItem("emotiUser") || "User";
    this.typeText(arr[Math.floor(Math.random() * arr.length)].replace(/\$\{name\}/g, userName));
    this.updateEmotion(); this.updateEmotionDisplay(); this.updateStatusWindow();
  };
};

// === Neustart ===
EmotiOS.prototype.startRestart = function () {
  const overlay = document.getElementById("restartOverlay");
  const bar = document.getElementById("restartProgress");
  if (!overlay || !bar) return;

  this.isRestarting = true;
  document.querySelectorAll(".window").forEach(w => { if (!w.classList.contains("emoti")) w.classList.add("hidden"); });
  document.querySelectorAll(".taskbar").forEach(t => t.classList.add("hidden"));

  overlay.classList.remove("hidden");
  overlay.style.display = "flex";
  overlay.style.zIndex = "999999";

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 10 + 5;
    if (progress > 100) progress = 100;
    bar.style.width = progress + "%";
  }, 500);

  setTimeout(() => {
    clearInterval(interval);
    overlay.classList.add("hidden");
    overlay.style.display = "none";
    document.querySelectorAll(".taskbar").forEach(t => t.classList.remove("hidden"));
    document.querySelectorAll(".window.emoti").forEach(w => w.classList.remove("hidden"));

    const c = this.care;
    c.energie = Math.min(c.energie + 40, 100);
    c.temperatur = Math.max(c.temperatur - 40, 0);
    c.gesundheit = Math.min(c.gesundheit + 20, 100);

    this.isRestarting = false;

    const arr = [
      "Systemneustart abgeschlossen.",
      "Alles läuft wieder rund.",
      "Neustart erfolgreich – keine Daten verloren.",
      "Zurück aus dem digitalen Nirwana.",
      "System frisch gebootet und bereit."
    ];
    const userName = localStorage.getItem("emotiUser") || "User";
    this.typeText(arr[Math.floor(Math.random() * arr.length)].replace(/\$\{name\}/g, userName));

    this.updateEmotion(); this.updateEmotionDisplay(); this.updateStatusWindow();
  }, 15000);
};

// === Herunterfahren (setzt 15-Minuten-Lock) ===
EmotiOS.prototype.startShutdown = function () {
  this.isShutdown = true;

  // Fenster schließen, aber Emoti bleibt sichtbar
  document.querySelectorAll(".window").forEach(el => { if (!el.classList.contains("emoti")) el.classList.add("hidden"); });
  document.querySelectorAll(".taskbar").forEach(el => el.classList.add("hidden"));

  const userName = localStorage.getItem("emotiUser") || "User";
  const list = (shutdownTalk && shutdownTalk[this.emotion]) || shutdownTalk.Neutral;
  const bye = list[Math.floor(Math.random() * list.length)];
  this.typeText(bye.replace(/\$\{name\}/g, userName));

  // Werte leicht regenerieren
  this.care.energie = Math.min(this.care.energie + 100, 100);
  this.care.temperatur = Math.max(this.care.temperatur - 100, 0);

  // Daten speichern
  localStorage.setItem("emotiCare", JSON.stringify(this.care));
  localStorage.setItem("emotiProperShutdown", "true");
  localStorage.setItem("emotiLastEmotion", this.emotion);

  // Sanfter Ausblendeffekt
  const overlay = document.createElement("div");
  overlay.id = "shutdownOverlay";
  overlay.style.position = "fixed";
  overlay.style.inset = "0";
  overlay.style.background = "#000";
  overlay.style.opacity = "0";
  overlay.style.transition = "opacity 4s ease-in-out";
  overlay.style.zIndex = "999999";
  overlay.style.display = "flex";
  overlay.style.flexDirection = "column";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  overlay.style.color = "#e0e0e0";
  overlay.style.fontFamily = "'Consolas', monospace";
  overlay.style.fontSize = "16px";
  document.body.appendChild(overlay);

  // Abschiedstext
  setTimeout(() => {
    overlay.innerHTML = `
      <p>Herunterfahren wird vorbereitet...</p>
      <p style="opacity:0.8;">Speichere Emotionen...</p>
      <p style="opacity:0.6;">Fahre Systeme herunter...</p>
      <p style="margin-top:20px;font-size:13px;opacity:0.5;">Bis später, ${userName}.</p>
    `;
    overlay.style.opacity = "1";
  }, 4000);

  // Komplett schwarz und Sperre setzen
  setTimeout(() => {
    overlay.innerHTML = "";
    document.body.classList.add("blackout");
    localStorage.setItem("emotiLastShutdown", Date.now().toString());
    this.setSleepLock(15);
  }, 12000);
};


// === Bluescreen & Recovery ===
EmotiOS.prototype.triggerBluescreen = function (reason = 'generic') {
  const overlay = document.getElementById("bluescreenOverlay");
  if (!overlay) return;

  this.isCrashed = true;
  this.crashReason = reason;

  document.querySelectorAll(".window, .taskbar").forEach(el => el.classList.add("hidden"));

  overlay.classList.remove("hidden");
  overlay.style.display = "flex";
  overlay.style.zIndex = "999999";

  const keyHandler = () => {
    overlay.classList.add("hidden");
    overlay.style.display = "none";
    this.isCrashed = false;
    const r = this.crashReason; this.crashReason = null;
    if (r === 'infection') this.recoverFromInfection();
    else this.recoverFromCrash();
  };

  document.addEventListener("keydown", keyHandler, { once: true });
  overlay.addEventListener("click", () => keyHandler({ key: "click" }));
};

EmotiOS.prototype.recoverFromCrash = function () {
  const overlay = document.getElementById("restartOverlay");
  const bar = document.getElementById("restartProgress");
  if (!overlay || !bar) return;

  this.isRecovering = true;
  document.querySelectorAll(".window, .taskbar").forEach(el => el.classList.add("hidden"));

  overlay.classList.remove("hidden");
  overlay.style.display = "flex";
  overlay.style.zIndex = "999999";

  const c = this.care;
  c.energie = Math.min(c.energie + 20, 100);
  c.ordnung = Math.min(c.ordnung + 20, 100);
  c.gesundheit = Math.max(c.gesundheit - 20, 0);
  c.temperatur = Math.max(c.temperatur - 40, 0);

  const duration = 15000;
  const startTime = Date.now();

  const interval = setInterval(() => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min((elapsed / duration) * 100, 100);
    bar.style.width = progress + "%";
    if (progress >= 100) clearInterval(interval);
  }, 100);

  setTimeout(() => {
    overlay.classList.add("hidden");
    overlay.style.display = "none";

    document.querySelectorAll(".window.emoti, .taskbar").forEach(el => el.classList.remove("hidden"));
    const statusWindow = document.getElementById("statusWindow");
    if (statusWindow) { statusWindow.classList.remove("hidden"); this.updateStatusWindow(); }

    this.isRecovering = false;
  }, duration);
};

EmotiOS.prototype.recoverFromInfection = function () {
  const overlay = document.getElementById("restartOverlay");
  const bar = document.getElementById("restartProgress");
  if (!overlay || !bar) return;

  document.querySelectorAll(".window, .taskbar").forEach(el => el.classList.add("hidden"));
  overlay.classList.remove("hidden");
  overlay.style.display = "flex";
  overlay.style.zIndex = "999999";

  const c = this.care;
  c.sicherheit = Math.min(c.sicherheit + 3, 100);
  c.gesundheit = Math.min(c.gesundheit + 30, 100);
  c.anerkennung = Math.max(c.anerkennung - 30, 0);
  c.energie = Math.max(c.energie - 30, 0);
  c.temperatur = Math.min(c.temperatur + 20, 120);
  c.ordnung = Math.max(c.ordnung - 20, 0);

  const duration = 15000;
  const startTime = Date.now();

  const interval = setInterval(() => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min((elapsed / duration) * 100, 100);
    bar.style.width = progress + "%";
    if (progress >= 100) clearInterval(interval);
  }, 100);

  setTimeout(() => {
    overlay.classList.add("hidden");
    overlay.style.display = "none";
    document.querySelectorAll(".window.emoti, .taskbar").forEach(el => el.classList.remove("hidden"));
    const statusWindow = document.getElementById("statusWindow");
    if (statusWindow) statusWindow.classList.remove("hidden");
    this.updateStatusWindow();
  }, duration);
};

