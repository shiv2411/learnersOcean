function sampler(fn,count){
    let counter = 0;
    return function(...args){
        counter++;
        if(counter === count){
            counter = 0;
            return fn(...args);
        }
    }

}



const sample = sampler(message,2);
sample('shivam');
sample('rahul');
sample('raju');
sample('david');
sample('bob');
sample('maria');
sample('tom');
sample('aria');



function message(name){
    console.log('hi',name);
}