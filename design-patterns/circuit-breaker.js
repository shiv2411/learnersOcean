//atlassian frontend interview 

// circuit breaker works as a design pattern which prevents cascadinf failures. Imagine making
// an api call that kept failing again and again, then rather than bombarding on sever we 
// can halt. the request sending for a certain amout of time after certain amount of count exceeded.

const circuitBreaker = function (haltTime,failureCount,fn){
    let failures = 0;
    let lastFailureTime = 0;
    let halt = false;
    return function(...args){
        if(halt === true){
            let diff = Date.now() - lastFailureTime;
            if(diff > haltTime){
                halt = false
            }else{
                console.log('service unavaialble');
                return;
            }
        }
    try{
        const result = fn();
        failureCount = 0;
        return result;
    } catch(err){
        failures++;
        lastFailureTime = Date.now();
        if(failureCount == failures){
            halt = true;
        }
        console.log(err);
    }
    }
}

const test = function(){
    fetch('https://ddcmsdfds.com');
}


circuitBreaker(10,3,test);

const testFunction = () => {
  let count = 0;
  
  return function(){
    count++;
    if(count < 4){
      throw "failed";
    }else{
      return "hello";
    }
  }
};

let t = testFunction();
let c = circuitBreaker(200,3,t);
c();
c();
c();
c();
c();
c();