// @flow
import React from 'react';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import _ from 'lodash';

import {
  fetchGoals,
  fetchUser,
  editGoal,
  deleteGoal,
} from '../../../AppContainer/actions';
import {
  selectGoals,
  selectUser,
} from '../../../AppContainer/selectors';

import UserHomeRoutes from '../UserHomeRoutes';

type Props = {
  token: string,
  goals: ?Array<Object>,
  fetchGoals: () => mixed,
  deleteGoal: () => mixed,
  editGoal: () => mixed,
  fetchUser: () => mixed,
  user: {
    goals: Array<?Object>,
  },
};

export class UserHomeContainer extends React.Component {
  props: Props;
  componentDidMount() {
    const token: ?string = localStorage.getItem('jwt');
    if (this.props && token) {
      const decodedToken: Object = jwtDecode(token);
      if (_.isEmpty(this.props.goals)) {
        this.props.fetchGoals(token);
      }
      if (_.isEmpty(this.props.user)) {
        this.props.fetchUser(decodedToken.user_id, token)
      }
    }
  }

  render() {
    if (
      _.isEmpty(this.props.user) ||
      (
        this.props.user.goals &&
        this.props.user.goals.length > 0 &&
        this.props.goals && this.props.goals.length === 0
      )
    ) {
      return (
        <div>Loading User Data...</div>
      );
    }
    return (
      <div>
        <UserHomeRoutes
          deleteGoal={this.props.deleteGoal}
          editGoal={this.props.editGoal}
          goals={this.props.goals}
          user={this.props.user}
        />
      </div>
    );
  }
}

function mapStateToProps(state: Object): Object {
  return {
    goals: selectGoals(state),
    user: selectUser(state),
  };
}

function mapDispatchToProps(dispatch: () => mixed): Object {
  return {
    fetchGoals: (token = '') => dispatch(fetchGoals(token)),
    editGoal: (goalId = undefined, formSubmitData = {}, token = undefined) => dispatch(editGoal(goalId, formSubmitData, token)),
    deleteGoal: (goalId = undefined, token = undefined) => dispatch(deleteGoal(goalId, token)),
    fetchUser: (userId = undefined, token = undefined) => dispatch(fetchUser(userId, token)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHomeContainer);
