/*
 *
 * ContactPage
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import PageHeader from '../../components/PageHeader';

export class ContactPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet title="QuickServe - Contact Us" />
        <PageHeader subTitle="Find out how you can" mainTitle="Contact Us" />
        <p>Need help with a policy? Having trouble with <strong>QuickServe</strong>? Can't find an answer to your question?</p>
        <p>Whatever it is, we're here to help. Contact us by using one of the options below.</p>
        <address>
          SmartCoverage Insurance<br />
          P.O. Box 489, Station A <br />
          Windsor, ON N9A 6M6<br />
          <br />
          <FontAwesome name="phone" />&nbsp;&nbsp;&nbsp;
          <a href="tel:18888818045">1-888-881-8045</a><br />
          <FontAwesome name="envelope-o" />&nbsp;&nbsp;
          <a href="mailto:contact@smartcoverageinsurance.ca">contact@smartcoverageinsurance.ca</a>
        </address>
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapDispatchToProps)(ContactPage);
