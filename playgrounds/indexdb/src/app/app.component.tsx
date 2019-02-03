import * as React from 'react';

import { GenericObject } from 'src/shared/shared.types';
import * as components from '../components/components.component';

export const App = ({ page }: GenericObject) => {
  const Component = components[page];
  return <Component />;
};

export default App;
