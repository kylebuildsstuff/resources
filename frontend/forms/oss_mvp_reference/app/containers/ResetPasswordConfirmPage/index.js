/*
 *
 * ResetPasswordConfirmPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import ConfirmPasswordReset from '../../forms/ConfirmPasswordReset';
import { confirmResetPassword } from './actions';
import PageHeader from '../../components/PageHeader';
import selectResetPasswordConfirmPage from './selectors';

export class ResetPasswordConfirmPage extends React.Component { // eslint-disable-line
  confirm = (values) => {
    const uuid = this.props.routeParams.uuid;
    const token = this.props.routeParams.token;
    return new Promise((resolve, reject) => {
      this.props.confirm(values, uuid, token, resolve, reject);
    });
  }

  render() {
    return (
      <div>
        <Helmet title="QuickServe - Confirm Password Reset" />
        <PageHeader subTitle="Use this form to" mainTitle="Select a new Password" />
        <p>If you can't remember your password, we can fix that. Just tell us the new one below</p>
        <ConfirmPasswordReset onSubmit={this.confirm} />
      </div>
    );
  }
}

ResetPasswordConfirmPage.propTypes = {
  routeParams: React.PropTypes.object,
  confirm: React.PropTypes.func,
};

const mapStateToProps = selectResetPasswordConfirmPage();

function mapDispatchToProps(dispatch) {
  return {
    confirm: (values, uuid, token, resolve, reject) => dispatch(confirmResetPassword(values, uuid, token, resolve, reject)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordConfirmPage);
