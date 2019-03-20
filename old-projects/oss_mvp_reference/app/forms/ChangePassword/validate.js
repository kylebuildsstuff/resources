const validate = (values) => {
  const errors = {};
  // regexs for passwords
  const includesNumber = /\d/;
  const includesLetter = /[A-Z]/;
  if (!values.get('old_password')) {
    errors.old_password = 'Required';
  }
  // change pw validate
  if (!values.get('new_password1')) {
    errors.new_password1 = 'Required';
  } else if (values.get('new_password1').length < 8) {
    errors.new_password1 = 'Must be 8 characters or more';
  } else if (!includesNumber.test(values.get('new_password1'))) {
    errors.new_password1 = 'Must include 1 number';
  } else if (!includesLetter.test(values.get('new_password1'))) {
    errors.new_password1 = 'Must include 1 uppercase letter';
  }
  if (!values.get('new_password2')) {
    errors.new_password2 = 'Required';
  } else if (values.get('new_password2') !== values.get('new_password1')) {
    errors.new_password2 = 'Passwords do not match';
  }
  // return errrors
  return errors;
};

export default validate;
