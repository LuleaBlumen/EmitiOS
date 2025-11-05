// === Cleanup Game: Dreck überall ===
(function() {
  const DIRT_SPAWN_INTERVAL = 800;   // alle 1,2 s neuer Fleck
  const GAME_DURATION = 20000;        // 20 s insgesamt
  const MAX_DIRT = 12;                // maximal gleichzeitig sichtbare Flecken
  const MIN_DIRT_SIZE = 100;  // vorher 40
  const MAX_DIRT_SIZE = 180;  // vorher 80
  const FADE_MS = 240; // muss zur CSS-Transition passen



  let dirtList = [];
  let score = 0;
  let active = false;
  let spawnTimer = null;
  let endTimer = null;

  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function clearAllDirt() {
    dirtList.forEach(d => d.remove());
    dirtList = [];
  }

  function spawnDirt() {
  if (!active || dirtList.length >= MAX_DIRT) return;

  const dirt = document.createElement("img");
  dirt.src = `img/dirt${Math.ceil(Math.random() * 3)}.png`;
  dirt.className = "dirtSpot";

  // Größere Wolken
  const size = random(MIN_DIRT_SIZE, MAX_DIRT_SIZE);
  dirt.style.width = size + "px";
  dirt.style.height = size + "px";

  // Platzierung: berücksichtige die tatsächliche Größe, damit nichts abgeschnitten wird
  const padX = 20;
  const padTop = 60;
  const padBottom = 140; // Taskleiste/Unterkante, wie bei dir

  const maxLeft = Math.max(padX, window.innerWidth - size - padX);
  const maxTop  = Math.max(padTop, window.innerHeight - size - padBottom);

  dirt.style.left = random(padX, maxLeft) + "px";
  dirt.style.top  = random(padTop, maxTop) + "px";

  document.body.appendChild(dirt);
  
  // weicher Fade-In
requestAnimationFrame(() => dirt.classList.add("show"));


dirt.onclick = () => {
  score++;
  // weich ausblenden
  dirt.classList.remove("show");
  setTimeout(() => {
    dirt.remove();
    dirtList = dirtList.filter(d => d !== dirt);
    if (window.emotiOS && window.emotiOS.care) {
      const c = window.emotiOS.care;
      c.ordnung = Math.min(c.ordnung + 2, 100);
      c.temperatur = Math.max(c.temperatur - 0.2, 0);
      window.emotiOS.updateStatusWindow();
    }
  }, FADE_MS);
};


  dirtList.push(dirt);

  // nach 4s verschwindet der Fleck
setTimeout(() => {
  if (dirtList.includes(dirt)) {
    dirt.classList.remove("show");      // ausblenden
    setTimeout(() => {
      if (dirtList.includes(dirt)) {
        dirt.remove();
        dirtList = dirtList.filter(d => d !== dirt);
      }
    }, FADE_MS);
  }
}, 4000);
}


  function endGame() {
    if (!active) return;
    active = false;
    if (spawnTimer) clearInterval(spawnTimer);
    if (endTimer) clearTimeout(endTimer);
    clearAllDirt();

    // Endwertung
    if (window.emotiOS && window.emotiOS.care) {
      const c = window.emotiOS.care;
      c.ordnung = Math.min(c.ordnung + score * 2, 100);
      c.temperatur = Math.max(c.temperatur - 2, 0);
      c.interaktion = Math.min(c.interaktion + score * 2, 100);
	 
      window.emotiOS.updateStatusWindow();
    }

    // Score für den Dialog im cleanup-Case bereitstellen
    window.lastCleanupScore = score;
  }

  function startCleanupGame() {
    if (active) return;
    active = true;
    score = 0;
    clearAllDirt();

    // Statistik
    window.emotiStats = window.emotiStats || {};
    window.emotiStats.cleanup = (window.emotiStats.cleanup || 0) + 1;

    spawnTimer = setInterval(spawnDirt, DIRT_SPAWN_INTERVAL);
    endTimer = setTimeout(endGame, GAME_DURATION);
  }

  // WICHTIG: global exportieren, damit personality.js sie findet
  window.startCleanupGame = startCleanupGame;
})();
