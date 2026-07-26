console.log('script executing');
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
console.log(firstScriptTag);
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

console.log('script tag inserted');

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
export let player;

setTimeout(() => {
    window.onYouTubeIframeAPIReady = () => {
        console.log('api ready');
        player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: 'EKqelaVoenI',
        playerVars: {
            'playsinline': 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
        });
    }
}, 10000)


// 4. The API will call this function when the video player is ready.
window.onPlayerReady = (event) => {
    console.log('player ready');
    event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
window.onPlayerStateChange = (event) => {
    if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
    }
}

window.stopVideo = () => {
    player.stopVideo();
}