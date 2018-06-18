/**
*
* VehicleInformationFields
*
*/

import React from 'react';
import { Field } from 'redux-form/immutable';

import TextInput from '../../../utils/forms/TextInput';
import schema from '../schema';
import Select from '../../../utils/forms/Select';
import EmptyFieldChanger from '../../../components/EmptyFieldChanger';
import normalizers from '../../../utils/forms/normalizers';
import {
  CARRIERS,
  VEHICLE_USAGES,
} from '../../../utils/forms/constants';
import {
  vehicleUsages,
  parkingOptions,
} from '../../../utils/forms/values';

function VehicleInformationFields(props) {
  return (
    <div>
      {props.getFormValues ? (
        <div className="form-block">
          <div className="form-section">
            <Field
              component={Select}
              label={schema.vehicle_usage.label}
              name={`veh_${props.vehicle.vehicle_no}_${schema.vehicle_usage.name}`}
              placeholder={schema.vehicle_usage.placeholder}
              isRequired={schema.vehicle_usage.required}
              helpText={schema.vehicle_usage.helpText}
              type={schema.vehicle_usage.type}
              valuesList={vehicleUsages}
            />
            <Field
              component={TextInput}
              label={schema.vehicle_daily_kms.label}
              name={`veh_${props.vehicle.vehicle_no}_${schema.vehicle_daily_kms.name}`}
              normalize={normalizers.numbersOnly}
              placeholder={schema.vehicle_daily_kms.placeholder}
              isRequired={schema.vehicle_daily_kms.required}
              helpText={schema.vehicle_daily_kms.helpText}
              endLabel={schema.vehicle_daily_kms.endLabel}
              type={schema.vehicle_daily_kms.type}
            />
            <Field
              component={TextInput}
              label={schema.vehicle_annual_kms.label}
              name={`veh_${props.vehicle.vehicle_no}_${schema.vehicle_annual_kms.name}`}
              normalize={normalizers.numbersOnly}
              placeholder={schema.vehicle_annual_kms.placeholder}
              isRequired={schema.vehicle_annual_kms.required}
              helpText={schema.vehicle_annual_kms.helpText}
              endLabel={schema.vehicle_daily_kms.endLabel}
              type={schema.vehicle_annual_kms.type}
            />

            {props.getFormValues.get(
              `veh_${props.vehicle.vehicle_no}_${schema.vehicle_usage.name}`
            ) === VEHICLE_USAGES.business ? (
              <Field
                component={TextInput}
                label={schema.business_vehicle_annual_kms.label}
                isRequired={schema.business_vehicle_annual_kms.required}
                helpText={schema.business_vehicle_annual_kms.helpText}
                name={`veh_${props.vehicle.vehicle_no}_${schema.business_vehicle_annual_kms.name}`}
                normalize={normalizers.numbersOnly}
                placeholder={schema.business_vehicle_annual_kms.placeholder}
                type={schema.business_vehicle_annual_kms.type}
              />
            ) : (
              <div></div>
            )}

            {props.policy.carrier_code === CARRIERS.PEM ? (
              <Field
                component={Select}
                label={schema.parked_at_night.label}
                name={`veh_${props.vehicle.vehicle_no}_${schema.parked_at_night.name}`}
                placeholder={schema.parked_at_night.placeholder}
                isRequired={schema.parked_at_night.required}
                helpText={schema.parked_at_night.helpText}
                type={schema.parked_at_night.type}
                valuesList={parkingOptions}
              />
              ) : (
              <EmptyFieldChanger
                changeField={props.changeField}
                fieldNameToChange={schema.parked_at_night.name}
                fieldValueToChangeTo={''}
                schema={schema}
              />
              )
            }
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

VehicleInformationFields.propTypes = {
  getFormValues: React.PropTypes.any,
  changeField: React.PropTypes.any,
  fetchAddresses: React.PropTypes.any,
  addresses: React.PropTypes.any,
  change: React.PropTypes.any,
  vehicle: React.PropTypes.any,
  policy: React.PropTypes.any,
};

export default VehicleInformationFields;
