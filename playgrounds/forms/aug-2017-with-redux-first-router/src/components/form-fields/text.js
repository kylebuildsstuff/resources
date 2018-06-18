import React from "react";

export class Text extends React.Component {
  render() {
    const {
      input,
      label,
      type,
      meta: { touched, error, warning }
    } = this.props;

    return (
      <div>
        <label>
          {label}
        </label>
        <div>
          <input {...input} placeholder={label} type={type} />
          {touched &&
            ((error &&
              <span>
                {error}
              </span>) ||
              (warning &&
                <span>
                  {warning}
                </span>))}
        </div>
      </div>
    );
  }
}

export default Text;
