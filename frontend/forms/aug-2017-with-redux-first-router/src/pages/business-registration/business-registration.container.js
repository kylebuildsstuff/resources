import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, getFormValues } from "redux-form";

// import BusinessRegistrationForm from "./business-registration.component";
import BusinessRegistrationFormPageOne from "./business-registration-page-one.component";
import BusinessRegistrationFormPageTwo from "./business-registration-page-two.component";
import BusinessRegistrationFormPageThree from "./business-registration-page-three.component";

export class BusinessRegistration extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);

    this.state = {
      page: 1
    };
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  submitForm(formValues) {
    console.log("submitForm formValues: ", formValues);
  }

  render() {
    const { page } = this.state;
    const { blur, autofill, form, handleSubmit, reset } = this.props;
    const formProps = {
      blur,
      autofill,
      form,
      handleSubmit,
      reset
    };
    return (
      <div>
        {page === 1 &&
          <BusinessRegistrationFormPageOne
            {...formProps}
            onSubmit={this.nextPage}
          />}
        {page === 2 &&
          <BusinessRegistrationFormPageTwo
            {...formProps}
            onSubmit={this.nextPage}
            previousPage={this.previousPage}
          />}
        {page === 3 &&
          <BusinessRegistrationFormPageThree
            {...formProps}
            previousPage={this.previousPage}
            onSubmit={this.submitForm}
          />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  formValues: getFormValues("business-registration")(state)
});
const mapDispatchToProps = null;
const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign({}, stateProps, dispatchProps, ownProps); // location is passed from app.container

const formConfiguration = {
  form: "business-registration",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
};

let BusinessRegistrationFormContainer = reduxForm(formConfiguration)(
  BusinessRegistration
);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  BusinessRegistrationFormContainer
);
