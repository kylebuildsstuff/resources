import React from 'react';

class BaseField extends React.Component {
  constructor(props) {
    super(props);
    this.helpText = '';
    this.fieldError = '';

    this.state = {
      error: '',
    }
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value });
    this.props.set({
      label: this.props.label,
      name: this.props.name,
      value: e.target.value,
      type: e.target.type,
    });
    if (this.props.onChange) {
      // custom onChange in components
      this.props.onChange(e);
    }
  }

  handleBlur = (e) => {
    if (e.target.value === '' || e.target.value === 'Select…') {
      return this.props.required && this.setState({ error: 'Required!' })
    } else {
      this.setState({ error: '' })
    }
  }

  handleFocus = (e) => {
    console.log('focusing');
  }

  renderLabel() {
    return (
      <label>
        {this.props.label} {this.props.required && <span className="required">*</span>}
      </label>
    )
  }

  renderHelpText() {
    return this.helpText ? <div className="helpText">{this.helpText}</div> : null;
  }

  renderFieldError() {
    return this.state.error ? <div className="fieldError">{this.state.error}</div> : null;
  }

  renderElem() {
    return null;
  }

}

export default BaseField;
