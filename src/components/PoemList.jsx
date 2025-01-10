import React, { useEffect, useState } from "react";
import "./PoemList.css"; // Assuming you will style it in a separate file
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Make sure to import the CSS

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

      const rawText = await response.text();
      const data = JSON.parse(rawText);
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

  // Function to handle the copy
  const handleCopy = (content) => {
    // Replace \n with actual line breaks
    const formattedContent = content.replace(/\\n/g, "\n");

    navigator.clipboard
      .writeText(formattedContent)
      .then(() => {
        toast.success("Poem copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy the poem.");
      });
  };

  // Function to handle sharing
const handleShare = (poem) => {
  if (navigator.share) {
    // Replace \\n with actual newlines before sharing
    const formattedContent = poem.content.replace(/\\n/g, '\n');
    
    navigator
      .share({
        title: poem.title,
        text: `${formattedContent} - by ${poem.author}`, // Share the content with actual newlines
      })
      .then(() => {
        toast.success("Poem shared successfully!");
      })
      .catch(() => {
        toast.error("Sharing failed or was canceled.");
      });
  } else {
    toast.error("Web Share API is not supported in this browser.");
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
        {poems.map((poem) => (
          <li key={poem.id} className="poem-item">
            <div className="poem-content">
              <h3>{poem.title}</h3>
              <p>
                <strong>by:</strong> {poem.author}
              </p>
              {/* Replace \n with <br /> for rendering */}
              <p
                dangerouslySetInnerHTML={{
                  __html: poem.content.replace(/\\n/g, "<br />"), // Make sure to replace '\\n' with <br />
                }}
              />
            </div>
            <div className="action-icons">
              <i
                className="fas fa-copy"
                title="Copy Poem"
                onClick={() =>
                  handleCopy(
                    `${poem.title}\n\n${poem.content}\n\n- ${poem.author}`
                  )
                }
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
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default PoemList;
