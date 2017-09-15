/**
*
* HelpTextButton
*
*/

import React from 'react';
import FontAwesome from 'react-fontawesome';
import classnames from 'classnames';

class HelpTextButton extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = { show: false };
  }

  componentDidMount() {
    if (this.props.changeField) {
      if (this.props.defaultOverride) {
        this.props.changeField(
          this.props.name,
          this.props.defaultOverrideVal || this.props.defaultOverride);
      }
    }
  }

  handleClick(evt) { // eslint-disable-line no-unused-vars
    this.setState({ show: !this.state.show });
  }

  render() {
    const {
      onClick,
    } = this.props;
    const classNames = classnames({
      'help-btn': 'help-btn',
    });
    return (
      <i onClick={onClick} className={classNames}>
        <FontAwesome name="question-circle" />
      </i>
    );
  }
}

HelpTextButton.propTypes = {
  changeField: React.PropTypes.any,
  onClick: React.PropTypes.any,
  defaultOverride: React.PropTypes.any,
  name: React.PropTypes.any,
  defaultOverrideVal: React.PropTypes.any,
  evt: React.PropTypes.any,
};

export default HelpTextButton;
