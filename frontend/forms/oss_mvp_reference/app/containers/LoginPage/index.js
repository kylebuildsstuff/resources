/*
 *
 * LoginPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { selectGlobalJS } from '../App/selectors';
import Login from '../../forms/Login';
import { login } from '../App/actions';
import PageHeader from '../../components/PageHeader';
import LoggedIn from '../../components/LoggedIn';
import KbPromo from '../../components/KbPromo';
import { forwardTo } from '../../utils/helpers';

export class LoginPage extends React.Component { // eslint-disable-line
  componentDidMount() {
    if (this.props.health === false) {
      forwardTo('/maintenance', 0);
    }
  }
  login = (values) => { // eslint-disable-line
    return new Promise((resolve, reject) => {
      this.props.login(values, resolve, reject);
    });
  }

  render() {
    return (
      <div>
        <Helmet title="QuickServe - Log In" />
        <PageHeader subTitle="QuickServe" mainTitle="Log In Now" />
        <p>Welcome back! Log in to your <strong>QuickServe</strong> account below.</p>
        {this.props.authed ? <LoggedIn /> : <Login onSubmit={this.login} />}
        <KbPromo />
      </div>
    );
  }
}

LoginPage.propTypes = {
  login: React.PropTypes.func,
  authed: React.PropTypes.bool,
  health: React.PropTypes.bool,
};

const mapStateToProps = selectGlobalJS();

function mapDispatchToProps(dispatch) {
  return {
    login: (values, resolve, reject) => dispatch(login(values, resolve, reject)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
