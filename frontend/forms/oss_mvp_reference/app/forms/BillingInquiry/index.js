/**
*
* BillingInquiry
*
*/

import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import classnames from 'classnames';
import TextareaInput from '../../utils/forms/TextareaInput';
import TextInput from '../../utils/forms/TextInput';
import Select from '../../utils/forms/Select';
import FormSubmitButton from '../../components/FormSubmitButton';
import CheckboxInput from '../../utils/forms/CheckboxInput';
import validate from './validate';

const BillingInquiry = (props) => {
  const { getFormValues, handleSubmit, error } = props;
  const typeValues = [
    ['billing_schedule', 'Request my billing schedule'],
    ['change_payment_date', 'Change my payment date'],
    ['change_account_details', 'Change my account details'],
    ['make_payment', 'Make a payment'],
    ['other', 'Other'],
  ];
  const deliveryValues = [
    ['email', 'Email'],
    ['mail', 'Mail'],
  ];

  const changeField = (name, value) => {
    props.change(name, value);
  };

  const classNames = classnames('checkbox-group', {
    'hide-field': props.policies.length < 2,
  });

  // let renderChecks;
  //
  // if (props.policies.length > 1) {
  //   renderChecks = (
  //     <div className="checkbox-group">
  //       <p className="label">Select one or more policies these changes will apply to <span>*</span></p>
  //       {props.policies.map((pol) =>
  //         <Field
  //           changeField={changeField}
  //           defaultOverride
  //           key={pol.policy_number}
  //           component={CheckboxInput}
  //           label={`${pol.carrier} - ${pol.type.charAt(0).toUpperCase() + pol.type.slice(1)} Policy - ${pol.policy_number}`}
  //           placeholder={pol.policy_number}
  //           name={pol.id}
  //         />
  //       )}
  //     </div>
  //   );
  // } else {
  //   renderChecks = '';
  // }
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-block">
        <div style={{ display: 'none' }}>
          <Field
            component={TextInput}
            label="Hidden Field"
            name="hidden_field"
            hidden
          />
        </div>
        <Field
          component={Select}
          label="Type of Request"
          name="question_type"
          isRequired
          helpText="Your billing schedule will show upcoming payment dates and amounts. A broker will contact you if you need to change your account details or make a payment."
          valuesList={typeValues}
        />
        <div className={classNames}>
          <p className="label">Select one or more policies these changes will apply to <span>*</span></p>
          {props.policies.map((pol) =>
            <Field
              changeField={changeField}
              defaultOverride
              key={pol.policy_number}
              component={CheckboxInput}
              label={`${pol.carrier} - ${pol.type.charAt(0).toUpperCase() + pol.type.slice(1)} Policy - ${pol.policy_number}`}
              placeholder={pol.policy_number}
              name={pol.id}
            />
          )}
        </div>
        {
          getFormValues.get('question_type') === 'billing_schedule' && (
            <Field
              component={Select}
              label="How would you like to receive your billing schedule?"
              name="preferred_contact_method"
              isRequired
              helpText="If you select email, your billing schedule will be sent to the email address we have on file."
              valuesList={deliveryValues}
            />
          )
        }
        {
          getFormValues.get('question_type') === 'other' && (
            <Field
              component={TextareaInput}
              label="Tell Us More"
              name="other_details"
              type="textarea"
              isRequired
              placeholder="Let us know what other billing issue you'd like to discuss."
            />
          )}
      </div>
      {error && <small className="warning">{error}</small>}
      <FormSubmitButton btnCopy="Submit" {...props} />
    </form>
  );
};

BillingInquiry.propTypes = {
  policies: React.PropTypes.array,
  getFormValues: React.PropTypes.object,
  change: React.PropTypes.func,
  handleSubmit: React.PropTypes.func,
  error: React.PropTypes.string,
};

export default reduxForm({
  form: 'billingInquiry',
  validate,
})(BillingInquiry);
