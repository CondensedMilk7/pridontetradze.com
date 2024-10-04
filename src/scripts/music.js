const PLAY_ICON = `<i class="fa-solid fa-play"></i>`;
const PAUSE_ICON = `<i class="fa-solid fa-pause"></i>`;
const containerEl = document.getElementById("music-list");

class MusicTrack {
  constructor(title, date, file) {
    this.title = title;
    this.date = date;
    this.file = file;

    const track = this.#trackElement({ title, date, file });

    this.playBtn = track.playBtn;
    this.waveElement = track.waveElement;
    this.containerElement = track.containerElement;
    this.id = track.id;

    const loadingElement = document.createElement("p");
    loadingElement.textContent = "hold on...";
    this.loadingElement = loadingElement;
  }

  playPause() {
    this.wavesurfer.playPause();
    this.playBtn.innerHTML = this.playBtn.innerHTML.includes("play")
      ? PAUSE_ICON
      : PLAY_ICON;
  }

  pause() {
    this.wavesurfer.pause();
    this.playBtn.innerHTML = PLAY_ICON;
  }

  play() {
    this.wavesurfer.play();
    this.playBtn.innerHTML = PAUSE_ICON;
  }

  initWavesurfer() {
    this.wavesurfer = WaveSurfer.create({
      container: this.waveElement,
      waveColor: "#4F4A85",
      progressColor: "#383351",
      cursorColor: "currentColor",
      url: "/assets/music/" + this.file,
      barWidth: 4,
      cursorWidth: 2,
    });
  }

  showLoading() {
    this.waveElement.prepend(this.loadingElement);
  }

  hideLoading() {
    if (this.loadingElement) {
      this.loadingElement.remove();
    }
  }

  #trackElement({ title, date, file }) {
    const containerElement = document.createElement("li");
    containerElement.id = file;
    containerElement.classList.add("music-entry", "entry");

    const titleElement = document.createElement("div");
    titleElement.classList.add("music-title");
    titleElement.innerHTML = `
      <h3>${title}</h3>
      <p class="date">${new Date(date).toLocaleDateString()}</p>
    `;
    containerElement.appendChild(titleElement);

    const waveElement = document.createElement("div");
    waveElement.classList.add("wave");

    const playBtn = document.createElement("button");
    playBtn.classList.add("play");
    playBtn.innerHTML = PLAY_ICON;

    const playerElement = document.createElement("div");
    playerElement.classList.add("player");
    playerElement.appendChild(playBtn);
    playerElement.appendChild(waveElement);
    containerElement.appendChild(playerElement);

    return { playBtn, waveElement, containerElement, id: file };
  }
}

const musicList = [
  { title: "In Neon", date: "2019-12-01", file: "in_neon.mp3" },
];

const tracks = [];

musicList.forEach((item) => {
  const track = new MusicTrack(item.title, item.date, item.file);
  containerEl.appendChild(track.containerElement);

  track.playBtn.addEventListener("click", () => {
    if (!track.wavesurfer) {
      track.initWavesurfer();
      track.wavesurfer.on("load", () => track.showLoading());
      track.wavesurfer.on("ready", () => {
        track.hideLoading();
        playPauseTrack(track);
      });
      track.wavesurfer.on("finish", () => track.pause());
    } else {
      playPauseTrack(track);
    }
  });

  tracks.push(track);
});

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    tracks.forEach((t) => t.pause());
    e.preventDefault();
  }
});

function playPauseTrack(track) {
  track.playPause();
  tracks.filter((t) => t.id !== track.id).forEach((t) => t.pause());
}
