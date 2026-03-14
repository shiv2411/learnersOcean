function retry(func,retries,delay,finalError) {
 return new Promise((resolve,reject) => {
    return func().then(resolve).catch((err)=>{
        if(retries>0){
            console.log(err.message);
            return wait(delay).then(()=>{
            return retry(func,retries-1,delay,finalError).then(resolve).catch(reject);
            })
        }
        return reject(finalError);
    })
 })
}

function wait(delay){
    return new Promise((resolve)=>{setTimeout(()=>resolve(),delay)});
}


const getTestFunction = () => {
    let counter = 0;
    return async () => {
        counter ++;
        if(counter>5){
            console.log('success');
        }else {
            throw new Error('Retrying');
        }
    }
}

//retry(getTestFunction(),7,1000,'API downtime').then(val => console.log(val)).catch(err=>console.log(err));



/// using async await- much simpler


async function retryWithAsync(func,retries,delay,finalError){
    try {
        return await func();
    }catch(err){
        if(retries>0){
            console.log(err.message);
            await wait(delay);
            return retryWithAsync(func,retries-1,delay,finalError);
        } else {
            throw finalError;
        }
    }
}

retryWithAsync(getTestFunction(),3,1000,'API downtime').then(val => console.log(val)).catch(err=>console.log(err));