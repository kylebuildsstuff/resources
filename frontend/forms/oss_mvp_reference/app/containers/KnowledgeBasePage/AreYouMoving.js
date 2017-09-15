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

import moving from '../../assets/moving.svg';

function AreYouMoving(props) {
  return (
    <div className={styles.kbPage}>
      <Helmet title="QuickServe - Are You Moving?" />
      <div className={styles.pageHeader}>
        <h2><img src={moving} alt="Are you moving?" />Are You Moving?</h2>
      </div>

      <h4>What we need from you*:</h4>
      <ul>
        <li>New address (including postal code)</li>
        <li>Changes to phone number</li>
        <li>Date of move</li>
      </ul>
      <ul className={styles.accordions}>
        <li>
          <AccordionItem
            question="Will your premium change?" answer="<p>Many factors determine your auto insurance premium, including the type of car you drive, intended vehicle usage, the claims and conviction history of the driver and where you live. We’ll inform you of any changes to your premium once your policy is updated.</p>"
          />
        </li>
        <li>
          <AccordionItem
            question="Why buy Tenants insurance?" answer="<p>Tenants insurance protects your personal belongings. Your landlords policy only covers the building. If the contents of your house were to burn in a fire, you would not be protected unless you purchased tenants insurance. A tenants policy also provides you with legal liability coverage anywhere in the world as a result of your unintentional actions. If necessary, your policy will even pay for your legal defence.
            When you purchase both an auto and a tenants policy you become eligible for a multi-line discount. The savings to your auto policy as a result of this discount often offsets the cost of the tenants policy.</p>"
          />
        </li>
        <li>
          <AccordionItem
            question="Why buy Condo insurance?" answer="<p>If you own a condominium, you have unique insurance needs. The condo association has its own insurance which covers the condominium building, commonly-owned property, and liability for the association. However, this insurance does not protect you against theft of personal property, damage to your unit, or injury to someone visiting your unit. This is why condo insurance is so important. Condo insurance also protects any upgrades and renovations to your unit, as well as providing coverage for unexpected repairs you may face that are not covered by condo association funds.</p>
            <p>When you purchase both an auto and a condo policy you become eligible for a multi-line discount. This makes buying a condo policy very affordable.</p>"
          />
        </li>
        <li>
          <AccordionItem
            question="Why buy Homeowners insurance?" answer="<p>A homeowners policy protects your biggest investment – your home – as well as your personal property. It provides liability coverage anywhere in the world as a result of your unintentional actions and will pay for your legal defence if necessary. Mortgage companies also require you to have homeowners insurance.
            When you purchase both an auto and a homeowners policy you become eligible for a multi-line discount which will discount the premium of both policies.</p>"
          />
        </li>
      </ul>
      <small>*Changes effective upon confirmation of broker</small>
      {!props.global.authed && <KbPromo />}
    </div>
  );
}

AreYouMoving.propTypes = {
  global: React.PropTypes.object,
};

export default AreYouMoving;
