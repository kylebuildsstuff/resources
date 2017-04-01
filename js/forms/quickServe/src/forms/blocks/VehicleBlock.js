import React from 'react';
import { Field, FormSection } from 'redux-form';

import SecondaryDriverBlock from './SecondaryDriverBlock';
import TextField from '../fields/TextField';
import SelectField from '../fields/SelectField';

const VehicleBlock = (props) => {
  return (
    <div>
      <br />
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
      <FormSection name="secondaryDrivers">
        <SecondaryDriverBlock />
      </FormSection>
    <br />
    </div>
  );
}

export default VehicleBlock;
