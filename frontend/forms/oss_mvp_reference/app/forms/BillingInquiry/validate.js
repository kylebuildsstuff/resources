const validate = (values) => {
  const errors = {};

  if (!values.get('question_type')) {
    errors.question_type = 'Required';
  }
  if (values.get('question_type') === 'billing_schedule' && !values.get('preferred_contact_method')) {
    errors.preferred_contact_method = 'Required';
  }
  if (values.get('question_type') === 'other' && !values.get('other_details')) {
    errors.other_details = 'Required';
  }

  // manually create an array with the dynamically generated values, then add an
  // error to a hidden field if the array is empty

  const policyVals = Object.keys(values.toJS()).filter((val) => {
    if ((/0x0/).test(val)) {
      return values.get(val);
    }
    return false;
  });

  if (policyVals.length === 0) {
    errors.hidden_field = 'At least one policy is required';
  }

  // return errrors
  return errors;
};

export default validate;
