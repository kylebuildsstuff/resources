import React from "react";
import Link from "redux-first-router-link";

import Sidebar from "components/sidebar";
import Header from "components/header";
import { LOCATION } from "core/location/location.constants";

export const About = () => {
  return (
    <div className="w-100 flex flex-column justify-start items-center">
      <Header />
      <div className="w-100 flex flex-row justify-start items-center">
        <Sidebar />
        <div className="flex flex-column">
          AboutBody
          <Link to={{ type: LOCATION.HOME }}>HOME</Link>
        </div>
      </div>
    </div>
  );
};

export default About;
