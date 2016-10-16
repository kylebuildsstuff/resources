/**
*
* WizardFormPageTwo
*
*/

import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';

function WizardFormPageTwo({ handleSubmit, previousPage }) {
  return (
    <form onSubmit={handleSubmit} className="col-xs-6">

      <div className="card">
        <div className="card-block">
          <div className="form-group">
            <label htmlFor="third">Label 3</label>
            <Field type="text" name="third" component="input" className="form-control" />
          </div>

          <div className="form-group">
            <label htmlFor="fourth">Label 4</label>
            <Field type="text" name="fourth" component="input" className="form-control" />
          </div>

          <div className="btn-group" role="group" aria-label="buttons">
            <button type="button" className="btn btn-primary" onClick={previousPage}>Previous</button>
            <button type="submit" className="btn btn-success">Submit</button>
          </div>
        </div>
      </div>

    </form>
  );
}

WizardFormPageTwo.propTypes = {
  handleSubmit: React.PropTypes.func,
  previousPage: React.PropTypes.func,
};

export default reduxForm({
  form: 'wizardForm',
  destroyOnUnmount: false,
})(WizardFormPageTwo);
