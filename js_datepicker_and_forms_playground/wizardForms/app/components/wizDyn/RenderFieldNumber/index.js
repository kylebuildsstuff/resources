/**
*
* RenderFieldNumber
*
*/

import React from 'react';


class RenderFieldNumber extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { input, label, type, meta: { touched, error } } = this.props;
    return (
      <div>
        <label htmlFor={label}>{label}</label>
        <div>
          <input {...input} placeholder={label} type={type} className="form-control" />
          {touched && error && <span>{error}</span>}
        </div>
      </div>
    );
  }
}

export default RenderFieldNumber;
