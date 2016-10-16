/**
*
* DatePicker
*
*/

import React from 'react';
import 'react-day-picker/lib/style.css';
import DayPicker, { DateUtils } from 'react-day-picker';
// import moment from 'moment';

import styles from './styles.css';
import disabledDays from './disabledDays';

class DatePicker extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      selectedDay: this.props.dateValue,
    };

    this.validElements = [];
  }

  componentDidMount() {
    // Once DatePicker successfully sets a ref, component will mount
    // and autofocus onto DatePicker's wrapper div.
    if (this.refComponent) {
      this.refComponent.focus();
    }
  }

  setRefComponent = (e) => {
    if (e) {
      this.refComponent = e;
    }
  }

  findDatePickerDOMNodes = (element) => {
    this.validElements.push(element);
    if (element.hasChildNodes()) {
      const children = element.childNodes;
      for (let i = 0; i < children.length; i += 1) {
        this.validElements.push(children[i]);
        this.findDatePickerDOMNodes(children[i]);
      }
      return;
    }
  }

  handleDayClick = (e, day, { disabled }) => {
    if (disabled) {
      return;
    }
    this.setState({ selectedDay: day }, () => {
      this.props.changeDate(day);
      this.props.changeActiveDateWidget();
    });
  }

  handleBlur = () => {
    // Since DatePicker's wrapper div has been autofocused on mount, all
    // that needs to be done is to blur on anything that's not the DatePicker.
    // DatePicker has many child divs that handle things like day, week, month...
    // invoke a recursive function to gather all children of root DatePicker
    // div, then run a test against valid DatePicker elements. If test
    // fails, then changeActiveDateWidget.
    setTimeout(() => {
      const rootDatePickerElement = document.getElementById('datePickerWidget');
      this.findDatePickerDOMNodes(rootDatePickerElement);
      if (!this.validElements.includes(document.activeElement)) {
        this.props.changeActiveDateWidget();
      }
    }, 1);
  }

  render() {
    const { selectedDay } = this.state;
    return (
      <div
        className={styles.datePicker}
        onBlur={this.handleBlur}
        // tabIndex necessary for element to be auto-focused.
        tabIndex="1"
        ref={this.setRefComponent}
      >
        <DayPicker
          initialMonth={selectedDay}
          disabledDays={disabledDays}
          selectedDays={(day) => DateUtils.isSameDay(selectedDay, day)}
          onDayClick={this.handleDayClick}
          id="datePickerWidget"
        />
      </div>
    );
  }
}

DatePicker.propTypes = {
  changeDate: React.PropTypes.func,
  changeActiveDateWidget: React.PropTypes.func,
  dateValue: React.PropTypes.object,
};

export default DatePicker;
