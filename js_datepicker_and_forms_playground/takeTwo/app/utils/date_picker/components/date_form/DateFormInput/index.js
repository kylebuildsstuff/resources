/**
*
* DateFormInput
*
*/

import React from 'react';

import styles from './styles.css';
import DatePickerWrapper from '../../DatePickerWrapper';

class DateFormInput extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      activeDatePicker: false,
      dateValue: new Date(),
    };

    this.changeDate = this.changeDate.bind(this);
    this.changeActiveDatePicker = this.changeActiveDatePicker.bind(this);
  }

  changeDate(date) {
    this.setState({
      dateValue: date,
    });
  }

  changeActiveDatePicker() {
    this.setState({
      activeDatePicker: !this.state.activeDatePicker,
    });
  }

  render() {
    const { input, meta } = this.props;
    return (
      <div className={styles.dateFormInput}>
        <input
          {...input}
          className="form-control"
          type="text"
          placeholder="dd/mm/yyyy"
          value={this.state.dateValue}
          onClick={() => this.changeActiveDatePicker()}
        />
        {this.state.activeDatePicker ? (
          <DatePickerWrapper
            changeActiveDatePicker={this.changeActiveDatePicker}
            changeDate={this.changeDate}
            rootDate={this.state.dateValue}
          />
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

DateFormInput.propTypes = {
  input: React.PropTypes.any,
  meta: React.PropTypes.any,
};

export default DateFormInput;
