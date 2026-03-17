
// Implementor interface
class OperatingSystem {
    playAudio(){

    }
    playVideo(){

    }
}

// Implements the implementor interface;
class WindowsOS extends OperatingSystem{
    playAudio(){
        console.log('playing audio on windows');
    }

    playVideo(){
        console.log('playing video on windows');
    }
}

class MacOS extends OperatingSystem{
    playAudio(){
        console.log('playing audio on mac');
    }

    playVideo(){
        console.log('playing video on mac');
    }
}


//adapter
class mediaPlayer {
    constructor(os){
        this.os = os
    }
    play(){

    }
}

//adapter refined
class AudioPlayer extends mediaPlayer {
    play(){
        console.log('play audio player');
        this.os.playAudio();
    }
}

class VideoPlayer extends mediaPlayer {
    play(){
        console.log('play video player');
        this.os.playVideo();
    }
}


const windowsOS = new WindowsOS();
const playAudioOnWindows = new AudioPlayer(windowsOS);
playAudioOnWindows.play();
const playVideoOnWindoes = new VideoPlayer(windowsOS);
playVideoOnWindoes.play();
const macOs = new MacOS();
const playAudioOnMac = new AudioPlayer(macOs);
playAudioOnMac.play();
const playVideoOnMac = new VideoPlayer(macOs);
playVideoOnMac.play();