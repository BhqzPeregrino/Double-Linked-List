import { LinkedList } from "./models/LinkedList.js";

const audio = document.querySelector("audio");
const title = document.querySelector("h1");
const play = document.getElementById("play");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const current_time = document.getElementById("current_time");
const current_audio = document.getElementById("current_audio");
const progressContainer = document.querySelector(".progress_container");
const progress = document.getElementById("progress");

const songs = ["Black Plant - The Last Shadow Puppets", "Muscle Museum - Muse", "Visita - Enjambre", "The Afternoons Hat - Arctic Monkeys", "When The Sun Goes Down - Arctic Monkeys"];

let audioIndex = 0;

const playlist = new LinkedList();
songs.forEach(song => playlist.addNode(song));

const songsDirectory = "audio";

function changeSong(direction) {
    audioIndex = (audioIndex + direction + playlist.size()) % playlist.size();
    loadAudio(playlist.getElementAt(audioIndex).element);
    audio.play();
}

function loadAudio(song) {
    title.textContent = song;
    audio.src = `${songsDirectory}/${song}.mp3`;

    audio.addEventListener("loadedmetadata", () => {
        timeSong(audio.duration, current_audio);
    });
}

play.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
});

prev.addEventListener("click", () => {
    changeSong(-1);
});

next.addEventListener("click", () => {
    changeSong(1);
});

audio.addEventListener("timeupdate", () => {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60);
    current_time.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
});

progressContainer.addEventListener("click", (event) => {
    const progressWidth = progressContainer.clientWidth;
    const clickX = event.offsetX;
    const duration = audio.duration;
    const seekTime = (clickX / progressWidth) * duration;
    audio.currentTime = seekTime;
});

loadAudio(playlist.getElementAt(audioIndex).element);

function timeSong(duration, element) {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    element.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
