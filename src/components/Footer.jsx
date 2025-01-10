import React from 'react';
import './Footer.css'; // Assuming a separate CSS file for Footer styling

const Footer = () => {
  return (
    <footer role="contentinfo">
      <p>&copy; {new Date().getFullYear()} Poem Blog. All rights reserved.</p>
      <div className="social-media">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">Facebook</a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">Twitter</a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">Instagram</a>
      </div>
    </footer>
  );
};

export default Footer;
