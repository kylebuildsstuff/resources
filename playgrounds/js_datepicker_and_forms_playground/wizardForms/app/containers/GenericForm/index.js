/*
 *
 * GenericForm
 *
 */

import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import styles from './styles.css';

import DateInput from '../../utils/datePicker/DateInput';


export class GenericForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  onSubmit = (formValues) => {
    console.log(formValues);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form
        className={styles.genericForm}
        onSubmit={handleSubmit(this.onSubmit)}
      >
        <div className="form-group">
          <Field name="firstName" type="text" component="input" label="First Name" className="form-control" placeholder="Enter first name" />
          <Field name="lastName" type="text" component="input" label="Last Name" className="form-control" placeholder="Enter last name" />
          <Field name="effectiveDate" component={DateInput} label="Effective Date" className="form-control" placeholder="Enter effective date" />

          <button
            className="btn btn-primary"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
}

GenericForm.propTypes = {
  handleSubmit: React.PropTypes.func,
};


// function mapDispatchToProps(dispatch) {
//   return {
//     dispatch,
//   };
// }

export default reduxForm({
  form: 'genericForm',
})(GenericForm);
