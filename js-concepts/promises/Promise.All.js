//Promise.All takes array of promises as an input and returns a promise which contains array of values in case all of the promise gets resolved
// or gets rejected in case any of the promise get rejected.


// Implementation of Promise.All

const MyAll = (promises) => {
    let resolvedVal = [];
    let resolvedCount = 0;
    return new Promise((resolve,reject) => {
        promises.forEach((promise,index) => {
            Promise.resolve(promise).then(val => {
                resolvedVal[index] = val;
                resolvedCount +=1;
                if (resolvedCount === promises.length) {
                    return resolve(resolvedVal);
        }
            }).catch(err => {
                return reject(err);
            });
        })
    })
}


const prom3 = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve('resolve last')
    },2000);
})
const prom2 = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve('resolve second')
    },1000);
})
const prom1 = 'normal text,resolved immediately'
// const p2 = Promise.reject('promise is rejected');
// const p3 = Promise.resolve(30);
const promises = [prom1,prom2,prom3];

MyAll(promises).then(val => console.log(val)).catch(err => console.log(err));
