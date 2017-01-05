// @flow
import React from 'react';

import {
  BodyWrapper,
} from './styles';

class Body extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      num: 1,
      letter: 'a',
    };
  }

  changeNum = () => {
    this.setState({
      num: this.state.num + 1,
    });
  }

  changeLetter = () => {
    this.setState({
      letter: this.state.letter + 'n',
    });
  }

  returnString = () => {
    return 'Stringy';
  }

  render() {
    return (
      <BodyWrapper>
        <div>
          Number: {this.state.num}
        </div>
        <div>
          Letter: {this.state.letter}
        </div>

        <h4>Buttons</h4>
        <button onClick={this.changeNum}>Click Me to Change the Number</button>
        <button onClick={this.changeLetter}>Click Me to Change the Letter</button>
      </BodyWrapper>
    );
  }
}

export default Body;
