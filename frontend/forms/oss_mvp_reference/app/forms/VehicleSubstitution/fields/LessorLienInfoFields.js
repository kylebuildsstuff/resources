/**
*
* LessorLienInfoFields
*
*/

import React from 'react';
import { Field } from 'redux-form/immutable';

import FormHeader from '../../../components/FormHeader';
import TextInput from '../../../utils/forms/TextInput';
import Select from '../../../utils/forms/Select';
import PostalCodeTextInput from '../../../utils/forms/PostalCodeTextInput';
import AutoFillProvinceInput from '../../../utils/forms/AutoFillProvinceInput';
import StreetNameSelect from '../../../utils/forms/StreetNameSelect';
import AutoFillCityInput from '../../../utils/forms/AutoFillCityInput';
import {
  leasedOrFinanced,
} from '../../../utils/forms/values';
import normalizers from '../../../utils/forms/normalizers';
import schema from '../schema';

function LessorLienInfoFields(props) {
  return (
    <div>
      <FormHeader hdr="Lessor/Lienholder Information" />
      {props.getFormValues ? (
        <div>
          <Field
            component={Select}
            label={schema.financing.label}
            name={schema.financing.name}
            placeholder={schema.financing.placeholder}
            helpText={schema.financing.helpText}
            isRequired={schema.financing.required}
            type={schema.financing.type}
            valuesList={leasedOrFinanced}
          />

          {props.getFormValues.get(
            schema.financing.name
          ) === 'false' ||
          !props.getFormValues.get(
            schema.financing.name
          ) ? (
            <div></div>
          ) : (
            <div>
              <Field
                component={TextInput}
                label={schema.financing_name.label}
                name={schema.financing_name.name}
                placeholder={schema.financing_name.placeholder}
                helpText={schema.financing_name.helpText}
                isRequired={schema.financing_name.required}
                type={schema.financing_name.type}
              />

              <Field
                addresses={props.addresses}
                component={PostalCodeTextInput}
                label={schema.financing_postal_code.label}
                name={schema.financing_postal_code.name}
                placeholder={schema.financing_postal_code.placeholder}
                helpText={schema.financing_postal_code.helpText}
                isRequired={schema.financing_postal_code.required}
                normalize={normalizers.postalCode}
                type={schema.financing_postal_code.type}
                fetchAddresses={props.fetchAddresses}
              />

              <Field
                component={TextInput}
                label={schema.financing_unit_number.label}
                name={schema.financing_unit_number.name}
                placeholder={schema.financing_unit_number.placeholder}
                isRequired={schema.financing_unit_number.required}
                helpText={schema.financing_unit_number.helpText}
                type={schema.financing_unit_number.type}
              />

              <Field
                component={TextInput}
                label={schema.financing_street_number.label}
                name={schema.financing_street_number.name}
                placeholder={schema.financing_street_number.placeholder}
                helpText={schema.financing_street_number.helpText}
                isRequired={schema.financing_street_number.required}
                type={schema.financing_street_number.type}
              />

              <Field
                changeField={props.changeField}
                component={StreetNameSelect}
                label={schema.financing_street_name.label}
                name={schema.financing_street_name.name}
                placeholder={schema.financing_street_name.placeholder}
                helpText={schema.financing_street_name.helpText}
                isRequired={schema.financing_street_name.required}
                type={schema.financing_street_name.type}
                valuesList={props.addresses}
              />

              <Field
                addresses={props.addresses}
                changeField={props.changeField}
                component={AutoFillCityInput}
                label={schema.financing_city.label}
                name={schema.financing_city.name}
                placeholder={schema.financing_city.placeholder}
                helpText={schema.financing_city.helpText}
                isRequired={schema.financing_city.required}
                streetName={props.getFormValues.get(
                  schema.financing_street_name.name
                )}
                type={schema.financing_city.type}
              />

              <Field
                addresses={props.addresses}
                changeField={props.changeField}
                component={AutoFillProvinceInput}
                label={schema.financing_province.label}
                name={schema.financing_province.name}
                placeholder={schema.financing_province.placeholder}
                helpText={schema.financing_province.helpText}
                isRequired={schema.financing_province.required}
                streetName={props.getFormValues.get(
                  schema.financing_street_name.name
                )}
                type={schema.financing_province.type}
              />
            </div>
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

LessorLienInfoFields.propTypes = {
  getFormValues: React.PropTypes.any,
  fetchAddresses: React.PropTypes.any,
  addresses: React.PropTypes.any,
  change: React.PropTypes.any,
  changeField: React.PropTypes.any,
};

export default LessorLienInfoFields;
