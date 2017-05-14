import React from 'react';
import {
  Link,
} from 'react-router-dom';

type Props = {
  logout: () => mixed,
  authenticated: boolean,
};

export const Navigation = (props: Props) => (
  <div>
    <ul>
      {props.authenticated ? (
        <li><Link to="/" onClick={props.logout}>Logout</Link></li>
      ) : (
        <div>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Signup</Link></li>
        </div>
      )}
    </ul>
  </div>
);

export default Navigation;
