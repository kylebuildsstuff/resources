import React from 'react';
import {
  Link,
} from 'react-router-dom';

type Props = {
  authenticated: boolean,
};

export const Sidebar = (props: Props) => (
  <div>
    <ul>
      {props.authenticated ? (
        <div>
          <li><Link to="/user-home">User-Home</Link></li>
          <li><Link to="/user-home/settings">Settings</Link></li>
        </div>
      ) : (
        <div></div>
      )}
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
    </ul>
  </div>
);

export default Sidebar;
