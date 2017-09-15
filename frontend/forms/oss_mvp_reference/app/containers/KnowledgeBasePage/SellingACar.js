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

import selling from '../../assets/remove-a-vehicle.svg';

function SellingACar(props) {
  return (
    <div className={styles.kbPage}>
      <Helmet title="QuickServe - Selling a Car" />
      <div className={styles.pageHeader}>
        <h2><img src={selling} alt="Are you selling a car?" />Are You Selling a Car?</h2>
      </div>
      <p>If this is the only car on the policy and you no longer require any coverage, please proceed to the <Link to="/kb/cancel-your-policy">Cancel your auto policy</Link> section instead.</p>
      <p>If you plan to store your car and would like protection for risks such as fire, theft or vandalism, you will need to modify your coverage instead. Please proceed to the <Link to="/kb/changing-your-coverage">Change your auto coverage</Link> section.</p>
      <h4>What we need from you*:</h4>
      <ul>
        <li>Make, model, year of car to be removed (i.e. Civic LX, Si, etc.)</li>
        <li>Date you’d like car removed</li>
        <li>Reason for the deletion</li>
      </ul>
      <ul className={styles.accordions}>
        <li>
          <AccordionItem
            question="Why do we ask the reason for the deletion?" answer="<p>We want to ensure you’re properly covered. For example, if you plan to store your car for the winter, we would recommend you reduce your coverage instead of cancelling the policy, as the cost is reasonable and you’d still be protected against certain losses.</p>"
          />
        </li>
      </ul>
      <small>*Changes effective upon confirmation of broker</small>
      {!props.global.authed && <KbPromo />}
    </div>
  );
}

SellingACar.propTypes = {
  global: React.PropTypes.object,
};

export default SellingACar;
