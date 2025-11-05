// === speech.js ===
// Spracheingabe erkennen (Lob/Kritik/Reden) + Win98-Terminal erzeugen

class SpeechHandler {
  constructor(emoti) {
    this.emoti = emoti;
    this.praiseWords = ["danke", "gut", "toll", "cool", "lieb", "super", "mag dich", "brav", "süß", "liebe", "großartig", "nice", "top", "perfekt", "klasse", "wow", "stark", "genial", "hammer", "krass", "mega", "charmant", "hübsch", "beeindruckend", "geschafft", "yay", "du kannst das", "weiter so", "bestens", "super gemacht", "du bist gut", "fantastisch", "wundervoll", "sehr gut", "prima", "fabelhaft", "meisterhaft", "glänzend", "vorbildlich", "exzellent", "cooles ding", "du held", "brillant", "spitze", "nice job", "tippi toppi", "herrlich", "grandios", "astrein", "klasse gemacht", "respekt", "fein", "deluxe", "episch", "nicee", "well done", "sauber", "saustark", "zauberhaft", "ermutigend", "beeindruckt mich", "du rockst", "prima gemacht", "legendär", "top notch", "wunderschön", "bezaubernd", "flott", "superb", "erste klasse", "1a", "heftig gut", "traumhaft", "glorreich", "königlich", "meisterlich", "unschlagbar", "überragend", "bombe", "sensationell", "respektabel", "ehrenhaft", "coolio", "nice one", "strahlend", "chapeau", "gold wert", "geniehaft", "atemberaubend", "zuckersüß", "lieblingsding", "strahlemaus", "göttlich", "göttchen", "bravissimo", "superstar", "rockstar", "champion", "wunderbar", "herzchen", "knuffig", "extra gut", "best ever", "perfekti", "superschnucki", "hervorragend", "genüsslich", "liebenswert", "superduper", "küsschen", "geilomat", "based", "slay", "rizz", "drip", "lit", "banger", "fire", "goated", "clean", "fresh", "saucy", "hype", "broki", "noice", "fleek", "pog", "goat", "elite", "dope", "vibe", "epic", "mega", "yeet", "boosted", "wild", "zucker", "nice"


];
    this.insultWords = ["blöd", "doof", "dumm", "idiot", "hasse", "scheiße", "nerv", "kotz", "arsch", "noob", "bot", "schwach", "lost", "lame", "peinlich", "opfer", "clown", "nervig", "banane", "blamage", "trash", "dummkopf", "horst", "fail", "trottel", "idiot", "spinner", "pfosten", "depp", "nullnummer", "nulpe", "lauchsuppe", "weichei", "memme", "freak", "fuzzi", "nichtsnutz", "wurst", "taugenichts", "größenwahn", "chaot", "stümper", "tölpel", "vollpfosten", "wack", "grütze", "jammerlappen", "schissbuchse", "knallkopf", "pappnase", "schlafmütze", "vollhorst", "honksalat", "gimp", "gurke", "pflaume", "lappen", "banause", "bummel", "doofi", "dödel", "grünschnabel", "halbhirn", "hirni", "holzkopf", "klappspaten", "knilch", "korintenkacker", "krawallzwerg", "pimmelkönig", "quarktasche", "rübenhirn", "sabbelbacke", "schwachmat", "schnarchnase", "schlumpf", "schmutzfink", "troll", "trantüte", "tölpelchen", "vogelhirn", "wurstgesicht", "heulsuse", "dummschnack", "wackeldackel", "pixelhirn", "prozzie"

];
  }

  analyze(input) {
    if (!input || typeof input !== "string") return;
    const text = input.toLowerCase();

    if (this.praiseWords.some(w => text.includes(w))) {
      this.emoti.interact("praise");
      return;
    }
    if (this.insultWords.some(w => text.includes(w))) {
      this.emoti.interact("insult");
      return;
    }
	// Humor-Treffer (einmal pro Minute handled das Modul selbst)
    if (window.emotiHumor) window.emotiHumor.onUserText(text);
	
	if (window.emotiOS?.isSleeping && window.emotiOS.isSleeping()) {
	  window.emotiOS.typeText("Emoti schläft. Versuche es später nochmal.");
	  return;
	}


    this.emoti.interact("talk");
  }
}
window.SpeechHandler = SpeechHandler;


// =================== Terminal-UI (außerhalb der Klasse!) ===================

function createTerminalIfNeeded() {
  let term = document.getElementById("terminalWindow");
  if (term) return term;

  // Fenster erzeugen
  term = document.createElement("div");
  term.id = "terminalWindow";
  term.classList.add("window", "active");

  term.innerHTML = `
    <div class="window-header">
      Eingabeaufforderung
      <button id="terminalClose">✖</button>
    </div>
    <div class="window-body">
      <div id="terminalOutput"></div>
      <input id="terminalInput" type="text" placeholder="C:\\EmotiOS>">
    </div>
  `;

  document.body.appendChild(term);

  // korrekt positionieren, zentrieren, vordergrund
  term.style.display = "flex";
  term.style.flexDirection = "column";
  term.style.zIndex = 99999;
  term.style.top = "50%";
  term.style.left = "50%";
  term.style.transform = "translate(-50%, -50%)";

  if (typeof bringToFront === "function") bringToFront(term);

  // Elemente holen
  const output = term.querySelector("#terminalOutput");
  const input  = term.querySelector("#terminalInput");
  const close  = term.querySelector("#terminalClose");

  // verschiebbar machen
  const header = term.querySelector(".window-header");
  let drag = false, offX = 0, offY = 0;
  header.addEventListener("mousedown", e => {
    drag = true;
    offX = e.clientX - term.offsetLeft;
    offY = e.clientY - term.offsetTop;
    bringToFront(term);
  });
  document.addEventListener("mousemove", e => {
    if (!drag) return;
    term.style.left = e.clientX - offX + "px";
    term.style.top  = e.clientY - offY + "px";
  });
  document.addEventListener("mouseup", () => drag = false);

  // Logik
  const speechHandler = new SpeechHandler(window.emotiOS);
  input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      const text = input.value.trim();
      if (!text) return;
      output.innerHTML += `C:\\EmotiOS> ${text}\n`;
      input.value = "";
      output.scrollTop = output.scrollHeight;
      speechHandler.analyze(text);
    }
  });

  close.addEventListener("click", () => window.toggleTerminal(false));

  return term;
}


// globaler Toggle, damit Startmenü & Shortcut ihn nutzen können
window.toggleTerminal = function(show) {
  const term = createTerminalIfNeeded();
  const visible = term.style.display !== "none";
  const willShow = typeof show === "boolean" ? show : !visible;
  term.style.display = willShow ? "flex" : "none";
  if (willShow) term.querySelector("#terminalInput").focus();
};

// Startmenü-Button + Shortcut verdrahten
window.addEventListener("load", () => {
  const btn = document.getElementById("openTerminal");
  if (btn) {
    btn.addEventListener("click", () => {
      window.toggleTerminal(true);
      const sm = document.getElementById("startMenu");
      if (sm) sm.classList.add("hidden");
    });
  }

  // Shortcut: Strg+Alt+T
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "t") {
      window.toggleTerminal();
    }
  });
});
