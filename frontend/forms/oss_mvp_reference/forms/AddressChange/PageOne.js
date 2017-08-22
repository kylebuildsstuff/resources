/**
*
* PageOne
*
*/

import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';

import FormHeader from '../../components/FormHeader';
import validate from './validate';
import InitialFields from './fields/InitialFields';
import NewAddressFields from './fields/NewAddressFields';
import VehicleInformationFields from './fields/VehicleInformationFields';
import DriverInformationFields from './fields/DriverInformationFields';
import CoverageFields from './fields/CoverageFields';
import FormSubHeader from '../../components/FormSubHeader';
import {
  vehicleString,
} from '../../utils/helpers';
import schema from './schema';

class PageOne extends React.Component { // eslint-disable-line
  componentDidMount() {
    this.props.setFormInProgress(true);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.getFormValues !== this.props.getFormValues) {
      if (this.props.autoPolicies) {
        this.policy.vehicle.forEach((veh) => {
          let usage;
          switch (veh.vehicle_use_cd) {
            case 'C': usage = 'commuting';
              break;
            case 'B': usage = 'business';
              break;
            default: usage = 'pleasure';
          }

          veh.coverages.forEach((coverage) => {
            if (coverage.code === 'TPPD') {
              if (coverage.limit_amount) {
                this.props.autofill(
                  `veh_${veh.vehicle_no}_${schema.coverage_liability.name}`,
                  this.props.getFormValues.get(
                    `veh_${veh.vehicle_no}_${schema.coverage_liability.name}`
                  ) || coverage.limit_amount || 2000000
                );
              }
            }
          });

          this.props.autofill(
            `veh_${veh.vehicle_no}_${schema.vin.name}`,
            veh.vehicle_vin || ''
          );
          this.props.autofill(
            `veh_${veh.vehicle_no}_${schema.vehicle_usage.name}`,
             this.props.getFormValues.get(
              `veh_${veh.vehicle_no}_${schema.vehicle_usage.name}`
            ) || usage
          );
        });
      }
    }
  }

  changeField = (name, value) => {
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
      autoPolicies,
      policies,
      fetchAddresses,
      getFormValues,
      handleSubmit,
      pristine,
      submitting,
      primary,
    } = this.props;
    const policyNumber = this.props.getFormValues.get('policy_number');
    const policy = this.props.policies.filter((pol) => {
      if (pol.policy_number && (pol.policy_number === policyNumber)) {
        return true;
      }
      return false;
    });
    this.policy = policy[0] || '';
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <InitialFields
            policies={policies}
            primary={primary}
            changeField={this.changeField}
            autoPolicies={autoPolicies}
            getFormValues={getFormValues}
          />
        </div>
        <div>
          <NewAddressFields
            addresses={addresses}
            changeField={this.changeField}
            fetchAddresses={fetchAddresses}
            getFormValues={getFormValues}
            policies={policies}
          />
        </div>
        <FormHeader hdr="Confirm Vehicle Details" />
        <p>You may wonder why we’re asking the questions below. We need the following information to ensure you have the right coverage based on your location. Any time an address is changed, insurance companies require we update your driver and vehicle information as well.</p>
        {
          this.policy && this.policy.vehicle.map((veh) => { // eslint-disable-line
            return (
              <div key={veh.vehicle_no}>
                <FormSubHeader hdr={`${vehicleString(veh)} - VIN ${veh.vehicle_vin}`} />
                <VehicleInformationFields
                  changeField={this.changeField}
                  policies={this.props.policies}
                  policy={this.policy}
                  getFormValues={getFormValues}
                  vehicle={veh}
                  {...this.props}
                />
                <DriverInformationFields
                  changeField={this.changeField}
                  policies={this.props.policies}
                  getFormValues={getFormValues}
                  vehicle={veh}
                  {...this.props}
                />
                <CoverageFields
                  changeField={this.changeField}
                  policies={this.props.policies}
                  getFormValues={getFormValues}
                  vehicle={veh}
                  {...this.props}
                />
              </div>
            );
          })
        }
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
  policy: React.PropTypes.any,
  autoPolicies: React.PropTypes.any,
  submitting: React.PropTypes.bool,
  primary: React.PropTypes.object,
  fetchVehMakes: React.PropTypes.func,
  fetchVehModels: React.PropTypes.func,
  fetchAddresses: React.PropTypes.func,
  vehMakes: React.PropTypes.any,
  vehModels: React.PropTypes.any,
  getFormValues: React.PropTypes.any,
  addresses: React.PropTypes.any,
  vehicle: React.PropTypes.any,
  setFormInProgress: React.PropTypes.func,
  change: React.PropTypes.any,
  triggerAddChangeFormGenericMsgBool: React.PropTypes.any,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default reduxForm({
  form: 'addressChange',
  destroyOnUnmount: false,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate,
})(connect(null, mapDispatchToProps)(PageOne));
