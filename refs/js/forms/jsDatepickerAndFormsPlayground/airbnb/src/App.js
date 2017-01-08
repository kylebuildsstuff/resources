import React, { Component } from 'react';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

class App extends Component {
  onDateChange = () => {
    console.log("whatever")
  }

  onFocusChange = () => {
    console.log('FOCUSI')
  }
  
  render() {
    return (
      <div className="App">
        <SingleDatePicker
          id="date_input"
          date={new Date()}
          onDateChange={this.onDateChange}
          onFocusChange={this.onFocusChange}
        />
      </div>
    );
  }
}

export default App;
