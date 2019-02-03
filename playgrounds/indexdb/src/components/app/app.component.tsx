import * as React from 'react';

import { GenericObject } from 'src/shared/shared.types';
import * as pages from 'src/pages';

export const App = ({ page }: GenericObject) => {
  const Component = pages[page];
  return <Component />;
};

export default App;
