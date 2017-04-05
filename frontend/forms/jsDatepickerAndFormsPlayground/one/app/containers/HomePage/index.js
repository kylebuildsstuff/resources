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
import DayPicker, { DateUtils } from 'react-day-picker';
// import 'react-day-picker/lib/style.css'
import styles from './date_picker.css';
// import '../../../date_picker.css'
// import styles from './date_picker.css';

import _ from 'lodash'

function disabledDays(day) {
  // return true to disable days
  // days labelled 0 - 6, 0 being Sunday
  if (day.getDay() === 0 || day.getDay() === 6) {
    return true;
  }
}

export default class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      selectedDay: new Date(),
    }

    this.handleDayClick = this.handleDayClick.bind(this);
  }

  handleDayClick(e, day, { disabled }) {
    if (disabled) {
      return;
    }
    this.setState({ selectedDay: day });
  }

  tpl(keyName) {
    return (
      `${styles[keyName]}`
    );
  }

  renderKey(template, data) {
    return template(data);
  }

  loopAllTheThings(keys) {
    let results = _.map(keys, (key) => {
      console.log('key: ', key)
      this.renderKey(this.tpl, key);
    })
    console.log('')
    console.log('results: ', results)
    console.log('')
    return results
  }

  doThisStuff(css) {
    console.log('')
    console.log('css: ', css)
    let cssKeys = _.keys(css); // returns Array
    console.log(`${this.loopAllTheThings(cssKeys)}`)
    return (`
      ${this.loopAllTheThings(cssKeys)}
    `)
    // return (`
    //     ${styles['DayPicker']}
    //
    //   `)
  }

  makeString() {
    if (typeof(styles['DayPicker']) === 'string') {
      return styles['DayPicker'];
    } else {
      return;
    }
  }

  ///////

  keyWrangle(key) {
    console.log('-- keyWrangle --')
    function templater(data) {
      console.log('-- templater --')
      console.log(`I'm the template! ${data}`)
      return 1
    }

    function renderPiece(templatee, passedKey) {
      console.log('--  renderPiece --')
      return templatee(passedKey)
    }

    // renderPiece(templater, key)
    return `${styles[key]}`
  }

  wrap(styles) {
    console.log('-- wrap --')
    let cssKeys = _.keys(styles);
    let results = _.map(cssKeys, this.keyWrangle)
    console.log('cssKeysRaw: ', cssKeys)
    console.log('resultsRaw: ', results)
    console.log('resultsJoined: ', results.join(' '))
    console.log('resultsSpread: ', ...results)
    return results.join(' ')
    // @NOTE: Our webpack config's PostCSS stuff is likely messing with the default
    // BEM-styled styles of react-date-picker, which is why it's not able
    // to import a copy of the native styles into our own css file

    // Tried copy pasting the native styles into own css file
    // Tried taking every style from the copied file and manually outputting as a mess of strings
    // ...Whatever styles get put out here will get jangled by our PostCSS
    // may need to fork the repo and change the BEM-like styling
  }

  componentWillMount() {
    console.log('-- componentWillMount --')
    // this.wrap(styles)
    console.log(styles['DayPicker'])
  }

  render() {
    return (
      // className={`${styles['DayPicker']} ${styles['DayPicker-NavBar']}`}
      // className={this.doThisStuff(styles)}
      <div className={this.wrap(styles)}>
        <DayPicker
          initialMonth={new Date()}
          disabledDays={disabledDays}
          selectedDays={day => DateUtils.isSameDay(this.state.selectedDay, day)}
          onDayClick={this.handleDayClick}
        />

        <h1>
          The selected day is { this.state.selectedDay.toLocaleDateString()}
        </h1>
      </div>
    );
  }
}
