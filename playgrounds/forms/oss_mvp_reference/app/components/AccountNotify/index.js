/**
*
* AccountNotify
*
*/

import React from 'react';


import styles from './styles.css';

function AccountNotify(props) {
  return (
    <div className={styles.accountNotify}>
      {props.msg}
    </div>
  );
}

AccountNotify.propTypes = {
  msg: React.PropTypes.string,
};

export default AccountNotify;
