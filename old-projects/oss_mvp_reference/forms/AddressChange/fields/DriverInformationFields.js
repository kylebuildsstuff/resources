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
import schema from '../schema';
import Select from '../../../utils/forms/Select';
import {
  getDriversOnAllAutoPolicies,
  genNoneToX,
} from '../../../utils/helpers';

function DriverInformationFields(props) {
  return (
    <div>
      <FormHeader hdr="Driver Information" />
      {props.getFormValues ? (
        <div>
          <div className="form-block">
            <Field
              component={Select}
              isRequired={schema.principle_driver.required}
              label={schema.principle_driver.label}
              name={`veh_${props.vehicle.vehicle_no}_${schema.principle_driver.name}`}
              placeholder={schema.principle_driver.placeholder}
              helpText={schema.principle_driver.helpText}
              type={schema.principle_driver.type}
              valuesList={getDriversOnAllAutoPolicies(
                props.policies, { other: true }
              )}
            />
            {props.getFormValues.get(
              `veh_${props.vehicle.vehicle_no}_${schema.principle_driver.name}`
            ) === '-1' ? (
              <div>
                <Field
                  component={TextInput}
                  isRequired={schema.other_principle_driver_name.required}
                  label={schema.other_principle_driver_name.label}
                  name={`veh_${props.vehicle.vehicle_no}_${schema.other_principle_driver_name.name}`}
                  placeholder={schema.other_principle_driver_name.placeholder}
                  helpText={schema.other_principle_driver_name.helpText}
                  type={schema.other_principle_driver_name.type}
                />
                <Field
                  component={TextInput}
                  isRequired={schema.other_principle_driver_licence.required}
                  label={schema.other_principle_driver_licence.label}
                  name={`veh_${props.vehicle.vehicle_no}_${schema.other_principle_driver_licence.name}`}
                  placeholder={schema.other_principle_driver_licence.placeholder}
                  helpText={schema.other_principle_driver_licence.helpText}
                  type={schema.other_principle_driver_licence.type}
                />
              </div>
            ) : (
              ''
            )}
            {props.vehicle.vehicle_no === '01' ? (
              <div>
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
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

DriverInformationFields.propTypes = {
  getFormValues: React.PropTypes.any,
  fetchAddresses: React.PropTypes.any,
  addresses: React.PropTypes.any,
  change: React.PropTypes.any,
  vehicle: React.PropTypes.any,
  policy: React.PropTypes.any,
  policies: React.PropTypes.any,
};

export default DriverInformationFields;
