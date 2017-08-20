import React from "react";

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.renderSelectOptions = this.renderSelectOptions.bind(this);
  }

  renderSelectOptions(option) {
    return (
      <option key={option} value={option}>
        {option}
      </option>
    );
  }

  render() {
    const { input, label } = this.props;
    return (
      <div>
        <label htmlFor={label}>
          {label}
        </label>
        <select {...input}>
          <option value="">Select</option>
          {this.props.options.map(this.renderSelectOptions)}
        </select>
      </div>
    );
  }
}

export default Dropdown;
