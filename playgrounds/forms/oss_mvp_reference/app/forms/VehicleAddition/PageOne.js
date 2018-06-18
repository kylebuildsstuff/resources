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
import DriverInformationFields from './fields/DriverInformationFields';
import LessorLienInfoFields from './fields/LessorLienInfoFields';
import VehCoverageFields from './fields/VehCoverageFields';
import schema from './schema';

class PageOne extends React.Component {
  // eslint-disable-line
  componentDidMount() {
    this.props.setFormInProgress(true);
  }

  componentDidUpdate(prevProps) {
    // Using componentDidUpdate rather than componentDidMount because getFormValues is passed as undefined initially and doesn't update, which errors out other fields that relies on getFormValues being a Map... would be nice to fix this hack.
    if (prevProps.getFormValues !== this.props.getFormValues) {
      const policyNumber = this.props.getFormValues.get('policy_number');
      let policy = this.props.policies.filter(pol => {
        if (pol.policy_number && pol.policy_number === policyNumber) {
          return true;
        }
        return false;
      });
      policy = policy[0] || '';

      this.props.autofill(
        schema.registered_province.name,
        this.props.getFormValues.get(schema.registered_province.name) ||
          policy.province,
      );
    }
  }

  returnValidAutoPolicies = policies => {
    const validPolicies = [];
    policies.map(policy => {
      // eslint-disable-line
      if (policy.type === 'auto') {
        validPolicies.push(policy);
      }
    });
    return validPolicies;
  };

  changeField = (name, value) => {
    this.props.change(name, value);
  };

  handleClick = () => {
    window.setTimeout(() => {
      // wait one tick so DOM loads
      if (
        document
          .getElementById('app')
          .getElementsByClassName('form-group invalid')[0]
      ) {
        document
          .getElementById('app')
          .getElementsByClassName('form-group invalid')[0]
          .scrollIntoView();
      }
    }, 1);
  };

  render() {
    const {
      addresses,
      fetchAddresses,
      fetchVehMakes,
      fetchVehModels,
      getFormValues,
      handleSubmit,
      policies,
      primary,
      pristine,
      submitting,
      vehMakes,
      vehModels,
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
          <VehicleBeingAddedFields
            changeField={this.changeField}
            getFormValues={getFormValues}
            fetchVehMakes={fetchVehMakes}
            fetchVehModels={fetchVehModels}
            policies={policies}
            vehMakes={vehMakes}
            vehModels={vehModels}
          />
          <DriverInformationFields
            getFormValues={getFormValues}
            policies={policies}
          />
          <LessorLienInfoFields
            addresses={addresses}
            changeField={this.changeField}
            fetchAddresses={fetchAddresses}
            getFormValues={getFormValues}
            policies={policies}
          />
          <VehCoverageFields
            changeField={this.changeField}
            getFormValues={getFormValues}
            policies={policies}
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
  change: React.PropTypes.any,
  policy: React.PropTypes.any,
  primary: React.PropTypes.any,
  initialize: React.PropTypes.any,
  setFormInProgress: React.PropTypes.any,
};

export default reduxForm({
  form: 'vehicleAddition',
  destroyOnUnmount: false,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate,
})(PageOne);
