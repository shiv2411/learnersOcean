//create a toggle function that will accept a list of argument and toggle each of them when invoked in a cycle.

//eg const onOff = toggle('on','off');
// onOff() -- O/P - 'on'
// onOff() -- O/P - 'off'
// onOff() -- O/P - 'on' 
//.. and so on


// We use a closure to maintain state by storing the current index in a local variable,
//  ensuring it persists across multiple calls to the returned function.


function toggle(...args){
    let current = 0;
    let length = args.length;
    return function(){
        if(current === length){
            current = 0;
        }
        return args[current++];
    }
}


 const onOff = toggle('on','off','neutral');
 console.log(onOff()) 
 console.log(onOff()) 
 console.log(onOff()) 
 console.log(onOff()) 
 console.log(onOff()) 
 console.log(onOff()) 
 console.log(onOff()) 

 const hello = toggle();
 toggle()
 

