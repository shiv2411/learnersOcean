import './App.css';
import { useEffect,useState,useRef } from 'react';
import ProductImage from './ProductImage';

function App() {
  const [items,setItems] = useState([]);
  const [page,setPage] = useState(1);
  const [isLoading,setIsLoading] = useState(false);
  const [hasMore,setHasMore] = useState(true);
  const [pendingImages,setPendingImages] = useState(0);
  const hasFetched = useRef(false);
  const OFFSET = 10;
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => {
      const { scrollHeight, clientHeight, scrollTop } = container;

      if (!hasFetched.current && hasMore && pendingImages === 0) {
        if ((scrollHeight - scrollTop) <= clientHeight + 5) {
          setPage((prev) => prev + 1);
        }
      }

    }
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [hasMore]);

  useEffect(() => {
    async function fetchData() {
      if(hasFetched.current) return;
      try {
        hasFetched.current = true;
        setIsLoading(true);
        const skip = (page-1)*OFFSET;
        const res = await fetch(`https://dummyjson.com/products?limit=${OFFSET}&skip=${skip}`);
        const data = await res.json();
        const {products} = data;
        if(!products.length){
          setHasMore(false)
        }else{
        setItems((prev)=>[...prev,...products]);
        setPendingImages(products.length);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
        hasFetched.current = false;
      }
    }
    fetchData();
  }, [page])

  return (
    <>
      <><div id="listContainer" ref={containerRef} style={{ height: "100vh", overflowY: "auto" }}>
        {items.map(item => <div key={item.id}
          style={{
            border: "1px solid #ccc",
            marginBottom: "20px",
            padding: "16px",
          }}>
          {/* <img src={item.thumbnail} alt={item.title} width="100%" /> */}
          <ProductImage src={item.thumbnail} alt = {item.title} onImageLoad={()=> setPendingImages(prev => prev-1)}/>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <p>${item.price}</p>
        </div>)}
        {isLoading && <p>Loading...</p>}
      </div></>
    </>
  );
}

export default App;
