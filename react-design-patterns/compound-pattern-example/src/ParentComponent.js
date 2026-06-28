import App from "./App";
import React from 'react';
import Child1Component from "./Child1Component";
import Child2Component from "./Child2Component";


const ParentComponent = () => {
    return (<App>
        <div>Parent Component</div>
        <Child1Component></Child1Component>
        <Child2Component></Child2Component>
    </App>)
}

export default ParentComponent;

