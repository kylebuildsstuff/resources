import React from "react";
import Link from "redux-first-router-link";

import Sidebar from "components/sidebar";
import Header from "components/header";
import { LOCATION } from "core/location/location.constants";

export const Home = () => {
  return (
    <div className="w-100 flex flex-column justify-start items-center">
      <Header />
      <div className="w-100 flex flex-row justify-start items-center">
        <Sidebar />
        <div className="flex flex-column">
          HomeBody
          <Link to={{ type: LOCATION.ABOUT }}>ABOUT</Link>
          <Link to={{ type: LOCATION.BUSINESS_REGISTRATION }}>
            REGISTER BUSINESS FORM
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
