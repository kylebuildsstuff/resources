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
      momentDateValue: moment().format('dddd MMM. Do, YYYY'),
      activeDateWidget: false,
    };
  }

  changeDate = (date) => {
    const momentized = moment(Date.parse(date)).format('dddd MMM. Do, YYYY');
    this.setState({
      vanillaDateValue: date,
      momentDateValue: momentized,
    });
  }

  changeActiveDateWidget = () => {
    this.setState({
      activeDateWidget: !this.state.activeDateWidget,
    });
  }

  render() {
    const { input, meta } = this.props;
    const { vanillaDateValue, momentDateValue, activeDateWidget } = this.state;
    return (
      <div className={styles.dateInput}>
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
};

export default DateInput;
