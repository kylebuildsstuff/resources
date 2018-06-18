import React from "react";
import Link from "redux-first-router-link";
import { Field } from "redux-form";

import { LOCATION } from "core/location/location.constants";
import { required } from "./validators";
import Header from "components/header";
import Text from "components/form-fields/text";
import Dropdown from "components/form-fields/dropdown";
import Checkbox from "components/form-fields/checkbox";
import Radio from "components/form-fields/radio";

const BusinessRegistrationFormPageTwo = props => {
  const { handleSubmit, onSubmit, formValues } = props;
  return (
    <div>
      <Header />
      <Link to={{ type: LOCATION.HOME }}>HOME</Link>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Field
          name="businessName"
          label="Business Name"
          component={Text}
          // validate={required}
        />
        <Field
          name="domainName"
          label="Domain Name"
          component={Text}
          // validate={required}
        />
        <Field
          name="logoProvider"
          label="Logo Provider"
          component={Checkbox}
          // validate={required}
        />
        <Field
          name="websiteProvider"
          label="website Provider"
          component={Radio}
          radioValues={{
            wix: "Wix",
            squarespace: "Squarespace",
            wordpress: "Wordpress",
            none: "None"
          }}
        />
        <Field
          name="businessAddress"
          label="Business Address"
          component={Text}
          // validate={required}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BusinessRegistrationFormPageTwo;
