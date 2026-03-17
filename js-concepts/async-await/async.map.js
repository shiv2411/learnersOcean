// will take an input array as input and an iterator function which will takes current input and a callback function.
//  The callback fn will contain two arguments first error and second result. if at any time during processing of input 
// error occurs then error will be truthy , the result will be truthy only if error will be null.


function mapSeries(arr,iteratee) {
    return new Promise((resolve,reject) => {
    let result = [];
    let index = 0;
    function processNext(){
        if (index < arr.length) {
            iteratee(arr[index], ((err, ans) => {
                if (err) {
                    reject(err);
                } else {
                    result.push(ans);
                    index++;
                    processNext();
                }
            }))
        } else {
            resolve(result);
        }
    }
    processNext()
    })
}


let numPromise = mapSeries([1, 2, 3, 4, 5], function (num, callback) {
  setTimeout(function () {
    num = num * 2;
    console.log(num);

    // throw error
    if(num === 6){
      callback(true);
    }else{
      callback(null, num);
    }

  }, 2000);
});

numPromise
  .then((result) => console.log("success:" + result))
  .catch(() => console.log("no success"));

