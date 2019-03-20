/**
*
* TextInput
*
*/

import React from 'react';
import classnames from 'classnames';
import HelpTextComponent from './HelpTextComponent';

class TextInput extends HelpTextComponent {
  render() {
    const {
      helpText,
      startLabel,
      endLabel,
      input,
      placeholder,
      label,
      isRequired,
      type,
      meta: { touched, error },
    } = this.props;
    const classNames = classnames({
      'text-input': 'text-input',
      'start-label': startLabel !== undefined,
      'end-label': endLabel !== undefined,
      'has-text': helpText !== undefined,
      'form-group': 'form-group',
      invalid: touched && error,
    });
    return (
      <div className={classNames}>
        <label htmlFor={label}>
          {label} {isRequired && <span>*</span>}
          { this.renderHelpTextButton(helpText) }
        </label>
        <div className="clearfix">
          <div>
            {startLabel && <b>{startLabel}</b>}
            <input {...input} type={type} placeholder={placeholder} />
            {endLabel && <i>{endLabel}</i>}
            {touched && error && <p className="warning">{error}</p>}
          </div>
          { this.renderHelpText(helpText) }
        </div>
      </div>
    );
  }
}

TextInput.propTypes = {
  helpText: React.PropTypes.string,
  startLabel: React.PropTypes.string,
  endLabel: React.PropTypes.string,
  helpToggle: React.PropTypes.func,
  input: React.PropTypes.any,
  label: React.PropTypes.string,
  isRequired: React.PropTypes.bool,
  type: React.PropTypes.string,
  meta: React.PropTypes.any,
  placeholder: React.PropTypes.any,
};


export default TextInput;
