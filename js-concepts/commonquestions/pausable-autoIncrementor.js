const timer = (initialValue,step) => {
    let val = initialValue;
    let intervalId;
    function startTimer() {
        if(intervalId) return;  //prevents multiple timers
        intervalId = setInterval(()=>{
            val +=step;
            console.log(val);
        },1000)
    }
    function stopTimer(){
        clearInterval(intervalId);
         intervalId = null;
    }
    return {startTimer,stopTimer}
}












const timerObj = timer(10,5)  //first argument is initial value and second is the step with which autoincrements


// the timer will increase by step value every second when starts.
timerObj.startTimer();


//lets say we have to stop it after 10 second

setTimeout(()=>{
    timerObj.stopTimer()
},10000);

// op - 10,15,20,25,30,35,40,45,50,55,60

setTimeout(() => {
    timerObj.startTimer(); // resumes from 60 → 65 → 70...
}, 20000);
