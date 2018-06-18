/*
 *
 * ChangeAddressPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Helmet from 'react-helmet';
import { reset } from 'redux-form/immutable';

import { activateModal } from '../App/actions';
import { clearAccountPageState } from '../AccountPage/actions';
import PageHeader from '../../components/PageHeader';
import AddressChange from '../../forms/AddressChange';

export class ChangeAddressPage extends React.Component { // eslint-disable-line
  componentDidMount() {
    this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave);
  }

  componentWillUnmount() {
    this.props.resetForm('addressChange');
    this.props.clearAccountPageState();
  }

  routerWillLeave = (route) => {
    if (this.props.global.formInProgress) {
      // cannot transition
      this.props.activateModal(true, route.pathname, 'Are you sure you want to leave this page?', 'Your progress will not be saved.');
      return false;
    }
    // can transition
    // this.props.resetForm('addressChange');
    return true;
  }

  render() {
    return (
      <div>
        <Helmet title="QuickServe - Change Your Address" />
        <PageHeader subTitle="Use this form to" mainTitle="Change Your Address" />
        <AddressChange
          global={this.props.global} // globalJS
          primary={this.props.primary}
        />
      </div>
    );
  }
}

ChangeAddressPage.propTypes = {
  clearAccountPageState: React.PropTypes.any,
  global: React.PropTypes.object,
  params: React.PropTypes.object,
  policies: React.PropTypes.any,
  primary: React.PropTypes.any,
  activateModal: React.PropTypes.func,
  resetForm: React.PropTypes.func,
  router: React.PropTypes.object,
  route: React.PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {
    activateModal: (bool, path, title, body) => dispatch(activateModal(bool, path, title, body)),
    clearAccountPageState: () => dispatch(clearAccountPageState()),
    resetForm: (formName) => dispatch(reset(formName)),
    dispatch,
  };
}

export default withRouter(connect(null, mapDispatchToProps)(ChangeAddressPage));
