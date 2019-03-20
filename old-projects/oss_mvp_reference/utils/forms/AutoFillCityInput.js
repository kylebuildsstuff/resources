/**
*
* AutoFillCityInput
*
*/

import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import HelpTextComponent from './HelpTextComponent';

class AutoFillCityInput extends HelpTextComponent { // eslint-disable-line
  componentDidUpdate(prevProps) {
    if (
      this.props.streetName && (
        this.props.streetName !== prevProps.streetName
      )) {
      this.props.changeField(this.props.name, this.getCorrectCity(this.props.streetName, this.props.addresses));
    }
  }

  getCorrectCity = (streetName, addresses) => { //eslint-disable-line
    const parsedAddress = _.find(addresses, (address) => { // eslint-disable-line
      return address.name === streetName;
    });
    if (parsedAddress) {
      return (
        parsedAddress.city.name.split(',').length > 1 ? parsedAddress.city.name.split(',')[0] : parsedAddress.city.name
      );
    }
    return '';
  }

  render() {
    const {
      helpText,
      placeholder,
      input,
      isRequired,
      label,
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
            />
            {touched && error && <p className="warning">{error}</p>}
          </div>
          { this.renderHelpText(helpText) }
        </div>
      </div>
    );
  }
}

AutoFillCityInput.propTypes = {
  helpText: React.PropTypes.string,
  input: React.PropTypes.any,
  placeholder: React.PropTypes.any,
  name: React.PropTypes.any,
  changeField: React.PropTypes.any,
  label: React.PropTypes.string,
  isRequired: React.PropTypes.bool,
  type: React.PropTypes.string,
  meta: React.PropTypes.any,
  addresses: React.PropTypes.any,
  postalCode: React.PropTypes.any,
  streetName: React.PropTypes.any,
  fetchVehMakes: React.PropTypes.func,
};

export default AutoFillCityInput;
