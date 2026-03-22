class Circle{
    constructor(size){
        this.radius = size;
    }

    draw(){
        console.log(`Drawing a circle with radius ${this.radius}`);
    }
}

class Square{
    constructor(size){
        this.side = size;
    }
    draw(){
        console.log(`Drawing a square of side ${this.side}`);
    }
}


class ShapeFactory {
    createShape(shape,size){
        switch(shape){
            case 'circle':
                return new Circle(size);
            case 'square':
                return new Square(size);
            default :
                throw new Error('Shape not recognized');    
        }
    }
}

const shapeFactory = new ShapeFactory();
let circle = shapeFactory.createShape('circle',4);
circle.draw();
let square = shapeFactory.createShape('square',7);
square.draw();