import React from 'react';
import TextTypeField from '../BaseFields/TextTypeField';

const Email = ({ name, value, onChange, onBlur, onFocus }) => {
  return (
    <input
      name={name} value={value} onChange={onChange}
      onBlur={onBlur} onFocus={onFocus} type="email"
    />
  )
}

export default TextTypeField(Email);
