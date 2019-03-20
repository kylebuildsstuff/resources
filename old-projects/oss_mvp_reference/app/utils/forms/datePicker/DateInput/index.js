/**
*
* DateInput
*
*/

import React from 'react';
import moment from 'moment/moment';
import DatePicker from '../DatePicker';
import classnames from 'classnames';
import HelpTextComponent from '../../HelpTextComponent';

class DateInput extends HelpTextComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      vanillaDateValue: undefined,
      activeDateWidget: false,
    };
  }

  changeDate = (date) => {
    const momentDate = moment(Date.parse(date)).format('YYYY-MM-DD');
    this.props.changeField(this.props.name, momentDate);
    this.setState({
      vanillaDateValue: date,
    });
  }

  changeActiveDateWidget = () => {
    this.setState({
      activeDateWidget: !this.state.activeDateWidget,
    });
  }

  render() {
    const {
      input,
      helpText,
      label,
      isRequired,
      type,
      meta: {
        touched,
        error,
      },
    } = this.props;
    const { vanillaDateValue, activeDateWidget } = this.state;
    const classNames = classnames({
      'day-picker-outer': 'day-picker-outer',
      'text-input': 'text-input',
      'form-group': 'form-group',
      invalid: touched && error,
    });
    return (
      <div className={`${classNames} clearfix`}>
        <label htmlFor={label}>
          {label} {isRequired && <span>*</span>}
          { this.renderHelpTextButton(helpText) }
        </label>
        <div className="clearfix">
          <div>
            <input
              {...input}
              type={type}
              placeholder="YYYY-MM-DD"
              onClick={() => { this.setState({ activeDateWidget: true }); }}
            />
            {touched && error && <p className="warning">{error}</p>}
          </div>
          {activeDateWidget ? (
            <div className="day-picker-inner">
              <DatePicker
                changeActiveDateWidget={this.changeActiveDateWidget}
                disabledDays={this.props.disabledDays}
                changeDate={this.changeDate}
                dateValue={vanillaDateValue}
              />
            </div>
          ) : ''}
          { this.renderHelpText(helpText) }
        </div>
      </div>
    );
  }
}

DateInput.propTypes = {
  disabledDays: React.PropTypes.any,
  input: React.PropTypes.any,
  helpText: React.PropTypes.string,
  isRequired: React.PropTypes.bool,
  type: React.PropTypes.any,
  meta: React.PropTypes.any,
  name: React.PropTypes.any,
  changeField: React.PropTypes.any,
  label: React.PropTypes.any,
};

export default DateInput;
