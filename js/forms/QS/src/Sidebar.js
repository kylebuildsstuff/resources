import React from 'react';
import { Link } from 'react-router';

import './Sidebar.css';

const Sidebar = (props) => {

  const handleLogin = () => {
    console.log('login!');
  }
  const handleLogout = () => {
    console.log('logout!');
  }

  return (
    <div className="Sidebar">
      <p>Authed: {props.authed ? 'Yup' : 'Nope'}</p>
      {
        props.authed ? (
          <button onClick={handleLogout}>Log out</button>
        ) : (
          <button onClick={handleLogin}>Log in</button>
        )
      }
      <ul>
        <li><Link to="/account">Account</Link></li>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
