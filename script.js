const player = document.querySelector('.player');
const playBtn = document.querySelector('.play');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const audio = document.querySelector('.audio');
const progressContainer = document.querySelector('.progress__container');
const progress = document.querySelector('.progress');
const title = document.querySelector('.song');
const cover = document.querySelector('.cover__img');
const imgSrc = document.getElementById('img__src');
const soundBtn = document.getElementById('soundBtn');

const songs = ['The Pretender', 'Cant Stop', 'Stay With Me', 'Satisfaction'];

let songIndex = 0; // песня по умолчанию

function loadSong(song) {
   title.innerHTML = song;
   audio.src = `audio/${song}.mp3`;
   cover.src = `img/cover${songIndex + 1}.jpg`;
}
loadSong(songs[songIndex]);

function playSong() {
   player.classList.add('play');
   imgSrc.src = 'img/pause.png';
   audio.play();
   
}

function pauseSong() {
   player.classList.remove('play');
   imgSrc.src = 'img/play.png';
   audio.pause();
   
}

playBtn.addEventListener('click', () => {
   const isPlaying = player.classList.contains('play');
   if (isPlaying) {
      pauseSong();
   } else {
      playSong();
   }
})

function nextSong() {
   songIndex++;
   if (songIndex > songs.length - 1) {
      songIndex = 0;
   }
   loadSong(songs[songIndex]);
   playSong();
}

nextBtn.addEventListener('click', nextSong);

function prevSong() {
   songIndex--;
   if (songIndex < 0) {
      songIndex = songs.length - 1;
   }
   loadSong(songs[songIndex]);
   playSong();
}
prevBtn.addEventListener('click', prevSong);

function updateProgress(event) {
   const {duration, currentTime} = event.srcElement;
   const progressPercent = (currentTime / duration) * 100;
   progress.style.width = `${progressPercent}%`;
   
}
audio.addEventListener('timeupdate', updateProgress)

function setProgress(event) {
   const width = this.clientWidth;
   const clickX = event.offsetX;
   const duration = audio.duration;
   audio.currentTime = (clickX / width) * duration;
}
progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);



function updateProgressValue() {
   document.querySelector('.currentTime').innerHTML = (formatTime(Math.floor(audio.currentTime)));
   if (document.querySelector('.durationTime').innerHTML === "NaN:NaN") {
      document.querySelector('.durationTime').innerHTML = "0:00";
   } else {
      document.querySelector('.durationTime').innerHTML = (formatTime(Math.floor(audio.duration)));
   }
};

function formatTime(seconds) {
   let min = Math.floor((seconds / 60));
   let sec = Math.floor(seconds - (min * 60));
   if (sec < 10){ 
      sec  = `0${sec}`;
   };
   return `${min}:${sec}`;
};

setInterval(updateProgressValue, 500);

function changeProgressBar() {
   audio.currentTime = progressBar.value;
};

//велючение-выключение звука
function mute() {	
   if (audio.muted) {		
      audio.muted = false;		
      soundBtn.src = 'img/sound.png';	
   } else {		
      audio.muted = true;		
      soundBtn.src = 'img/mute.png';	
   }}
soundBtn.addEventListener('click', mute)


const rng = document.getElementById('range');
   function moveSound() {
      audio.volume = rng.value / 100;
   }
rng.addEventListener('mousemove', moveSound)













