/**
*
* PageOne
*
*/

import React from 'react';
import { reduxForm } from 'redux-form/immutable';

import validate from './validate';
import InitialFields from './fields/InitialFields';
import VehicleBeingAddedFields from './fields/VehicleBeingAddedFields';
import VehicleBeingReplacedFields from './fields/VehicleBeingReplacedFields';
import DriverInformationFields from './fields/DriverInformationFields';
import LessorLienInfoFields from './fields/LessorLienInfoFields';
import VehCoverageFields from './fields/VehCoverageFields';
import schema from './schema';

class PageOne extends React.Component { // eslint-disable-line
  componentDidMount() {
    this.props.setFormInProgress(true);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.getFormValues !== this.props.getFormValues) {
      let usage;
      switch (this.props.vehicle.vehicle_use_cd) {
        case 'C': usage = 'commuting';
          break;
        case 'B': usage = 'business';
          break;
        default: usage = 'pleasure';
      }

      this.props.autofill(
        schema.removing_vehicle.name,
        this.props.getFormValues.get(schema.removing_vehicle.name) ||
        this.props.vehicle.id
      );
      this.props.autofill(
        schema.registered_province.name,
        this.props.getFormValues.get(schema.registered_province.name) ||
        this.props.policy.province
      );
      this.props.autofill(
        schema.vehicle_usage.name,
        this.props.getFormValues.get(schema.vehicle_usage.name) ||
        usage
      );
      this.props.autofill(
        schema.vehicle_daily_kms.name,
        this.props.getFormValues.get(schema.vehicle_daily_kms.name) ||
        this.props.vehicle.commute_distance
      );
      this.props.autofill(
        schema.vehicle_annual_kms.name,
        this.props.getFormValues.get(schema.vehicle_annual_kms.name) ||
        this.props.vehicle.annual_distance
      );

      // this.props.autofill(
      //   schema.endorsement_depreciation.name,
      //   this.props.getFormValues.get(schema.endorsement_depreciation.name) ||
      //   false
      // );
    }
  }

  returnValidAutoPolicies = (policies) => {
    const validPolicies = [];
    policies.map((policy) => { // eslint-disable-line
      if (policy.type === 'auto') {
        validPolicies.push(policy);
      }
    });
    return validPolicies;
  }

  changeField = (name, value) => {
    // needs this wrapper to keep 'this' context consistent
    this.props.change(name, value);
  }

  handleClick = () => {
    window.setTimeout(() => {
      // wait one tick so DOM loads
      if (document.getElementById('app').getElementsByClassName('form-group invalid')[0]) {
        document.getElementById('app').getElementsByClassName('form-group invalid')[0].scrollIntoView();
      }
    }, 1);
  }

  render() {
    const {
      addresses,
      fetchAddresses,
      fetchVehMakes,
      fetchVehModels,
      getFormValues,
      handleSubmit,
      policy,
      policies,
      primary,
      pristine,
      submitting,
      triggerVehRepFormGenericMsgBool,
      vehMakes,
      vehModels,
      vehicle,
    } = this.props;
    const autoPolicies = this.returnValidAutoPolicies(policies);
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <InitialFields
            autoPolicies={autoPolicies}
            changeField={this.changeField}
            getFormValues={getFormValues}
            policies={policies}
            primary={primary}
          />
          <VehicleBeingReplacedFields
            changeField={this.changeField}
            getFormValues={getFormValues}
            policies={policies}
            triggerVehRepFormGenericMsgBool={triggerVehRepFormGenericMsgBool}
            vehicle={vehicle || {}}
          />
          <VehicleBeingAddedFields
            changeField={this.changeField}
            getFormValues={getFormValues}
            fetchVehMakes={fetchVehMakes}
            fetchVehModels={fetchVehModels}
            policies={policies}
            triggerVehRepFormGenericMsgBool={triggerVehRepFormGenericMsgBool}
            vehMakes={vehMakes}
            vehModels={vehModels}
          />
          <DriverInformationFields
            changeField={this.changeField}
            getFormValues={getFormValues}
            policies={policies}
            triggerVehRepFormGenericMsgBool={triggerVehRepFormGenericMsgBool}
          />
          <LessorLienInfoFields
            addresses={addresses}
            changeField={this.changeField}
            fetchAddresses={fetchAddresses}
            getFormValues={getFormValues}
            policy={policy}
            policies={policies}
            triggerVehRepFormGenericMsgBool={triggerVehRepFormGenericMsgBool}
          />
          <VehCoverageFields
            changeField={this.changeField}
            getFormValues={getFormValues}
            policies={policies}
            triggerVehRepFormGenericMsgBool={triggerVehRepFormGenericMsgBool}
          />
        </div>

        <div className="btn-group btn-group-float-right">
          <button
            type="submit"
            onClick={this.handleClick}
            disabled={pristine || submitting}
            className="btn-primary"
          >
              Next
          </button>
        </div>
      </form>
    );
  }
}

PageOne.propTypes = {
  policies: React.PropTypes.any,
  autofill: React.PropTypes.any,
  policy: React.PropTypes.any,
  handleSubmit: React.PropTypes.func,
  previousPage: React.PropTypes.func,
  pristine: React.PropTypes.bool,
  submitting: React.PropTypes.bool,
  fetchVehMakes: React.PropTypes.func,
  fetchVehModels: React.PropTypes.func,
  fetchAddresses: React.PropTypes.func,
  vehMakes: React.PropTypes.any,
  vehModels: React.PropTypes.any,
  getFormValues: React.PropTypes.any,
  addresses: React.PropTypes.any,
  vehicle: React.PropTypes.any,
  change: React.PropTypes.any,
  changeField: React.PropTypes.any,
  initialize: React.PropTypes.any,
  primary: React.PropTypes.any,
  setFormInProgress: React.PropTypes.any,
  triggerVehRepFormGenericMsgBool: React.PropTypes.any,
};

export default reduxForm({
  form: 'vehicleSubstitution',
  destroyOnUnmount: false,
  validate,
})(PageOne);
