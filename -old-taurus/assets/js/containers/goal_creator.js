import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import _ from 'lodash';

import {createGoal} from '../actions/index';


class GoalCreator extends Component {
  createGoal() {
    this.props.createGoal(localStorage.decodedJwt)
  }

  render() {
    return (
      <div className="btn btn-success" onClick={this.createGoal.bind(this)}>
        <h1>Create Goal</h1>
      </div>
    );
  }
}



export default connect(null, {createGoal})(GoalCreator);
