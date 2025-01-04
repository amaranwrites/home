import React, { useEffect, useState } from "react";
import PoemCard from "./PoemCard";


const PoemList = () => {
  const [poems, setPoems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPoems = async () => {
    const apiUrl =
      "https://api.github.com/repos/amaranwrites/json/contents/poems.json";

    try {
      const response = await fetch(apiUrl, {
        headers: {
          // Authorization: `Bearer ${process.env.ACCESS_TOKEN}`, // Replace with your token
          Accept: "application/vnd.github.v3.raw", // This ensures you get the raw file content
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch poems");
      }

      const data = await response.json();
      setPoems(data.poems);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching poems:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPoems();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="poem-list">
      {poems.map((poem) => (
        <PoemCard poem={poem}/>
      ))}
    </div>
  );
};

export default PoemList;
