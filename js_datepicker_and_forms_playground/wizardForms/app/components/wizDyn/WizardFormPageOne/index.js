/**
*
* WizardFormPageOne
*
*/

import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import RenderField from '../RenderField';


class WizardFormPageOne extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <Field name="effectee" type="text" component={RenderField} label="effectee" className="form-control" placeholder="effectee" />
          <Field name="effector" type="text" component={RenderField} label="effector" className="form-control" placeholder="effector" />
          <Field name="vehicleChangeType" type="number" component={RenderField} label="vehicleChangeType" className="form-control" placeholder="vehicleChangeType" />
          <div>
            <button type="submit" className="btn btn-primary">Next</button>
          </div>

        </div>
      </form>
    );
  }
}

WizardFormPageOne.propTypes = {
  handleSubmit: React.PropTypes.func,
};

export default reduxForm({
  form: 'wizardForm',
  destroyOnUnmount: false,
})(WizardFormPageOne);
