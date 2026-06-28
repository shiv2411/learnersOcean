import React, { useContext } from "react";
import { CompoundContext } from "./CompoundContext";

const Child2Component = () => {
    const {setValue} = useContext(CompoundContext);
    return (<>
    <h1>Child component B</h1>
    <button onClick ={ () => setValue('updated context')}>Update value</button>
    </>)

}


export default Child2Component;