import Home from "pages/home/home.component";
import About from "pages/about/about.component";
import BusinessRegistration from "pages/business-registration/business-registration.container";

export const LOCATION = {
  HOME: "ROUTE_HOME",
  ABOUT: "ROUTE_ABOUT",
  BUSINESS_REGISTRATION: "ROUTE_BUSINESS_REGISTRATION"
};

export const routePathMap = {
  [LOCATION.HOME]: "/",
  [LOCATION.ABOUT]: "/about",
  [LOCATION.BUSINESS_REGISTRATION]: "/register-business"
};

export const routeComponentMap = {
  [LOCATION.HOME]: Home,
  [LOCATION.ABOUT]: About,
  [LOCATION.BUSINESS_REGISTRATION]: BusinessRegistration
};
