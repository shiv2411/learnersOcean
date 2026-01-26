function Iterator(collection) {
    let i= 0;
    return {
        next(){
            if(i<collection.length){
                return {value:collection[i++],done:false}
            } 
            return {value:null,done:true};
        }
    }
}

const arr = [2,3,4,3];
const iterator = Iterator(arr);
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

// const obj = {name:'shivam',age:31,skills:'frontend'};
// const objIterator = Iterator(obj);
// console.log(objIterator.next())


// creating iterator using generator function

function* Gen(){
   yield* [{name:'ad',age:2},{name:'df',age:21}]
}

const g = Gen();
console.log(g.next());
console.log(g.next());
console.log(g.next());


//creating iterator using Symbol.Iterator

const obj = {};
obj[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
}


console.log([...obj]); /// using spread ooperator.

for(let val of obj){   //using forof loop
    console.log(val);
}



//Eg --- round robin 

function* roundRobin(collection) {
    let current = 0;
    while(true){
       const reset = yield collection[(current++) % collection.length]; 
       console.log(reset);
       if(reset){
        current = 0;
       }
    }
}

const arr1 = [2,3,4];
const rr = roundRobin(arr1);
console.log(rr.next());
console.log(rr.next());
console.log(rr.next());
console.log(rr.next());
console.log(rr.next());
console.log(rr.next(true));
console.log(rr.next());
console.log(rr.next());
console.log(rr.next(true));
