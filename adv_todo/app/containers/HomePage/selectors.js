import { createSelector } from 'reselect';

/**
 * Direct selector to the homePage state domain
 */
const selectHomePage = state => state.get('homePage');


// const selectHomePage = () => createSelector(
//   selectHomePage(),
//   (homePageState) => homePageState
// );

export {
  selectHomePage,
};
