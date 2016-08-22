/**
*
* SideBar
*
*/

import React from 'react';


import styles from './styles.css';

class SideBar extends React.Component {
  render() {
    return (
      <div className={styles.sideBar}>
        <h1>Hey I'm the SideBar</h1>
        <div
          className="btn btn-primary"
          onClick={this.props.createTodo}
          >
          Create Todo
        </div>
      </div>
    );
  }
}

export default SideBar;
