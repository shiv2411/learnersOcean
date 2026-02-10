// Promise.any works just opposite of promise.all. It takes array of promises as returns a resolved promise in case any of the promise is resolved and return the reject array of agregate errors promises in case all of the promises rejected.


const myAny = (promises) => {
    let rejectedPromises = new Array();
    let counter = 0;
    return new Promise((resolve, reject) => {
        promises.forEach((promise, index) => {
            Promise.resolve(promise).then(val => {
                resolve(val);
            }).catch(err => {
                rejectedPromises[index] = err;
                counter++;
                if(counter == promises.length){
                    reject(new AggregateError(rejectedPromises));
                }
            })
        })
    })
}


//test case
const p1 = new Promise((resolve,reject) => {
    setTimeout(()=>reject('one'),500);
})

const p2 = new Promise((resolve,reject) => {
    setTimeout(()=>reject('two'),100);
})

const p3 = new Promise((resolve,reject) => {
    setTimeout(()=>reject('three'),5000);
})

myAny([p1,p2,p3]).then(val => console.log(val)).catch(err => console.log(err));