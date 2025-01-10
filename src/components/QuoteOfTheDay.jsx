import React from "react";
import "./QuoteOfTheDay.css";

const QuoteOfTheDay = ({ quotes }) => {
  if (!quotes || quotes.length === 0) {
    return <p>No quotes available for today.</p>;
  }

  const quote = quotes.reduce((prev, current) =>
    prev.id > current.id ? prev : current
  );

  const handleCopy = (content) => {
    navigator.clipboard.writeText(content).then(() => {
      alert("Quote copied to clipboard!");
    });
  };

  const handleShare = (quote) => {
    if (navigator.share) {
      navigator.share({
        title: "Quote of the Day",
        text: `${quote.content} - ${quote.author}`,
      });
    } else {
      alert("Web Share API is not supported in this browser.");
    }
  };

  return (
    <div className="quote-of-the-day">
      <h2>Quote of the Day</h2>
      <blockquote>
        <p>{quote.content}</p>
        <footer>- {quote.author}</footer>
      </blockquote>
      <div className="action-icons">
        <i
          className="fas fa-copy"
          title="Copy Quote"
          onClick={() => handleCopy(`${quote.content}\n\n- ${quote.author}`)}
        ></i>
        <i
          className="fas fa-share-alt"
          title="Share Quote"
          onClick={() => handleShare(quote)}
        ></i>
      </div>
    </div>
  );
};

export default QuoteOfTheDay;
