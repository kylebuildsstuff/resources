import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, getFormValues } from "redux-form";

import VehicleAddForm from "./vehicle-add.component";

export class VehicleAdd extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(formValues) {
    console.log("submitForm formValues: ", formValues);
  }

  render() {
    return <VehicleAddForm onSubmit={this.submitForm} {...this.props} />;
  }
}

const mapStateToProps = state => ({
  formValues: getFormValues("vehicle-add")(state)
});
const mapDispatchToProps = null;
const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign({}, stateProps, dispatchProps, ownProps); // location is passed from app.container

const formConfiguration = {
  form: "vehicle-add"
};

let VehicleAddFormContainer = reduxForm(formConfiguration)(VehicleAdd);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  VehicleAddFormContainer
);
