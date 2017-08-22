import React from "react";

export class Checkbox extends React.Component {
  render() {
    const { input, label } = this.props;
    return (
      <div>
        <label htmlFor={label}>
          {label}
        </label>
        <input {...input} type="checkbox" checked={input.value} />
      </div>
    );
  }
}

export default Checkbox;
