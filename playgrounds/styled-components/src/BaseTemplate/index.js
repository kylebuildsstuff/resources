import React from 'react';

import Header from './Header';
import SideBar from './SideBar';
import Body from './Body';
import Footer from './Footer';

import BaseWrapper from './BaseWrapper';
import MiddleWrapper from './MiddleWrapper';

const BaseTemplate = () => (
  <BaseWrapper>
    <Header />
    <MiddleWrapper>
      <SideBar />
      <Body />
    </MiddleWrapper>
  </BaseWrapper>
)

export default BaseTemplate;
