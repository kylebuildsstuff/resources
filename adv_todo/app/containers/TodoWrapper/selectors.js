import { createSelector } from 'reselect';

/**
 * Direct selector to the todoWrapper state domain
 */
const selectTodoWrapperDomain = () => state => state.get('todoWrapper');

/**
 * Other specific selectors
 */


/**
 * Default selector used by TodoWrapper
 */

const selectTodoWrapper = () => createSelector(
  selectTodoWrapperDomain(),
  (substate) => substate.toJS()
);

export default selectTodoWrapper;
export {
  selectTodoWrapperDomain,
};
