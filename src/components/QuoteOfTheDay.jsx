import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "./QuoteOfTheDay.css";

const QuoteOfTheDay = ({ quotes }) => {
  if (!quotes || quotes.length === 0) {
    return <p>No quotes available for today.</p>;
  }

  const quote = quotes.reduce((prev, current) =>
    prev.id > current.id ? prev : current
  );

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

  const formatContentForDisplay = (content) => {
    return content.split("\\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div className="quote-of-the-day">
      <h2>Quote of the Day</h2>
      <blockquote>
        <p>{formatContentForDisplay(quote.content)}</p>
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
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default QuoteOfTheDay;
