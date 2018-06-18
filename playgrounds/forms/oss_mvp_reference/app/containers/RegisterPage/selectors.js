import { createSelector } from 'reselect';

const selectRegisterPageDomain = () => state => state.get('global');

const selectRegisterPage = () => createSelector(
  selectRegisterPageDomain(),
  (substate) => substate.toJS()
);

export default selectRegisterPage;
export {
  selectRegisterPageDomain,
};
