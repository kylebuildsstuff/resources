import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import ModalSwitch from '../ModalSwitch';

export const ModalGallery = () => {
  return (
    <Router>
      <Route component={ModalSwitch} />
    </Router>
  );
}

export default ModalGallery;
