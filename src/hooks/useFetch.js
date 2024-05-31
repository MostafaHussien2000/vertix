import { useEffect, useState } from "react";

export const useFetch = async (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const result = await response.json();
        setData(result);
        console.log(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {};
  }, [url]);

  return { data, loading, error };
};
