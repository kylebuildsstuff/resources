import React from 'react';
import { Field } from 'redux-form';

import TextField from '../fields/TextField';
import SelectField from '../fields/SelectField';

const SecondaryDriverBlock = (props) => {
  return (
    <div>
      <br />
      <Field
        component={TextField}
        label="Driver Name"
        name="driverName"
        placeholder="Driver Name"
        type="text"
      />
      <Field
        component={TextField}
        label="Driver's License Number"
        name="licenseNumber"
        placeholder="Driver's License Number"
        type="text"
      />
    <br />
    </div>
  );
}

export default SecondaryDriverBlock;
