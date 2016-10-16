/**
*
* DynamicFormPageOne
*
*/

import React from 'react';


import { Field, reduxForm } from 'redux-form/immutable';
import RenderField from '../RenderField';
import WizardFormPageTwoAdd from '../WizardFormPageTwoAdd';
import WizardFormPageTwoReplace from '../WizardFormPageTwoReplace';

class DynamicFormPageOne extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { handleSubmit, previousPage, pristine, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <Field name="effectee" type="text" component={RenderField} label="effectee" className="form-control" placeholder="effectee" />
          <Field name="effector" type="text" component={RenderField} label="effector" className="form-control" placeholder="effector" />
          <Field name="vehicleChangeType" type="number" component={RenderField} label="vehicleChangeType" className="form-control" placeholder="vehicleChangeType" />
          <div>
            <button type="submit" className="btn btn-primary">Continue</button>
          </div>

        </div>
      </form>
    );
  }
}

DynamicFormPageOne.propTypes = {
  handleSubmit: React.PropTypes.func,
  previousPage: React.PropTypes.func,
  pristine: React.PropTypes.bool,
  submitting: React.PropTypes.bool,
};

export default reduxForm({
  form: 'dynamicForm',
  destroyOnUnmount: false,
})(DynamicFormPageOne);
