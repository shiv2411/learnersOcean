//dependent async tasks

// consider we have multiple async tasks like for eg A, B, C , D, E (more may be). and here A, B are independent tasks while C is dependent on B,
// D is dependent on A and C while E is dependent on D. So A and B will be invoked immediately , C will be invoked once B is executed and then
// D will be invoked as A and C are already executed and after D exection E will be invoked. 

//implementation approach-
//create a class that will take input the dependencies aray and the callback function. 
// If the dependencies in the arrays are completed then filter them out as they no longer needed to run them.
// If there is no dependencies, then invoke the callback directly.
// If the dependencies are pending, push them in a list, execute them one by one and once all are completed, execute the callback.


class Task {
    constructor(dependencies = [],task){

        //filter out dependencies straightaway if completed as they are already executed.
        this.dependencies = dependencies ? dependencies.filter((val)=> !val.isCompleted) : [];
        //callback
        this.task = task;
        //state for the current task initially false
        this.isCompleted = false;
        this.processTask();
        this.trackDependencyCount = this.dependencies.length;
        this.subscriberDependencies = []; // dependencies list callback to store here and execute in sequence

    }

    processTask(){
        if(this.dependencies.length === 0){
            this.task(this.done.bind(this));
        } else {
            //execute the dependencies one by one and once completed execute the callback
            for(let dependency of this.dependencies)
               dependency.subscribe(this.trackDependency.bind(this));
            }
        }

     
    trackDependency(){
        this.trackDependencyCount--;
        if(this.trackDependencyCount ===0){
            this.task(this.done.bind(this));
        }
    }    

      

     subscribe(cb){
        this.subscriberDependencies.push(cb);
     }   




    // mark the task completed 
    done(){
        this.isCompleted = true;
        console.log(this.subscriberDependencies);
        for(const callback of this.subscriberDependencies){
            callback();
        }
    }
}






//test case
 const taskA = new Task(null,(done)=>{
    setTimeout(()=>{
        console.log('Task A done');
        done();
    },500)
 })

const taskB = new Task(null,(done) => {
    setTimeout(()=>{
        console.log('Task B done');
        done();
    },1000)
})

const taskC = new Task([taskB],(done) => {
    setTimeout(()=>{
        console.log('Task C done');
        done();
    },750)
})

const taskD = new Task([taskA,taskC],(done)=>{
    setTimeout(()=>{
        console.log('Task D done');
        done();
    },2000);
})

const taskE = new Task([taskA],(done)=>{
    setTimeout(()=>{
        console.log('Task E done');
        done();
    },100);
})


const createAllDoneInstance = new Task([taskA,taskB,taskC,taskD,taskE],(done)=>{
    console.log('ALL DONE');
    done();
})
