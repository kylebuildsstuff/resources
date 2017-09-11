import React from "react";
import "tachyons";

import { routeComponentMap } from "modules/location/location.constants";

export const AppComponent = props => {
  const Page = routeComponentMap[props.location.type];
  return <Page {...props} />;
};

export default AppComponent;
