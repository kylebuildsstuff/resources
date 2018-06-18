/**
*
* FormValues
*
*/

import React from 'react';
import _ from 'lodash';

import FormHeader from '../../components/FormHeader';
import { summaryPageNormalizer as normalize } from './summaryPageNormalizer';
import schema from './schema';

class FormValues extends React.Component {
  renderVehBlockInYMMVINBlock = (vehObj) => { // eslint-disable-line
    return (
      _.map(vehObj, (v) => {  // eslint-disable-line
        const values = normalize(v.values, this.props.primary);
        return (
          <div key={v.meta.vin}>
            <h3>
              {`${v.meta.year} ${v.meta.make.toUpperCase()} ${v.meta.model.toUpperCase()} - ${(v.meta.vin && v.meta.vin.toUpperCase()) || '(No VIN specified)'}`}
            </h3>
            <ul className="form-value-list">
              {values.map((pairing) =>
                <li key={pairing[0]}>
                  <strong>{pairing[0]}: </strong>
                  <span>{pairing[1]}</span>
                </li>
              )}
            </ul>
          </div>
        );
      })
    );
  }

  renderYMMVINBlock = (formValues, autoPolicies) => {
    const formPolicyNumber = formValues.policy_number;
    let policy = autoPolicies.filter((pol) => {
      if (pol.policy_number && (
        pol.policy_number === formPolicyNumber
      )) {
        return true;
      }
      return false;
    });
    policy = policy && policy.length === 1 && policy[0];

    const vehObj = {};
    policy.vehicle.forEach((veh) => {
      vehObj[veh.vehicle_no] = {
        meta: {
          year: veh.vehicle_year,
          make: veh.vehicle_make,
          model: veh.vehicle_model,
          vin: veh.vehicle_vin,
          number: veh.vehicle_no,
        },
        values: [],
      };
    });

    _.forEach(formValues, (val, key) => { // regular forEach only works on Arrays
      const strippedKey = key.slice(7);
      const vehNum = key.slice(4, 6);
      if (!Number.isInteger(Number(vehNum))) {
        return;
      }
      if (_.includes(Object.keys(schema), strippedKey) && (
        schema[strippedKey].formValueCategory === 'YMMVIN'
      )) {
        vehObj[vehNum].values.push(
          [schema[strippedKey].prettified_name, String(val)]
        );
      }
    });
    return (
      <div>
        {this.renderVehBlockInYMMVINBlock(vehObj)}
      </div>
    );
  }

  renderYourNewAddressBlock = (formValues) => {
    let labelValuePairings = [];
    Object.keys(formValues).forEach((keyVal) => {
      if (_.includes(Object.keys(schema), keyVal) && (
        schema[keyVal].formValueCategory === 'yourNewAddress'
      )) {
        labelValuePairings.push(
          [schema[keyVal].prettified_name, formValues[keyVal]]
        );
      }
    });

    labelValuePairings = normalize(labelValuePairings, this.props.primary);
    return (
      <div>
        <h3>Your New Address</h3>
        <ul className="form-value-list">
          {labelValuePairings.map((pairing) =>
            <li key={pairing[0]}>
              <strong>{pairing[0]}: </strong>
              <span>{pairing[1]}</span>
            </li>
          )}
        </ul>
      </div>
    );
  }

  renderOtherBlock = (formValues) => {
    let labelValuePairings = [];
    Object.keys(formValues).forEach((key) => {
      if (_.includes(Object.keys(schema), key) && (
        schema[key].formValueCategory === 'Other'
      )) {
        labelValuePairings.push(
          [schema[key].prettified_name, formValues[key]]
        );
      }
    });
    labelValuePairings = _.sortBy(labelValuePairings, [(pair) => pair[0]]);
    labelValuePairings = normalize(labelValuePairings, this.props.primary);
    return (
      <div>
        <h3>Other</h3>
        <ul className="form-value-list">
          {labelValuePairings.map((pairing) =>
            <li key={pairing[0]}>
              <strong>{pairing[0]}: </strong>
              <span>{pairing[1]}</span>
            </li>
          )}
        </ul>
      </div>
    );
  }

  render() {
    return (
      <div>
        <FormHeader hrd="Address Change Request Details" />
        {this.renderYourNewAddressBlock(this.props.formValues)}
        {this.renderYMMVINBlock(this.props.formValues, this.props.autoPolicies)}
        {this.renderOtherBlock(this.props.formValues)}
      </div>
    );
  }
}

FormValues.propTypes = {
  autoPolicies: React.PropTypes.array,
  fields: React.PropTypes.object,
  formValues: React.PropTypes.object,
  primary: React.PropTypes.any,
};

export default FormValues;
