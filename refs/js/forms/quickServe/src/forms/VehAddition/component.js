import React from 'react';
import _ from 'lodash';
import { Field, FormSection } from 'redux-form';

import VehicleBlock from '../blocks/VehicleBlock';
import TextField from '../fields/TextField';
import SelectField from '../fields/SelectField';

export class VehAddition extends React.Component {
  componentDidMount() {
    this.props.autofill(
      'policyNumber',
      this.props.policyNumber,
    );
  }

  render() {
    return (
      <div>
        {this.props.getFormValues && this.props.policies ? (
          <div>
            <Field
              component={TextField}
              label="Policy Number"
              name="policyNumber"
              placeholder="Policy Number"
              type="text"
            />
            <Field
              component={TextField}
              label="Vehicle Year"
              name="vehicleYear"
              placeholder="Vehicle Year"
              type="text"
            />
            <Field
              component={SelectField}
              choices={[['a', 1], ['b', 2], ['c', 3], ['d', 4]]}
              label="Vehicle Make"
              name="vehicleMake"
              placeholder="Vehicle Make"
              type="text"
            />
            <Field
              component={SelectField}
              choices={[['a', 1], ['b', 2], ['c', 3], ['d', 4]]}
              label="Vehicle Model"
              name="vehicleModel"
              placeholder="Vehicle Model"
              type="text"
            />
            <br />
            <div>This is where it maps policies:</div>
            <br />
            {this.props.policies.map((pol) => (
              <FormSection key={pol.id} name={pol.id}>
                <VehicleBlock />
              </FormSection>
            ))}
          </div>
        ) : ''}
      </div>
    );
  }
}

export default VehAddition;
