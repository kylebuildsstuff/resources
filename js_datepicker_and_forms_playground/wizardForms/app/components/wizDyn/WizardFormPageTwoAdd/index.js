/**
*
* WizardFormPageTwoAdd
*
*/

import React from 'react';
import { Field } from 'redux-form/immutable';
import RenderField from '../RenderField';


class WizardFormPageTwoAdd extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="form-group">
        <Field name="AddQuestionOne" type="text" component={RenderField} label="AddQuestionOne" className="form-control" placeholder="AddQuestionOne" />
        <Field name="AddQuestionTwo" type="text" component={RenderField} label="AddQuestionTwo" className="form-control" placeholder="AddQuestionTwo" />
        <Field name="AddQuestionThree" type="text" component={RenderField} label="AddQuestionThree" className="form-control" placeholder="AddQuestionThree" />
      </div>
    );
  }
}

export default WizardFormPageTwoAdd;
