import React from 'react';
import TextTypeField from '../BaseFields/TextTypeField';

const Text = (props) => {
  return (
    <input
      name={props.name} value={props.value} onChange={props.onChange}
      onBlur={props.onBlur} onFocus={props.onFocus} type="text"
    />
  )
}

export default TextTypeField(Text);
