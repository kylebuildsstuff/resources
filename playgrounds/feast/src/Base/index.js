import React from 'react';

import Header from './Header';
import SideBar from './SideBar';
import Body from './Body';
import Footer from './Footer';

import {
  OutestWrapper,
  SideBarBodyWrapper,
} from './styles'

const Base = () => (
  <OutestWrapper>
    <Header />
    <SideBarBodyWrapper>
      <SideBar />
      <Body />
    </SideBarBodyWrapper>
    <Footer />
  </OutestWrapper>
);

export default Base;
