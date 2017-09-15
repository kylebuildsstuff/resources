/**
*
* FormHeader
*
*/

import React from 'react';


import styles from './styles.css';

function FormSubHeader(props) {
  return (
    <h4 className={styles.formSubHeader}>
      {props.hdr}
    </h4>
  );
}

FormSubHeader.propTypes = {
  hdr: React.PropTypes.string,
};

export default FormSubHeader;
