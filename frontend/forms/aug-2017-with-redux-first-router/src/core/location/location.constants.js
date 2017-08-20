import Home from "pages/home/home.component";
import About from "pages/about/about.component";

export const LOCATION = {
  HOME: "ROUTE_HOME",
  ABOUT: "ROUTE_ABOUT",
  ADD_VEHICLE: "ROUTE_ADD_VEHICLE",
  CHANGE_ADDRESS: "ROUTE_CHANGE_ADDRESS"
};

export const routePathMap = {
  [LOCATION.HOME]: "/",
  [LOCATION.ABOUT]: "/about",
  [LOCATION.ADD_VEHICLE]: "/add-vehicle",
  [LOCATION.CHANGE_ADDRESS]: "/change-address"
};

export const routeComponentMap = {
  [LOCATION.HOME]: Home,
  [LOCATION.ABOUT]: About
};
