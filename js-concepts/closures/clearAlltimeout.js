// we have to clear all the active settimeouts using clearAllTimeout function.


// we have to store all the timerids somewhere and then pass them in clearalltimeout function.

let timeOutIds = [];

//we have to override the settimeout function to push timerid in timeOutIds

let originalSetTimeout = globalThis.setTimeout;
globalThis.setTimeout = function(fn,delay){
    const id = originalSetTimeout(fn,delay);
    timeOutIds.push(id);
    return id;
}


globalThis.clearAllTimeOut = function(){
    while(timeOutIds.length>0){
        clearTimeout(timeOutIds.pop());
    }
}

setTimeout(() => {console.log("hello")}, 100);
setTimeout(() => {console.log("hello1")}, 300);
setTimeout(() => {console.log("hello2")}, 4000);
setTimeout(() => {console.log("hello3")}, 5000);

setTimeout(() => {
    clearAllTimeOut();
    console.log("cleared");
}, 1000);