import React, {useContext} from "react";
import { CompoundContext } from "./CompoundContext";


const Child1Component = () => {
    const {value,setValue} = useContext(CompoundContext);
    console.log(value);
    return (<>
    <h1>Child component A</h1>
    {value}
    </>)

}


export default Child1Component;