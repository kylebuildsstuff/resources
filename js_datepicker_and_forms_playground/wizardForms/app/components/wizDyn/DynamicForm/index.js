/**
*
* DynamicForm
*
*/

import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import styles from './styles.css';

import DynamicFormPageOne from '../DynamicFormPageOne';
import DynamicFormPageTwo from '../DynamicFormPageTwo';
import DynamicFormPageThree from '../DynamicFormPageThree';


class DynamicForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      initialCheck: false,
      vehicleChangeType: 1,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.realSubmit = this.realSubmit.bind(this);
  }

  onSubmit(formValues) {
    this.setState({ initialCheck: true });
    if (formValues.get('vehicleChangeType') === 1) {
      this.setState({
        vehicleChangeType: 1,
      });
    } else {
      this.setState({
        vehicleChangeType: 2,
      });
    }
  }

  realSubmit(formValues) {
    console.log(formValues);
  }

  render() {
    const { vehicleChangeType, initialCheck } = this.state;
    return (
      <div className="">
        <DynamicFormPageOne
          onSubmit={this.onSubmit}
        />
        {initialCheck ? (
          vehicleChangeType === 1 ? (
            <DynamicFormPageTwo onSubmit={this.realSubmit} />
          ) : (
            <DynamicFormPageThree onSubmit={this.realSubmit} />
          )
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default DynamicForm;
