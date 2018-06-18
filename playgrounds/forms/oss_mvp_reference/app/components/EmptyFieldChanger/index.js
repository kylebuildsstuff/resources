/**
*
* EmptyFieldChanger
*
*/

import React from 'react';

class EmptyFieldChanger extends React.Component { // eslint-disable-line react/prefer-stateless-function
  // @NOTE This component is used in forms to bypass
  // certain React and redux-form errors compatibility issues.
  // cannot this.props.changeField directly into the forms with the fields
  // due to "Cannot update during existing state transition", so instead of
  // changeField-ing while the Field is rendering, this takes advantage of
  // built in lifecycle methods.

  // Used for hiding one field, while changing the value of said field.
  componentDidMount() {
    this.props.changeField(this.props.fieldNameToChange, this.props.fieldValueToChangeTo);
  }

  render() {
    return (
      <div></div>
    );
  }
}

EmptyFieldChanger.propTypes = {
  changeField: React.PropTypes.any,
  fieldNameToChange: React.PropTypes.any,
  fieldValueToChangeTo: React.PropTypes.any,
  schema: React.PropTypes.any,
};

export default EmptyFieldChanger;
