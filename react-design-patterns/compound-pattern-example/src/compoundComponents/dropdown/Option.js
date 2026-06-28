import { useContext } from "react";
import { DropdownContext } from "./DropdownContext";


const Option = ({children,value}) => {
    const {selectOption} = useContext(DropdownContext);
    return (
        <div className="dropdown-option" onClick={(e) => selectOption(e,value)}>
             {" "}
            {children}</div>
    )
}

export default Option;