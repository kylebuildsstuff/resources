import { ROUTE_ACTION_TYPES, PAGES } from './routes.types';

export const appRoutes = {
  [ROUTE_ACTION_TYPES.HOME]: '/',
  [ROUTE_ACTION_TYPES.ABOUT]: '/about',
  [ROUTE_ACTION_TYPES.USER]: '/user/:userId',
  [ROUTE_ACTION_TYPES.NESTED]: '/nested/nestedOne/nestedTwo',
};

export const routeComponentMappings = {
  [ROUTE_ACTION_TYPES.HOME]: PAGES.HOME,
  [ROUTE_ACTION_TYPES.ABOUT]: PAGES.ABOUT,
  [ROUTE_ACTION_TYPES.USER]: PAGES.USER,
  [ROUTE_ACTION_TYPES.NESTED]: PAGES.NESTED,
};

export default appRoutes;
