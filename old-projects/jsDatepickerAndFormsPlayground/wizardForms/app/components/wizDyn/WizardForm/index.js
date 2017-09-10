/**
*
* WizardForm
*
*/

import React from 'react';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form/immutable';

import styles from './styles.css';
import WizardFormPageOne from '../WizardFormPageOne';
import WizardFormPageTwo from '../WizardFormPageTwo';


class WizardForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
    };

    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values) {
    console.log(values);
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  render() {
    const { page } = this.state;
    return (
      <div className={styles.wizardForm}>
        {page === 1 && <WizardFormPageOne onSubmit={this.nextPage} />}
        {page === 2 && <WizardFormPageTwo previousPage={this.previousPage} formValues={this.props.values} onSubmit={this.onSubmit} />}
      </div>
    );
  }
}

WizardForm.propTypes = {
  values: React.PropTypes.any,
};

function mapStateToProps(state) {
  return ({
    values: getFormValues('wizardForm')(state),
  });
}

export default connect(mapStateToProps)(WizardForm);
