/*
 *
 * DatePickerButton
 *
 */

import React from 'react';

import styles from './styles.css';
import DatePickerWrapper from '../DatePickerWrapper';

export class DatePickerButton extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      dateValue: new Date(),
    };
    this.handleClick = this.handleClick.bind(this);
    this.changeDate = this.changeDate.bind(this);
  }

  handleClick() {
    this.setState({
      active: !this.state.active,
    });
  }

  changeDate(date) {
    this.setState({
      dateValue: date,
    });
  }

  render() {
    if (!this.state.active) {
      return (
        <div className={styles.datePickerButton}>
          <h1>{`Date is: ${this.state.dateValue.toDateString()}`}</h1>
          <button
            className="btn btn-secondary"
            onClick={this.handleClick}
          >
            <i className="fa fa-calendar" aria-hidden="true"></i>
          </button>
        </div>
      );
    }

    return (
      <div className={styles.datePickerButton}>
        <h1>{`Date is: ${this.state.dateValue.toDateString()}`}</h1>
        <button
          className="btn btn-secondary"
          onClick={this.handleClick}
        >
          <i className="fa fa-calendar" aria-hidden="true"></i>
        </button>
        <DatePickerWrapper
          handleClick={this.handleClick}
          changeDate={this.changeDate}
          rootDate={this.state.dateValue}
        />
      </div>
    );
  }
}


export default DatePickerButton;
