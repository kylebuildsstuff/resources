// @flow
type GoalType = {
  id: number,
}

export function findGoalWithId(id: ?number = undefined, goals: Array<GoalType> = []): ?Object {
  let goal;
  if (id && goals && goals.length >= 1) {
    goal = goals.filter((goal) => {
      return parseInt(goal.id, 10) === parseInt(id, 10);
    })
  }
  if (goal && goal.length && goal.length === 1) {
    return goal[0]; // there should always be only one goal returned from the filter or else something went wrong
  }
  return undefined;
}
