/**
*
* WizardFormPageOne
*
*/

import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';

import { formatDate, normalizeDate } from '../../utils/forms/fieldHooks/dateFieldHooks';
import DateInput from '../../utils/forms/customComponents/datePicker/DateInput';
import DropDownSelect from '../../utils/forms/customComponents/DropDownSelect';

function WizardFormPageOne({ handleSubmit, people = ['Bob', 'Joe', 'Henry'] }) {
  return (
    <form onSubmit={handleSubmit} className="col-xs-6">
      <h1>WizardFormPageOne</h1>

      <div className="card">
        <div className="card-block">
          <div className="form-group">
            <label htmlFor="effDate">Effective Date</label>
            <Field
              type="date"
              name="effDate"
              format={formatDate}
              normalize={normalizeDate}
              component={DateInput}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="dropDownSelect">Select an Option</label>
            <Field
              name="dropDownSelect"
              component="select"
              // component={DropDownSelect}
              // people={people}
              className="form-control"
            >
              {people.map(DropDownSelect)}
            </Field>
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
