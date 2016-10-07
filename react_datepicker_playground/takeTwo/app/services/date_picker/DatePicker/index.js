/*
 *
 * DatePicker
 *
 */

import React from 'react';

import 'react-day-picker/lib/style.css';
import './styles.css';
import DayPicker, { DateUtils } from 'react-day-picker';

function disabledDays(day) {
  if (day.getDay() === 0 || day.getDay() === 6) {
    return true;
  }
  return false;
}

export class DatePicker extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      selectedDay: this.props.rootDate,
    };

    this.handleDayClick = this.handleDayClick.bind(this);
  }

  handleDayClick(e, day, { disabled }) {
    if (disabled) {
      return;
    }
    this.setState({ selectedDay: day });
    this.props.changeDate(day);
    this.props.handleClick();
  }

  render() {
    return (
      <div>
        <DayPicker
          initialMonth={new Date()}
          disabledDays={disabledDays}
          selectedDays={(day) => DateUtils.isSameDay(this.state.selectedDay, day)}
          onDayClick={this.handleDayClick}
        />
      </div>
    );
  }
}

DatePicker.propTypes = {
  handleClick: React.PropTypes.func,
  changeDate: React.PropTypes.func,
  rootDate: React.PropTypes.any,
};


export default DatePicker;
