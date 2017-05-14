// @flow
import React from 'react';
import _ from 'lodash';
import {
  Route,
  withRouter,
} from 'react-router-dom';

import {
  findGoalWithId,
} from '../../../services/goalServices';

import UserHome from '../UserHome';
import UserSettingsContainer from '../UserSettingsContainer';
import GoalCardModalContainer from '../GoalCardModalContainer';

type Props = {
  location: {
    state?: ?{
      modal?: boolean,
    },
  },
  history: Object,
  user: Object,
  goals: Array<Object>,
  deleteGoal: () => mixed,
  editGoal: () => mixed,

};

export class UserHomeRoutes extends React.Component {
  props: Props;
  previousLocation = this.props.location;
  componentWillUpdate(nextProps: Props) {
    const { location } = this.props;
    if (
      nextProps.history.action !== 'POP' &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = location;
    }
  }

  render() {
    const { location } = this.props;
    const isModal = !!(
      location.state &&
      location.state.modal
    );
    return (
      <div>
        <Route location={isModal ? this.previousLocation : location} exact path="/user-home" render={(matchProps: Object) => <UserHome user={this.props.user} goals={this.props.goals} {...matchProps} />} />
        <Route path="/user-home/settings" render={(matchProps: Object) => <UserSettingsContainer user={this.props.user} {...matchProps}/>} />
        {isModal ? (
          <Route path='/user-home/goal-card/:goalCardId' render={(matchProps: Object) => {
              return (
                <GoalCardModalContainer
                  deleteGoal={this.props.deleteGoal}
                  editGoal={this.props.editGoal}
                  goal={findGoalWithId(matchProps.match.params.goalCardId, this.props.goals)}
                  {...matchProps}
                />
              );
            }}
          />
        ) : null}
      </div>
    );
  }
}

export default withRouter(UserHomeRoutes);
