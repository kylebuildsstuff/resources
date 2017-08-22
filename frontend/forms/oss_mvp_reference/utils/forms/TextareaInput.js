/**
*
* TextareaInput
*
*/

import React from 'react';
import classnames from 'classnames';
import HelpTextComponent from './HelpTextComponent';

class TextareaInput extends HelpTextComponent {
  render() {
    const {
      helpText,
      input,
      placeholder,
      label,
      isRequired,
      meta: { touched, error },
    } = this.props;
    const classNames = classnames({
      'textarea-input': 'textarea-input',
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
            <textarea {...input} rows="3" type="textarea" placeholder={placeholder} />
            {touched && error && <p className="warning">{error}</p>}
          </div>
          { this.renderHelpText(helpText) }
        </div>
      </div>
    );
  }
}


TextareaInput.propTypes = {
  helpText: React.PropTypes.string,
  input: React.PropTypes.any,
  label: React.PropTypes.string,
  isRequired: React.PropTypes.bool,
  type: React.PropTypes.string,
  meta: React.PropTypes.any,
  placeholder: React.PropTypes.any,
};

export default TextareaInput;
