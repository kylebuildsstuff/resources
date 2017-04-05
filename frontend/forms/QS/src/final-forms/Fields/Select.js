import React from 'react';
import SelectField from '../BaseFields/SelectField';

const Select = ({ options, onChange, other }) => {
  return (
    <select onChange={onChange} disabled={options.length < 2}>
      <option>Select…</option>
      {options.map(opt => <option key={opt[0]} value={opt[0]}>{opt[1]}</option>)}
      {other && <option value="other">Other</option>}
    </select>
  )
}

export default SelectField(Select);
