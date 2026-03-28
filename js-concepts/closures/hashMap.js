class Store {
    list = {};
    set(key, value) {
        this.list[key] = value;
    }
    get(key) {
        return this.list[key];
    }
    has(key) {
        return this.list.hasOwnProperty(key);
    }
}


const store = new Store();
store.set('a', 10);
store.set('b', 20);

let a = store.get('a') //o-p-10
let isExist = store.has('c')//o-p - false

console.log(a);
console.log(isExist);
console.log(store);
