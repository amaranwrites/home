import React, { useContext, useState } from "react";
import { QuoteContext } from "../context/QuoteContext"; // Import the context
import QuoteOfTheDay from "./QuoteOfTheDay";
import RandomQuote from "./RandomQuote";
import "./Home.css"; // Import the new CSS file
import SEO from "./SEO";

const Home = () => {
  const { quotes, error } = useContext(QuoteContext); // Access quotes and error from context
  const [category, setCategory] = useState(""); // State to manage the selected category for random quote

  if (error) {
    return <p className="loading-text">Error loading quotes: {error}</p>;
  }

  const handleCategoryChange = (event) => {
    setCategory(event.target.value); // Update category
  };

  return (
    <div className="home-container">
      <SEO 
        title="Amaran Writes - Poetry & Quotes Blog" 
        description="Discover beautiful poems and inspiring quotes on love, life, and more." 
        keywords="poems,quotes,creativity,love,life"
        author="Amaran" 
      />
      <h1>Amaran Writes</h1>

      {quotes.length > 0 ? (
        <>
          {/* Quote of the Day Section */}
          <div className="quote-section">
            <QuoteOfTheDay quotes={quotes} />
          </div>

          {/* Random Quote Section */}
          <div className="random-quote-section">
            <h2>Get a Random Quote</h2>
            <RandomQuoteControl
              quotes={quotes}
              category={category}
              onCategoryChange={handleCategoryChange}
            />
          </div>
        </>
      ) : (
        <p className="loading-text">Loading quotes...</p>
      )}
    </div>
  );
};

/**
 * A sub-component for managing the RandomQuote controls.
 */
const RandomQuoteControl = ({ quotes, category, onCategoryChange }) => (
  <div className="random-quote-control">
    <label htmlFor="category-select" className="category-label">
      Choose Mood/Category:
    </label>
    <select
      id="category-select"
      value={category}
      onChange={onCategoryChange}
      className="category-select"
    >
      <option value="">All</option>
      <option value="love">Love</option>
      <option value="life">Life</option>
      <option value="broken">Broken</option>
      {/* Add more categories as needed */}
    </select>

    <RandomQuote quotes={quotes} category={category} />
  </div>
);

export default Home;
