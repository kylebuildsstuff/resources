// @flow
import React from 'react';

import GoalCardsWrapper from '../GoalCardsWrapper';

type Props = {
  user: {
    username: string,
  },
  goals: Array<Object>,
  deleteGoal: () => mixed
}

export const UserHome = (props: Props): Object => {
  return (
    <div>
      <div>Welcome {props.user.username}</div>
      <GoalCardsWrapper
        goals={props.goals}
        deleteGoal={props.deleteGoal}
      />
    </div>
  );
}

export default UserHome;
