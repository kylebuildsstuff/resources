/**
*
* WizardForm
*
*/

import React from 'react';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form/immutable';

import styles from './styles.css';
import WizardFormPageOne from './wizardFormPageOne';
import WizardFormPageTwo from './wizardFormPageTwo';

class WizardForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  onSubmit = (formData) => {
    console.log('formData: ', formData);
  }

  previousPage = () => {
    this.setState({
      page: this.state.page - 1,
    });
  }

  nextPage = () => {
    this.setState({
      page: this.state.page + 1,
    });
  }

  render() {
    const { formValues } = this.props;
    const { page } = this.state;
    return (
      <div className={styles.wizardForm}>
        {page === 1 && <WizardFormPageOne onSubmit={this.nextPage} />}
        {page === 2 && <WizardFormPageTwo previousPage={this.previousPage} onSubmit={this.onSubmit} formValues={formValues} />}
      </div>
    );
  }
}

WizardForm.propTypes = {
  formValues: React.PropTypes.object,
};

function mapStateToProps(state) {
  return ({
    formValues: getFormValues('vehicleChangeType')(state),
  });
}

export default connect(mapStateToProps)(WizardForm);
