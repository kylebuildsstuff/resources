/**
*
* CoverageFields
*
*/

import React from 'react';
import { Field } from 'redux-form/immutable';

import FormHeader from '../../../components/FormHeader';
import schema from '../schema';
import Select from '../../../utils/forms/Select';
import CheckboxInput from '../../../utils/forms/CheckboxInput';
import {
  liabilityLimits,
} from '../../../utils/forms/values';
import {
  VEHICLE_CONDITIONS,
} from '../../../utils/forms/constants';

function CoverageFields(props) {
  return (
    <div>
      <FormHeader hdr="Coverage" />
      {props.getFormValues ? (
        <div className="form-block">
          <Field
            component={Select}
            label={schema.coverage_liability.label}
            name={`veh_${props.vehicle.vehicle_no}_${schema.coverage_liability.name}`}
            placeholder={schema.coverage_liability.placeholder}
            helpText={schema.coverage_liability.helpText}
            isRequired={schema.coverage_liability.required}
            valuesList={liabilityLimits}
          />
          <div className="checkbox-group">
            <Field
              changeField={props.changeField}
              component={CheckboxInput}
              defaultOverride
              label={schema.coverage_collision.label}
              name={`veh_${props.vehicle.vehicle_no}_${schema.coverage_collision.name}`}
              placeholder={schema.coverage_collision.placeholder}
              helpText={schema.coverage_collision.helpText}
            />
            <Field
              changeField={props.changeField}
              component={CheckboxInput}
              defaultOverride
              label={schema.coverage_comprehensive.label}
              name={`veh_${props.vehicle.vehicle_no}_${schema.coverage_comprehensive.name}`}
              placeholder={schema.coverage_comprehensive.placeholder}
              helpText={schema.coverage_comprehensive.helpText}
            />
            <Field
              changeField={props.changeField}
              component={CheckboxInput}
              defaultOverride
              label={schema.endorsement_loss_of_use.label}
              name={`veh_${props.vehicle.vehicle_no}_${schema.endorsement_loss_of_use.name}`}
              placeholder={schema.endorsement_loss_of_use.placeholder}
              helpText={schema.endorsement_loss_of_use.helpText}
            />
            <Field
              changeField={props.changeField}
              component={CheckboxInput}
              defaultOverride
              label={schema.endorsement_non_owned_autos.label}
              name={`veh_${props.vehicle.vehicle_no}_${schema.endorsement_non_owned_autos.name}`}
              placeholder={schema.endorsement_non_owned_autos.placeholder}
              helpText={schema.endorsement_non_owned_autos.helpText}
            />
            {props.vehicle.new_used_cd === VEHICLE_CONDITIONS.new ? (
              <Field
                absoluteOverride
                changeField={props.changeField}
                component={CheckboxInput}
                label={schema.endorsement_depreciation.label}
                name={`veh_${props.vehicle.vehicle_no}_${schema.endorsement_depreciation.name}`}
                placeholder={schema.endorsement_depreciation.placeholder}
                helpText={schema.endorsement_depreciation.helpText}
              />
            ) : ''}
            <Field
              changeField={props.changeField}
              component={CheckboxInput}
              defaultOverride={false}
              label={schema.endorsement_accident.label}
              name={`veh_${props.vehicle.vehicle_no}_${schema.endorsement_accident.name}`}
              placeholder={schema.endorsement_accident.placeholder}
              helpText={schema.endorsement_accident.helpText}
            />
            <Field
              changeField={props.changeField}
              component={CheckboxInput}
              defaultOverride={false}
              label={schema.endorsement_conviction.label}
              name={`veh_${props.vehicle.vehicle_no}_${schema.endorsement_conviction.name}`}
              placeholder={schema.endorsement_conviction.placeholder}
              helpText={schema.endorsement_conviction.helpText}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

CoverageFields.propTypes = {
  getFormValues: React.PropTypes.any,
  fetchAddresses: React.PropTypes.any,
  addresses: React.PropTypes.any,
  change: React.PropTypes.any,
  vehicle: React.PropTypes.any,
  policy: React.PropTypes.any,
  changeField: React.PropTypes.any,
};

export default CoverageFields;
