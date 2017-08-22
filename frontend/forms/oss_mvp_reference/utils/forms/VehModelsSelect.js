/**
*
* VehModelsSelect
*
*/

import React from 'react';
import FontAwesome from 'react-fontawesome';
import classnames from 'classnames';
import HelpTextComponent from './HelpTextComponent';

class VehModelsSelect extends HelpTextComponent { // eslint-disable-line react/prefer-stateless-function
  renderSelectOptions = (value) => { // eslint-disable-line
    // value should be an Immutable List
    return (
      <option
        key={value.label}
        value={value.value}
      >
        {value.value.replace(
          /\w/g, l => l.toUpperCase()
        )}
      </option>
    );
  }

  render() {
    const {
      helpText,
      input,
      label,
      isRequired,
      type,
      meta: {
        touched,
        error,
      },
    } = this.props;
    const classNames = classnames({
      'form-group': 'form-group',
      'select-input': 'select-input',
      invalid: touched && error,
      clearfix: 'clearfix',
    });
    return (
      <div className={classNames}>
        <label htmlFor={label}>
          {label} {isRequired && <span>*</span>}
          { this.renderHelpTextButton(helpText) }
        </label>
        <div className="clearfix">
          <div>
            <div>
              <select
                {...input}
                type={type}
              >
                <option value="">Select</option>
                {/* valuesList should be an Immutable List */}
                {Object.keys(this.props.valuesList).length !== 0 && this.props.valuesList.map(this.renderSelectOptions)}
              </select>
              <FontAwesome name="angle-down" size="2x" />
            </div>
            {touched && error && <p className="warning">{error}</p>}
          </div>
          { this.renderHelpText(helpText) }
        </div>
      </div>
    );
  }
}

VehModelsSelect.propTypes = {
  valuesList: React.PropTypes.any,
  input: React.PropTypes.object,
  label: React.PropTypes.string,
  noDefaultSelect: React.PropTypes.any,
  isRequired: React.PropTypes.bool,
  helpText: React.PropTypes.any,
  type: React.PropTypes.any,
  meta: React.PropTypes.any,
};

export default VehModelsSelect;
