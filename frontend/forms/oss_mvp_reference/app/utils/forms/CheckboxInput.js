/**
*
* CheckboxInput
*
*/

import React from 'react';
import classnames from 'classnames';
import HelpTextComponent from './HelpTextComponent';

class CheckboxInput extends HelpTextComponent { // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {
      toggleHelp: false,
    };
  }

  componentDidMount() {
    if (this.props.changeField) {
      if (this.props.absoluteOverride) {
        this.props.changeField(this.props.name, true);
      }
      if (this.props.defaultOverride === true || (
        this.props.defaultOverride === false
      )) {
        this.props.changeField(this.props.name, this.props.defaultOverride);
      }
    }
  }

  componentDidUpdate() {
    if (this.props.absoluteOverride && this.props.changeField) {
      this.props.changeField(this.props.name, true);
    }
  }

  toggleItem = () => {
    this.setState({
      toggleHelp: !this.state.toggleHelp,
    });
  }

  render() {
    const {
      helpText,
      input,
      label,
      // meta: {
      //   touched,
      //   error,
      // },
    } = this.props;
    const classNames = classnames({
      // [styles.invalid]: touched && error,
      'checkbox-input': 'checkbox-input',
      'has-text': helpText !== undefined,
      toggled: this.state.toggleHelp,
      clearfix: 'clearfix',
    });
    return (
      <div className={classNames}>
        <label htmlFor={label}>
          <input
            {...input}
            type="checkbox"
            checked={input.value}
          />
          <span onClick={this.toggleItem}>{label}</span>
        </label>
        {/* {touched && error && <p>{error}</p>} */}
        {
          helpText !== undefined && (
            <div>
              <small><em>{helpText}</em></small>
            </div>
          )
        }
      </div>
    );
  }
}

CheckboxInput.propTypes = {
  checked: React.PropTypes.any,
  absoluteOverride: React.PropTypes.any,
  helpText: React.PropTypes.string,
  input: React.PropTypes.any,
  label: React.PropTypes.string,
  type: React.PropTypes.string,
  meta: React.PropTypes.any,
  changeField: React.PropTypes.any,
  name: React.PropTypes.any,
  defaultOverride: React.PropTypes.any,
};

export default CheckboxInput;
