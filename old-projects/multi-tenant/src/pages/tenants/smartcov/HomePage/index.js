import React from 'react';

import HomePageStyles from './styles/HomePageStyles'

import Navbar from './components/Navbar';
import Body from './components/Body';
import PhoneNumbers from 'components/PhoneNumbers';

export const HomePage = (props) => {
  return (
    <HomePageStyles>
      <Navbar />
      <Body />
      <PhoneNumbers numbers={props.data} />
    </HomePageStyles>
  );
}

export default HomePage;
