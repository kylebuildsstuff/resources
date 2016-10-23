/**
*
* WizardFormPageOne
*
*/

import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';

import { formatDate, normalizeDate } from '../../utils/forms/fieldHooks/dateFieldHooks';
import DateInput from '../../utils/forms/customComponents/datePicker/DateInput';
import DropdownInput from '../../utils/forms/customComponents/DropdownInput';

function WizardFormPageOne({ handleSubmit, people = ['Bob', 'Joe', 'Henry'] }) {
  return (
    <form onSubmit={handleSubmit} className="col-xs-6">
      <h1>WizardFormPageOne</h1>

      <div className="card">
        <div className="card-block">
          <div className="form-group">
            <Field
              type="date"
              name="effDate"
              label="Effective Date"
              format={formatDate}
              normalize={normalizeDate}
              component={DateInput}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <Field
              name="dropDownSelect"
              label="Select an Option"
              component={DropdownInput}
              people={people}
              className="form-control"
            />
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
})(WizardFormPageOne);
