/*
 *
 * ActivateUserPage
 *
 */

import React from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import auth from '../../utils/authentication';
import PageHeader from '../../components/PageHeader';

export class ActivateUserPage extends React.Component { // eslint-disable-line
  componentWillMount() {
    auth.post('/api/users/activate/', { token: this.props.routeParams.token });
  }
  render() {
    return (
      <div>
        <Helmet title="QuickServe - Account Activation" />
        <PageHeader subTitle="Your account is" mainTitle="Now Active" />
        <p>Your account has been activated.</p>
        <Link className="btn-primary" to="/login">Login</Link>
      </div>
    );
  }
}

ActivateUserPage.propTypes = {
  routeParams: React.PropTypes.any,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapDispatchToProps)(ActivateUserPage);
