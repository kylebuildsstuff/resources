/**
*
* LoginSignupBlock
*
*/

import React from 'react';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';
import classnames from 'classnames';

import styles from './styles.css';

function LoginSignupBlock() {
  const classNames = classnames(styles.loginSignupBlock, {
    clearfix: 'clearfix',
  });
  return (
    <div className={classNames}>
      <div className={styles.half}>
        <strong>Log In to QuickServe</strong>
        <p><Link className="btn" to="/login"><FontAwesome name="lock" />Log In Now</Link></p>
      </div>
      <div className={styles.half}>
        <strong>Or Sign Up for QuickServe:</strong>
        <p><Link className="btn" to="/register"><FontAwesome name="user" />Sign Up Now</Link></p>
      </div>
    </div>
  );
}

export default LoginSignupBlock;
