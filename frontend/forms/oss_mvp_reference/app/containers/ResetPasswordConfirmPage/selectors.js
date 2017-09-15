import { createSelector } from 'reselect';

/**
 * Direct selector to the resetPasswordConfirmPage state domain
 */
const selectResetPasswordConfirmPageDomain = () => state => state.get('global');

const selectResetPasswordConfirmPage = () => createSelector(
  selectResetPasswordConfirmPageDomain(),
  (substate) => substate.toJS()
);

export default selectResetPasswordConfirmPage;
export {
  selectResetPasswordConfirmPageDomain,
};
