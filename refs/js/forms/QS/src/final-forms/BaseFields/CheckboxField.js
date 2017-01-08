import React from 'react';
import BaseField from './BaseField';
import { connect } from 'react-redux';
import { setValues } from '../../actions';

function TextField(WrappedComponent) {
  class WrappedField extends BaseField {
    constructor(props) {
      super(props);
      this.state = {
        label: this.props.label,
        name: this.props.name,
        value: '',
      }
    }

    handleCheckboxChange = (e) => {
      this.setState({ value: e.target.checked });
      this.props.set({
        label: e.target.alt,
        name: e.target.name,
        value: e.target.checked,
        type: e.target.type,
      });
    }

    renderElem() {
      return this.props.options && this.props.options.map(opt =>
        <label key={opt[0]}>
          <WrappedComponent
            {...this.props}
            {...this.state}
            value={opt[0]}
            name={opt[0]}
            label={opt[1]}
            onChange={this.handleCheckboxChange}
          /> {opt[1]}
        </label>
      )
    }

    render() {
      return (
        <div className="form-group CheckboxField">
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

export default TextField;
