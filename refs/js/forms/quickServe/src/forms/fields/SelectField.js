import React from 'react';

export class SelectField extends React.Component {
  renderChoice = (choice) => {
    return (
      <option
        key={choice[0]}
        value={choice[0]}
      >
        {choice[1]}
      </option>
    );
  }

  render() {
    return (
      <div>
        <div><strong>{this.props.label}</strong></div>
        <select
          placeholder={this.props.placeholder}
          type={this.props.type}
          {...this.props.input}
        >
          <option value="">
            Select
          </option>
          {this.props.choices.map(this.renderChoice)}
        </select>
      </div>
    );
  }
}

export default SelectField;
