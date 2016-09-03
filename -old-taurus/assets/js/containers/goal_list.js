import React from 'react';
import _ from 'lodash';

import GoalListItem from './goal_list_item';

const GoalList = ({goals}) => {
  if (!goals) {
    return <div>Loading...</div>
  }

  let sortedGoals = _.sortBy(goals, (val) => {
    return val.created;
  });

  const goalItems = sortedGoals.map(goal => {
    return (
      <GoalListItem
        key={goal.created}
        goal={goal}/>
    );
  });

  return (
    <div className="col-xs-12">
      <br/>
      {goalItems}
      <br/>
    </div>
  );
}

export default GoalList;
