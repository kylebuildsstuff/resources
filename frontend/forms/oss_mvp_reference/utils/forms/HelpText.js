/**
*
* HelpText
*
*/

import React from 'react';

class HelpText extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      helpText,
    } = this.props;
    return (
      <div className="help-text">
        <em>{helpText}</em>
      </div>
    );
  }
}

HelpText.propTypes = {
  helpText: React.PropTypes.any,
};

export default HelpText;
