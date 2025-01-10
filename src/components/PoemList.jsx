import React, { useEffect, useState } from 'react';
import './PoemList.css'; // Assuming you will style it in a separate file

const PoemList = () => {
  const [poems, setPoems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPoems = async () => {
    const apiUrl =
      "https://api.github.com/repos/amaranwrites/json/contents/poems.json";

    try {
      const response = await fetch(apiUrl, {
        headers: {
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
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPoems();
  }, []);

  const handleCopy = (content) => {
    navigator.clipboard.writeText(content).then(() => {
      alert("Poem copied to clipboard!");
    }).catch(() => {
      alert("Failed to copy the poem.");
    });
  };

  const handleShare = (poem) => {
    if (navigator.share) {
      navigator.share({
        title: poem.title,
        text: `${poem.content} - by ${poem.author}`,
      }).catch(() => {
        alert("Sharing failed or was canceled.");
      });
    } else {
      alert("Web Share API is not supported in this browser.");
    }
  };

  if (loading) {
    return <div>Loading poems...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="poem-list">
      <h2>Poems</h2>
      <ul>
        {poems.map(poem => (
          <li key={poem.id} className="poem-item">
            <div className="poem-content">
              <h3>{poem.title}</h3>
              <p><strong>by:</strong> {poem.author}</p>
              <p>{poem.content}</p>
            </div>
            <div className="action-icons">
              <i
                className="fas fa-copy"
                title="Copy Poem"
                onClick={() => handleCopy(`${poem.title}\n\n${poem.content}\n\n- ${poem.author}`)}
              ></i>
              <i
                className="fas fa-share-alt"
                title="Share Poem"
                onClick={() => handleShare(poem)}
              ></i>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PoemList;
