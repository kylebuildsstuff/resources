import React, { Component } from 'react';
import Form from './final-forms/AddressChange';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        Home page
        <Form title="Address Change Form" />
      </div>
    );
  }
}

export default Home;
