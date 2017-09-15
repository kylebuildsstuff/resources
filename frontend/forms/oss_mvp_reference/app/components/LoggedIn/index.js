/**
*
* LoggedIn
*
*/

import React from 'react';
import { Link } from 'react-router';
import { forwardTo } from '../../utils/helpers';

import styles from './styles.css';

function LoggedIn() {
  return (
    <div className={styles.loggedIn}>
      <h3>You are currently logged in.</h3>
      <p>Click below to log out.</p>
      <p><Link className="btn" to="/logout">Log Out</Link></p>
      {/* Forward with slight delay */}
      {forwardTo('/account', 0)}
    </div>
  );
}

export default LoggedIn;
