import React from "react";
import "tachyons";

import { routeComponentMap } from "modules/location/location.constants";

export const AppComponent = ({ location }) => {
  const Page = routeComponentMap[location.type];
  return <Page location={location} />;
};

export default AppComponent;
