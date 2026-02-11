

const STATES = {
    PENDING : 'PENDING',
    FULFILLED : 'FULFILLED',    /// resolve --- PENDING ->> FULFILLED
    REJECTED : 'REJECCTED'      /// reject  --- PENDING ->> REJECTED 
}


class CustomPromise {
    #value = void 0;   /// initial value empty
    #state = STATES.PENDING;   // initial state pending always
    #resolutionHandlers = [];
    #rejectionHandlers = [];    // since there can be multiple .then() for same promise. 

    #runResolutionHandlers(){
        this.#resolutionHandlers.forEach(resolutionHandlers => resolutionHandlers(this.#value));
        this.#resolutionHandlers = [];
    }

    #runRejectionHandlers() {
        this.#rejectionHandlers.forEach(rejectionHandlers => rejectionHandlers(this.#value));
        this.#rejectionHandlers = [];
    }

    constructor(executorFunction) {
        this.resolve = this.#_resolve.bind(this);   // need to bind the currentInstance of class with the resolve and reject methods so that it can be used later.
        this.reject = this.#_reject.bind(this);
        try {
            executorFunction(this.resolve, this.reject);     /// Try catch neeeded to handle the case where executor function gets break like 
        } catch (e) {                                                /// throwing error or something.  
                                                             //EG - // const p = new Promise((resolve,reject) => {
                                                               // //     throw new Error('promise is badly rejected');
                                                               // / })
                                                              // / p.then(val => console.log(val)).catch(err => console.log('in error',err));
            this.reject(e)
        }
    }

    #_resolve(value) {
        queueMicrotask(() => {
            if (this.#state !== STATES.PENDING) {
                return;                                   // once promise resolved/rejected, no further resolve is possible. fulfilled means fullfilled. thats it. 
            }
            this.#value = value;
            this.#state = STATES.FULFILLED;
            this.#runResolutionHandlers();
        })
    }

    #_reject(error) {
        queueMicrotask(() => {
            if (this.#state !== STATES.PENDING) {
                return;                                    // same reason as we did for resolve
            }
            this.#value = error;
            this.#state = STATES.REJECTED;
            this.#runRejectionHandlers();
        })
    }

    // then(resolutionHandler)
    // then(resolutionHandler,rejectionHandler)
    // then(() => new CustomPromise(resolutionHandler)) /// then always return a promise i.e - whatever resolution handler we pass
                                                          // it always gets wrapped by a promise.

    //cases for then
    //then(fn) -- fn resolves then outer promise which is wrapper should resolve with result of fn
    // fn rejects then outer promise should reject with error from fn
    // if no fn outer promise should resolve.                                                      

    then(resolutionHandler,rejectionHandler){
        // if(this.#state === STATES.FULFILLED){
        //     resolutionHandler(this.#value);
        // }
        return new CustomPromise((resolve,reject) => {
            const thenHandler = (result) => { //30
                if(!resolutionHandler){
                    resolve(result);
                }
                try{
                    // then(v => v+1) //31
                    // then (v = return new CustomPromise(r => resolve(v))) // returning a promise
                    const res = resolutionHandler(result);
                    if(res instanceof CustomPromise){ // in case then returning a promise
                        res.then(resolve,reject);
                    } else {    // when value is returned
                        resolve(res);
                    }
                }catch(err){
                    reject(err);
                }
            }
            this.#resolutionHandlers.push(thenHandler);
            const catchHandler = (error) => { //30
                if(!rejectionHandler){
                    reject(error);
                }
                try{
                    const err = rejectionHandler(error);
                    if(err instanceof CustomPromise){ // in case then returning a promise
                        err.then(resolve,reject);
                    } else {    // when value is returned
                        resolve(err);
                    }
                }catch(err){
                    reject(err);
                }
            }
            this.#rejectionHandlers.push(catchHandler);
            if(this.#state === STATES.FULFILLED){
                this.#runResolutionHandlers();
            } else if(this.#state === STATES.REJECTED){
                this.#runRejectionHandlers();
            }
        })
    }

    catch(rejectionHandler){
        return this.then(null,rejectionHandler);
    }

    finally(callback) {
    return this.then(
        value => {
            return CustomPromise.resolve(callback())
                .then(() => value);
        },
        error => {
            return CustomPromise.resolve(callback())
                .then(() => { throw error; });
        }
    );
}

} 

function init() {
    return new CustomPromise((res,rej) => {
                                                 // once a promise is resolved, it should be terminated no more time it can be resolved. so once its status becomes FULFILLED
                                                           // fullfilled it can't be further resolved. so this res(50) must be neglected
        res(20);   //terminate as already resolved                                           
})
    
}

// case - when no resolutionHandler is passed.
//init().then();


// init().then(val => { console.log(val,'d')
//     return val+1;
// },   /// resolutionHandler
// err => console.log(err,'f')).catch(val=>console.log(val)).then(val => console.log(val));              /// rejectionHandler

console.log('a');
init().then(v=>console.log('inside then',v));
console.log('b');

init().then().catch(e => e+1).then(v=>console.log('mmm',v)).finally(()=>console.log('cleanup'));

// const p = new Promise((res,rej) => rej(30));

// p.finally(v=>console.log(v,'first')).then().catch(e => e+1).then(v => console.log('s',v)).catch(err => console.log(err)).finally(v=>console.log(v));

init();



