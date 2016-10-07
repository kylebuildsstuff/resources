/**
*
* DateFormInput
*
*/

import React from 'react';

import styles from './styles.css';

class DateFormInput extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    console.log('');
    console.log('PROPS: ', this.props);
    console.log('');
  }
  render() {
    const { input: { value, onChange } } = this.props;
    return (
      <div className={styles.dateFormInput}>
        <div>
          <span>The current value is {value}.</span>
          <button type="button" onClick={() => onChange(value + 1)}>Inc</button>
          <button type="button" onClick={() => onChange(value - 1)}>Dec</button>
        </div>
      </div>
    );
  }
}

export default DateFormInput;
