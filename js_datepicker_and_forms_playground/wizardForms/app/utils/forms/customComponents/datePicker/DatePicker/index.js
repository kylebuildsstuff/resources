/**
*
* DatePicker
*
*/

import React from 'react';
import 'react-day-picker/lib/style.css';
import DayPicker, { DateUtils } from 'react-day-picker';

import styles from './styles.css';
import disabledDays from './disabledDays';


class DatePicker extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      selectedDay: new Date(),
    };

    this.validElements = [];
  }

  componentDidMount() {
    if (this._input) {
      this._input.focus();
    }
  }

  handleDayClick = (e, day, { disabled }) => {
    // e.stopPropagation();
    if (disabled) {
      return;
    }
    this.setState({ selectedDay: day }, () => {
      this.props.changeDate(day);
      this.props.changeActiveDateWidget();
    });
  }

  focusThisComponent = (e) => {
    // this._input = e;
    if (e) {
      this._input = e;
    }
  }

  focusIt = () => {
    console.log('focusing');
  }

  recursify = (element) => {
    if (element.hasChildNodes()) {
      const children = element.childNodes;
      for (let i = 0; i < children.length; i++) {
        this.validElements.push(children[i]);
        this.recursify(children[i]);
      }
      return;
    }
  }

  blurIt = () => {
    console.log('blurring');
    setTimeout(() => {
      const rootDateElement = document.getElementById('datePicker');
      this.recursify(rootDateElement);
      if (this.validElements.includes(document.activeElement)) {
        console.log('inVAlidElements')
      } else {
        console.log('nope')
      }


      if (document.activeElement == document.body) {
        this.props.changeActiveDateWidget();
      }
    }, 1);
  }

  render() {
    const { changeActiveDateWidget } = this.props;
    const { selectedDay } = this.state;
    return (
      <div
        className={styles.datePicker}
        onFocus={this.focusIt}
        onBlur={this.blurIt}
        tabIndex="1"
        ref={this.focusThisComponent}
      >
        <DayPicker
          initialMonth={selectedDay}
          disabledDays={disabledDays}
          selectedDays={(day) => DateUtils.isSameDay(selectedDay, day)}
          onDayClick={this.handleDayClick}
          id="datePicker"
        />
      </div>
    );
  }
}

DatePicker.propTypes = {
  changeDate: React.PropTypes.func,
  changeActiveDateWidget: React.PropTypes.func,
};

export default DatePicker;
