/**
*
* InitialFields
*
*/

import React from 'react';
import { Field } from 'redux-form/immutable';

import TextInput from '../../../utils/forms/TextInput';
import Select from '../../../utils/forms/Select';
import AutoPolicySelect from '../../../utils/forms/AutoPolicySelect';
import EmptyFieldChanger from '../../../components/EmptyFieldChanger';
import {
  genRequesterNameOptions,
} from '../../../utils/helpers';
import schema from '../schema';

function InitialFields(props) {
  return (
    <div>
      {props.getFormValues ? (
        <div>
          <Field
            component={Select}
            label={schema.requester_name.label}
            isRequired={schema.requester_name.required}
            helpText={schema.requester_name.helpText}
            name={schema.requester_name.name}
            placeholder={schema.requester_name.placeholder}
            type={schema.requester_name.type}
            valuesList={genRequesterNameOptions(props.primary, { other: true })}
          />

          {props.getFormValues.get(
            schema.requester_name.name
          ) === '-1' ? (
            <Field
              component={TextInput}
              label={schema.requester_name_other.label}
              isRequired={schema.requester_name_other.required}
              name={schema.requester_name_other.name}
              helpText={schema.requester_name_other.helpText}
              placeholder={schema.requester_name_other.placeholder}
              type={schema.requester_name_other.type}
            />
          ) : (
            <div></div>
          )}

          {props.policies && (
            props.autoPolicies.length === 1
          ) ? (
            <EmptyFieldChanger
              changeField={props.changeField}
              fieldNameToChange={schema.policy_number.name}
              fieldValueToChangeTo={props.autoPolicies[0].policy_number}
              schema={schema}
            />
          ) : (
            <Field
              changeField={props.changeField}
              component={AutoPolicySelect}
              label={schema.policy_number.label}
              isRequired={schema.policy_number.required}
              name={schema.policy_number.name}
              placeholder={schema.policy_number.placeholder}
              noDefaultSelect
              type={schema.policy_number.type}
              valuesList={props.policies}
            />
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

InitialFields.propTypes = {
  getFormValues: React.PropTypes.any,
  policies: React.PropTypes.any,
  primary: React.PropTypes.any,
  autoPolicies: React.PropTypes.any,
  changeField: React.PropTypes.any,
};

export default InitialFields;
