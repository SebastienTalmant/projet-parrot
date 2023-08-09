import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchData = (url) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        console.error(`Failed to fetch data from ${url}`, error);
      }
    };

    fetchData();
  }, [url]);

  return data;
};

export default useFetchData;