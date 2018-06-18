import Home from "modules/home/home.component";

export const LOCATION = {
  HOME: "ROUTE_HOME"
};

export const routePathMap = {
  [LOCATION.HOME]: "/"
};

export const routeComponentMap = {
  [LOCATION.HOME]: Home
};
