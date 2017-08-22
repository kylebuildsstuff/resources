import React from "react";
import Link from "redux-first-router-link";
import { Field } from "redux-form";

import { LOCATION } from "core/location/location.constants";
import { required } from "./validators";
import Header from "components/header";
import Text from "components/form-fields/text";
import Dropdown from "components/form-fields/dropdown";

const BusinessRegistrationFormPageOne = props => {
  const { handleSubmit, onSubmit, formValues } = props;
  return (
    <div>
      <Header />
      <Link to={{ type: LOCATION.HOME }}>HOME</Link>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Field
          name="firstName"
          label="First Name1"
          component={Text}
          type="text"
          validate={required}
        />
        <Field
          name="lastName"
          label="Last Name"
          component={Text}
          type="text"
          validate={required}
        />
        <Field
          name="email"
          label="Email"
          component={Text}
          type="text"
          validate={required}
        />
        <Field
          name="bestPokemon"
          label="Best Pokemon"
          component={Dropdown}
          options={["Charmander", "Squirtle", "Bulbasaur"]}
        />
        {formValues && formValues.bestPokemon
          ? <Field
              name="quiz"
              label={`What does ${formValues.bestPokemon} evolve into?`}
              component={Text}
              type="text"
            />
          : ""}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BusinessRegistrationFormPageOne;
