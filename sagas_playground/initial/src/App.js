import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <div>
        Hey
        <h1>
          {this.props.thing}
        </h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return ({
    thing: state,
  });
}

export default connect(mapStateToProps)(App);
