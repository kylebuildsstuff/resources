import React from 'react';
import { Match } from 'react-router';

import About from '../../infoPages/About';
import Login from '../../forms/Login';
import VehAddForm from '../../forms/VehAddForm';
import VehSubForm from '../../forms/VehSubForm';
import AddressChangeForm from '../../forms/AddressChangeForm';
import Footer from '../Footer';

const Body = () => (
  <div>
    <Match pattern="/about" component={About} />
    <Match pattern="/login" component={Login} />
    <Match pattern="/add-vehicle" component={VehAddForm} />
    <Match pattern="/sub-vehicle" component={VehSubForm} />
    <Match pattern="/change-address" component={AddressChangeForm} />

    <div>
      <Footer />
    </div>
  </div>
)

export default Body;
