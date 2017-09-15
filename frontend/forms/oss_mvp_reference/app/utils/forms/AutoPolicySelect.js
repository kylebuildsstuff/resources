/**
*
* AutoPolicySelect
*
*/

import React from 'react';
import FontAwesome from 'react-fontawesome';
import classnames from 'classnames';
import HelpTextComponent from './HelpTextComponent';

class AutoPolicySelect extends HelpTextComponent { // eslint-disable-line
  componentDidUpdate() {
    if (
      this.props.valuesList &&
      this.returnValidPolicies(this.props.valuesList).length === 1 && (
        !this.props.input.value
        )
      ) {
      this.props.changeField('policy_number', this.returnValidPolicies(this.props.valuesList)[0].policy_number);
    }
  }

  returnValidPolicies = (policies) => {
    const validPolicies = [];
    policies.map((policy) => { // eslint-disable-line
      if (policy.type === 'auto') {
        validPolicies.push(policy);
      }
    });
    return validPolicies;
  }

  renderSelectOptions = (policy) => { // eslint-disable-line
    return (
      <option
        key={policy.id}
        value={policy.policy_number}
      >
        {policy.policy_number}
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
                {!this.props.noDefaultSelect ? (
                  <option value="">Select</option>
                ) : (
                  ''
                )}
                {this.returnValidPolicies(this.props.valuesList).map(this.renderSelectOptions)}
              </select>
              <FontAwesome name="angle-down" size="2x" />
            </div>
            {touched && error && <p className="warning">{error}</p>}
          </div>
          <div>
            <em>{helpText}</em>
          </div>
        </div>
      </div>
    );
  }
}

AutoPolicySelect.propTypes = {
  valuesList: React.PropTypes.any,
  input: React.PropTypes.object,
  label: React.PropTypes.string,
  noDefaultSelect: React.PropTypes.any,
  isRequired: React.PropTypes.bool,
  helpText: React.PropTypes.any,
  type: React.PropTypes.any,
  meta: React.PropTypes.any,
  fetchVehModels: React.PropTypes.any,
  year: React.PropTypes.any,
  changeField: React.PropTypes.any,
  policies: React.PropTypes.any,
};

export default AutoPolicySelect;
