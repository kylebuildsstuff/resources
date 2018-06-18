/*
 *
 * AccountVehicleAddPage
 *
 */

import React from 'react';
import { Link, withRouter } from 'react-router';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { reset } from 'redux-form/immutable';

import { activateModal } from '../App/actions';
import { clearAccountPageState } from '../AccountPage/actions';
import VehicleAddition from '../../forms/VehicleAddition';
import PageHeader from '../../components/PageHeader';
import LoadingSpinner from '../../containers/LoadingSpinner';

export class AccountVehicleAddPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave);
  }

  componentWillUnmount() {
    this.props.resetForm('vehicleAddition');
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
    if (!this.props.policies) {
      return <LoadingSpinner />;
    }

    return (
      <div>
        <Helmet title="QuickServe - Add a Vehicle" />
        <Link className="btn-small" to="/account/auto">Return to vehicle list</Link>
        <PageHeader subTitle="Use this form to" mainTitle="Add a Vehicle" />
        <p>
          In order to add a vehicle to your policy, insurance companies require us to ask questions not only about your vehicle, but also any changes to vehicle use and drivers.
        </p>
        <VehicleAddition
          global={this.props.global} // globalJS
          primary={this.props.primary}
        />
      </div>
    );
  }
}

AccountVehicleAddPage.propTypes = {
  clearAccountPageState: React.PropTypes.any,
  params: React.PropTypes.object,
  policies: React.PropTypes.any,
  primary: React.PropTypes.any,
  global: React.PropTypes.any,
  resetForm: React.PropTypes.any,
  router: React.PropTypes.object,
  route: React.PropTypes.object,
  activateModal: React.PropTypes.func,
};


function mapDispatchToProps(dispatch) {
  return {
    activateModal: (bool, path, title, body) => dispatch(activateModal(bool, path, title, body)),
    clearAccountPageState: () => dispatch(clearAccountPageState()),
    resetForm: (formName) => dispatch(reset(formName)),
  };
}

export default withRouter(connect(null, mapDispatchToProps)(AccountVehicleAddPage));
