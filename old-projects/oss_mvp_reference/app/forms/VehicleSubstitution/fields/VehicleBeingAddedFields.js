/**
*
* VehicleBeingAddedFields
*
*/

import React from 'react';
import { Field } from 'redux-form/immutable';

import FormHeader from '../../../components/FormHeader';
import TextInput from '../../../utils/forms/TextInput';
import VehYearsNumInput from '../../../utils/forms/VehYearsNumInput';
import VehMakesSelect from '../../../utils/forms/VehMakesSelect';
import VehModelsSelect from '../../../utils/forms/VehModelsSelect';
import Select from '../../../utils/forms/Select';
import RadioInput from '../../../utils/forms/RadioInput';
import DateInput from '../../../utils/forms/datePicker/DateInput';
import EmptyFieldChanger from '../../../components/EmptyFieldChanger';
import disabledDays from '../../../utils/forms/datePicker/disabledDays';
import normalizers from '../../../utils/forms/normalizers';
import {
  VEHICLE_CONDITIONS,
  VEHICLE_USAGES,
} from '../../../utils/forms/constants';
import {
  provinces,
  vehicleConditions,
  vehicleUsages,
} from '../../../utils/forms/values';
import schema from '../schema';

function VehicleBeingAddedFields(props) {
  return (
    <div>
      <FormHeader hdr="Vehicle Being Added" />
      {props.getFormValues ? (
        <div>
          <div className="form-section">
            <Field
              component={VehYearsNumInput}
              fetchVehMakes={props.fetchVehMakes}
              label={schema.adding_vehicle_year.label}
              name={schema.adding_vehicle_year.name}
              normalize={normalizers.numbersOnly}
              placeholder={schema.adding_vehicle_year.placeholder}
              helpText={schema.adding_vehicle_year.helpText}
              isRequired={schema.adding_vehicle_year.required}
              type={schema.adding_vehicle_year.type}
            />

            {Number(props.getFormValues.get(
              schema.adding_vehicle_year.name
            )) >= 1000 &&
            Number(props.getFormValues.get(
              schema.adding_vehicle_year.name
            )) <= 1981 ? (
              <Field
                component={TextInput}
                label={schema.adding_old_vehicle_name.label}
                name={schema.adding_old_vehicle_name.name}
                placeholder={schema.adding_old_vehicle_name.placeholder}
                helpText={schema.adding_old_vehicle_name.helpText}
                isRequired={schema.adding_old_vehicle_name.required}
                type={schema.adding_old_vehicle_name.type}
              />
            ) : (
              <div></div>
            )}

            {Number(props.getFormValues.get(
              schema.adding_vehicle_year.name
            )) >= 1982 ? (
              <Field
                component={VehMakesSelect}
                fetchVehModels={props.fetchVehModels}
                label={schema.adding_vehicle_make.label}
                name={schema.adding_vehicle_make.name}
                placeholder={schema.adding_vehicle_make.placeholder}
                helpText={schema.adding_vehicle_make.helpText}
                isRequired={schema.adding_vehicle_make.required}
                type={schema.adding_vehicle_make.type}
                valuesList={props.vehMakes}
                year={props.getFormValues.get(
                  schema.adding_vehicle_year.name
                )}
              />
            ) : (
              <div></div>
            )}

            {props.getFormValues.get(
              schema.adding_vehicle_make.name
            ) ? (
              <Field
                component={VehModelsSelect}
                label={schema.adding_vehicle_model.label}
                name={schema.adding_vehicle_model.name}
                placeholder={schema.adding_vehicle_model.placeholder}
                helpText={schema.adding_vehicle_model.helpText}
                isRequired={schema.adding_vehicle_model.required}
                type={schema.adding_vehicle_model.type}
                valuesList={props.vehModels}
              />
            ) : (
              <div></div>
            )}

            <Field
              component={TextInput}
              label={schema.adding_vin.label}
              name={schema.adding_vin.name}
              placeholder={schema.adding_vin.placeholder}
              helpText={schema.adding_vin.helpText}
              isRequired={schema.adding_vin.required}
              type={schema.adding_vin.type}
            />
          </div>
          <div className="form-section">
            <Field
              changeField={props.changeField}
              component={DateInput}
              disabledDays={disabledDays.withinThirtyDaysFuture}
              label={schema.take_possession_date.label}
              helpText={schema.take_possession_date.helpText}
              isRequired={schema.take_possession_date.required}
              name={schema.take_possession_date.name}
              placeholder={schema.take_possession_date.placeholder}
              type={schema.take_possession_date.type}
            />

            <Field
              component={Select}
              label={schema.registered_province.label}
              name={schema.registered_province.name}
              placeholder={schema.registered_province.placeholder}
              helpText={schema.registered_province.helpText}
              isRequired={schema.registered_province.required}
              type={schema.registered_province.type}
              valuesList={provinces}
            />

            {(Number(props.getFormValues.get(
              schema.adding_vehicle_year.name
            ) > 1981 &&
            Number(props.getFormValues.get(
              schema.adding_vehicle_year.name
            ) < new Date().getFullYear() - 1))) ? (
              <EmptyFieldChanger
                changeField={props.changeField}
                fieldNameToChange={schema.vehicle_condition.name}
                fieldValueToChangeTo={VEHICLE_CONDITIONS.used}
                schema={schema}
              />
            ) : (
              <Field
                changeField={props.changeField}
                component={Select}
                defaultOverride
                defaultOverrideVal={props.getFormValues.get(schema.vehicle_condition.name) || ''}
                label={schema.vehicle_condition.label}
                name={schema.vehicle_condition.name}
                placeholder={schema.vehicle_condition.placeholder}
                helpText={schema.vehicle_condition.helpText}
                isRequired={schema.vehicle_condition.required}
                type={schema.vehicle_condition.type}
                valuesList={vehicleConditions}
              />
            )}

            {props.getFormValues.get(
              schema.vehicle_condition.name
            ) === VEHICLE_CONDITIONS.new ||
            props.getFormValues.get(
              schema.vehicle_condition.name
            ) === VEHICLE_CONDITIONS.demo ? (
              <Field
                component={TextInput}
                label={schema.kms_at_purchase.label}
                name={schema.kms_at_purchase.name}
                placeholder={schema.kms_at_purchase.placeholder}
                helpText={schema.kms_at_purchase.helpText}
                isRequired={schema.kms_at_purchase.required}
                type={schema.kms_at_purchase.type}
              />
            ) : (
              <div></div>
            )}

            <Field
              component={TextInput}
              label={schema.price_of_vehicle.label}
              name={schema.price_of_vehicle.name}
              normalize={normalizers.numbersOnly}
              placeholder={schema.price_of_vehicle.placeholder}
              helpText={schema.price_of_vehicle.helpText}
              isRequired={schema.price_of_vehicle.required}
              type={schema.price_of_vehicle.type}
            />
          </div>
          <div className="form-section">
            <Field
              component={Select}
              label={schema.vehicle_usage.label}
              name={schema.vehicle_usage.name}
              placeholder={schema.vehicle_usage.placeholder}
              helpText={schema.vehicle_usage.helpText}
              isRequired={schema.vehicle_usage.required}
              type={schema.vehicle_usage.type}
              valuesList={vehicleUsages}
            />

            <Field
              component={TextInput}
              label={schema.vehicle_daily_kms.label}
              name={schema.vehicle_daily_kms.name}
              normalize={normalizers.numbersOnly}
              placeholder={schema.vehicle_daily_kms.placeholder}
              helpText={schema.vehicle_daily_kms.helpText}
              isRequired={schema.vehicle_daily_kms.required}
              type={schema.vehicle_daily_kms.type}
            />

            <Field
              component={TextInput}
              label={schema.vehicle_annual_kms.label}
              name={schema.vehicle_annual_kms.name}
              normalize={normalizers.numbersOnly}
              placeholder={schema.vehicle_annual_kms.placeholder}
              isRequired={schema.vehicle_annual_kms.required}
              helpText={schema.vehicle_annual_kms.helpText}
              type={schema.vehicle_annual_kms.type}
            />

            {props.getFormValues.get(
              schema.vehicle_usage.name
            ) === VEHICLE_USAGES.business ? (
              <Field
                component={TextInput}
                label={schema.business_vehicle_annual_kms.label}
                isRequired={schema.business_vehicle_annual_kms.required}
                helpText={schema.business_vehicle_annual_kms.helpText}
                name={schema.business_vehicle_annual_kms.name}
                normalize={normalizers.numbersOnly}
                placeholder={schema.business_vehicle_annual_kms.placeholder}
                type={schema.business_vehicle_annual_kms.type}
              />
            ) : (
              <div></div>
            )}

            <Field
              component={RadioInput}
              label={schema.carry_passengers_for_compensation.label}
              name={schema.carry_passengers_for_compensation.name}
              placeholder={schema.carry_passengers_for_compensation.placeholder}
              helpText={schema.carry_passengers_for_compensation.helpText}
              type={schema.carry_passengers_for_compensation.type}
              isRequired={schema.carry_passengers_for_compensation.required}
              values={['true', 'false']}
              displayValues={['Yes', 'No']}
            />

            <Field
              component={RadioInput}
              label={schema.carry_special_use.label}
              name={schema.carry_special_use.name}
              placeholder={schema.carry_special_use.placeholder}
              helpText={schema.carry_special_use.helpText}
              isRequired={schema.carry_special_use.required}
              type={schema.carry_special_use.type}
              values={['true', 'false']}
              displayValues={['Yes', 'No']}
            />
          </div>

          <Field
            component={RadioInput}
            label={schema.vehicle_modified.label}
            name={schema.vehicle_modified.name}
            placeholder={schema.vehicle_modified.placeholder}
            helpText={schema.vehicle_modified.helpText}
            isRequired={schema.vehicle_modified.required}
            type={schema.vehicle_modified.type}
            values={['true', 'false']}
            displayValues={['Yes', 'No']}
          />

          {props.getFormValues.get(
            schema.vehicle_condition.name
          ) === VEHICLE_CONDITIONS.new ? (
            <EmptyFieldChanger
              changeField={props.changeField}
              fieldNameToChange={schema.existing_damage.name}
              fieldValueToChangeTo={'false'}
              schema={schema}
            />
          ) : (
            <Field
              changeField={props.changeField}
              component={RadioInput}
              defaultOverride
              defaultOverrideVal={''}
              label={schema.existing_damage.label}
              name={schema.existing_damage.name}
              placeholder={schema.existing_damage.placeholder}
              helpText={schema.existing_damage.helpText}
              isRequired={schema.existing_damage.required}
              type={schema.existing_damage.type}
              values={['true', 'false']}
              displayValues={['Yes', 'No']}
            />
          )}

          <Field
            component={RadioInput}
            label={schema.winter_tires.label}
            name={schema.winter_tires.name}
            placeholder={schema.winter_tires.placeholder}
            helpText={schema.winter_tires.helpText}
            isRequired={schema.winter_tires.required}
            type={schema.winter_tires.type}
            values={['true', 'false']}
            displayValues={['Yes', 'No']}
          />
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

VehicleBeingAddedFields.propTypes = {
  getFormValues: React.PropTypes.any,
  validMakes: React.PropTypes.any,
  validModels: React.PropTypes.any,
  fetchVehMakes: React.PropTypes.func,
  fetchVehModels: React.PropTypes.func,
  vehMakes: React.PropTypes.any,
  vehModels: React.PropTypes.any,
  change: React.PropTypes.any,
  changeField: React.PropTypes.any,
};

export default VehicleBeingAddedFields;
