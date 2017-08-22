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
            isRequired={schema.financing.required}
            name={schema.financing.name}
            placeholder={schema.financing.placeholder}
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
                label={schema.financing_name.label}
                isRequired={schema.financing_name.required}
                name={schema.financing_name.name}
                placeholder={schema.financing_name.placeholder}
                type={schema.financing_name.type}
                component={TextInput}
              />

              <Field
                addresses={props.addresses}
                component={PostalCodeTextInput}
                label={schema.financing_postal_code.label}
                isRequired={schema.financing_postal_code.required}
                name={schema.financing_postal_code.name}
                placeholder={schema.financing_postal_code.placeholder}
                normalize={normalizers.postalCode}
                type={schema.financing_postal_code.type}
                fetchAddresses={props.fetchAddresses}
              />

              <Field
                component={TextInput}
                label={schema.financing_unit_number.label}
                isRequired={schema.financing_unit_number.required}
                name={schema.financing_unit_number.name}
                placeholder={schema.financing_unit_number.placeholder}
                type={schema.financing_unit_number.type}
              />

              <Field
                component={TextInput}
                label={schema.financing_street_number.label}
                isRequired={schema.financing_street_number.required}
                name={schema.financing_street_number.name}
                placeholder={schema.financing_street_number.placeholder}
                type={schema.financing_street_number.type}
              />

              <Field
                changeField={props.changeField}
                component={StreetNameSelect}
                label={schema.financing_street_name.label}
                isRequired={schema.financing_street_name.required}
                name={schema.financing_street_name.name}
                placeholder={schema.financing_street_name.placeholder}
                type={schema.financing_street_name.type}
                valuesList={props.addresses}
              />

              <Field
                changeField={props.changeField}
                addresses={props.addresses}
                component={AutoFillCityInput}
                label={schema.financing_city.label}
                isRequired={schema.financing_city.required}
                name={schema.financing_city.name}
                placeholder={schema.financing_city.placeholder}
                streetName={props.getFormValues.get(
                  schema.financing_street_name.name
                )}
                type={schema.financing_city.type}
              />

              <Field
                changeField={props.changeField}
                addresses={props.addresses}
                component={AutoFillProvinceInput}
                label={schema.financing_province.label}
                isRequired={schema.financing_province.required}
                name={schema.financing_province.name}
                placeholder={schema.financing_province.placeholder}
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
