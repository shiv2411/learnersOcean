//target
class PaymentGateway {
    makePayment(amount) {
        throw new Error('This method should be overridden!');
    }
}


//adaptee
class OldPaymentGateway {
    processPayment(amount) {
        console.log(`The payment of ${amount} has been processed through old payment system`);
    }
}

//adapter
class PaymentAdapter extends PaymentGateway {
    constructor(oldPaymentGateway){
        super();
        this.oldPaymentGateway = oldPaymentGateway;
    }

    makePayment(amount){
        this.oldPaymentGateway.processPayment(amount);
    }
}


///client
const oldPaymentGateway = new OldPaymentGateway();
const paymentAdapter = new PaymentAdapter(oldPaymentGateway);
paymentAdapter.makePayment(100);



///need to adapt my media player to play old mp3/mp4/avi files

//target interface
class mediaPlayer {
    play(fileName,fileType){
        throw new Error('The method should be overridden!');
    }
}

//old mp3 Adaptee class
class mp3 {
    playMp3(fileName){
        console.log(`Mp3 file played: ${fileName}`);
    }
}

class mp4 {
    playMp4(fileName) {
        console.log(`Mp4 file played:, ${fileName}`);
    }
}

class avi {
    playAvi(fileName) {
        console.log(`AVI file played, ${fileName}`)
    }
}

class MediaAdapter extends mediaPlayer {
    constructor(fileType){
        super();
        this.fileType = fileType;
        if(fileType === 'mp3'){
            this.mediaPlayer = new mp3();
        } else if(fileType === 'mp4'){
            this.mediaPlayer = new mp4();
        } else {
            this.mediaPlayer = new avi();
        }
    }
    play(fileName, fileType) {
        if (fileType === 'mp3') {
            this.mediaPlayer.playMp3(fileName);
        } else if (fileType === 'mp4') {
            this.mediaPlayer.playMp4(fileName);
        } else if (fileType === "avi") {
            this.mediaPlayer.playAvi(fileName);
        } else {
            console.log(`Unsupported file type: ${fileType}`);
        }
    }
}

const audioPlayer = new MediaAdapter("mp3");
audioPlayer.play("song.mp3", "mp3");
const videoPlayerMp4 = new MediaAdapter("mp4");
videoPlayerMp4.play("video.mp4", "mp4");
const videoPlayerAvi = new MediaAdapter("avi");
videoPlayerAvi.play("movie.avi", "avi");
const videoPlayerAviCorrupt = new MediaAdapter("avi");
videoPlayerAvi.play("movie.avi", "avi44");