document.addEventListener("DOMContentLoaded", () => {

  const beats = [
    {
      name: "HipHop Energy",
      type: "trap",
      image: "assets/beats/img11.jpg",
      audio: "assets/audio/beat 1.mp3"
    },
    {
      name: "Funk Bailão - Remix",
      type: "funk",
      image: "assets/beats/img22.jpg",
      audio: "assets/audio/beat 2.wav"
    },
    {
      name: "Hoodtrap",
      type: "trap",
      image: "assets/beats/img33.jpg",
      audio: "assets/audio/HOODTRAP.wav"
    },{
      name: "Pills",
      type: "trap",
      image: "assets/beats/img55.jpg",
      audio: "assets/audio/slowtrap 99bpm 9d10.wav"
    },
    {
      name: "Danger",
      type: "drill",
      image: "assets/beats/img44.jpg",
      audio: "assets/audio/drillllll.wav"
    },
    {
      name: "loving",
      type: "rnb",
      image: "assets/beats/img66.jpg",
      audio: "assets/audio/rnb niggusta.wav"
    },
    {
      name: "p*t4r14",
      type: "funk",
      image: "assets/beats/img77.jpg",
      audio: "assets/audio/type funk smoke x ig.wav"
    },
    {
      name: "respeita",
      type: "trap",
      image: "assets/beats/img88.jpg",
      audio: "assets/audio/type funk smoke x ig.wav"
    },
    {
      name: "future",
      type: "trap",
      image: "assets/beats/img99.jpg",
      audio: "assets/audio/future new.mp3"
    },
    {
      name: "oldwave",
      type: "trap",
      image: "assets/beats/img10.jpg",
      audio: "assets/audio/future.mp3"
    },
    {
      name: "dont care",
      type: "trap",
      image: "assets/beats/img111.jpg",
      audio: "assets/audio/guitar 130bpm_Master.wav"
    },
    {
      name: "fucklove",
      type: "drill",
      image: "assets/beats/img112.jpg",
      audio: "assets/audio/gust.mp3"
    },
    {
      name: "money and love",
      type: "drill",
      image: "assets/beats/img113.jpg",
      audio: "assets/audio/drill.mp3"
    },
    {
      name: "Gold",
      type: "funk",
      image: "assets/beats/img114.jpg",
      audio: "assets/audio/funkreggaeton.mp3"
    },
    {
      name: "Plug Type Robin",
      type: "trap",
      image: "assets/beats/img115.png",
      audio: "assets/audio/pluggg wav.wav"
    },
  ];

  const grid = document.getElementById("beatsGrid");
  let currentAudio = null;
  let currentBtn = null;

  function formatTime(sec){
    if(!sec) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2,"0");
    return `${m}:${s}`;
  }

  function renderBeats(list){
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

        if(currentAudio && currentAudio !== audio){
          currentAudio.pause();
          if(currentBtn) currentBtn.textContent = "▶";
        }

        if(audio.paused){
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

      progress.addEventListener("input", () => {
        audio.currentTime = (progress.value / 100) * audio.duration;
      });

      grid.appendChild(card);
    });
  }

  window.filterBeats = function(type){
    if(type === "all"){
      renderBeats(beats);
    } else {
      renderBeats(beats.filter(b => b.type === type));
    }
  };

  renderBeats(beats);

});