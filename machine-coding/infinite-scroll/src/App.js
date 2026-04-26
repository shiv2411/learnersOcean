import './App.css';
import { useEffect,useState,useRef } from 'react';

function App() {
  const [items,setItems] = useState([]);
  const [page,setPage] = useState(1);
  const [isLoading,setIsLoading] = useState(false);
  const [hasMore,setHasMore] = useState(true);
  const hasFetched = useRef(false);
  const OFFSET = 20;
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => {
      const { scrollHeight, clientHeight, scrollTop } = container;
      if (!hasFetched.current && hasMore) {
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
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${OFFSET}`);
        const data = await res.json();
        if(!data.length){
          setHasMore(false)
        }else{
        setItems((prev)=>[...prev,...data]);
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
       <><div id="listContainer" ref = {containerRef} style={{ height: "100vh", overflowY: "auto" }}><ul>
        {items.map(item => <li key={item.id}>{item.title}</li>)}
      </ul>
      {isLoading && <p>Loading...</p>}
      </div></>
    </>
  );
}

export default App;
