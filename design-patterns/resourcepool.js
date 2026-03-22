
class ObjectPool {
    poolArray
    constructor(constructorFunction,resetFunction,initialSize = 1000){
        this.constructorFunction = constructorFunction;
        this.resetFunction = resetFunction;
        this.poolArray = new Array(initialSize).fill(0).map(()=>this.createElement());
    }
createElement(){
    const data = this.resetFunction(this.constructorFunction());
    return new ObjectPoolMember(data);
}
getElement(){
    for(let i=0;i<this.poolArray.length;i++){
        if(this.poolArray[i].available){
            this.poolArray[i].available = false;
            return this.poolArray[i];
        }
    }
}

releaseElement(element) {
 element.available = true;
 this.resetFunction(element.data);
}
}

class ObjectPoolMember {
    constructor(data){
        this.available = true;
        this.data = data;
    }
}

const creatorFunc = ()=>{return {counter:0}}    
const resetFunc = (val)=>{
    val.counter = 0;
    return val;
}

 const objectPool = new ObjectPool(creatorFunc,resetFunc,1);
 const getEl = objectPool.getElement();
 getEl.data.counter = 10;
 getEl.data.counter = 30;
 objectPool.releaseElement(getEl)
 console.log(getEl);
 const getEl2 = objectPool.getElement();
//  getEl2.data.counter = 50;
 console.log(getEl2);

