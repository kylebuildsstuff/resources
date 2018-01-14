/**
*
* CheckboxInput
*
*/

import React from 'react';
import classnames from 'classnames';
import { Field } from 'redux-form/immutable';
import HelpTextComponent from './HelpTextComponent';

class RadioInput extends HelpTextComponent {
  // eslint-disable-line
  componentDidMount() {
    if (this.props.changeField) {
      if (this.props.defaultOverride) {
        this.props.changeField(
          this.props.name,
          this.props.defaultOverrideVal || this.props.defaultOverride,
        );
      }
    }
  }

  renderRadioButtons = (displayValue, index) => {
    // eslint-disable-line
    const random = Math.floor(1000 + Math.random() * 9000); // eslint-disable-line
    return (
      <label key={`${index}`} htmlFor={`${this.props.name}-${random}`}>
        <Field
          id={`${this.props.name}-${random}`}
          component="input"
          name={this.props.name}
          type="radio"
          value={this.props.values[index]}
        />
        {displayValue}
      </label>
    );
  };

  render() {
    const {
      label,
      isRequired,
      helpText,
      meta: { touched, error },
    } = this.props;
    const classNames = classnames({
      'form-group': 'form-group',
      'radio-input': 'radio-input',
      invalid: touched && error,
      clearfix: 'clearfix',
    });
    return (
      <div className={classNames}>
        <label htmlFor={label}>
          {label} {isRequired && <span>*</span>}
          {this.renderHelpTextButton(helpText)}
        </label>
        <div className="clearfix">
          <div>
            {this.props.displayValues.map(this.renderRadioButtons)}
            {touched && error && <p className="warning">{error}</p>}
          </div>
          {this.renderHelpText(helpText)}
        </div>
      </div>
    );
  }
}

RadioInput.propTypes = {
  helpText: React.PropTypes.string,
  vals: React.PropTypes.array,
  defaultVal: React.PropTypes.string,
  input: React.PropTypes.any,
  label: React.PropTypes.string,
  isRequired: React.PropTypes.bool,
  type: React.PropTypes.string,
  meta: React.PropTypes.any,
  name: React.PropTypes.any,
  numRadioButtons: React.PropTypes.any,
  values: React.PropTypes.any,
  value: React.PropTypes.any,
  displayValues: React.PropTypes.any,
  defaultButton: React.PropTypes.any,
  defaultOverride: React.PropTypes.any,
  changeField: React.PropTypes.any,
  defaultOverrideVal: React.PropTypes.any,
};

export default RadioInput;
