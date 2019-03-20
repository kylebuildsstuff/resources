/**
*
* NewAddressFields
*
*/

import React from 'react';
import { Field } from 'redux-form/immutable';

import FormHeader from '../../../components/FormHeader';
import TextInput from '../../../utils/forms/TextInput';
import PostalCodeTextInput from '../../../utils/forms/PostalCodeTextInput';
import AutoFillProvinceInput from '../../../utils/forms/AutoFillProvinceInput';
import StreetNameSelect from '../../../utils/forms/StreetNameSelect';
import AutoFillCityInput from '../../../utils/forms/AutoFillCityInput';
import DateInput from '../../../utils/forms/datePicker/DateInput';
import disabledDays from '../../../utils/forms/datePicker/disabledDays';
import normalizers from '../../../utils/forms/normalizers';
import schema from '../schema';

function NewAddressFields(props) {
  return (
    <div>
      <FormHeader hdr="Your New Address" />
      {props.getFormValues ? (
        <div className="form-block">
          <div className="form-section">
            <Field
              addresses={props.addresses}
              component={PostalCodeTextInput}
              label={schema.postal_code.label}
              name={schema.postal_code.name}
              isRequired={schema.postal_code.required}
              placeholder={schema.postal_code.placeholder}
              helpText={schema.postal_code.helpText}
              normalize={normalizers.postalCode}
              type={schema.postal_code.type}
              fetchAddresses={props.fetchAddresses}
            />
            <Field
              component={TextInput}
              label={schema.new_unit_number.label}
              name={schema.new_unit_number.name}
              isRequired={schema.new_unit_number.required}
              placeholder={schema.new_unit_number.placeholder}
              helpText={schema.new_unit_number.helpText}
              type={schema.new_unit_number.type}
            />
            <Field
              component={TextInput}
              label={schema.new_street_number.label}
              name={schema.new_street_number.name}
              isRequired={schema.new_street_number.required}
              placeholder={schema.new_street_number.placeholder}
              helpText={schema.new_street_number.helpText}
              type={schema.new_street_number.type}
            />
            {props.addresses && props.addresses.length > 0 ? (
              <div>
                <Field
                  changeField={props.changeField}
                  component={StreetNameSelect}
                  label={schema.new_street_name.label}
                  name={schema.new_street_name.name}
                  isRequired={schema.new_street_name.required}
                  placeholder={schema.new_street_name.placeholder}
                  helpText={schema.new_street_name.helpText}
                  type={schema.new_street_name.type}
                  valuesList={props.addresses}
                />
                <Field
                  addresses={props.addresses}
                  changeField={props.changeField}
                  component={AutoFillCityInput}
                  label={schema.new_municipality.label}
                  name={schema.new_municipality.name}
                  isRequired={schema.new_municipality.required}
                  placeholder={schema.new_municipality.placeholder}
                  helpText={schema.new_municipality.helpText}
                  streetName={props.getFormValues.get(
                    schema.new_street_name.name
                  )}
                  type={schema.new_municipality.type}
                />
                <Field
                  addresses={props.addresses}
                  changeField={props.changeField}
                  component={AutoFillProvinceInput}
                  label={schema.new_province.label}
                  name={schema.new_province.name}
                  isRequired={schema.new_province.required}
                  placeholder={schema.new_province.placeholder}
                  helpText={schema.new_province.helpText}
                  streetName={props.getFormValues.get(
                    schema.new_street_name.name
                  )}
                  type={schema.new_province.type}
                />
              </div>
            ) : (
              <div></div>
            )}
            <Field
              component={TextInput}
              label={schema.new_phone_number.label}
              name={schema.new_phone_number.name}
              isRequired={schema.new_phone_number.required}
              normalize={normalizers.phoneNumber}
              placeholder={schema.new_phone_number.placeholder}
              helpText={schema.new_phone_number.helpText}
              type={schema.new_phone_number.type}
            />
          </div>
          <Field
            changeField={props.changeField}
            component={DateInput}
            disabledDays={disabledDays.greaterThanCurrentLessThanThirtyDaysFuture}
            label={schema.move_in_date.label}
            name={schema.move_in_date.name}
            isRequired={schema.move_in_date.required}
            placeholder={schema.move_in_date.placeholder}
            helpText={schema.move_in_date.helpText}
            type={schema.move_in_date.type}
          />
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

NewAddressFields.propTypes = {
  getFormValues: React.PropTypes.any,
  fetchAddresses: React.PropTypes.any,
  addresses: React.PropTypes.any,
  change: React.PropTypes.any,
  changeField: React.PropTypes.any,
  touch: React.PropTypes.any,
};

export default NewAddressFields;
