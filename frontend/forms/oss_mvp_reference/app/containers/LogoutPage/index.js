/*
 *
 * LogoutPage
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import selectLogoutPage from './selectors';
import { logout } from '../App/actions';

export class LogoutPage extends React.Component { // eslint-disable-line

  componentWillMount() {
    this.props.logout();
  }

  render() {
    return (
      <div>
        <Helmet title="QuickServe - Logged Out" />
        <h3>Logged out</h3>
        <p>You have successfully logged out.</p>
        <p><Link className="btn" to="/">Go Home</Link></p>
      </div>
    );
  }
}

LogoutPage.propTypes = {
  logout: React.PropTypes.func,
};

const mapStateToProps = selectLogoutPage();

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutPage);
