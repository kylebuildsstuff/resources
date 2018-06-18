import { createSelector } from 'reselect';

/**
 * Direct selector to the logoutPage state domain
 */
const selectLogoutPageDomain = () => state => state.get('global');

const selectLogoutPage = () => createSelector(
  selectLogoutPageDomain(),
  (substate) => substate.toJS()
);

export default selectLogoutPage;
export {
  selectLogoutPageDomain,
};
