const img1 = './images/1.jpg';
const img2 = './images/2.jpg';
const img3 = './images/3.jpg';
const img4 = './images/4.jpg';
const img5 = './images/5.jpg';

export default class Carousel {
    images = [img1, img2, img3, img4, img5];
    backArrowEl = document.getElementById('backArrow');
    fwdArrowEl = document.getElementById('fwdArrow');
    autoplayEl = document.getElementById('autoplay');

    constructor(){
        console.log(this.images);
        const imageEl = document.getElementById('carouselImage');
        let currentIndex = 0;
        imageEl.src = this.images[currentIndex];
        this.backArrowEl.disabled = true;
        this.backArrowEl.addEventListener('click',(e) => {
            this.fwdArrowEl.disabled = false;
            if(currentIndex>0){
                currentIndex -= 1;
                if (currentIndex === 0) {
                    this.backArrowEl.disabled = true;
                }
                imageEl.src = this.images[currentIndex];
            }else {
                // currentIndex = this.images.length-1;
                // imageEl.src = this.images[currentIndex];
            }
        })
        this.fwdArrowEl.addEventListener('click',(e) => {
            this.backArrowEl.disabled = false;
            if(currentIndex<this.images.length-1){
                currentIndex +=1;
                if (currentIndex == this.images.length - 1){
                    this.fwdArrowEl.disabled = true;
                }
                imageEl.src = this.images[currentIndex];
            }else{
                // currentIndex = 0;
                // imageEl.src = this.images[currentIndex];
            }
        })
        let intervalId;
        this.autoplayEl.addEventListener('change', (e) => {
            let checked = e.target.checked;
            if(checked){
                intervalId = setInterval(() => {
                currentIndex += 1;
                if (currentIndex == this.images.length) {
                    currentIndex = 0
                }
                imageEl.src = this.images[currentIndex];
            }, 1000);
            } else {
                clearInterval(intervalId);
            }


        })
    }
}

const c1 = new Carousel();
console.log(c1);
