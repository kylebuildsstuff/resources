/*
 *
 * ExampleContainer
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectExampleContainer from './selectors';
import styles from './styles.css';

export class ExampleContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.exampleContainer}>
      </div>
    );
  }
}

const mapStateToProps = selectExampleContainer();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExampleContainer);
