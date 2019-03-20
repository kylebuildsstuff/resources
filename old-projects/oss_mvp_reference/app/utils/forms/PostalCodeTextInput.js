/**
*
* PostalCodeTextInput
*
*/

import React from 'react';
import classnames from 'classnames';
import HelpTextComponent from './HelpTextComponent';

class PostalCodeTextInput extends HelpTextComponent { // eslint-disable-line
  fetchAddressesValid = () => {
    const value = this.props.input.value;
    if (value.length > 5 && value.length < 8) {
      this.props.fetchAddresses(value);
    }
  }

  render() {
    const {
      helpText,
      input,
      isRequired,
      label,
      placeholder,
      type,
      meta: {
        touched,
        error,
      },
    } = this.props;
    const classNames = classnames({
      'text-input': 'text-input',
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
            <input
              {...input}
              type={type}
              placeholder={placeholder}
              onBlur={(e) => {
                this.fetchAddressesValid();
                input.onBlur(e);
              }}
            />
            {touched && error && <p className="warning">{error}</p>}
          </div>
          <div className="help-text">
            <em>{helpText}</em>
          </div>
        </div>
      </div>
    );
  }
}

PostalCodeTextInput.propTypes = {
  addresses: React.PropTypes.any,
  helpText: React.PropTypes.string,
  input: React.PropTypes.any,
  isRequired: React.PropTypes.bool,
  label: React.PropTypes.string,
  type: React.PropTypes.string,
  meta: React.PropTypes.any,
  fetchAddresses: React.PropTypes.any,
  placeholder: React.PropTypes.any,
};

export default PostalCodeTextInput;
