/**
*
* WizardFormPageTwoReplace
*
*/

import React from 'react';
import { Field } from 'redux-form/immutable';
import RenderField from '../RenderField';

class WizardFormPageTwoReplace extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="form-group">
        <Field name="ReplaceQuestionOne" type="text" component={RenderField} label="ReplaceQuestionOne" className="form-control" placeholder="ReplaceQuestionOne" />
        <Field name="ReplaceQuestionTwo" type="text" component={RenderField} label="ReplaceQuestionTwo" className="form-control" placeholder="ReplaceQuestionTwo" />
        <Field name="ReplaceQuestionThree" type="text" component={RenderField} label="ReplaceQuestionThree" className="form-control" placeholder="ReplaceQuestionThree" />
      </div>
    );
  }
}

export default WizardFormPageTwoReplace;
