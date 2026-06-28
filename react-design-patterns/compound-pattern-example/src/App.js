import logo from './logo.svg';
import './App.css';
import { CompoundContext } from './CompoundContext';
import { useState,useEffect } from 'react';
import Dropdown from './compoundComponents/dropdown/Dropdown';
import Option from './compoundComponents/dropdown/Option';
function App({children}) {
  const [value,setValue] = useState('default value of context');
  const [countDown,setCountDown] = useState(10);

  useEffect(()=>{
    let timer = setInterval(()=>{
      setCountDown((prev)=>prev>1?prev-1:0);
    },1000)
    return () => clearInterval(timer);
  },[]);

  
  const progressPercent = (countDown/10) *100;
  console.log(progressPercent);
  
  // EG- provider pattern 
  // return (
  //   <CompoundContext.Provider value={{value,setValue}}>
  //     {children}
  //   </CompoundContext.Provider>
  // );
  ///EG - usage of dropdown compound pattern
  return (
    <>
    {/* <h1>Eg of a custom dropdown </h1>
    <Dropdown>
      <Dropdown.Toggle>Select option</Dropdown.Toggle>
      <Dropdown.Menu>
        <Option value = "option 1">Option1</Option>
        <Option value = "option 2">Option2</Option>
        <Option value = "option 3">Option3</Option>
      </Dropdown.Menu>
    </Dropdown> */}
    <div style={{ width: '300px', margin: '20px auto',height:'50px' }}>
       <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        Time Left: {countDown}s
      </div>
    <div style={{
      width:`${progressPercent}%`,
      backgroundColor:'green',
      transition: 'width 1s linear',
      height:'100%'
    }}>

    </div>
    </div>
    </>
  )

}

export default App;
