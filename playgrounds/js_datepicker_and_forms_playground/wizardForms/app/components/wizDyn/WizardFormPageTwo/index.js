/**
*
* WizardFormPageTwo
*
*/

import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import RenderField from '../RenderField';
import WizardFormPageTwoAdd from '../WizardFormPageTwoAdd';
import WizardFormPageTwoReplace from '../WizardFormPageTwoReplace';

class WizardFormPageTwo extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    console.log('lookie me: ', this.props.formValues);
  }

  render() {
    const { handleSubmit, previousPage, pristine, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          {this.props.formValues.get('vehicleChangeType') === 1 ? (
            <WizardFormPageTwoAdd />
          ) : (
            <div>
              <WizardFormPageTwoAdd />
              <WizardFormPageTwoReplace />
            </div>
          )}
          <div>
            <button type="button" className="btn btn-secondary" onClick={previousPage}>Previous</button>
            <button type="submit" disabled={pristine || submitting} className="btn-primary">Submit</button>
          </div>

        </div>
      </form>
    );
  }
}

WizardFormPageTwo.propTypes = {
  handleSubmit: React.PropTypes.func,
  previousPage: React.PropTypes.func,
  pristine: React.PropTypes.bool,
  submitting: React.PropTypes.bool,
  formValues: React.PropTypes.any,
};

export default reduxForm({
  form: 'wizardForm',
  destroyOnUnmount: false,
})(WizardFormPageTwo);
