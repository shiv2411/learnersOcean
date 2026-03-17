
// it is basically combination of async series and async parallel. Here the expectation will be same as async map but with the 
// limit that how many operations are resolved at a time. The final promise resolve only after every input finished processeing here as well.


/// First we will implement a chop array function which will chop the array into subarrays of the given limit.


Array.prototype.chop = function (size) {
    const arr = [...this];
    if(!size){
        return arr;
    }
    let output = [];
    let i=0;
    while(i<arr.length){
        output.push(arr.slice(i,i+size));
        i = i+size;
    }
    return output;
}



//test the chop function 
// const arr = [2,3,4,12,5];

// let ans = arr.chop(3);  //op [[2,3,4],[12,5]]
// console.log(ans);


// Next subarray will execute only after the current subarray is done.
// accumualte all the result of each subarray and resolve the promise with this
// if any error then reject.

function mapLimit(arr,limit,iteratee){
    return new Promise((resolve,reject) => {
        let batchItems = arr.chop(limit);  // [[2,3,4],[12,5]]
        let allResults = [];
        let index = 0;
        function processBatchItems() {
            if(index>=batchItems.length){
                resolve(allResults);
                return;
            }
            const currentBatch = batchItems[index];
            let results = [];
            let completed = 0;
            currentBatch.forEach((item,j) => {
                iteratee(item,(err,ans) => {
                    if(err){
                        reject(err);
                    } else {
                        results[j] = ans;
                        completed++;
                        if(completed == currentBatch.length){
                            allResults = allResults.concat(results);
                            console.log(`Batch ${index + 1} finished:`, results);
                            index++;
                            processBatchItems();
                        }
                    }
                })
            })
        }
        processBatchItems();
    })
}

function asyncDouble(n, cb) {
    setTimeout(() => cb(null, n * 2), 1000);
}

const arr = [1, 2, 3, 4, 5, 6, 7];

mapLimit(arr, 3, asyncDouble)
    .then(console.log) // [2,4,6,8,10,12,14]
    .catch(console.error);

