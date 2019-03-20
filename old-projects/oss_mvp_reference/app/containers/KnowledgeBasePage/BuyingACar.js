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

import buying from '../../assets/add-a-vehicle.svg';

function BuyingACar(props) {
  return (
    <div className={styles.kbPage}>
      <Helmet title="QuickServe - Buying a Car" />
      <div className={styles.pageHeader}>
        <h2><img src={buying} alt="Are you buying a car?" />Are You Buying a Car?</h2>
      </div>

      <p>Is this an additional vehicle or a replacement vehicle? If this vehicle is replacing an existing vehicle on your policy, please proceed to the <Link to="/kb/trading-in-a-car">Are you trading in a car</Link> page.</p>
      <h4>What we need from you*:</h4>
      <ul>
        <li>VIN number</li>
        <li>Make and model of your car (i.e. Civic LX, Si, etc.)</li>
        <li>Purchase date and price</li>
        <li>Name and address of the lienholder or lessor</li>
        <li>E-mail/fax number where binder letter & pink slips can be sent</li>
      </ul>
      <ul className={styles.accordions}>
        <li>
          <AccordionItem
            question="Will your premium change?" answer="<p>Many factors determine auto insurance premiums, including the type of car you drive, intended vehicle usage, the claims and conviction history of the driver, and where you live. To get a sense of how your new vehicle will impact your premium, you can complete an online quote. If you’re just starting to shop around, you can get multiple quotes for all the vehicles you’re considering. We’ll inform you of any changes to your premium once your policy is updated.</p>"
          />
        </li>
        <li>
          <AccordionItem
            question="Why do we ask about other drivers?" answer="<p>We want to make sure your information is up-to-date.  For example, if other drivers have access to your car, they may need to be on your policy for legal reasons as well as for your protection.  New drivers can build their own insurance experience – an important factor in insurability – by being listed as a secondary driver.</p>"
          />
        </li>
        <li>
          <AccordionItem
            question="Why do we ask about customizations or modifications?" answer="<p>We want to make sure you’re properly covered and that you receive the maximum payout available in the event of a claim.  If we are unaware of customizations (i.e. an aftermarket paint job) or modifications (i.e. a wheelchair lift), your policy would only reflect a standard model, and in the event of a loss, the claim payout would not reflect the cost of the upgrades.</p>"
          />
        </li>
        <li>
          <AccordionItem
            question="Why do we ask about pre-existing damage?" answer="<p>Our records should be updated with this information to avoid any disputes during the claims process. If pre-existing damage is not disclosed, it can slow down the process while insurance adjusters investigate how much damage was sustained in the loss and how much existed prior to the accident and may result in your claim being denied.</p>"
          />
        </li>
      </ul>
      <small>*Changes effective upon confirmation of broker</small>
      {!props.global.authed && <KbPromo />}
    </div>
  );
}

BuyingACar.propTypes = {
  global: React.PropTypes.object,
};

export default BuyingACar;
