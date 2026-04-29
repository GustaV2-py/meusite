document.addEventListener("DOMContentLoaded", () => {

  const beats = [
    { name: "BoomBap or Trap?", type: "trap", image: "assets/beats/img11.jpg", audio: "assets/audio/beat 1.mp3" },
    { name: "Funk Bailão - Remix", type: "funk", image: "assets/beats/img22.jpg", audio: "assets/audio/beat 2.wav" },
    { name: "Hoodtrap", type: "trap", image: "assets/beats/img33.jpg", audio: "assets/audio/HOODTRAP.wav" },
    { name: "Pills Trap vibes", type: "trap", image: "assets/beats/img55.jpg", audio: "assets/audio/slowtrap 99bpm 9d10.wav" },
    { name: "DangerDrill", type: "drill", image: "assets/beats/img44.jpg", audio: "assets/audio/drillllll.wav" },
    { name: "loving - rnb", type: "rnb", image: "assets/beats/img66.jpg", audio: "assets/audio/rnb niggusta.wav" },
    { name: "p*t4r14", type: "funk", image: "assets/beats/img77.jpg", audio: "assets/audio/type funk smoke x ig.wav" },
    { name: "TrapFunk - respeita", type: "trap", image: "assets/beats/img88.jpg", audio: "assets/audio/type funk smoke x ig.wav" },
    { name: "DarkTrap future", type: "trap", image: "assets/beats/img99.jpg", audio: "assets/audio/future new.mp3" },
    { name: "Type BG - oldwave", type: "trap", image: "assets/beats/img10.jpg", audio: "assets/audio/future.mp3" },
    { name: "Type Travis Scott - dont care", type: "trap", image: "assets/beats/img111.jpg", audio: "assets/audio/guitar 130bpm_Master.wav" },
    { name: "fucklove drill", type: "drill", image: "assets/beats/img112.jpg", audio: "assets/audio/gust.mp3" },
    { name: "Ye Dril no love", type: "drill", image: "assets/beats/img113.jpg", audio: "assets/audio/drill.mp3" },
    { name: "Type TrapFunk Gold", type: "funk", image: "assets/beats/img114.jpg", audio: "assets/audio/funkreggaeton.mp3" },
    { name: "Plugg Type Robin", type: "trap", image: "assets/beats/img115.png", audio: "assets/audio/pluggg wav.wav" },
    { name: "LowTrap Vibes", type: "trap", image: "assets/beats/img115.png", audio: "assets/audio/beatlento.wav" },
  ];

  const grid = document.getElementById("beatsGrid");
  let currentAudio = null;
  let currentBtn = null;
  
  // --- LÓGICA DA INTRO ---
  let introAudio = new Audio('assets/audio/HOODTRAP ROCKSTAR.wav'); // Escolha o arquivo da intro
  introAudio.volume = 0.20; // Volume baixo (15%)
  introAudio.loop = true;

  const iniciarIntro = () => {
    introAudio.play().catch(() => {
      // Se falhar (bloqueio do navegador), tenta de novo no primeiro clique
      document.addEventListener('click', () => {
        if(introAudio) introAudio.play();
      }, { once: true });
    });
  };
  iniciarIntro();
  // ------------------------

  function formatTime(sec) {
    if (!sec) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  function stopCurrentAudio() {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      if (currentBtn) currentBtn.textContent = "▶";
      currentAudio = null;
      currentBtn = null;
    }
  }

  function renderBeats(list) {
    grid.innerHTML = "";

    list.forEach(beat => {
      const card = document.createElement("div");
      card.className = "beat-card";

      const audio = new Audio(beat.audio);

      card.innerHTML = `
        <div class="beat-img">
          <img src="${beat.image}">
          <div class="overlay">
            <button class="play-btn">▶</button>
          </div>
        </div>
        <h3>${beat.name}</h3>
        <div class="player">
          <span class="current">0:00</span>
          <input type="range" value="0" class="progress">
          <span class="duration">0:00</span>
        </div>
      `;

      const btn = card.querySelector(".play-btn");
      const progress = card.querySelector(".progress");
      const current = card.querySelector(".current");
      const duration = card.querySelector(".duration");

      audio.addEventListener("loadedmetadata", () => {
        duration.textContent = formatTime(audio.duration);
      });

      btn.onclick = () => {
        // Quando der play em QUALQUER beat, mata a música de fundo
        if (introAudio) {
          introAudio.pause();
          introAudio = null; // Remove da memória para não tocar mais
        }

        if (currentAudio && currentAudio !== audio) {
          stopCurrentAudio();
        }

        if (audio.paused) {
          audio.play();
          btn.textContent = "❚❚";
          currentAudio = audio;
          currentBtn = btn;
        } else {
          audio.pause();
          btn.textContent = "▶";
        }
      };

      audio.addEventListener("ended", () => {
        btn.textContent = "▶";
        progress.value = 0;
        current.textContent = "0:00";
      });

      audio.addEventListener("timeupdate", () => {
        progress.value = (audio.currentTime / audio.duration) * 100 || 0;
        current.textContent = formatTime(audio.currentTime);
      });

      progress.addEventListener("input", () => {
        audio.currentTime = (progress.value / 100) * audio.duration;
      });

      grid.appendChild(card);
    });
  }

  window.filterBeats = function(type) {
    stopCurrentAudio();
    if (type === "all") {
      renderBeats(beats);
    } else {
      renderBeats(beats.filter(b => b.type === type));
    }
  };

  renderBeats(beats);
});