// === memory.js – Langzeitgedächtnis von EmotiOS ===
// Speichert Interaktionen in localStorage und lässt sie täglich verblassen.

(function () {
  "use strict";

  const STORAGE_KEY = "emotiMemory";
  const FADE_KEY    = "emotiMemoryFade";

  class EmotiMemory {
    static load() {
      try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      } catch {
        return {};
      }
    }

    static save(stats) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stats || {}));
    }

    static record(action, amount = 1) {
      if (!action) return;
      const stats = this.load();
      stats[action] = (stats[action] || 0) + amount;
      this.save(stats);
    }

    // Optionaler Komfort: mehrere Dinge auf einmal hochzählen
    static bump(values = {}) {
      const stats = this.load();
      for (const [k, v] of Object.entries(values)) {
        stats[k] = (stats[k] || 0) + (Number(v) || 0);
      }
      this.save(stats);
    }

    // 1x pro Tag: Werte etwas senken, damit alte Gewohnheiten „verblassen“
    static fadeDaily() {
      const now = Date.now();
      const last = Number(localStorage.getItem(FADE_KEY) || 0);
      // 24h vergangen?
      if (now - last < 24 * 60 * 60 * 1000) return;

      const stats = this.load();
		for (const k of Object.keys(stats)) {
		  const v = Number(stats[k]) || 0;
		  let fadeRate = 3.5; // Standard-Abbau

		  // Spezielle Logik für Gaming
		  if (k === "gamingTime") {
			if (v > 3600) fadeRate = 20;        // über 1 Stunde => langsamer Verfall
			else if (v > 600) fadeRate = 10;    // 10 Min – 1h => mittlerer Verfall
			else fadeRate = 25;                 // kleine Sessions => schnell vergessen
		  }

		  stats[k] = Math.max(0, Math.round((v - fadeRate) * 10) / 10);
		}

      this.save(stats);
      localStorage.setItem(FADE_KEY, String(now));
    }

    // Nützlich für Debug/Diagnose
    static reset() {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(FADE_KEY);
    }
  }

  // Global verfügbar machen
  window.EmotiMemory = EmotiMemory;

  // Beim Laden gleich ein Verblassen versuchen (harmlos, macht 23h lang nichts)
  EmotiMemory.fadeDaily();

})();
