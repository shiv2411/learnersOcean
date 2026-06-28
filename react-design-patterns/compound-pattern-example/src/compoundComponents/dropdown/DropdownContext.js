import React, { createContext, useState } from "react";

const DropdownContext = createContext();


const DropdownProvider = ({children}) => {
    const [isOpen,setIsOpen] = useState(false);
    const [selectedOption,setSelectedOption] = useState(null);
    const toggleDropdown = () => {
        setIsOpen((prevState)=> !prevState);
        console.log(isOpen);
    }
    const selectOption = (e,option) => {
       // e.stopPropogation();
        console.log(option)
        setSelectedOption(option);
        //setIsOpen(false);
    }
    return (
        <DropdownContext.Provider value = {{isOpen,selectedOption,toggleDropdown,selectOption}}>{children}</DropdownContext.Provider>
    )
}

export {DropdownContext,DropdownProvider};

