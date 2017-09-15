/**
*
* KbPromo
*
*/

import React from 'react';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';

import styles from './styles.css';

function KbPromo() {
  return (
    <div className={styles.kbPromo}>
      <p>Don't have an account yet?</p>
      <p><Link className="btn" to="/register"><FontAwesome name="user" />Sign Up</Link></p>
    </div>
  );
}

export default KbPromo;
