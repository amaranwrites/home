import React from 'react';
import './Categories.css';

const Categories = ({ quotes }) => {
  if (!quotes || quotes.length === 0) {
    return <p>No quotes available to display categories.</p>;
  }

  // Extract unique categories, handling undefined tags
  const categories = [
    ...new Set(quotes.flatMap((q) => (q.tags ? q.tags : [])))
  ].sort((a, b) => a.localeCompare(b)); // Optional: Sort alphabetically

  const handleCategoryClick = (category) => {
    console.log(`Category clicked: ${category}`);
    // Add navigation or filtering logic here
  };

  return (
    <div className="categories-container">
      <h2>Explore Categories</h2>
      <ul className="categories-list">
        {categories.map((category, index) => (
          <li
            key={index}
            className="category-item"
            role="button"
            aria-label={`Explore category: ${category}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
