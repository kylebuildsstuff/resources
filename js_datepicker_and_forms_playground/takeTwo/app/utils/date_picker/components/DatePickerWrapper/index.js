/*
 *
 * DatePickerWrapper
 *
 */

import React from 'react';
import styles from './styles.css';

import DatePicker from '../DatePicker';

export class DatePickerWrapper extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
  }

  render() {
    return (
      <div
        className={styles.datePickerWrapper}
      >
        <DatePicker
          changeActiveDatePicker={this.props.changeActiveDatePicker}
          changeDate={this.props.changeDate}
          rootDate={this.props.rootDate}
        />
      </div>
    );
  }
}

DatePickerWrapper.propTypes = {
  changeActiveDatePicker: React.PropTypes.func,
  changeDate: React.PropTypes.func,
  rootDate: React.PropTypes.any,
};

export default (DatePickerWrapper);
