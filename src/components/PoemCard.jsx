import React, { useState } from "react";
import { FaCopy, FaShareAlt, FaHeart, FaRegHeart } from "react-icons/fa"; // Font Awesome Icons
import "../styles/PoemCard.css";

const PoemCard = ({ poem }) => {
  const [liked, setLiked] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(poem.content).then(() => {
      alert("Poem content copied to clipboard!");
    });
  };

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

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="poem-card">
      {/* Minimalistic Copy Button */}
      <button className="icon-btn copy-btn" onClick={handleCopy} title="Copy">
        <FaCopy />
      </button>
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
      {/* Minimalistic Action Buttons */}
      <div className="poem-actions">
        <button
          className="icon-btn"
          onClick={handleShare}
          title="Share"
        >
          <FaShareAlt />
        </button>
        <button
          className="icon-btn"
          onClick={toggleLike}
          title={liked ? "Unlike" : "Like"}
        >
          {liked ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>
    </div>
  );
};

export default PoemCard;
