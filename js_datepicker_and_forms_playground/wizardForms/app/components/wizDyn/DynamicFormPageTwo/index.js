/**
*
* DynamicFormPageTwo
*
*/

import React from 'react';

import { Field, reduxForm } from 'redux-form/immutable';
import RenderField from '../RenderField';
import WizardFormPageTwoAdd from '../WizardFormPageTwoAdd';

class DynamicFormPageTwo extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { handleSubmit, previousPage, pristine, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <WizardFormPageTwoAdd />
          <div>
            <button type="submit" className="btn btn-primary">Continue</button>
          </div>

        </div>
      </form>
    );
  }
}

DynamicFormPageTwo.propTypes = {
  handleSubmit: React.PropTypes.func,
  previousPage: React.PropTypes.func,
  pristine: React.PropTypes.bool,
  submitting: React.PropTypes.bool,
};

export default reduxForm({
  form: 'dynamicForm',
  destroyOnUnmount: false,
})(DynamicFormPageTwo);
