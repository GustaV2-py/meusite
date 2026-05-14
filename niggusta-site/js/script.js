document.addEventListener("DOMContentLoaded", () => {

  const beats = [
    {name: "Type Labrinth x Don Toliver - The Way - TrapVibe", type: "trap", image: "assets/beats/img205p.jpg", audio: "assets/audio/10s10.wav" },
    {name: "Type Gunna x Migos - 4Real - DarkTrap", type: "trap", image: "assets/beats/img210.jpg", audio: "assets/audio/saxxx.wav" },
    {name: "Type Mainstreet - Gangsta - TrapPlug", type: "trap", image: "assets/beats/img213.jpg", audio: "assets/audio/trap bom.wav" },
    {name: "Type Mainstreet - Gangsta - TrapPlug", type: "trap", image: "assets/beats/img225.jpg", audio: "assets/audio/BEAT LOBAO BREGA.wav" },
    {name: "Type Playboy Carti - Rainbow - RageTrap", type: "trap", image: "assets/beats/img204.jpg", audio: "assets/audio/trapp2.wav" },
    { name: "Type Gunna x Don Toliver - Invencible - TrapVibe", type: "trap", image: "assets/beats/img213.jpg", audio: "assets/audio/alpra.wav" },
    { name: "Type Don Toliver - Cobraz - TrapVibe", type: "trap", image: "assets/beats/img200.jpg", audio: "assets/audio/BEAT COBRAZ.wav" },
    { name: "Type Lil Uzi - Rage Trap Dist", type: "trap", image: "assets/beats/img119.jpg", audio: "assets/audio/trap futurista 155.wav" },
    { name: "Funk Bailão - Beat", type: "funk", image: "assets/beats/img211.jpg", audio: "assets/audio/FunkBEAT.wav" },
    { name: "Type Travis Scott - Lead is magical - TrapPlug", type: "trap", image: "assets/beats/img212.jpg", audio: "assets/audio/Beat Sax Lead.wav" },
    { name: "Type Thiago Sub - Hoodtrap", type: "trap", image: "assets/beats/img33.jpg", audio: "assets/audio/HOODTRAP - Copia.wav" },
    { name: "Type EsDeeKid - Pills TrapVibe", type: "trap", image: "assets/beats/img55.jpg", audio: "assets/audio/slowtrap 99bpm 9d10.wav" },
    { name: "TRAP LIKE A DREAM - (sample music)", type: "trap", image: "assets/beats/img201.jpg", audio: "assets/audio/LIKE A DREAM.wav" },
    { name: "Type Dk-47 - Boombap - streets", type: "trap", image: "assets/beats/img203.jpg", audio: "assets/audio/beat boombap neww.wav" },
    { name: "Type Central Cee - DangerDrill", type: "drill", image: "assets/beats/img44.jpg", audio: "assets/audio/drillllll.wav" },
    { name: "Type BG - oldwave - TrapPlug", type: "trap", image: "assets/beats/img10.jpg", audio: "assets/audio/ffuture.wav" },
    { name: "loving - rnb", type: "rnb", image: "assets/beats/img66.jpg", audio: "assets/audio/rnb niggusta.wav" },
    { name: "Fogo no Puteiro - Remix (Don Toliver)", type: "funk", image: "assets/beats/fogo.png", audio: "assets/audio/FOGO NO PUTEIRO.wav" },
    { name: "PIPOTECH", type: "psytrance", image: "assets/beats/pipotech.jpg", audio: "assets/audio/PIPO.wav" },
    { name: "Type Playboy Carti x Lil Uzi - SlowTrap Sax - Choices", type: "trap", image: "assets/beats/img206.jpg", audio: "assets/audio/vocal trap.wav" },
    { name: "Type Lil Uzi - mario bros - TrapVibe", type: "trap", image: "assets/beats/img202.jpg", audio: "assets/audio/mario bros.wav" },
    { name: "BoomBap or Trap?", type: "trap", image: "assets/beats/img11.jpg", audio: "assets/audio/beat 1.mp3" },
    { name: "Trap Snare - Kisses", type: "trap", image: "assets/beats/img118.jpg", audio: "assets/audio/TRAP FERKIIK.wav" },
    { name: "Eletrophonk", type: "funk", image: "assets/beats/img214.jpg", audio: "assets/audio/Funk Cowbell.mp3" },
    { name: "TrapFunk - respeita", type: "trap", image: "assets/beats/img88.jpg", audio: "assets/audio/smoke x ig.wav" },
    { name: "Type MetrooBoomim x 21 Savage - future - DarkTrap", type: "trap", image: "assets/beats/img99.jpg", audio: "assets/audio/future new.mp3" },
    { name: "Type Travis Scott x Gunna - dont care - TrapVibe", type: "trap", image: "assets/beats/img111.jpg", audio: "assets/audio/guitar 130bpm_Master.wav" },
    { name: "Type Jbee - fucklove - drill", type: "drill", image: "assets/beats/img112.jpg", audio: "assets/audio/gust.mp3" },
    { name: "Funk Bailão - Remix", type: "funk", image: "assets/beats/img22.jpg", audio: "assets/audio/beat 2.wav" },
    { name: "Type King Von x Digga D - Ye Dril no love", type: "drill", image: "assets/beats/img113.jpg", audio: "assets/audio/drill.mp3" },
    { name: "Type BadBunny - TrapFunk Gold", type: "funk", image: "assets/beats/img114.jpg", audio: "assets/audio/funkreggaeton.mp3" },
    { name: "Type EsDeeKid - Plugg Robin", type: "trap", image: "assets/beats/img115.png", audio: "assets/audio/pluggg wav.wav" },
    { name: "See what's inside you", type: "psytrance", image: "assets/beats/217.jpg", audio: "assets/audio/PSY1.mp3" },
    { name: "King Of The Pop", type: "pop", image: "assets/beats/img215.jpg", audio: "assets/audio/pop1.mp3" },
    { name: "King Of The Pop #2", type: "pop", image: "assets/beats/img216.jpg", audio: "assets/audio/pop2.mp3" },
  ];

  const grid = document.getElementById("beatsGrid");

  let currentAudio = null;
  let currentBtn = null;

  // 🔥 NOVO
  let currentIndex = 0;
  let currentList = [];

  let introAudio = new Audio("assets/audio/HOODTRAP ROCKSTAR.wav");
  introAudio.volume = 0.2;
  introAudio.loop = true;

  function startIntro() {
    const isBeatsPage = window.location.pathname.includes("beats");
    if (isBeatsPage) return;

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

  function render(list) {
    currentList = list; // 🔥 importante
    grid.innerHTML = "";

    list.forEach((beat, index) => {
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

        stopIntro();

        currentIndex = index; // 🔥 salva posição

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

      // 🔥 AUTOPLAY PRÓXIMA
      audio.addEventListener("ended", () => {

        let nextIndex = currentIndex + 1;

        if (nextIndex >= currentList.length) {
          nextIndex = 0;
        }

        const nextCard = grid.children[nextIndex];
        const nextBtn = nextCard.querySelector(".play-btn");

        nextBtn.click();
      });

      progress.addEventListener("input", () => {
        audio.currentTime = (progress.value / 100) * audio.duration;
      });

      grid.appendChild(card);
    });
  }

  window.filterBeats = function (type) {
    stopCurrentAudio();

    if (type === "all") {
      render(beats);
    } else {
      render(beats.filter(b => b.type === type));
    }
  };

  render(beats);
});