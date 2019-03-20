/**
*
* ChangeAddress
*
*/

import React from 'react';
import Helmet from 'react-helmet';
import AccordionItem from '../../components/AccordionItem';
import KbPromo from '../../components/KbPromo';

import styles from './styles.css';

import cancel from '../../assets/cancelling-policy.svg';

function CancellingYourPolicy(props) {
  return (
    <div className={styles.kbPage}>
      <Helmet title="QuickServe - Cancelling Your Policy" />
      <div className={styles.pageHeader}>
        <h2><img src={cancel} alt="Are you cancelling your policy?" />Are You Cancelling Your Policy?</h2>
      </div>
      <h4>What we need from you*:</h4>
      <ul>
        <li>The number of the policy to be cancelled</li>
        <li>Date of cancellation</li>
        <li>Reason for cancellation</li>
      </ul>
      <ul className={styles.accordions}>
        <li>
          <AccordionItem
            question="Why do we ask the reason for cancellation?" answer="<p>We want to ensure you’re properly covered. For example, if you wanted to cancel your policy to save money, we would offer a reasonable alternative that wouldn’t leave you without adequate protection in the event of a loss.</p>"
          />
        </li>
      </ul>
      <small>*Changes effective upon confirmation of broker</small>
      {!props.global.authed && <KbPromo />}
    </div>
  );
}

CancellingYourPolicy.propTypes = {
  global: React.PropTypes.object,
};

export default CancellingYourPolicy;
