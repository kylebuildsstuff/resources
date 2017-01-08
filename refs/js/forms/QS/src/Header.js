import React from 'react';
import { Link } from 'react-router';

import './Header.css';

const Header = () => {
  return (
    <div className="Header">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </div>
  );
}

export default Header;
