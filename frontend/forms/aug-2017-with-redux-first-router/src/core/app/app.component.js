import React from "react";
import "tachyons";

import { routeComponentMap } from "core/location/location.constants";
import NotFound from "pages/not-found/not-found.component";

export const AppComponent = ({ location }) => {
  const Page = routeComponentMap[location.type] || NotFound;
  return <Page location={location} />;
};

export default AppComponent;
