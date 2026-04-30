document.addEventListener("DOMContentLoaded", () => {

  const beats = [
    {name: "Type Labrinth - The Way", type: "trap", image: "assets/beats/img205p.jpg", audio: "assets/audio/10s10.wav" },
    {name: "Type Playboy Carti - Rainbow", type: "trap", image: "assets/beats/img204.jpg", audio: "assets/audio/trapp2.wav" },
    { name: "Type Don Toliver - Cobraz", type: "trap", image: "assets/beats/img200.jpg", audio: "assets/audio/BEAT COBRAZ.wav" },
    { name: "Rage Trap Dist", type: "trap", image: "assets/beats/img119.jpg", audio: "assets/audio/trap futurista 155.wav" },
    { name: "Trap Snare - Kisses", type: "trap", image: "assets/beats/img118.jpg", audio: "assets/audio/TRAP FERKIIK.wav" },
    { name: "TRAP LIKE A DREAM - (sample music)", type: "trap", image: "assets/beats/img201.jpg", audio: "assets/audio/LIKE A DREAM.wav" },
    { name: "Hoodtrap", type: "trap", image: "assets/beats/img33.jpg", audio: "assets/audio/HOODTRAP - Copia.wav" },
    { name: "Pills Trap vibes", type: "trap", image: "assets/beats/img55.jpg", audio: "assets/audio/slowtrap 99bpm 9d10.wav" },
    { name: "Boombap - streets", type: "trap", image: "assets/beats/img203.jpg", audio: "assets/audio/beat boombap neww.wav" },
    { name: "DangerDrill", type: "drill", image: "assets/beats/img44.jpg", audio: "assets/audio/drillllll.wav" },
    { name: "Type BG - oldwave", type: "trap", image: "assets/beats/img10.jpg", audio: "assets/audio/future.mp3" },
    { name: "loving - rnb", type: "rnb", image: "assets/beats/img66.jpg", audio: "assets/audio/rnb niggusta.wav" },
    { name: "SlowTrap Sax - Choices", type: "trap", image: "assets/beats/img206.jpg", audio: "assets/audio/vocal trap.wav" },
    { name: "p*t4r14", type: "funk", image: "assets/beats/img77.jpg", audio: "assets/audio/type funk smoke x ig.wav" },
    { name: "Type Lil Uzi - mario bros", type: "trap", image: "assets/beats/img202.jpg", audio: "assets/audio/mario bros.wav" },
    { name: "BoomBap or Trap?", type: "trap", image: "assets/beats/img11.jpg", audio: "assets/audio/beat 1.mp3" },
    { name: "TrapFunk - respeita", type: "trap", image: "assets/beats/img88.jpg", audio: "assets/audio/type funk smoke x ig.wav" },
    { name: "DarkTrap future", type: "trap", image: "assets/beats/img99.jpg", audio: "assets/audio/future new.mp3" },
    { name: "Type Travis Scott - dont care", type: "trap", image: "assets/beats/img111.jpg", audio: "assets/audio/guitar 130bpm_Master.wav" },
    { name: "fucklove drill", type: "drill", image: "assets/beats/img112.jpg", audio: "assets/audio/gust.mp3" },
    { name: "Funk Bailão - Remix", type: "funk", image: "assets/beats/img22.jpg", audio: "assets/audio/beat 2.wav" },
    { name: "Ye Dril no love", type: "drill", image: "assets/beats/img113.jpg", audio: "assets/audio/drill.mp3" },
    { name: "Type TrapFunk Gold", type: "funk", image: "assets/beats/img114.jpg", audio: "assets/audio/funkreggaeton.mp3" },
    { name: "Plugg Type Robin", type: "trap", image: "assets/beats/img115.png", audio: "assets/audio/pluggg wav.wav" },
    { name: "LowTrap Vibes", type: "trap", image: "assets/beats/img116.jpg", audio: "assets/audio/beatlento.wav" },
    { name: "SlowTrap Again", type: "trap", image: "assets/beats/img117.jpg", audio: "assets/audio/slowtrap 99bpm 9d10.wav" },
    
  ];

  const grid = document.getElementById("beatsGrid");

  let currentAudio = null;
  let currentBtn = null;

  // =========================
  // INTRO GLOBAL (CORRIGIDO)
  // =========================
  let introAudio = new Audio("assets/audio/HOODTRAP ROCKSTAR.wav");
  introAudio.volume = 0.2;
  introAudio.loop = true;

  function startIntro() {
    const isBeatsPage = window.location.pathname.includes("beats");

    if (isBeatsPage) return; // NÃO toca na página beats

    introAudio.play().catch(() => {
      document.addEventListener("click", () => introAudio.play(), { once: true });
    });
  }

  startIntro();

  function stopIntro() {
    if (introAudio) {
      introAudio.pause();
      introAudio.currentTime = 0;
      introAudio = null;
    }
  }

  // =========================
  // FORMAT TIME
  // =========================
  function formatTime(sec) {
    if (!sec) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  // =========================
  // STOP AUDIO
  // =========================
  function stopCurrentAudio() {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      if (currentBtn) currentBtn.textContent = "▶";
      currentAudio = null;
      currentBtn = null;
    }
  }

  // =========================
  // RENDER BEATS
  // =========================
  function render(list) {
    grid.innerHTML = "";

    list.forEach((beat) => {
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

        // 🔥 PARA INTRO NA PRIMEIRA INTERAÇÃO
        stopIntro();

        // troca música
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

      audio.addEventListener("timeupdate", () => {
        progress.value = (audio.currentTime / audio.duration) * 100 || 0;
        current.textContent = formatTime(audio.currentTime);
      });

      audio.addEventListener("ended", () => {
        btn.textContent = "▶";
        progress.value = 0;
        current.textContent = "0:00";
      });

      progress.addEventListener("input", () => {
        audio.currentTime = (progress.value / 100) * audio.duration;
      });

      grid.appendChild(card);
    });
  }

  // =========================
  // FILTER
  // =========================
  window.filterBeats = function (type) {
    stopCurrentAudio();

    if (type === "all") {
      render(beats);
    } else {
      render(beats.filter(b => b.type === type));
    }
  };

  // INIT
  render(beats);
});