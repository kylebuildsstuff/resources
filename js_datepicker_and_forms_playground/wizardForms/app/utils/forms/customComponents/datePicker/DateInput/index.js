/**
*
* DateInput
*
*/

import React from 'react';

import styles from './styles.css';
import DatePicker from '../DatePicker';

class DateInput extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      dateValue: new Date(),
      activeDateWidget: false,
    };
  }

  changeDate = (date) => {
    this.setState({
      dateValue: date,
    });
  }

  changeActiveDateWidget = () => {
    // e.stopPropagation();
    this.setState({
      activeDateWidget: !this.state.activeDateWidget,
    });
  }

  render() {
    const { input, meta } = this.props;
    const { dateValue, activeDateWidget } = this.state;
    return (
      <div className={styles.dateInput}>
        <input
          {...input}
          className="form-control"
          type="text"
          value={dateValue}
          onClick={this.changeActiveDateWidget}
          // onBlur={this.changeActiveDateWidget}
        />

        {activeDateWidget ? (
          <div>
            {/* <div onClick={this.changeActiveDateWidget} className={styles.dummyDiv}>
            </div> */}
            <DatePicker
              changeActiveDateWidget={this.changeActiveDateWidget}
              changeDate={this.changeDate}
              dateValue={dateValue}
            />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

DateInput.propTypes = {
  input: React.PropTypes.any,
  meta: React.PropTypes.any,
};

export default DateInput;
