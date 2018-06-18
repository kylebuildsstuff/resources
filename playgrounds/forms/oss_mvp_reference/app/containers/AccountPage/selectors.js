import { createSelector } from 'reselect';
import { selectGlobal } from '../App/selectors';

export const selectPrimary = () => createSelector(
  selectGlobal(),
  (primaryState) => primaryState.get('primary'),
);

export const selectAccountPage = () => state => state.get('accountPage');

export const selectVehMakes = () => createSelector(
  selectAccountPage(),
  (accountPageState) => accountPageState.vehMakes,
);

export const selectVehModels = () => createSelector(
  selectAccountPage(),
  (accountPageState) => accountPageState.vehModels,
);

export const selectAddresses = () => createSelector(
  selectAccountPage(),
  (accountPageState) => accountPageState.addresses,
);

export const selectIsFetching = () => createSelector(
  selectAccountPage(),
  (accountPageState) => accountPageState.isFetching,
);
