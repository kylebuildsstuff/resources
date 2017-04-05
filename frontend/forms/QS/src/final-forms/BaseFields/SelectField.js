import React from 'react';
import BaseField from './BaseField';
import { connect } from 'react-redux';
import { setValues } from '../../actions';

function SelectField(WrappedComponent) {
  class WrappedField extends BaseField {
    constructor(props) {
      super(props);
      this.state = {
        label: this.props.label,
        name: this.props.name,
        value: '',
      }
      this.helpText = 'Select help text.';
    }

    renderElem() {
      return (
        <WrappedComponent
          {...this.props}
          {...this.state}
          onChange={this.handleChange}
        />
      )
    }

    render() {
      return (
        <div className="form-group SelectField">
          {this.renderLabel()}
          {this.renderElem()}
          {this.renderFieldError()}
          {this.renderHelpText()}
        </div>
      )
    }
  }

  function mapDispatchToProps(dispatch) {
    return { set: (values) => dispatch(setValues(values)) };
  }

  return connect(null, mapDispatchToProps)(WrappedField);
}

export default SelectField;
