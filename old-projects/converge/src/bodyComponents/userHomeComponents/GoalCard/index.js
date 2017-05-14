// @flow
import React from 'react';
import {
  Link,
} from 'react-router-dom';

import GoalCardStyles from './styles/GoalCardStyles';

type Props = {
  goal: {
    id: number,
    title: string,
    description: string,
  },
}

export const GoalCard = (props: Props) => {
  return (
    <Link
      to={{
        pathname: `/user-home/goal-card/${props.goal.id}`,
        state: { modal: true }
      }}
    >
      <GoalCardStyles>
        <div>
          {props.goal.title ? (
            `${props.goal.title}: ${props.goal.description}`
          ) : (
            `Goal Card: ${props.goal.id}`
          )}
        </div>
      </GoalCardStyles>
    </Link>
  )
}

export default GoalCard;
