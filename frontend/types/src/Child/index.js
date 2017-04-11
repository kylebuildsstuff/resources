// @flow
import React from 'react';

import GenericStyles from './styles/GenericStyles';
import { concat } from '../services'

type Props = {
    testFunction: function,
    propString: string,
    propNumber: number,
}

export class Child extends React.Component {
  props: Props
  constructor(props: Props) {
    super(props);
  }

  // props: {
  //   testFunction: function,
  //   propString: string,
  //   propNumber: number,
  // };

  componentDidMount() {
    this.props.testFunction();
    console.log(this.props.propString);
    console.log(this.props.propNumber);

    concat('a', 'b');
    concat(1, 2);
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
        I am the Chlid component
      </GenericStyles>
    )
  }
}

export default Child;
