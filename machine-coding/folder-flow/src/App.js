import { useState } from 'react';
import './App.css';
import { explorerData } from './constants';

function App() {
  const [expandedFolders,setExpandedFolders] = useState({});

  function toggleState(event,id){
    event.stopPropagation();
    setExpandedFolders((prev)=>{
      return {...prev,[id]:!prev[id]}
    })
  }

  function renderNodes(data) {
    return data.map(node => {
      if (node.children) {
        return <li key={node.id} ><span onClick={(e) => toggleState(e, node.id)}>
          {node.name}
        </span>
          {expandedFolders[node.id] && <ul>{renderNodes(node.children)}</ul>}
        </li>
      } else {
        return <li key={Math.round(node.id).toFixed(0)}>{node.name}</li>
      }
    }
    )
  }
  return (
    <>
      <h1> Welcome to the folder-flow structure</h1>
      <ul>
        {renderNodes(explorerData)}
      </ul>
    </>
  );
}

export default App;
