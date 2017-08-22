/**
*
* DriverInformationFields
*
*/

import React from 'react';
import { Field } from 'redux-form/immutable';

import OtherFrequentDriverFields from './OtherFrequentDriverFields';
import FormHeader from '../../../components/FormHeader';
import TextInput from '../../../utils/forms/TextInput';
import Select from '../../../utils/forms/Select';
import {
  getDriversOnAllAutoPolicies,
  genNoneToX,
} from '../../../utils/helpers';
import schema from '../schema';

function DriverInformationFields(props) {
  return (
    <div>
      <FormHeader hdr="Driver Information" />
      {props.getFormValues ? (
        <div>
          <Field
            component={Select}
            label={schema.registered_owner.label}
            isRequired={schema.registered_owner.required}
            helpText={schema.registered_owner.helpText}
            name={schema.registered_owner.name}
            placeholder={schema.registered_owner.placeholder}
            type={schema.registered_owner.type}
            valuesList={getDriversOnAllAutoPolicies(props.policies, { other: true })}
          />

          {props.getFormValues.get(
            schema.registered_owner.name
          ) === '-1' ? (
            <div>
              <Field
                component={TextInput}
                isRequired={schema.other_registered_owner_name.required}
                label={schema.other_registered_owner_name.label}
                name={schema.other_registered_owner_name.name}
                placeholder={schema.other_registered_owner_name.placeholder}
                type={schema.other_registered_owner_name.type}
              />
              <Field
                component={TextInput}
                isRequired={schema.other_registered_owner_licence.required}
                label={schema.other_registered_owner_licence.label}
                name={schema.other_registered_owner_licence.name}
                placeholder={schema.other_registered_owner_licence.placeholder}
                type={schema.other_registered_owner_licence.type}
              />
            </div>
          ) : (
            ''
          )}

          <Field
            component={Select}
            isRequired={schema.principle_driver.required}
            label={schema.principle_driver.label}
            helpText={schema.principle_driver.helpText}
            name={schema.principle_driver.name}
            placeholder={schema.principle_driver.placeholder}
            type={schema.principle_driver.type}
            valuesList={getDriversOnAllAutoPolicies(props.policies, { other: true })}
          />

          {props.getFormValues.get(
            schema.principle_driver.name
          ) === '-1' ? (
            <div>
              <Field
                component={TextInput}
                isRequired={schema.other_principle_driver_name.required}
                label={schema.other_principle_driver_name.label}
                helpText={schema.other_principle_driver_name.helpText}
                name={schema.other_principle_driver_name.name}
                placeholder={schema.other_principle_driver_name.placeholder}
                type={schema.other_principle_driver_name.type}
              />
              <Field
                component={TextInput}
                isRequired={schema.other_principle_driver_licence.required}
                label={schema.other_principle_driver_licence.label}
                helpText={schema.other_principle_driver_licence.helpText}
                name={schema.other_principle_driver_licence.name}
                placeholder={schema.other_principle_driver_licence.placeholder}
                type={schema.other_principle_driver_licence.type}
              />
            </div>
          ) : (
            <div></div>
          )}

          <Field
            component={Select}
            label={schema.other_frequent_driver.label}
            isRequired={schema.other_frequent_driver.required}
            helpText={schema.other_frequent_driver.helpText}
            name={schema.other_frequent_driver.name}
            placeholder={schema.other_frequent_driver.placeholder}
            type={schema.other_frequent_driver.type}
            valuesList={genNoneToX(4)}
          />

          <OtherFrequentDriverFields
            num={props.getFormValues.get(
              schema.other_frequent_driver.name
            )}
          />
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

DriverInformationFields.propTypes = {
  getFormValues: React.PropTypes.any,
  policies: React.PropTypes.any,
};

export default DriverInformationFields;
