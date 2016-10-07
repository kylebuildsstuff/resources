/**
*
* DateForm
*
*/

import React from 'react';
import Immutable from 'immutable';
import { Field, reduxForm } from 'redux-form/immutable';

import styles from './styles.css';
import DateFormInput from '../DateFormInput';

class DateForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(formData) {
    console.log(formData);
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <form
        className="card"
        onSubmit={handleSubmit(this._handleSubmit)}
      >

        <div className="card-block">
          <div className="form-group">
            <label htmlFor="date"></label>
            <Field
              name="date"
              component={DateFormInput}
              type="text"
              placeholder="Enter new title"
              className="form-control"
            />
          </div>
        </div>

      </form>
    );
  }
}

DateForm.propTypes = {
  handleSubmit: React.PropTypes.any,
  pristine: React.PropTypes.any,
  submitting: React.PropTypes.any,
};

export default reduxForm({
  form: 'reactDates',
})(DateForm);
