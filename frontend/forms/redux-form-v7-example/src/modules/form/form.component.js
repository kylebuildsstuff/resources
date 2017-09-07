import React from 'react';
import { Field } from 'redux-form';
import Text from '../components/text';

export const FormComponent = ({ handleSubmit, onSubmit }) => {
  return (
    <div>
      <h1>My Very own Form</h1>
      <form
        className="w-100"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Field
          name="firstName"
          label="First Named"
          component={Text}
        />
        <Field
          name="lastName"
          label="Last Name"
          component={Text}
        />
        <Field
          name="email"
          label="Email"
          component={Text}
        />
        <Field
          name="password"
          label="password"
          component={Text}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FormComponent;
