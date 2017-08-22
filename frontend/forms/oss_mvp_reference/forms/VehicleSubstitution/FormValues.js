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

class FormValues extends React.Component { // eslint-disable-line
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

  renderYMMVINBlock = (formValues) => {
    let labelValuePairings = [];
    Object.keys(formValues).forEach((key) => {
      if (_.includes(Object.keys(schema), key) && (
        schema[key].formValueCategory === 'YMMVIN'
      )) {
        labelValuePairings.push(
          [schema[key].prettified_name, String(formValues[key])]
        );
      }
    });
    labelValuePairings = _.sortBy(labelValuePairings, [(pair) => pair[0]]);
    labelValuePairings = normalize(labelValuePairings, this.props.primary);
    return (
      <div>
        <h3>
          {`${formValues.adding_vehicle_year} ${formValues.adding_vehicle_make.toUpperCase()} ${formValues.adding_vehicle_model.toUpperCase()} - ${(formValues.adding_vin && formValues.adding_vin.toUpperCase()) || '(No VIN specified)'}`}
        </h3>
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
        <FormHeader hrd="Vehicle Addition Request Details" />
        {this.renderOtherBlock(this.props.formValues)}
        {this.renderYMMVINBlock(this.props.formValues)}
      </div>
    );
  }
}

FormValues.propTypes = {
  policy: React.PropTypes.array,
  fields: React.PropTypes.object,
  formValues: React.PropTypes.any,
  primary: React.PropTypes.any,
  autoPolicies: React.PropTypes.any,
};

export default FormValues;
