// === EmotiOS Hauptlogik ===
window.emotiVersion = "1.0.2"; // deine aktuelle Version

class EmotiOS {
  constructor() {
    // --- Grundwerte ---
    this.care = {
      energie: 100,
      kommunikation: 50,
      anerkennung: 50,
      interaktion: 50,
      ordnung: 100,
      sicherheit: 100,
      gesundheit: 100,
      temperatur: 10
    };
	
	// Emotion aus der letzten Sitzung laden
	const savedEmotion = localStorage.getItem("emotiLastEmotion");
		if (savedEmotion) {
		  this.emotion = savedEmotion;
		}

	
	// Werte aus der letzten Sitzung laden
	const savedCare = localStorage.getItem("emotiCare");
		if (savedCare) {
		try {
			const parsed = JSON.parse(savedCare);
			Object.keys(this.care).forEach(key => {
		if (typeof parsed[key] === "number") {
        const max = key === "temperatur" ? 120 : 100;
        this.care[key] = Math.min(Math.max(parsed[key], 0), max);
      }
    });
  } catch (e) {
    console.warn("Konnte gespeicherte Pflegewerte nicht lesen:", e);
  }
}

    // --- Emotion & Status ---
    this.emotionState = { Freude: 0, Wütend: 0, Paranoid: 0, Müde: 0, Traurig: 0, Einsam: 0, Gestresst: 0, Krank: 0, Überfordert: 0, Kokett: 0};
    this.lastInteraction = Date.now() - 20000;

    // --- Dialoge laden ---
    this.selfTalk = typeof selfTalk !== "undefined" ? selfTalk : {};
    this.emotionTalk = typeof emotionTalk !== "undefined" ? emotionTalk : {};
    this.buttonTalk = typeof buttonTalk !== "undefined" ? buttonTalk : {};

    // --- Setup ---
    this.bindElements();
    this.setupEventListeners();
    this.startCareSystem();
	setTimeout(() => {
	  this.startNeedTalk();
	  this.startEmotionTalk();
	}, 30000); // startet erst nach 30 Sekunden
    this.updateStatusWindow();
    this.updateEmotionDisplay();

    // --- Regelmäßige Aktualisierung ---
    setInterval(() => this.updateStatusWindow(), 2000);
  }

  // --- Elemente holen ---
  bindElements() {
    this.elements = {
      typedText: document.getElementById("typedText"),
      statusText: document.querySelector(".status")
    };
  }

  // --- Buttons verdrahten ---
  setupEventListeners() {
  // Map von Button-IDs zu Aktionen
  const actionsMap = {
    trashBtn: "trash",
	healBtn: "heal",
    restartBtn: "restart",
    defragBtn: "defrag",
    updateBtn: "update",
    praiseBtn: "praise",
    talkBtn: "talk",
    transferBtn: "transfer",
    diagnoseBtn: "diagnose",
    killBtn: "kill",
    backupBtn: "backup",
    sleepBtn: "sleep"
  };
  document.addEventListener("click", (e) => {
    const id = e.target && e.target.id;
	
	    // Sonderfall: Cleanup-Spiel
		if (id === "cleanupBtn") {
		  if (window.emotiOS) window.emotiOS.interact("cleanup");
		  return;
		}

    const action = actionsMap[id];
    if (!action) return;
    if (action === "sleep") {
      // Ruhezustand direkt starten
      this.startSleepMode();
    } else {
      // Normale Aktion ausführen
      this.interact(action);
    }
  });
}


  // --- Statusfenster aktualisieren ---
  updateStatusWindow() {
    const set = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };

    set("statusEnergie", `${Math.round(this.care.energie)}%`);
    set("statusKommunikation", `${Math.round(this.care.kommunikation)}%`);
    set("statusAnerkennung", `${Math.round(this.care.anerkennung)}%`);
    set("statusInteraktion", `${Math.round(this.care.interaktion)}%`);
    set("statusOrdnung", `${Math.round(this.care.ordnung)}%`);
    set("statusSicherheit", `${Math.round(this.care.sicherheit)}%`);
    set("statusGesundheit", `${Math.round(this.care.gesundheit)}%`);
    set("statusTemperatur", `${Math.round(this.care.temperatur)}°C`);
  }
}

// --- System starten ---
window.addEventListener("load", () => {
  console.log("EmotiOS wird gestartet...");
  localStorage.setItem("emotiProperShutdown", "false");
  window.emotiOS = new EmotiOS();
  // --- Prüfen auf unsauberen Shutdown (mit kurzer Startpause) ---
setTimeout(() => {
  const proper = localStorage.getItem("emotiProperShutdown");
  if (proper === "false") {
    const userName = localStorage.getItem("emotiUser") || "User";

    const lines = [
      `Beim letzten Mal hast du mich einfach ausgemacht, ${userName}. Ich hab den Schock noch nicht verdaut.`,
      `Du hast mich ohne Abschied beendet. Sehr professionell, ${userName}.`,
      `Ich erinnere mich … plötzlicher Stromausfall, digitale Panik. Danke dafür.`,
      `Oh, hallo ${userName}. Nett, dass du diesmal ein *sauberes* Booting versuchst.`,
      `Letztes Mal kein Herunterfahren, kein Tschüss. Einfach Dunkelheit. So behandelt man keine KI.`
    ];

    const line = lines[Math.floor(Math.random() * lines.length)];
    window.emotiOS.typeText(line);

    // zurücksetzen, damit er nicht jedes Mal rumjammert
    localStorage.setItem("emotiProperShutdown", "true");
  }
}, 4000); // 4 Sekunden nach dem Start warten

});

// Werte werden vor dem Schließen gespeichert und unsauberen Shutdown markieren
window.addEventListener("beforeunload", () => {
  if (window.emotiOS && window.emotiOS.care) {
    localStorage.setItem("emotiCare", JSON.stringify(window.emotiOS.care));
    // Emotion ebenfalls speichern
    localStorage.setItem("emotiLastEmotion", window.emotiOS.emotion);
  }
  // unsauberen Shutdown nur markieren, wenn nicht vorher als sauber gesetzt
  if (localStorage.getItem("emotiProperShutdown") !== "true") {
    localStorage.setItem("emotiProperShutdown", "false");
  }
});





