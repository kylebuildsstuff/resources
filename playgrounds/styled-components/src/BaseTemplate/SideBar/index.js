import React from 'react';
import { Link } from 'react-router';

import Wrapper from './Wrapper';

const SideBar = () => (
  <Wrapper>
    IMA SIDEBAR!!
    <Link to="/about">About</Link>
    <Link to="/login">Login</Link>
    <Link to="/add-vehicle">Add a Vehicle</Link>
    <Link to="/sub-vehicle">Sub a Vehicle</Link>
    <Link to="/change-address">Change Address</Link>
  </Wrapper>
);

export default SideBar;
