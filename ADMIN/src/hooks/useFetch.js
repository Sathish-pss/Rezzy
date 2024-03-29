// Importing the hooks from React
import { useEffect, useState } from "react";
// Importing External Libraries
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000/api";

// Defining the Custom Hook here
const useFetch = (url) => {
  const [data, setData] = useState([]); // State to set the data
  const [loading, setLoading] = useState(false); // State for loading
  const [error, setError] = useState(false); // state to handle the error

  // Useeffect hook to fetch data from the server
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url);
        setData(res.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  // Function to refetch the data from the server
  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;
