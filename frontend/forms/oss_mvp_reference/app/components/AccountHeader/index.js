/**
*
* AccountHeader
*
*/

import React from 'react';


import styles from './styles.css';

function AccountHeader(props) {
  return (
    <div className={styles.accountHeader}>
      <h3>{props.pageTitle}</h3>
    </div>
  );
}

AccountHeader.propTypes = {
  pageTitle: React.PropTypes.string,
};

export default AccountHeader;
