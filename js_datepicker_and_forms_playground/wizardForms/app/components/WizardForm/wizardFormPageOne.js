/**
*
* WizardFormPageOne
*
*/

import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';

import DateInput from '../../utils/forms/customComponents/datePicker/DateInput';
import { formatDate, parseDate, normalizeDate } from '../../utils/forms/fieldHooks/dateFieldHooks';

function WizardFormPageOne({ handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="col-xs-6">
      <h1>WizardFormPageOne</h1>

      <div className="card">
        <div className="card-block">
          <div className="form-group">
            <label htmlFor="first">Label 1</label>
            <Field
              type="date"
              name="first"
              format={formatDate}
              // parse={parseDate}
              normalize={normalizeDate}
              component={DateInput}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="second">Label 2</label>
            <Field type="text" name="second" component="input" className="form-control" />
          </div>

          <div className="btn-group" role="group" aria-label="buttons">
            <button type="submit" className="btn btn-primary">Next</button>
          </div>
        </div>
      </div>

    </form>
  );
}

WizardFormPageOne.propTypes = {
  handleSubmit: React.PropTypes.func,
};

export default reduxForm({
  form: 'wizardForm',
  destroyOnUnmount: false,
  // initialValues: {
  //   first: new Date(),
  // },
})(WizardFormPageOne);
