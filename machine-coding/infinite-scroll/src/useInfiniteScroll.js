import { useState, useEffect, useRef } from 'react';

const OFFSET = 10;
const API_BASE = 'https://dummyjson.com';

export function useInfiniteScroll(page) {
  const [items, setItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [pendingImages, setPendingImages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const hasFetched = useRef(false);

  useEffect(() => {
    async function fetchData() {
      if (hasFetched.current) return;
      hasFetched.current = true;
      try {
        setIsLoading(true);
  const skip = (page - 1) * OFFSET;
        const res = await fetch(`${API_BASE}/products?limit=${OFFSET}&skip=${skip}`);
        const data = await res.json();
        const { products } = data;
        if (products.length < OFFSET) {
          setHasMore(false);
        } else {
          setItems((prev) => [...prev, ...products]);
          setPendingImages(products.length);
        }
      } catch (err) {
        console.log(err);
        setErrorMessage('We are facing some problem currently. Please try after sometime!!!!!!!');
      } finally {
        setIsLoading(false);
        hasFetched.current = false;
      }
    }

    fetchData();
  }, [page]);

  return { items, isLoading, hasMore, errorMessage, pendingImages, setPendingImages };
}



