/*
 *
 * AccountVehicleSubPage
 *
 */

import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { reset } from 'redux-form/immutable';
import Helmet from 'react-helmet';

import { activateModal } from '../App/actions';
import { clearAccountPageState } from '../AccountPage/actions';
import VehicleSubstitution from '../../forms/VehicleSubstitution';
import PageHeader from '../../components/PageHeader';

export class AccountVehicleSubPage extends React.Component { // eslint-disable-line
  componentDidMount() {
    this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave);
  }

  componentWillUnmount() {
    this.props.resetForm('vehicleSubstitution');
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
    let v;
    let policy;

    if (!this.props.params.vehicle_id) {
      // user arrived with no route params
      v = false;
      policy = false;
    } else {
      policy = this.props.policies.filter(pol => {
        if (pol.line_of_business === 'auto') {
          return pol.vehicle.some(veh => veh.vehicle_no === this.props.params.vehicle_id);
        }
        return false;
      }).find(pol => pol);

      v = policy.vehicle.find(veh =>
        veh.vehicle_no === this.props.params.vehicle_id
      );
    }

    return (
      <div>
        <Helmet title="QuickServe - Replace a Vehicle" />
        <PageHeader subTitle="Use this form to" mainTitle="Replace a Vehicle" />
        {
          v ? (
            <p>
              In order to replace a vehicle to your policy, insurance companies require us to ask questions not only about your vehicle, but also any changes to vehicle use and drivers.
            </p>
          ) : (
            <p>
              No vehicle detected<br />
              Please select a vehicle in the form.
            </p>
          )
        }
        <VehicleSubstitution
          global={this.props.global} // globalJS
          primary={this.props.primary}
          policy={policy}
          vehicle={v}
        />
      </div>
    );
  }
}

AccountVehicleSubPage.propTypes = {
  clearAccountPageState: React.PropTypes.any,
  params: React.PropTypes.object,
  primary: React.PropTypes.any,
  resetForm: React.PropTypes.any,
  policies: React.PropTypes.any,
  global: React.PropTypes.any,
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

export default withRouter(connect(null, mapDispatchToProps)(AccountVehicleSubPage));
