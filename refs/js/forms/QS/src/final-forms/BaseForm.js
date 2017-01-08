import React from 'react';
import { connect } from 'react-redux';
import { formSelector } from '../selectors';

function BaseForm(WrappedForm) {
  class ExtendedForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        values: {},
        isValid: false,
      }
    }

    handleSubmit = (e) => {
      // submit
    }

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <h3>{this.props.title}</h3>
          <WrappedForm {...this.props} />
          <button type="submit" disabled={!this.state.isValid}>submit!</button>
        </form>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      form: formSelector(state),
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      dispatch,
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(ExtendedForm);
}

export default BaseForm;
