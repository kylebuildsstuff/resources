/**
*
* ChangeAddress
*
*/

import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import AccordionItem from '../../components/AccordionItem';
import KbPromo from '../../components/KbPromo';

import styles from './styles.css';

import changing from '../../assets/changing-coverage.svg';

function ChangingYourCoverage(props) {
  return (
    <div className={styles.kbPage}>
      <Helmet title="QuickServe - Changing Your Coverage" />
      <div className={styles.pageHeader}>
        <h2><img src={changing} alt="Are you changing your coverage?" />Are You Changing Your Coverage?</h2>
      </div>

      <p>If this is the only vehicle on your policy and you plan to remove ALL your coverages, then this is considered a policy cancellation (please proceed to the <Link to="/kb/cancel-your-policy">Cancel your auto policy</Link> section).</p>
      <p>If there are multiple vehicles on your policy and you plan to remove <strong>ALL</strong> coverages from one of the vehicles, this is considered a vehicle removal. Please proceed to the <Link to="/kb/selling-a-car">Are you selling a car</Link> section.</p>
      <h4>What we need from you*:</h4>
      <ul>
        <li>Make, model, year of car affected (i.e. Civic LX, Si, etc.)</li>
        <li>Nature of the coverage change</li>
        <li>Reason for the coverage change</li>
        <li>Date of the coverage change</li>
      </ul>
      <ul className={styles.accordions}>
        <li>
          <AccordionItem
            question="Why do we ask the reason for the coverage change?" answer="<p>We want to ensure you’re properly covered. For example, if you wanted to remove collision coverage from a newer vehicle to save money, we would offer a reasonable alternative to ensure that you're not left without this important coverage.</p>"
          />
        </li>
      </ul>
      <small>*Changes effective upon confirmation of broker</small>
      {!props.global.authed && <KbPromo />}
    </div>
  );
}

ChangingYourCoverage.propTypes = {
  global: React.PropTypes.object,
};

export default ChangingYourCoverage;
