//payment.addAmount(100).addAmount(200).addAmount(400).pay();
//o/p --- 500$. 



class Payment {
    constructor(currency = '',amount=0){
        this.currency = currency;
        this.amount = amount;
    }
addAmount(amount){
    this.amount += amount;
    return this;
}

addCurrency(currency){
    this.currency = currency;
    return this;
}

pay(){
    console.log(`${this.currency} ${this.amount}`);
}

}


const p1 = new Payment();
p1.addAmount(100).addAmount(200).addAmount(300).addCurrency('€').pay();



//Problem
// //Input:
// computeAmount().lacs(15).crore(5).crore(2).lacs(20).thousand(45).crore(7).value();

// Output:
// 143545000


function ComputeAmount(){
    this.finalAmount = 0;
}

ComputeAmount.prototype.lacs = function (val) {
    this.finalAmount += val * 100000;
    return this;
}
ComputeAmount.prototype.crore = function (val) {
    this.finalAmount += val * 10000000;
    return this;
}

ComputeAmount.prototype.thousand = function (val) {
    this.finalAmount += val * 1000;
    return this;
}

ComputeAmount.prototype.value = function () {
    console.log(this.finalAmount);
}
const computeAmount = new ComputeAmount();

computeAmount.lacs(15).crore(5).crore(2).lacs(20).thousand(45).crore(7).value();

