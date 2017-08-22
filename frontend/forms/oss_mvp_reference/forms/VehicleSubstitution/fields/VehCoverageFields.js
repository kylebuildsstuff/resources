/**
*
* VehCoverageFields
*
*/

import React from 'react';
import { Field } from 'redux-form/immutable';

import FormHeader from '../../../components/FormHeader';
import Select from '../../../utils/forms/Select';
import CheckboxInput from '../../../utils/forms/CheckboxInput';
import {
  liabilityLimits,
} from '../../../utils/forms/values';
import {
  VEHICLE_CONDITIONS,
} from '../../../utils/forms/constants';
import schema from '../schema';

function VehCoverageFields(props) {
  const coverageCollision = props.getFormValues.get(schema.coverage_collision.name);
  const coverageComprehensive = props.getFormValues.get(schema.coverage_comprehensive.name);
  const endorsementLossOfUse = props.getFormValues.get(schema.endorsement_loss_of_use.name);
  const endorsementNonOwnedAutos = props.getFormValues.get(schema.endorsement_non_owned_autos.name);
  const endorsementDepreciation = props.getFormValues.get(schema.endorsement_depreciation.name);
  const endorsementAccident = props.getFormValues.get(schema.endorsement_accident.name);
  const endorsementConviction = props.getFormValues.get(schema.endorsement_conviction.name);
  return (
    <div>
      <FormHeader hdr="Coverage" />
      {props.getFormValues ? (
        <div>
          <Field
            component={Select}
            label={schema.coverage_liability.label}
            name={schema.coverage_liability.name}
            helpText={schema.coverage_liability.helpText}
            placeholder={schema.coverage_liability.placeholder}
            isRequired={schema.coverage_liability.required}
            type={schema.coverage_liability.type}
            valuesList={liabilityLimits}
            defaultOverride={props.getFormValues.get(schema.coverage_liability.name) || 2000000}
            changeField={props.changeField}
          />
          <div className="checkbox-group">
            <Field
              changeField={props.changeField}
              component={CheckboxInput}
              defaultOverride={coverageCollision === undefined ? true : coverageCollision}
              label={schema.coverage_collision.label}
              name={schema.coverage_collision.name}
              helpText={schema.coverage_collision.helpText}
              placeholder={schema.coverage_collision.placeholder}
            />
            <Field
              changeField={props.changeField}
              component={CheckboxInput}
              defaultOverride={coverageComprehensive === undefined ? true : coverageComprehensive}
              label={schema.coverage_comprehensive.label}
              name={schema.coverage_comprehensive.name}
              helpText={schema.coverage_comprehensive.helpText}
              placeholder={schema.coverage_comprehensive.placeholder}
            />
            <Field
              changeField={props.changeField}
              component={CheckboxInput}
              defaultOverride={endorsementLossOfUse === undefined ? true : endorsementLossOfUse}
              label={schema.endorsement_loss_of_use.label}
              name={schema.endorsement_loss_of_use.name}
              helpText={schema.endorsement_loss_of_use.helpText}
              placeholder={schema.endorsement_loss_of_use.placeholder}
            />

            <Field
              changeField={props.changeField}
              component={CheckboxInput}
              defaultOverride={endorsementNonOwnedAutos === undefined ? true : endorsementNonOwnedAutos}
              label={schema.endorsement_non_owned_autos.label}
              name={schema.endorsement_non_owned_autos.name}
              helpText={schema.endorsement_non_owned_autos.helpText}
              placeholder={schema.endorsement_non_owned_autos.placeholder}
            />

            {props.getFormValues.get(
              schema.vehicle_condition.name
            ) === VEHICLE_CONDITIONS.new ||
            props.getFormValues.get(
              schema.vehicle_condition.name
            ) === VEHICLE_CONDITIONS.demo ? (
              <Field
                absoluteOverride
                changeField={props.changeField}
                component={CheckboxInput}
                defaultOverride={endorsementDepreciation === undefined ? false : endorsementDepreciation}
                label={schema.endorsement_depreciation.label}
                name={schema.endorsement_depreciation.name}
                helpText={schema.endorsement_depreciation.helpText}
                placeholder={schema.endorsement_depreciation.placeholder}
              />
            ) : (
              <div></div>
            )}

            <Field
              changeField={props.changeField}
              component={CheckboxInput}
              defaultOverride={endorsementAccident === undefined ? false : endorsementAccident}
              label={schema.endorsement_accident.label}
              name={schema.endorsement_accident.name}
              helpText={schema.endorsement_accident.helpText}
              placeholder={schema.endorsement_accident.placeholder}
            />

            <Field
              changeField={props.changeField}
              component={CheckboxInput}
              defaultOverride={endorsementConviction === undefined ? false : endorsementConviction}
              label={schema.endorsement_conviction.label}
              name={schema.endorsement_conviction.name}
              helpText={schema.endorsement_conviction.helpText}
              placeholder={schema.endorsement_conviction.placeholder}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

VehCoverageFields.propTypes = {
  getFormValues: React.PropTypes.any,
  change: React.PropTypes.any,
  changeField: React.PropTypes.any,
};

export default VehCoverageFields;
