import React, { createContext, useState, useEffect } from 'react';

export const QuoteContext = createContext();

export const QuoteProvider = ({ children }) => {
  const [quotes, setQuotes] = useState([]);
  const [error, setError] = useState(null);

  const fetchPoems = async () => {
    const apiUrl = "https://api.github.com/repos/amaranwrites/json/contents/poems.json";

    try {
      const response = await fetch(apiUrl, {
        headers: {
          Accept: "application/vnd.github.v3.raw",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch poems: ${response.statusText}`);
      }

      const data = await response.json();
      setQuotes(data.poems || []);
    } catch (err) {
      setError(err.message || "An unexpected error occurred");
    }
  };

  useEffect(() => {
    fetchPoems();
  }, []);

  return (
    <QuoteContext.Provider value={{ quotes, error }}>
      {children}
    </QuoteContext.Provider>
  );
};
