  // import { useEffect, useState } from "react";
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch("${1:https://jsonplaceholder.typicode.com/users}");
        if (!resp.ok) throw new Error(`HTTP ${resp.status} ${resp.statusText}`);
        const json = await resp.json();
        setData(json);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);