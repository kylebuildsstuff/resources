/*
 *
 * AccountClaimsPage
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import PageHeader from '../../components/PageHeader';

export class AccountClaimsPage extends React.Component { // eslint-disable-line
  render() {
    return (
      <div>
        <Helmet title="QuickServe - Claims Information" />
        <PageHeader subTitle="Life is complicated enough. Relax. Filing a claim doesn't have to be." mainTitle="We're here to help:" />
        <p>8:30 a.m. - 7 p.m. Monday to Friday</p>
        <p>Call us at 1-800-268-7649.</p>
        <p>Or email: service@smartcoverageinsurance.ca</p>

        <p>SmartCoverage also offers a unique service to give you advice on a claim before you file it. We can walk you through the process so there are no surprises. And, if you call, we don't put the claim on record until you're ready to do so.</p>

        <PageHeader
          subTitle="In the event of an after-hours emergency claim, please call the appropriate number below:"
          mainTitle="ONTARIO"
        />
        <p><strong>Scottish and York</strong> 1-866-692-8482</p>
        <p><strong>Pembridge and Pafco</strong> Insurance Company 1-800-387-0462</p>
        <p><strong>Western Assurance</strong> 1-877-840-4866</p>
        <p><strong>Economical Insurance</strong> 1-800-607-2424</p>
        <p><strong>Aviva Traders Property</strong> 1-800-590-5003</p>
        <p><strong>Perth Insurance Company</strong> 1-800-607-2424</p>
        <p><strong>RSA</strong> 1-800-319-9993</p>
        <p><strong>Travelers Canada</strong> 1-800-268-5371</p>
        <p><strong>Zenith</strong> 1-800-668-8158</p>
        <p><strong>Chieftain Insurance</strong> 1-800-268-5371</p>
        <PageHeader
          mainTitle="ALBERTA"
        />
        <p><strong>Aviva</strong> 1-866-MY-AVIVA (1-866-692-8482)</p>
        <p><strong>Pembridge</strong> 1-800-661-1577</p>
        <p><strong>RSA</strong> 1-800-319-9993</p>
        <p><strong>Travelers</strong> 1-800-661-5522</p>
        <p><strong>Economical</strong> 1-800-607-2424</p>

        <PageHeader
          mainTitle="QUEBEC"
        />
        <p><strong>Aviva</strong> 1-866-MY-AVIVA (1-866-692-8482)</p>
      </div>
    );
  }
}

AccountClaimsPage.propTypes = {
  global: React.PropTypes.object,
};

export default AccountClaimsPage;
