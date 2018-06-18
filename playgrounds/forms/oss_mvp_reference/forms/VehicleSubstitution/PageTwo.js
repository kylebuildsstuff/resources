/**
*
* PageTwo
*
*/

import React from 'react';
import { reduxForm } from 'redux-form/immutable';
import FormValues from './FormValues';

class PageTwo extends React.Component { // eslint-disable-line
  render() {
    const {
      handleSubmit,
      previousPage,
      pristine,
      submitting,
      autoPolicies,
    } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <h3>Review your Changes:</h3>
          <FormValues
            autoPolicies={autoPolicies}
            formValues={this.props.getFormValues.toJS()}
            primary={this.props.primary}
          />
        </div>
        <div className="submit-disclaimer">
          <p>By clicking submit, you are declaring that the above information is correct. Submission of this form does <strong>not</strong> constitute a change in your policy. Our team will review this request and you will be informed when your new coverage is in place.</p>
        </div>
        <div className="btn-group btn-group-float-right">
          <button type="button" className="btn" onClick={previousPage}>Previous</button>{' '}
          <button type="submit" disabled={pristine || submitting} className="btn-primary">Submit</button>
        </div>
      </form>
    );
  }
}

PageTwo.propTypes = {
  policies: React.PropTypes.any,
  autofill: React.PropTypes.any,
  policy: React.PropTypes.any,
  primary: React.PropTypes.any,
  autoPolicies: React.PropTypes.any,
  handleSubmit: React.PropTypes.func,
  previousPage: React.PropTypes.func,
  pristine: React.PropTypes.bool,
  submitting: React.PropTypes.bool,
  fetchVehMakes: React.PropTypes.func,
  fetchVehModels: React.PropTypes.func,
  fetchAddresses: React.PropTypes.func,
  vehMakes: React.PropTypes.any,
  vehModels: React.PropTypes.any,
  getFormValues: React.PropTypes.any,
  addresses: React.PropTypes.any,
  vehicle: React.PropTypes.any,
};

export default reduxForm({
  form: 'vehicleSubstitution',
  destroyOnUnmount: false,
  // validate,
})(PageTwo);
