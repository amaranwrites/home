import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css'; // Assuming a CSS file for styling

const Header = () => {
  return (
    <header role="banner">
      <nav role="navigation">
        <ul>
          <li><NavLink to="/" className={({ isActive }) => (isActive ? 'active-link' : 'non')} aria-current="page">Home</NavLink></li>
          <li><NavLink to="/poems" className={({ isActive }) => (isActive ? 'active-link' : 'non')}>Poems</NavLink></li>
          {/* <li><NavLink to="/categories" className={({ isActive }) => (isActive ? 'active-link' : 'non')}>Categories</NavLink></li> */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
