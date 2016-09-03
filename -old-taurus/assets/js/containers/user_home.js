import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import _ from 'lodash';

import {fetchUser, fetchUserGoals, logoutUser} from '../actions/index';
import GoalCreator from './goal_creator';
import GoalList from './goal_list';


export default class UserHome extends Component {
  constructor(props) {
    super(props)
    this.JWT = JSON.parse(localStorage.decodedJwt);
  }

  static contextTypes = {
    router: PropTypes.object,
  };

  componentWillMount() {
    var userId = this.JWT.user_id;
    // before rendering, fetch the user
    this.props.fetchUser(userId)
      .then(() => {
        if (this.props.userGoals.length === 0) {
          // convert user's array of goals from urls to objects
          // convert only if it hasn't already been converted and rendered
          this.convertGoalUrlToObject();
        }
      });
  }

  convertGoalUrlToObject() {
    // Tasks from userInfo returns an array of urls
    // Use this function to use Urls to return goal object
    return this.props.userInfo.raw.goals.map(goalUrl => {
      this.props.fetchUserGoals(goalUrl)
    });
  }

  render() {
    if (localStorage.jwt) {
      if (!this.props.userInfo.raw) {
        return <div>Loading...</div>
      }
      return (
        <div>
          <main>
            <h1>Welcome, {this.JWT.username}</h1>
            <GoalList goals={this.props.userGoals}/>
            <GoalCreator/>
            {this.props.children}
          </main>
        </div>
      );
    } else {
      return (
        <div>You're not authenticated!</div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    userInfo: state.userInfo,
    userGoals: state.goals,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchUser,
    fetchUserGoals,
    logoutUser,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHome);
