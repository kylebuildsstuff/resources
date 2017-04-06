// @flow
import React from 'react';

import GenericStyles from './styles/GenericStyles';

type Props = {
    testFunction: function,
    propString: string,
    propNumber: number,
}

export class Child extends React.Component {
  constructor(props: Props) {
    super(props);
  }
  props: Props

  // props: {
  //   testFunction: function,
  //   propString: string,
  //   propNumber: number,
  // };

  componentDidMount() {
    this.props.testFunction();
    console.log(this.props.propString);
    console.log(this.props.propNumber);
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
