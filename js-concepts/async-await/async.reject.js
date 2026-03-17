// implement just the opposite of async filter.


function asyncReject(arr,iteratee) {
    return new Promise((resolve,reject) => {
       let result = [];
       let track = 0;
       arr.forEach((val,index) => {
         iteratee(val,(err,res)=>{
            if(err){
                reject('Not valid inputs');
                return;
            }
            if(!res){
                result[index] = val;
            }
            track++;
            if(track>=arr.length){
                resolve(result.filter(Boolean))
            }
         })
       })
    })
}



const numPromises = asyncReject([1, 2, 2, 4, 7], function (num, callback) {
    setTimeout(() => {
        num = num * 2;
        console.log(num);

        //throw error
        if (num === 6) {
            callback(true);
        } else {
            callback(null, num != 4);
        }
    }, 1000)

})

numPromises.then(val => console.log(`results:${val}`)).catch(err => console.log(err));

