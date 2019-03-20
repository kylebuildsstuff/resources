/**
*
* StreetNameSelect
*
*/

import React from 'react';
import FontAwesome from 'react-fontawesome';
import classnames from 'classnames';
import HelpTextComponent from './HelpTextComponent';

class StreetNameSelect extends HelpTextComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    if (this.props.valuesList && this.props.valuesList.length > 0) {
      this.props.changeField(this.props.name, this.props.valuesList[0].name);
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.valuesList &&
      this.props.valuesList.length !== 0 && (
        this.props.input.value === 'Select' ||
        this.props.valuesList !== prevProps.valuesList
        )
      ) {
      this.props.changeField(this.props.name, this.props.valuesList[0].name);
    }
  }

  renderSelectOptions = (address) => { // eslint-disable-line
    return (
      <option
        key={address.id}
        value={address.name}
      >
        {address.name}
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
              <select {...input} type={type}>
                <option value="">Select</option>
                {Object.keys(this.props.valuesList).length !== 0 && (
                  this.props.valuesList.map(this.renderSelectOptions)
                )}
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

StreetNameSelect.propTypes = {
  valuesList: React.PropTypes.any,
  input: React.PropTypes.object,
  label: React.PropTypes.string,
  noDefaultSelect: React.PropTypes.any,
  helpText: React.PropTypes.any,
  type: React.PropTypes.any,
  meta: React.PropTypes.any,
  isRequired: React.PropTypes.bool,
  fetchVehModels: React.PropTypes.any,
  year: React.PropTypes.any,
  changeField: React.PropTypes.any,
  name: React.PropTypes.any,
};

export default StreetNameSelect;
