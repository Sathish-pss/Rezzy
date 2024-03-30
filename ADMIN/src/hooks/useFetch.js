// Importing the hooks from React
import { useEffect, useState } from "react";
// Importing External Libraries
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000/api";


const setupAxiosInterceptors = () => {
  axios.interceptors.request.use(
    (config) => {
      const token = sessionStorage.getItem("access_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        console.error("Request error:", error.message);
      }
      return Promise.reject(error);
    }
  );
};

setupAxiosInterceptors();

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
