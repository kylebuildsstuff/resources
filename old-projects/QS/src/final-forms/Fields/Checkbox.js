import React from 'react';
import CheckboxField from '../BaseFields/CheckboxField';

const Checkbox = (props) => {
  return (
    <input
      alt={props.label} name={props.name}
      onChange={props.onChange} type={props.type}
    />
  )
}

export default CheckboxField(Checkbox);
