import { GenericObject } from 'src/shared/shared.types';

import { routeComponentMappings } from './routes.constants';

export const pageReducer = (state = 'Home', action: GenericObject = {}) =>
  routeComponentMappings[action.type] || state;
