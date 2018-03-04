import React from 'react';
import PropTypes from 'prop-types';

export const TextField = (props) => {
  if (props) {
    return (
      <input
        name={props.name}
        type={props.type || "text"}
        onChange={props.handleChange}
        placeholder={props.placeholder}
        value={props.value || ''}
      />
    );
  }
  return <div>Loading</div>
}

TextField.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  handleChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

export default TextField;
