//It will be same like Array.filter to handle the async operations.
// It will contain an array of input and an iteratee function,
// The iteratee function will accept an input and a callback function.
// the callback function will have two arguments , error and result.
// the function will return a promise that resolves the list of inputs which passed the test throught the iteratee function


const numPromises = asyncFilter([1, 2, 7, 3, 6], function (num, callback) {
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

numPromises.then(val => console.log(`results:${val}`)).catch(err => console.log(err,'ggg'));



function asyncFilter(arr, iteratee) {

    return new Promise((resolve, reject) => {
        let result = [];
        let track = 0;
        arr.forEach((val, i) => {
            iteratee(val, (err, res) => {
                if (err) {
                    reject('Filtering not allowed for the given input sets');
                    return;
                } else if (res) {
                    result[i] = val;
                }
                track++;
                if (track >= arr.length) {
                    resolve(result.filter(Boolean));
                }
            })
        })

    })


}



