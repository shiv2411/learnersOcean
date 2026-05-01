import './App.css';
import { useState, useRef, useCallback } from 'react';
import ProductImage from './ProductImage';
import { useInfiniteScroll } from './useInfiniteScroll';

function App() {
  const [page, setPage] = useState(1);
  const hasFetched = useRef(false);
  const observer = useRef(null);
  const { items, isLoading, hasMore, errorMessage, pendingImages, setPendingImages } = useInfiniteScroll(page);

  const lastElementRef = useCallback((node) => {
    if(isLoading){
      return;
    }
    // disconnect the previous observer to prevent multiple firing
    if(observer.current){
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver((entries)=>{
      if(entries[0].isIntersecting && hasMore && pendingImages===0 ){
        setPage((prev)=>prev+1);
      }
    })
    //tell the observer to observe the node
    if(node){
      observer.current.observe(node);
    }
  },[hasMore,isLoading,pendingImages])

  return (
      <div id="listContainer" style={{ height: "100vh", 
    overflowY: "auto", 
    padding: "20px",
    
    }}>
      <div style={{maxWidth:'500px',margin:'0 auto'}}>
        {items.map((item,index) => {
          const islastElement = index === items.length-1;
          return (<div key={item.id} ref={islastElement ? lastElementRef : null}
            style={{
              border: "1px solid #ccc",
              marginBottom: "20px",
              padding: "16px",
            }}>
            {/* <img src={item.thumbnail} alt={item.title} width="100%" /> */}
            <ProductImage src={item.thumbnail} alt={item.title} onImageLoad={() => setPendingImages(prev => prev - 1)} />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>${item.price}</p>
          </div>)
        })}
        </div>
        {isLoading && <p>Loading...</p>}
        {errorMessage && <div>{errorMessage}</div>}
      </div>
  );
}

export default App;
