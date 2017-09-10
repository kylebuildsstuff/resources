import React from 'react';

import HomePageStyles from './styles/HomePageStyles'

import Navbar from './components/Navbar';
import Body from './components/Body';
import PhoneNumbers from 'components/PhoneNumbers'

export class HomePage extends React.Component {
  render() {
    return (
      <HomePageStyles>
        <Navbar />
        <Body />
        <PhoneNumbers numbers={this.props.data} />
      </HomePageStyles>
    );
  }
}

export default HomePage;
