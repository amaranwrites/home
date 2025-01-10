import React from 'react';
import './PoemDetail.css';

const PoemDetail = ({ poem }) => {
  const copyToClipboard = () => {
    const poemText = `
      Title: ${poem.title}
      Author: ${poem.author}
      Content: ${poem.content}
      Theme: ${poem.theme}
      Published Date: ${poem.publishedDate}
      Tags: ${poem.tags.join(', ')}
    `;
    navigator.clipboard.writeText(poemText);
    alert('Poem copied to clipboard!');
  };

  const sharePoem = () => {
    if (navigator.share) {
      navigator.share({
        title: poem.title,
        text: `${poem.content} - ${poem.author}`,
      }).catch(err => console.error('Error sharing:', err));
    } else {
      alert('Sharing is not supported on this browser.');
    }
  };

  return (
    <div className="poem-detail">
      <h2>{poem.title}</h2>
      <p>by {poem.author}</p>
      <p>{poem.content}</p>
      <p>Theme: {poem.theme}</p>
      <p>Published on: {poem.publishedDate}</p>
      <p>Tags: {poem.tags.join(', ')}</p>
      {poem.image && <img src={poem.image} alt={poem.title} />}
      <div className="action-icons">
        <i className="fas fa-copy" title="Copy Poem" onClick={copyToClipboard}></i>
        <i className="fas fa-share-alt" title="Share Poem" onClick={sharePoem}></i>
      </div>
    </div>
  );
};

export default PoemDetail;
