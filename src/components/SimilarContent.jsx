import React, { useEffect, useState } from 'react';

const SimilarContent = () => {
  const [similarPoems, setSimilarPoems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSimilarPoems = async () => {
      try {
        // Simulate fetching similar poems from an API
        const response = await fetch('/api/similar-poems'); // Replace with actual API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch similar poems');
        }
        const data = await response.json();
        setSimilarPoems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarPoems();
  }, []);

  if (loading) {
    return <div>Loading similar poems...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Similar Poems</h2>
      <ul>
        {similarPoems.map(poem => (
          <li key={poem.id}>
            <h3>{poem.title}</h3>
            <p>by {poem.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SimilarContent;
