import Home from "pages/home/home.component";
import About from "pages/about/about.component";
import VehicleAdd from "pages/vehicle-add/vehicle-add.container";

export const LOCATION = {
  HOME: "ROUTE_HOME",
  ABOUT: "ROUTE_ABOUT",
  VEHICLE_ADD: "ROUTE_VEHICLE_ADD",
  ADDRESS_CHANGE: "ROUTE_ADDRESS_CHANGE"
};

export const routePathMap = {
  [LOCATION.HOME]: "/",
  [LOCATION.ABOUT]: "/about",
  [LOCATION.VEHICLE_ADD]: "/add-vehicle",
  [LOCATION.ADDRESS_CHANGE]: "/change-address"
};

export const routeComponentMap = {
  [LOCATION.HOME]: Home,
  [LOCATION.ABOUT]: About,
  [LOCATION.VEHICLE_ADD]: VehicleAdd
};
