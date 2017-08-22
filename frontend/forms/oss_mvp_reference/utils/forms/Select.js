/**
*
* Select
*
*/

import React from 'react';
import classnames from 'classnames';
import FontAwesome from 'react-fontawesome';
import HelpTextComponent from './HelpTextComponent';

class Select extends HelpTextComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    if (this.props.changeField) {
      if (this.props.defaultOverride) {
        this.props.changeField(
          this.props.name,
          this.props.defaultOverrideVal || this.props.defaultOverride);
      }
    }
  }

  renderSelectOptions = (value) => { // eslint-disable-line
    return (
      <option key={`${value[1]}-${(Math.random() * 100) + 1}`} value={value[0]}>{value[1]}</option>
    );
  }

  render() {
    const {
      helpText,
      input,
      label,
      isRequired,
      type,
      meta: { touched, error },
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
              <select {...input} type={type}>
                {!this.props.noDefaultSelect ? (
                  <option value="">Select</option>
                ) : (
                  ''
                )}
                {this.props.valuesList.map(this.renderSelectOptions)}
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

Select.propTypes = {
  valuesList: React.PropTypes.arrayOf(Array),
  autoSelect: React.PropTypes.any,
  changeField: React.PropTypes.any,
  input: React.PropTypes.object,
  label: React.PropTypes.string,
  noDefaultSelect: React.PropTypes.any,
  initialValOverride: React.PropTypes.any,
  helpText: React.PropTypes.any,
  isRequired: React.PropTypes.bool,
  type: React.PropTypes.any,
  meta: React.PropTypes.any,
  name: React.PropTypes.any,
  defaultOverride: React.PropTypes.any,
  defaultOverrideVal: React.PropTypes.any,
};

export default Select;
