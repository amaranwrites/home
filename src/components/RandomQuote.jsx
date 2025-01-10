import React, { useState } from "react";
import "./RandomQuote.css";

const RandomQuote = ({ quotes, category }) => {
  const [randomQuote, setRandomQuote] = useState(null);

  const getRandomQuote = () => {
    const filteredQuotes = category
      ? quotes.filter((q) => q.tags.includes(category))
      : quotes;

    if (filteredQuotes.length > 0) {
      const selectedQuote =
        filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
      setRandomQuote(selectedQuote);
    } else {
      setRandomQuote(null);
    }
  };

  const handleCopy = (content) => {
    navigator.clipboard.writeText(content).then(() => {
      alert("Quote copied to clipboard!");
    });
  };

  const handleShare = (quote) => {
    if (navigator.share) {
      navigator.share({
        title: "Random Quote",
        text: `${quote.content} - ${quote.author}`,
      });
    } else {
      alert("Web Share API is not supported in this browser.");
    }
  };

  return (
    <div className="random-quote">
      <h2>Random Quote</h2>
      {randomQuote ? (
        <div className="quote-container">
          <p>
            <strong>Title:</strong> {randomQuote.title}
          </p>
          <p>
            <strong>Author:</strong> {randomQuote.author}
          </p>
          <p>
            <strong>Content:</strong> {randomQuote.content}
          </p>
          <div className="action-icons">
            <i
              className="fas fa-copy"
              title="Copy Quote"
              onClick={() =>
                handleCopy(
                  `${randomQuote.title}\n\n${randomQuote.content}\n\n- ${randomQuote.author}`
                )
              }
            ></i>
            <i
              className="fas fa-share-alt"
              title="Share Quote"
              onClick={() => handleShare(randomQuote)}
            ></i>
          </div>
        </div>
      ) : (
        <p>No quotes available. Try another category.</p>
      )}
      <button onClick={getRandomQuote}>Get Random Quote</button>
    </div>
  );
};

export default RandomQuote;
