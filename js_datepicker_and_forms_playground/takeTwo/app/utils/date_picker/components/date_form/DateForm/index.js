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

  componentWillMount() {
    console.log('');
    console.log('-- DateForm componentWillMount--');
  }

  _handleSubmit(formData) {
    console.log('');
    console.log('-- handleSubmit --');
    console.log(formData.toJS());
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
            <label htmlFor="date">Label</label>
            <Field
              name="dateField"
              component={DateFormInput}
              activeDatePicker="false"
            />
          </div>

          <div className="btn-group" role="group">
            <button
              className="btn btn-success"
              type="submit"
              disabled={pristine || submitting}
            >
              Submit
            </button>
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
