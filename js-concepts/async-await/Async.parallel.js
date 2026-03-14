// the function will take input the series of async functions and a callback function, and execute them at once and when all the async
// functions are completed then the callback function will be executed.

// Input - asyncParallel([asyncTask(3),asyncTask(1),asyncTask(2)],(result) => console.log(result));

//op - [2,1,3];

function asyncParallel(asyncTasks,callback) {
    let results = [];
    let tasksCompleted = 0;
    asyncTasks.forEach(asyncTask => {
        //invoking the asyncTasks
        asyncTask(val => {
            results.push(val);
            tasksCompleted++;
            if(tasksCompleted >= asyncTasks.length){
            callback(results);
            }
        })
    })
}

function asyncTask(val){
    //const val = Math.floor(Math.random() *10);
    return function(callback){
        setTimeout(()=>callback(val),val*100)
    }
}

const tasks = [asyncTask(10),asyncTask(3),asyncTask(5),asyncTask(6)]
const fn = (res) => console.log(res);
asyncParallel(tasks,fn)
