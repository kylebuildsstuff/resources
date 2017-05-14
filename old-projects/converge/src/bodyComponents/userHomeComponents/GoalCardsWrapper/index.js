// @flow
import React from 'react';

import GoalCard from '../GoalCard';

type Goal = {
  id: number,
  title: string,
  description: string,
}

type Props = {
  goals: Array<Goal>,
  deleteGoal: () => mixed,
};

export const GoalCardsWrapper = (props: Props) => {
  const renderGoal = (goal: Goal) => {
    return (
      <GoalCard
        key={goal.id}
        goal={goal}
        deleteGoal={props.deleteGoal}
      />
    );
  }

  return (
    <div>
      {props.goals.map(renderGoal)}
    </div>
  );
}

export default GoalCardsWrapper;
