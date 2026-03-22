const formEl = document.querySelector('.form');
//const toastEl = document.getElementById('toast');
const horizontalEl = document.getElementById('horizontalPosition');
const verticalEl = document.getElementById('verticalPosition');

const toastLeftTop = document.querySelector('.left-top');
const toastLeftBottom = document.querySelector('.left-bottom');
const toastRightTop = document.querySelector('.right-top');
const toastRightBottom = document.querySelector('.right-bottom');

formEl.addEventListener('submit',(e)=>{
    e.preventDefault();
    createToast('This is a toast bar !!')
})

function createToast(message){
    let horizontalPosition = horizontalEl.value;
    console.log(horizontalPosition);
    let verticalPosition = verticalEl.value;
    console.log(verticalPosition);
    const toast = document.createElement('div');
    toast.classList.add('toast');
    if(horizontalPosition === 'left'){
        if(verticalPosition == 'top'){
            toastLeftTop.append(toast);
        }else{
            toastLeftBottom.append(toast);
        }
    }else{
        if(verticalPosition == 'top'){
            toastRightTop.append(toast);
        }else{
            toastRightBottom.append(toast);
        }
    }
    toast.textContent = message;
    // toastEl.appendChild(toast);
    setTimeout(()=>{
        toast.classList.add('show');
    },10)
    setTimeout(()=>{
        toast.classList.remove('show');
        toast.remove();
    },3000);
}