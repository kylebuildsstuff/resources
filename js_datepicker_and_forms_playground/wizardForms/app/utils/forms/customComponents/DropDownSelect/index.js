/**
*
* DropDownSelect
*
*/

import React from 'react';

import styles from './styles.css';

// class DropDownSelect extends React.Component { // eslint-disable-line react/prefer-stateless-function
//   renderSelectOptions = (person) => {
//     return (
//       <option key={person} value={person}>{person}</option>
//     );
//   }
//
//   render() {
//     return (
//       <select>
//         {this.props.people.map(this.renderSelectOptions)}
//       </select>
//     );
//   }
// }

function DropDownSelect(person) {
  return (
    <option key={person} value={person}>{person}</option>
  );
}

export default DropDownSelect;
