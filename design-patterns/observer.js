//Move is the host here which will maintain list of observers , subscribe/unscubsribe them, and notifies observer when event occurs.
const Move = function() {

    this.observers = [];

    this.subscribe = function(fn){
        this.observers.push(fn);
    }

    this.unsubscribe = function(fn){
        this.observers = this.observers.filter((item)=> item!=fn);
    }

    this.fire = function(event,thisObj){
        const scope = thisObj;
        this.observers.forEach((fn) => fn.call(scope,event));
    }
}






//Input:
// 1st observer
const moveHandler = function (item) {
  console.log("fired: " + item); 
};

// 2nd observer
const moveHandler2 = function (item) {  
  console.log("Moved: " + item);
};

const move = new Move();

// subscribe 1st observer
move.subscribe(moveHandler);
move.fire('event #1');

// unsubscribe 1st observer
move.unsubscribe(moveHandler);
move.fire('event #2');

// subscribe 1st & 2nd observer
move.subscribe(moveHandler);
move.subscribe(moveHandler2);
move.fire('event #3');

Output:
"fired: event #1"

"fired: event #3"

"Moved: event #3"


//coursera interview question
// function Events() {
//   this.subscribe = function (name, callback) {};

//   this.subscribeOnce = function (name, callback) {};

//   this.subscribeOnceAsync = async function (name) {};

//   this.publish = function (name, data) {};

//   this.publishAll = function (data) {};
// }

//subscribe will take the name of an event and assign a callback to it.
// this callback will be invoked when the event is published
// it returns a remove method to unscubsribe the event.


const Events = function(){
  this.subscriptionList = new Map();
  this.subscribe = function(event,cb){
    if(!this.subscriptionList.has(event)){
      this.subscriptionList.set(event,[cb])
    }
    return {
      remove: () => {
        this.subscriptionList
      }
    }
  }
s
  this.publish = function(event,data){
    this.subscriptionList.forEach((callback)=>{
      callback(event,data);
    })
  }
}