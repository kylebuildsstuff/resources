import React from 'react';

import HomePageStyles from './styles/HomePageStyles'

import Navbar from './components/Navbar';
import Body from './components/Body';
// import UniqueDrisi from './components/UniqueDrisi'

export const HomePage = () => {
  return (
    <HomePageStyles>
      <Navbar />
      <Body />
    </HomePageStyles>
  );
}

export default HomePage;
