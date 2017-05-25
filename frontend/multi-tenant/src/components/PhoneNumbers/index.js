import React from 'react';
import _ from 'lodash';

import PhoneNumberStyles from './styles/PhoneNumberStyles';

export const PhoneNumbers = (props) => {
  const renderPhoneNumbers = (numbersObject) => {
    return _.map(numbersObject, (value, key) => {
      return (
        <li key={key}>
          {`${key}: ${value}`}
        </li>
      );
    });
  }

  return (
    <PhoneNumberStyles>
      {renderPhoneNumbers(props.numbers)}
    </PhoneNumberStyles>
  );
}

export default PhoneNumbers;
