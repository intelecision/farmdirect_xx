import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url = "", options = null) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": options && `Bearer ${option.token}`,
        },
      })
      .then((response) => {
        if (isMounted) {
          setData(response.data);
          setIsLoading(false);
          setError(null);
          //console.log("loaded");
        }
      })
      .catch((error) => {
        if (isMounted) {
          setError(error);
          setData(null);
        }
      })
      .finally(() => setIsLoading(false));
    return () => (isMounted = false);
  }, [url]);

  return { data, error, isLoading };
};

export default useFetch;
