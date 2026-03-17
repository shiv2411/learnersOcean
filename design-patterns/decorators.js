
// Component
class Notification {
    send(message){
        console.log('h')
        console.log(`Sending Notification, ${message}`);
    }
}

//concrete component- to which additional responsibilties can be attached

class BasicNotification extends Notification {
    send(message){
        super.send(message);
    }
}


// Decorator

class NotificationDecorator extends Notification {
    constructor(notification){
        super();
        this.notification = notification;
    }
    send(message){
       this.notification.send(message);
    }
}


// EmailNotification - concrete decorator- adds responsibilities to component

class EmailNotification extends NotificationDecorator {
    send(message){
        console.log('call1')
        super.send(message);
        console.log(`Send email ${message}`);
    }
}

class TextNotification extends NotificationDecorator {
    send(message){
        console.log('call2');
        super.send(message);
        console.log(`Send SMS ${message}`);
    }
}


let notification = new BasicNotification();
notification.send('Basic Hi');
notification = new EmailNotification(notification);
notification = new TextNotification(notification);
notification.send('Hello from the decorator');


//// product decorator with discount and TextNotification

//component
class Product {
    getPrice(){
        return 0;
    }
}

//concrete component
class BasicProduct extends Product{
    constructor(price){
        super();
        this.price = price;
    }
    getPrice(){
        return this.price;
    }
}

//decorator
class ProductDecorator extends Product {
    constructor(product){
     super();
     this.product = product;
    }
    getPrice(){
        return this.product.getPrice();
    }
}

//concrete decorator
class DiscountDecorator extends ProductDecorator {
    constructor(product,discount){
        super(product);
        this.discount = discount;
    }
    getPrice(){
        return this.product.getPrice() * (1-this.discount);
    }
}

class TaxDecorator extends ProductDecorator {
    constructor(product,tax){
        super(product);
        this.tax = tax;
    }
    getPrice() {
        return this.product.getPrice() * (1+this.tax);
    }
}

let product = new BasicProduct(1000);
product = new DiscountDecorator(product,0.3); //30% discount
product = new TaxDecorator(product,0.2);      //20% tax
console.log(product.getPrice());


