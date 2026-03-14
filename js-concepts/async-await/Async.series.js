//input - [asyncTask(3),asyncTask(1),asyncTask(2)]

//op - 3 1 2

// expectation is the next async function is only executed after the previous one is completed.


async function asyncSeries(inputTasks) {
    for(let task of inputTasks){
       const result =  await task();
       console.log(result);
    }
}

function asyncTask(val) {
 return new Promise((resolve,reject) => {
    setTimeout(()=>resolve(`Completing ${val}`),100*val)
 })
}

const asyncTasks = [() => asyncTask(5),() => asyncTask(2),() => asyncTask(1),() => asyncTask(3),() => asyncTask(10),() =>asyncTask(7)];

//asyncSeries(asyncTasks);


/// using recursion 


function asyncSeriesByRecursion(inputTasks) {
    let firstTask = inputTasks.shift();
    firstTask.then(val => {
        console.log(val);
         if(inputTasks.length >0){
        asyncSeriesByRecursion(inputTasks);
    }
    })
}


const asyncTasksRecursion = [asyncTask(5),asyncTask(2),asyncTask(1),asyncTask(3),asyncTask(10),asyncTask(7)];
asyncSeriesByRecursion(asyncTasksRecursion);