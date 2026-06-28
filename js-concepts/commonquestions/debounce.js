function debounce(fn,delay){
    let timerId;
    return function(...args){
        clearTimeout(timerId);    
        timerId = setTimeout(()=>{
            return fn(...args);
        },delay)
    }

}

const el = document.getElementById('textField');

const debouncedSearch = debounce(searchName,1000);

el.addEventListener('keyup',(e)=>{
    debouncedSearchLeading(e.target.value);
})



function searchName(val){
    console.log(val);
}


// leading and trailing debounce--- first call will be immediate after that as normal till delay ends. then again continue same. 

function leadingDebounce(fn,delay,leading=false,trailing=false){
    let timerId;
    return function(...args){
        const callImmediate = !timerId && leading;
        clearTimeout(timerId);    
        timerId = setTimeout(()=>{
            timerId = null; //for immediate mode so that when timer expires it gets null otherwise after first call, leading will not work;
             if(trailing && !callImmediate){
             return fn(...args);
             }
        },delay)
        if(callImmediate){
            fn(...args);
        }
    }
}

const debouncedSearchLeading = leadingDebounce(searchName,1000,true,true);
