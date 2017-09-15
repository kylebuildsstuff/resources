/**
*
* AutoFillProvinceInput
*
*/

import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import HelpTextComponent from './HelpTextComponent';

class AutoFillProvinceInput extends HelpTextComponent { // eslint-disable-line
  componentDidUpdate(prevProps) {
    if (
      this.props.streetName && (
        this.props.streetName !== prevProps.streetName
      )) {
      this.props.changeField(this.props.name, this.getCorrectProvince(this.props.streetName, this.props.addresses));
    }
  }

  getCorrectProvince = (streetName, addresses) => { //eslint-disable-line
    const parsedAddress = _.find(addresses, (address) => { // eslint-disable-line
      return address.name === streetName;
    });
    if (parsedAddress) {
      return (
        parsedAddress.city.name.split(', ').length > 1 ?
        parsedAddress.city.name.split(', ')[1] :
        parsedAddress.city.name
      );
    }
    return '';
  }

  render() {
    const {
      helpText,
      input,
      placeholder,
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
              value={this.getCorrectProvince(
                this.props.streetName,
                this.props.addresses
              )}
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

AutoFillProvinceInput.propTypes = {
  helpText: React.PropTypes.string,
  input: React.PropTypes.any,
  any: React.PropTypes.any,
  streetName: React.PropTypes.any,
  addresses: React.PropTypes.any,
  isRequired: React.PropTypes.bool,
  label: React.PropTypes.string,
  type: React.PropTypes.string,
  meta: React.PropTypes.any,
  name: React.PropTypes.any,
  placeholder: React.PropTypes.any,
  changeField: React.PropTypes.any,
  fetchAddresses: React.PropTypes.any,
};

export default AutoFillProvinceInput;
