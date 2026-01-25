export class Singleton {
    static instance;
    static createInstance() {
       const object = new Singleton('new object');
       return object;
    }

    //needed to avoid two different objects creation in case we directly call as 
    // const a = new Singleton() and const b = new Singleton();
    constructor(){
         if(Singleton.instance){
            return Singleton.instance;
        }
        Singleton.instance = this;
    }

    static getInstance() {
        if(!this.instance){
            this.instance = this.createInstance();
        }
        return this.instance;
    }

}

// const obj1 = Singleton.getInstance();
// obj1['name'] = 'Shivam';

const obj1 = Singleton.getInstance();
obj1['name'] = 'sdddd';
const obj2 = Singleton.getInstance();
console.log(obj2);
const a = new Singleton();
const b = new Singleton();
a['name'] = 's';

console.log(b);
// above case we can see that still two objects are getting created . so we have to take care of constructor as well in case getInstance is by passed.