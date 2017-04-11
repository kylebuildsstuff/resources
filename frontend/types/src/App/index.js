
// @flow
import React from 'react';
import GenericStyles from './styles/GenericStyles';
import {
  genericService,
  serviceReturnNumber,
} from '../services';
import Child from '../Child';

type Props = {}
type State = {
  testString: string,
  testNumber: number,
  testBoolean: boolean,
}

class App extends React.Component {
  state: State
  props: Props
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
    this.takeNumberReturnNumber(8765)
    this.genericMethod();
  }

  takeNumberReturnNumber = (n: number): number => {
    return n;
  }

  genericMethod = () => {
    console.log('Im a method and I return nothing');
  }

  returnNumber = () => {
    return 5;
  }

  returnString = () => {
    return 'Im a string';
  }

  returnBoolean = () => {
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
        <Child // This whole block errors: Props of React Element 'Child' are not compatible
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
