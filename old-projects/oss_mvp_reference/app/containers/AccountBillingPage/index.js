/*
 *
 * AccountBillingPage
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import { getFormValues } from 'redux-form/immutable';
import { postBillingRequestForm } from '../../containers/AccountPage/actions';
import BillingInquiry from '../../forms/BillingInquiry';
import PageHeader from '../../components/PageHeader';

export class AccountBillingPage extends React.Component { // eslint-disable-line
  onSubmit = (values) => {
    const vals = values.toJS();

    const polsArray = Object.keys(vals).filter((pol) => {
      if (/0x0/i.test(pol)) {
        return pol;
      }
      return false;
    });

    if (polsArray.length < 1) {
      polsArray.push(this.props.policies[0].id);
    }

    const formValues = {
      question_type: values.get('question_type'),
      preferred_contact_method: values.get('preferred_contact_method'),
      other_details: values.get('other_details'),
      policies: polsArray,
      policy_id: polsArray[0],
    };

    console.log('in the submit func ', formValues);

    return new Promise((resolve, reject) => {
      this.props.postBillingRequestForm(formValues, resolve, reject);
    });
  }

  render() {
    return (
      <div>
        <Helmet title="QuickServe - Billing Requests" />
        <PageHeader subTitle="Use this form to" mainTitle="Make a Billing Request" />
        <p>Use the form below to select billing information relating to one or more of your policies.</p>
        <BillingInquiry
          getFormValues={this.props.values}
          policies={this.props.global.policies}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

AccountBillingPage.propTypes = {
  global: React.PropTypes.object,
  policies: React.PropTypes.array,
  postBillingRequestForm: React.PropTypes.func,
  values: React.PropTypes.any,
};

function mapStateToProps(state) {
  return ({
    values: getFormValues('billingInquiry')(state) || Immutable.Map(), // eslint-disable-line
  });
}

function mapDispatchToProps(dispatch) {
  return {
    postBillingRequestForm: (formValues, resolve, reject) => dispatch(postBillingRequestForm(formValues, resolve, reject)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountBillingPage);
