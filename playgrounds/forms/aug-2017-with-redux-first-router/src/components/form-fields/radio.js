import React from "react";
import classnames from "classnames";
import { Field } from "redux-form";

class RadioInput extends React.Component {
  constructor(props) {
    super(props);
    this.renderRadioButtons = this.renderRadioButtons.bind(this);
  }

  renderRadioButtons(value, index) {
    return (
      <label key={`${index}`} htmlFor={`${this.props.input.name}-${index}`}>
        <Field
          id={`${this.props.input.name}-${index}`}
          component="input"
          name={this.props.input.name}
          type="radio"
          value={value}
        />
        {this.props.radioValues[value]}
      </label>
    );
  }

  render() {
    const { label, meta: { touched, error } } = this.props;
    return (
      <div>
        <label htmlFor={label}>
          {label}
        </label>
        <div>
          {this.props.radioValues &&
            Object.keys(this.props.radioValues).map(this.renderRadioButtons)}
        </div>
      </div>
    );
  }
}

export default RadioInput;
