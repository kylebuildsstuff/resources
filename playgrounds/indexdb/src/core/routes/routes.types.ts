export enum ROUTE_ACTION_TYPES {
  HOME = 'HOME',
  ABOUT = 'ABOUT',
  USER = 'USER',
  NESTED = 'NESTED',
}

export enum PAGES {
  HOME = 'Home',
  ABOUT = 'About',
  USER = 'User',
  NESTED = 'Nested',
}

export interface RouteAction {
  type: ROUTE_ACTION_TYPES;
  payload?: any;
}
