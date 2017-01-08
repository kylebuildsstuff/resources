import React from 'react';

import withBase from '../fieldHOCS/withBase';

class TextField extends React.Component {
  render() {
    return (
      <div>
        <div><strong>{this.props.renderLabel()}</strong></div>
        {this.props.renderElem()}
      </div>
    );
  }
};

export default withBase(TextField);
