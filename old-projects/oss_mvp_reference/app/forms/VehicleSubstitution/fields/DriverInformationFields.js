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
            isRequired={schema.registered_owner.required}
            label={schema.registered_owner.label}
            name={schema.registered_owner.name}
            placeholder={schema.registered_owner.placeholder}
            helpText={schema.registered_owner.helpText}
            type={schema.registered_owner.type}
            valuesList={getDriversOnAllAutoPolicies(
              props.policies, { other: true }
            )}
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
                isRequired={schema.other_registered_owner_name.required}
                helpText={schema.other_registered_owner_name.helpText}
                type={schema.other_registered_owner_name.type}
              />
              <Field
                component={TextInput}
                isRequired={schema.other_registered_owner_licence.required}
                label={schema.other_registered_owner_licence.label}
                name={schema.other_registered_owner_licence.name}
                placeholder={schema.other_registered_owner_licence.placeholder}
                isRequired={schema.other_registered_owner_licence.required}
                helpText={schema.other_registered_owner_licence.helpText}
                type={schema.other_registered_owner_licence.type}
              />
            </div>
          ) : (
            ''
          )}

          <Field
            component={Select}
            label={schema.principle_driver.label}
            name={schema.principle_driver.name}
            placeholder={schema.principle_driver.placeholder}
            helpText={schema.principle_driver.helpText}
            isRequired={schema.principle_driver.required}
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
                name={schema.other_principle_driver_name.name}
                placeholder={schema.other_principle_driver_name.placeholder}
                helpText={schema.other_principle_driver_name.helpText}
                type={schema.other_principle_driver_name.type}
              />
              <Field
                component={TextInput}
                isRequired={schema.other_principle_driver_licence.required}
                label={schema.other_principle_driver_licence.label}
                name={schema.other_principle_driver_licence.name}
                placeholder={schema.other_principle_driver_licence.placeholder}
                helpText={schema.other_principle_driver_licence.helpText}
                type={schema.other_principle_driver_licence.type}
              />
            </div>
          ) : (
            <div></div>
          )}

          <Field
            component={Select}
            isRequired={schema.other_frequent_driver.required}
            label={schema.other_frequent_driver.label}
            name={schema.other_frequent_driver.name}
            placeholder={schema.other_frequent_driver.placeholder}
            helpText={schema.other_frequent_driver.helpText}
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
