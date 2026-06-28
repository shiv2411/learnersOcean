import { useContext } from "react";
import { DropdownContext,DropdownProvider } from "./DropdownContext";
import './Dropdown.css';

const Dropdown = ({children}) => {
return <DropdownProvider>
    <div className="dropdown">{children}</div>
</DropdownProvider>
}

const DropdownToggle = ({children}) => {
    const {isOpen,toggleDropdown} = useContext(DropdownContext);
    return (
        <div className="dropdown-toggle" onClick={toggleDropdown}>{children}
         <span className="dropdown-arrow">{isOpen ? "▲" : "▼"}</span>
         </div>
    )
}

const DropdownMenu = ({children}) => {
    const {isOpen} = useContext(DropdownContext);
    console.log(isOpen);
    return isOpen && <div className="dropdown-menu">{children}</div>
}


Dropdown.Toggle = DropdownToggle;
Dropdown.Menu = DropdownMenu;
export default Dropdown;