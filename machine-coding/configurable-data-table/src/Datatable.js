import React, { useState } from "react";



const DataTable = ({columns,data}) => {
    const [sortState,setSortState] = useState(null);
    const [searchText,setSearchText] = useState('');
    const [currentPage,setCurrentPage] = useState(1);

    const OFFSET = 2;
    const totalPageSize = data.length/OFFSET;
    
    

    const sortColumnState = (key) => {
        //State {column:key,direction:'up'}
        setSortState((prev)=>{
            if(!prev || prev.column !== key){
                return {
                    column:key,
                    direction:'asc'
                }
            }
            return {
                column:key,
                direction: prev.direction === 'asc' ? 'desc' : 'asc'
            }
        });
    }

    const currentPageData = getPaginatedData(data);
    const filterData = getfilteredData(currentPageData);
    const displayData = getSortedData(filterData);

    function getSortedData(data) {
        const copiedData = [...data];

        if (!sortState) {
            return copiedData;
        }

        copiedData.sort((a, b) => {
            const valueA = a[sortState.column];
            const valueB = b[sortState.column];

            if (typeof valueA === 'string') {
                return sortState.direction === 'asc'
                    ? valueA.localeCompare(valueB)
                    : valueB.localeCompare(valueA);
            }

            return sortState.direction === 'asc'
                ? valueA - valueB
                : valueB - valueA;
        });

        return copiedData;
    }
     //val = Rahul
    //  {name:'Rahul'}
     function getfilteredData(data){
     if(!searchText){
        return data;
     }
      const val = searchText.trim().toLowerCase();  
      return data.filter(row =>{
        let rowData = Object.values(row);
         return rowData.some((value)=>value?.toString().toLowerCase().includes(val));
       })
    }

    function getPaginatedData(data){
        let startIndex = (currentPage-1)*OFFSET;
        let endIndex = startIndex + OFFSET;
        console.log(startIndex,endIndex)
        return data.slice(startIndex,endIndex);
    }

    return <>Data Table component 
     <div>Search: <input type="text" value={searchText} onChange = {(event)=>setSearchText(event.target.value)}></input></div>
    <div style={{height:'500px',width:'100%'}}>
    <div style={{display:'flex',padding:'8px',border:'1px solid grey',width:'100%', boxSizing: 'border-box'}}>
     {columns.map((column)=>( 
        <React.Fragment key={column.id}>
        <span style={{flex:1}} key={column.id}>{column.label}</span>
        {column.sortable && <span onClick={()=>sortColumnState(column.key)}>
            {sortState?.column === column.key ? sortState.direction === 'asc' ? '↑': '↓' : '↕'}
            </span>}
        </React.Fragment>
    )
    )}
     </div>  
     {displayData.map((row)=>{
        return <div key={row.id} style={{display:'flex',width:'100%',padding:'8px',border:'1px solid grey', boxSizing: 'border-box'}}>
       {columns.map(column=>
        <span style={{flex:1}} key={column.key}>
            {column.render ? column.render(row) : row[column.key]}
        </span>
       )}
        </div>
     })}
    </div>
    <div>Paginator Component

    <button disabled={currentPage===1} onClick={()=> setCurrentPage((prev)=>prev-1)}>Prev</button>
    <div>{`Page ${currentPage} of ${totalPageSize}`}</div>
    <button disabled={currentPage===totalPageSize} onClick={()=> setCurrentPage((prev)=>prev+1)}>Next</button>
    </div>
    </>
}


export default DataTable;