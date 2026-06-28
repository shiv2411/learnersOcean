// promise.allsettled returns only when all the promises gets settled (wther resolved or rejects not matters.)


const myAllSettled = function (promises) {
    let allSettled = [];
    let count = 0;
    return new Promise((res,rej)=>{
        promises.forEach((promise,index)=>{
            Promise.resolve(promise).then((val) => {
                 allSettled[index] = {status:'fulfilled',val:val};
                 return count++;
            }).catch(err => {
                allSettled[index] = {status:'rejected',err:err};
                return count++;
            }).finally(()=>{
                if(count === promises.length)
                res(allSettled);
            })
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
        reject('resolve second')
    },1000);
})
const prom1 = 'normal text,resolved immediately'
// const p2 = Promise.reject('promise is rejected');
// const p3 = Promise.resolve(30);
const promises = [prom1,prom2,prom3];

myAllSettled(promises).then(val => console.log(val)).catch(err => console.log(err));
