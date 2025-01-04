import React, { useState } from "react";
import "../styles/PoemCard.css";

const PoemCard = ({ poem }) => {
  const [liked, setLiked] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);

  // Copy poem content to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(poem.content).then(() => {
      alert("Poem content copied to clipboard!");
    });
  };

  // Share poem using Web Share API
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: poem.title,
          text: `${poem.content}\n\n- ${poem.author}`,
          url: window.location.href,
        })
        .then(() => console.log("Shared successfully!"))
        .catch((error) => console.log("Error sharing:", error));
    } else {
      alert("Sharing not supported on this browser.");
    }
  };

  // Toggle the visibility of the full content
  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  // Like button functionality
  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="poem-card">
      <h2 className="poem-title">{poem.title}</h2>
      <p className="poem-author">by {poem.author}</p>
      <div className="poem-content">
        {showFullContent ? poem.content : `${poem.content.slice(0, 100)}...`}
        {poem.content.length > 100 && (
          <button className="toggle-content" onClick={toggleContent}>
            {showFullContent ? "Show Less" : "Read More"}
          </button>
        )}
      </div>
      <p className="poem-theme">Theme: {poem.theme}</p>
      <div className="poem-actions">
        <button className="copy-btn" onClick={handleCopy}>
          Copy
        </button>
        <button className="share-btn" onClick={handleShare}>
          Share
        </button>
        <button className={`like-btn ${liked ? "liked" : ""}`} onClick={toggleLike}>
          {liked ? "Unlike" : "Like"}
        </button>
      </div>
    </div>
  );
};

export default PoemCard;
