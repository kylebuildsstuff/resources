const validate = (values) => {
  const errors = {};
  // basic field validation
  if (!values.get('email')) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.get('email'))) {
    errors.email = 'Invalid email address';
  }
  // password validation
  const includesNumber = /\d/;
  const includesLetter = /[A-Z]/;
  if (!values.get('password1')) {
    errors.password1 = 'Required';
  } else if (values.get('password1').length < 8) {
    errors.password1 = 'Must be 8 characters or more';
  } else if (!includesNumber.test(values.get('password1'))) {
    errors.password1 = 'Must include 1 number';
  } else if (!includesLetter.test(values.get('password1'))) {
    errors.password1 = 'Must include 1 uppercase letter';
  }
  // confirm pw
  if (!values.get('password2')) {
    errors.password2 = 'Required';
  } else if (values.get('password2') !== values.get('password1')) {
    errors.password2 = 'Passwords do not match';
  }
  // postal code
  if (!values.get('postal_code')) {
    errors.postal_code = 'Required';
  } else if (values.get('postal_code').length < 6 ||
    values.get('postal_code') > 7
  ) {
    errors.postal_code = 'Postal codes should be 6 characters';
  } else if (!/^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]( )?\d[ABCEGHJKLMNPRSTVWXYZ]\d$/i.test(values.get('postal_code'))) {
    errors.postal_code = 'Invalid postal code';
  }
  return errors;
};

export default validate;
