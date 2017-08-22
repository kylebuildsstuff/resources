/**
*
* Select
*
*/

import React from 'react';

import HelpTextButton from './HelpTextButton';
import HelpText from './HelpText';

class HelpTextComponent extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleHelpTextClick = this.handleHelpTextClick.bind(this);
    if (this.state === undefined) {
      this.state = { showHelpText: false };
    }
  }

  handleHelpTextClick(evt) { // eslint-disable-line no-unused-vars
    this.setState({ showHelpText: !this.state.showHelpText });
  }

  renderHelpTextButton(helpText) {
    if (helpText === undefined || helpText === '') {
      return null;
    }
    return (
      <HelpTextButton onClick={this.handleHelpTextClick} />
    );
  }

  renderHelpText(helpText) {
    if (this.state.showHelpText) {
      return (
        <HelpText helpText={helpText} />
      );
    }
    return (
      <div className="help-text" />
    );
  }

}

export default HelpTextComponent;
