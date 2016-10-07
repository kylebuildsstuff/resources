/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
// import Globalize from 'globalize';
// import globalizeLocalizer from 'react-widgets/lib/localizers/globalize';
import Moment from 'moment'
// import momentLocalizer from 'react-widgets/lib/localizers/moment'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'


export default class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    momentLocalizer(Mmoment);
  }

  render() {
    return (
      <h1>
        hey
        <DateTimePicker defaultValue={null} />
      </h1>
    );
  }
}
