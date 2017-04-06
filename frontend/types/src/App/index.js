
// @flow
import React from 'react';
import GenericStyles from './styles/GenericStyles';
import {
  genericService,
  serviceReturnNumber,
} from '../services';
import Child from '../Child';

type Props = {}

class App extends React.Component {
  state: {
    testString: string,
    testNumber: number,
    testBoolean: boolean,
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      testString: 'what',
      testNumber: 2,
      testBoolean: false,
    }
  }

  componentDidMount() {
    genericService(5);
    serviceReturnNumber('NUMBER OR RIOT');
    serviceReturnNumber(5);
    this.takeNumberReturnNumber('I WANT TO BE A NUMBER')
    this.genericMethod();
  }

  takeNumberReturnNumber = (n: number): number => {
    return n;
  }

  genericMethod = () => {
    console.log('Im a method');
  }

  returnNumber = () => {
    return 5;
  }

  returnString = () => {
    return 'Im a string';
  }

  returnBoolean = () => {
    var what = {
       what: 'sdads'
    };
    return true;
  }

  returnFunction = () => {
    return () => 5;
  }

  returnObject = () => {
    return {};
  }

  render() {
    return (
      <GenericStyles>
        <div>Using JavaScript with Flow</div>
        <div>I am the App component</div>
        <Child
          testString={this.state.testString}
          testNumber={this.state.testNumber}
          testBoolean={this.state.testBoolean}
          testFunction={this.returnString}
          propString={'asdas'}
          propNumber={'asd'}
        />
      </GenericStyles>
    );
  }
}

export default App;
