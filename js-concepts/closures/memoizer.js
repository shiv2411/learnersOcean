//memoizer function will memoize the result for the given input so that in case of repeated calls for same input the result will be faster
//  otherwise it will take time everytime doing execution of the expensive function. Ideal for the expensive functions.

//expensive function fiibonacci
function fib(n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}

function memoizer(expensiveFunction){
    let cache = new Map();
    return function(...args){
        const key = JSON.stringify(...args);
        if(cache.has(key)){
            return cache.get(key);
        } else {
            const value = expensiveFunction(...args);
            cache.set(key,value);
            return value
        }
    }
}

const result = memoizer(fib);
console.time();
console.log(result(40));
console.timeEnd();
console.time();
console.log(result(45));
console.timeEnd();
console.time();
console.log(result(45));
console.timeEnd();

