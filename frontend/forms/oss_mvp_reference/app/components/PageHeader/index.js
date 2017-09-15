/**
*
* PageHeader
*
*/

import React from 'react';


import styles from './styles.css';

function PageHeader(props) {
  return (
    <div className={styles.pageHeader}>
      <span>{props.subTitle}</span>
      <h2>{props.mainTitle}</h2>
    </div>
  );
}

PageHeader.propTypes = {
  subTitle: React.PropTypes.string,
  mainTitle: React.PropTypes.string,
};

export default PageHeader;
