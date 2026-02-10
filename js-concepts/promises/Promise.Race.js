myRace = (promises) => {
    return new Promise((resolve,reject)=>{
        promises.forEach(promise => {
            Promise.resolve(promise).then(val => resolve(val)).catch(err => reject(err));
        })
    })
}


//test case
const p1 = new Promise((resolve,reject) => {
    setTimeout(()=>reject('one'),500);
})

const p2 = new Promise((resolve,reject) => {
    setTimeout(()=>reject('two'),1000);
})

const p3 = new Promise((resolve,reject) => {
    setTimeout(()=>resolve('three'),50);
})


myRace([p1,p2,p3]).then(val => console.log(val)).catch(err => console.log(err));
