import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
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
    const formattedContent = content.replace(/\\n/g, "\n");

    navigator.clipboard
      .writeText(formattedContent)
      .then(() => {
        toast.success("Quote copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy the quote.");
      });
  };

  const handleShare = (quote) => {
    const formattedContent = quote.content.replace(/\\n/g, "\n");

    if (navigator.share) {
      navigator
        .share({
          title: "Quote of the Day",
          text: `${formattedContent} - ${quote.author}`,
        })
        .then(() => {
          toast.success("Quote shared successfully!");
        })
        .catch(() => {
          toast.error("Failed to share the quote.");
        });
    } else {
      toast.error("Web Share API is not supported in this browser.");
    }
  };

  // Formatting content for display: replaces \n with <br />
  const formatContentForDisplay = (content) => {
    return content.split("\\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
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
            <strong>Content:</strong>{" "}
            {formatContentForDisplay(randomQuote.content)}
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
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default RandomQuote;
