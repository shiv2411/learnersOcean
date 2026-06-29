import { useState } from 'react';
import './App.css';
import { explorerData } from './constants';

function App() {
  const [expandedFolders,setExpandedFolders] = useState({});
  const [updatedExplorerData,setExplorerData] = useState(explorerData);

  function toggleState(event,id){
    event.stopPropagation();
    setExpandedFolders((prev)=>{
      return {...prev,[id]:!prev[id]}
    })
  }

  function updateTree(nodes,targetId,newFile){
    return nodes?.map((node)=>{
      if(node.id === targetId){
        return {
          ...node,children:[...node.children,newFile]
        }
      } 
      else if(node.children){
        console.log(node.children);
        return {
          ...node,children:updateTree(node.children,targetId,newFile)
        }
      }
      else {
        return node;
      }
    })
  }

  function addNew(id,type) {
    const newFile = type === 'file' ? {id:Math.floor(Math.random()*1000),name:'New file.js',type:'file'}: {id:Math.floor(Math.random()*1000),name:'New folder',type:'folder',children:[]} ;
    setExplorerData((prev)=>{
        return updateTree(prev,id,newFile);
    })
    setExpandedFolders((prev)=>{
      return {...prev,[id]:true}
    })
  }

  function filterData(nodes,currNode){
    return nodes.filter(node=>node.id!==currNode.id)
  .map((node)=> {
     if(node.children){
      return {...node,children:filterData(node.children,currNode)}
     }
     return node;
  })}

  function deleteFolder(node){
    setExplorerData((prev)=> filterData(prev,node));
    alert('Deleted successfully');
  }

  function renderNodes(data) {
    return data.map(node => {
      if (node.children) {
        return <li key={node.id} ><span onClick={(e) => toggleState(e, node.id)}>
          {node.name}
        </span>
        <button onClick={()=> addNew(node.id,'file')}> Create File</button>
         <button onClick={()=> addNew(node.id,'folder')}> Create Folder</button>
         <button onClick={() => deleteFolder(node)}>Delete Folder</button>
          {expandedFolders[node.id] && <ul>{renderNodes(node.children)}</ul>}
        </li>
      } else {
        return <li key={Math.round(node.id).toFixed(0)}>{node.name} <button onClick={() => deleteFolder(node)}>Delete File</button></li>
      }
    }
    )
  }
  return (
    <>
      <h1> Welcome to the folder-flow structure</h1>
      <ul>
        {renderNodes(updatedExplorerData)}
      </ul>
    </>
  );
}

export default App;
