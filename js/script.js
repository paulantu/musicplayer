const musicContainer = document.querySelector('.music-container');
const playButton = document.querySelector('#play');
const previousButton = document.querySelector('#prev');
const nextButton = document.querySelector('#next');
const audio = document.querySelector('#song');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');
const currentTime = document.querySelector('#currTime');
const durationTime = document.querySelector('#durTime');



const songs = ['katha_dao', 'ke_diyechhe_bish', 'maa', 'monta_re', 'sajna_barse'];

const list  = document.getElementById('play-list');
 
window.onload = () => {
  list.innerHTML = songs.map(i => '<li>' + i + '</li>').join('');
  pauseSong();
};

let songIndex = 4;

loadSong(songs[songIndex]);



function loadSong(song){
    title.innerText = song;
    audio.src = 'music/' + song + '.mp3';
    cover.src = 'image/' + song + '.jpg';
}



function playSong(){
    musicContainer.classList.add('play');
    playButton.querySelector('i.fas').classList.remove('fa-play');
    playButton.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}



function pauseSong(){
    musicContainer.classList.remove('play');
    playButton.querySelector('i.fas').classList.add('fa-play');
    playButton.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();
}


function previousSong(){
    songIndex--;

    if(songIndex < 0){
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);

    playSong();
}


function nextSong(){
    songIndex++;

    if(songIndex > songs.length - 1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);

    playSong();
}

function updateStatus(e){
    const {duration, currentTime} = e.srcElement;
    const statuspercent =(currentTime / duration) * 100;

    progress.style.width = statuspercent + '%';
}

function setProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;


    audio.currentTime = (clickX / width) *duration;
}



function durTime(e){
    const {duration,currentTime} = e.srcElement;
    var sec;
    var sec_id;


    let min = (currentTime == null) ? 0 : Math.floor(currentTime/60);
    min = min < 10 ? '0' + min:min;


    function get_second (x){
        if(Math.floor(x) >= 60){
            for(var i = 1; i <= 60; i++){
                if(Math.floor(x) >= (60*i) && Math.floor(x)< (60 * (i+1))){
                    sec = Math.floor(x) - (60*i);
                    sec = sec < 10 ? '0' + sec:sec;
                }
            }
        }else{
            sec = Math.floor(x);
            sec =sec < 10 ? '0' + sec:sec;
        }
    }


    get_second(currentTime, sec);

    currentTime.innerHTML = min + ':' + sec;

    let min_d = (isNaN(duration) === true) ? '0' : Math.floor(duration/60);

    min_d = min_d < 10 ? '0' + min_d : min_d;



    function get_second_d(x){
        if(Math.floor(x) >= 60){
            for(var i = 1; i <= 60; i++){
                if(Math.floor(x) >= (60 * i) && Math.floor(x) < (60 * (i + 1))){
                    sec_d = Math.floor(x) - (60 * i);
                    sec_d = sec_d < 10 ? '0' + sec_d : sec_d;
                }
            }
        }else{
            sec_d = (isNaN(duration) === true) ? '0' : Math.floor(x);
            sec_d = sec_d < 10 ? '0' + sec_d:sec_d;
        }
    }

    get_second_d(duration);


    duration.innerHTML = min_d + ':' + sec_d;
}


// play & pause songs
playButton.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if(isPlaying){
        pauseSong();
    }else{
        playSong();
    }
});


previousButton.addEventListener('click', previousSong);
nextButton.addEventListener('click', nextSong);



audio.addEventListener('timeupdate', updateStatus);


progressContainer.addEventListener('click', setProgressBar);


audio.addEventListener('ended', nextSong);


audio.addEventListener('timeupdate', durTime);