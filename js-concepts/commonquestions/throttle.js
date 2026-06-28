function throttle(fn,delay){
    let lastTime = 0;
    return function(...args){
        let now = Date.now();
        if(now-lastTime>=delay){
            fn.apply(this,args);
             lastTime = now;
        }
    }
}

// Function to be throttled
function printMessage() {
    console.log("Function executed at", new Date().toLocaleTimeString());
}

// Create throttled version
const throttledPrint = throttle(printMessage, 1000);

// Call it repeatedly
setInterval(throttledPrint, 200);