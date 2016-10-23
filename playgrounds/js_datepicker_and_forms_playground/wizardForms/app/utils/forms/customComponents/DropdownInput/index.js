/**
*
* DropdownInput
*
*/

import React from 'react';

import styles from './styles.css';

class DropdownInput extends React.Component { // eslint-disable-line react/prefer-stateless-function

  renderSelectOptions = (person) => (
    <option key={person} value={person}>{person}</option>
  )

  render() {
    const { input, label } = this.props;
    return (
      <div>
        <label htmlFor={label}>{label}</label>
        <select
          {...input}
          className="form-control"
        >
          <option value="">Select</option>
          {this.props.people.map(this.renderSelectOptions)}
        </select>
      </div>
    );
  }
}

DropdownInput.propTypes = {
  people: React.PropTypes.array,
  input: React.PropTypes.object,
  label: React.PropTypes.string,
};

export default DropdownInput;
