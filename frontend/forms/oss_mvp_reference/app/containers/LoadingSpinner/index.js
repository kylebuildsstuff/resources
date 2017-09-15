/*
 *
 * LoadingSpinner
 *
 */

import React from 'react';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';

import styles from './styles.css';

export class LoadingSpinner extends React.Component { // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = { timer: false };
  }

  // the lifecycle hooks set a timer, then clear it
  // when the component unmounts

  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.setState({ timer: true });
    }, 7500);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    let content = (
      <div className={styles.loadingSpinner}>
        <FontAwesome name="circle-o-notch" size="3x" spin />
      </div>
    );
    if (this.state.timer) {
      content = <h4>Page could not be loaded.<br />Try <Link to="/login">logging in</Link> to view this page.</h4>;
    }
    return (
      <div>
        {content}
      </div>
    );
  }
}

export default LoadingSpinner;
