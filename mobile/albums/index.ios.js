import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import Header from './src/components/header';

const App = () => {
  return (
    <Header />
  );
};

AppRegistry.registerComponent('albums', () => App);
