/**
*
* DateInput
*
*/

import React from 'react';
import moment from 'moment';

import styles from './styles.css';
import DatePicker from '../DatePicker';

class DateInput extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      vanillaDateValue: new Date(),
      momentDateValue: moment().format('YYYY-MM-DD'),
      activeDateWidget: false,
    };
  }

  changeDate = (date) => {
    const momentDate = moment(Date.parse(date)).format('YYYY-MM-DD');
    this.setState({
      vanillaDateValue: date,
      momentDateValue: momentDate,
    });
  }

  changeActiveDateWidget = () => {
    this.setState({
      activeDateWidget: !this.state.activeDateWidget,
    });
  }

  render() {
    const { input, meta, label } = this.props;
    const { vanillaDateValue, momentDateValue, activeDateWidget } = this.state;
    return (
      <div className={styles.dateInput}>
        <label htmlFor={label}>{label}</label>
        <input
          {...input}
          className="form-control"
          type="date"
          value={momentDateValue}
          onClick={() => { this.setState({ activeDateWidget: true }); }}
        />

        {activeDateWidget ? (
          <div>
            <DatePicker
              changeActiveDateWidget={this.changeActiveDateWidget}
              changeDate={this.changeDate}
              dateValue={vanillaDateValue}
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
  label: React.PropTypes.any,
};

export default DateInput;
