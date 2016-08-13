/**
*
* ExampleComponent
*
*/

import React from 'react';

import styles from './styles.css';

class ExampleComponent extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.exampleComponent}>
      </div>
    );
  }
}

export default ExampleComponent;
