/**
*
* Footer
*
*/

import React from 'react';
import FontAwesome from 'react-fontawesome';

import styles from './styles.css';

function Footer() {
  return (
    <div className={styles.footer}>
      <address>
        <strong>SmartCoverage Insurance</strong><br />
        P.O. Box 489, Station A, Windsor, ON N9A 6M6<br />
        <FontAwesome name="phone" /> 1-888-881-8045
      </address>
    </div>
  );
}

Footer.propTypes = {
  authed: React.PropTypes.bool,
};

export default Footer;
