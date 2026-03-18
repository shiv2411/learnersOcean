// function which will take promises with the status and priority. It will return the promise with the highest prioirty in resolve state.
// in case the promise with highest prioirty is rejected , it will not reject instead it will fallback to the next priortity item in resolved state.
// in case of multiple resolved promises, it will return highest prioirty promise.
// in case of all the promise rejected, it return the reject promise with an error message.


function promiseWithPriority(promises){
    promises.sort((a,b) => a.priority - b.priority);
    let resolvedPromises = [];
    let rejectedPromises = [];
    let completedCount = 0;
    return new Promise((resolve,reject) => {
        promises.forEach(({task,priority},i) =>{
            task.then((val) => {
                resolvedPromises.push({val,priority:priority});
            }).catch((err)=>{
                rejectedPromises.push({err,priority:priority});
                if(rejectedPromises.length === promises.length){
                    console.log(rejectedPromises,promises);
                   reject('No priority promise in resolved state');
                }
            }).finally(()=>{
                completedCount++;
                if (completedCount === promises.length) {
                    if (resolvedPromises.length > 0) {
                        resolvedPromises.sort((a, b) => a.priority - b.priority);
                        resolve(resolvedPromises[0]);
                    } else {
                        reject('No promise in resolved state');
                    }
                }
                
            })
        })

        })

}

// the above solution works perfectly but issue is it waits for everything to be completed . so we can go for an optimized solution where 
// the promise with most prioirty will immediately be resolved without waiting for the other promises.

function optimizedPromiseWithPriority(promises){
    promises.sort((a,b) => a.priority - b.priority);
    let resolvedPromises = {};
    let rejectedPromises = {};
    let currentHighestPriorityIndex = 0;
    return new Promise((resolve,reject) => {
        promises.forEach(({task},index) => {
            task.then(val=>{
                resolvedPromises[index] = val;
                // return the resolvedPromise straight forward if the currentIndex is highest priority
                if(resolvedPromises[currentHighestPriorityIndex]!==undefined){
                    resolve(resolvedPromises[currentHighestPriorityIndex]);
                }
            }).catch(err => {
                rejectedPromises[index] = err;
                //move the pointer to next prioirty if failed
                while(rejectedPromises[currentHighestPriorityIndex]){
                    currentHighestPriorityIndex++;
                }
                // if next prioirty item exists here
                if(resolvedPromises[currentHighestPriorityIndex]!==undefined){
                    resolve(resolvedPromises[currentHighestPriorityIndex]);
                }

                if(currentHighestPriorityIndex == promises.length){
                    reject('No promise is in resolved state !!!!!!!!!')
                }
            })
        })
    })
}





const testPromises = [
  {
    // Priority 1: Fails after 100ms
    task: new Promise((resolve, reject) => setTimeout(() => reject("Priority 1 Failed"), 100)),
    priority: 1
  },
  {
    // Priority 2: Succeeds after 300ms (THIS SHOULD BE THE WINNER)
    task: new Promise((resolve) => setTimeout(() => resolve("Priority 2 Succeeded!"), 300)),
    priority: 2
  },
  {
    // Priority 3: Succeeds SUPER FAST after 50ms (Should be ignored because Priority 2 is higher)
    task: new Promise((resolve) => setTimeout(() => resolve("Priority 3 Succeeded!"), 5000)),
    priority: 3
  },
  {
    // Priority 4: Fails after 200ms
    task: new Promise((resolve, reject) => setTimeout(() => reject("Priority 4 Failed"), 200)),
    priority: 4
  }
];

// Assuming your function is called `resolvePromisesWithPriority`
promiseWithPriority(testPromises)
  .then(result => {
    console.log("✅ Success! The winner is:", result); 
    // EXPECTED OUTPUT: "✅ Success! The winner is: Priority 2 Succeeded!"
  })
  .catch(error => {
    console.error("❌ Failed:", error);
  });


  // randomly after some time
function createAsyncTask() {
  const value = Math.floor(Math.random() * 10);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(value < 7){
        reject();
      }else{
        resolve(value);
      }
    }, value * 100);
  });
};

const promises = [
  {task: createAsyncTask(), priority: 1},
  {task: createAsyncTask(), priority: 4},
  {task: createAsyncTask(), priority: 3},
  {task: createAsyncTask(), priority: 2}
];

// Testing it with your function:
promiseWithPriority(promises)
  .then((result) => {
    console.log("Success:", result);
  })
  .catch((error) => {
    console.log("Error:", error);
  });


  optimizedPromiseWithPriority(testPromises)
  .then(result => {
    console.log("✅ Success! The winner is:", result); 
    // EXPECTED OUTPUT: "✅ Success! The winner is: Priority 2 Succeeded!"
  })
  .catch(error => {
    console.error("❌ Failed:", error);
  });
