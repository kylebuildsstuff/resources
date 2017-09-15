/**
*
* FormHeader
*
*/

import React from 'react';


import styles from './styles.css';

function FormHeader(props) {
  return (
    <h3 className={styles.formHeader}>
      {props.hdr}
    </h3>
  );
}

FormHeader.propTypes = {
  hdr: React.PropTypes.string,
};

export default FormHeader;
