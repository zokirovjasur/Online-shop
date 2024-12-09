import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHandle = async () => { 
      setLoading(true);
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Not Found");
        const resp = await res.json();
        setData(resp);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchHandle();
  }, [url]);

  return { data, error, loading };
};

export default useFetch;
