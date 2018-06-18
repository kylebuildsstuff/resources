const validate = (values) => {
  const errors = {};
  // regexs for passwords
  const includesNumber = /\d/;
  const includesLetter = /[A-Z]/;
  if (!values.get('currentpw')) {
    errors.currentpw = 'Required';
  }
  // change pw validate
  if (!values.get('newpw')) {
    errors.newpw = 'Required';
  } else if (values.get('newpw').length < 8) {
    errors.newpw = 'Must be 8 characters or more';
  } else if (!includesNumber.test(values.get('newpw'))) {
    errors.newpw = 'Must include 1 number';
  } else if (!includesLetter.test(values.get('newpw'))) {
    errors.newpw = 'Must include 1 uppercase letter';
  }
  if (!values.get('newpw2')) {
    errors.newpw2 = 'Required';
  } else if (values.get('newpw2') !== values.get('newpw')) {
    errors.newpw2 = 'Passwords do not match';
  }
  // return errrors
  return errors;
};

export default validate;
