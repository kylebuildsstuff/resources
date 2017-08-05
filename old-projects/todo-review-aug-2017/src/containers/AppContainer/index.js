import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import App from 'components/App';

export class AppContainer extends React.Component {
  render() {
    return (
      <App />
    );
  }
}

export default AppContainer;
