/**
*
* VehYearsNumInput
*
*/

import React from 'react';
import classnames from 'classnames';
import HelpTextComponent from './HelpTextComponent';

class VehYearsNumInput extends HelpTextComponent { // eslint-disable-line
  fetchVehMakesValid = (e) => {
    // const val = this.props.input.value;
    const val = e.target.value;
    if (!(val === '') && (
      Number(val) && (
        Number(val) >= 1982 && (
          Number(val) <= 2100
        )
      )
    )) {
      this.props.fetchVehMakes(Number(val));
    }
  }

  render() {
    const {
      helpText,
      input,
      placeholder,
      label,
      type,
      isRequired,
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
              onChange={(e) => {
                this.fetchVehMakesValid(e);
                input.onChange(e);
              }}
            />
            {touched && error && <p className="warning">{error}</p>}
          </div>
          { this.renderHelpText(helpText) }
        </div>
      </div>
    );
  }
}

VehYearsNumInput.propTypes = {
  helpText: React.PropTypes.string,
  input: React.PropTypes.any,
  label: React.PropTypes.string,
  type: React.PropTypes.string,
  isRequired: React.PropTypes.bool,
  meta: React.PropTypes.any,
  placeholder: React.PropTypes.any,
  fetchVehMakes: React.PropTypes.func,
};

export default VehYearsNumInput;
