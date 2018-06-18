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

import adding from '../../assets/add-a-driver.svg';

function AddingADriver(props) {
  return (
    <div className={styles.kbPage}>
      <Helmet title="QuickServe - Adding a Driver" />
      <div className={styles.pageHeader}>
        <h2><img src={adding} alt="Are you adding a driver?" />Are You Adding a Driver?</h2>
      </div>

      <p>If there is a driver who is new to your household and does not have their own insurance, you will want to add them to your policy. If they have their own insurance elsewhere, your insurance company will simply need to know the insurance carrier’s name and policy number for their records but they do not
      need to be added to your policy.</p>
      <h4>What we need from you*:</h4>
      <ul>
        <li>Driver’s license number</li>
        <li>Relationship of driver to policyholder</li>
        <li>Date driver obtained license</li>
        <li>Driver training details</li>
        <li>Driving history</li>
      </ul>
      <ul className={styles.accordions}>
        <li>
          <AccordionItem
            question="Will your premium change?" answer="<p>Many factors determine auto insurance premiums, including driving history and intended vehicle usage. We'll inform you of any changes to your premium once your policy is updated.</p>"
          />
        </li>
      </ul>
      <small>*Changes effective upon confirmation of broker</small>
      {!props.global.authed && <KbPromo />}
    </div>
  );
}

AddingADriver.propTypes = {
  global: React.PropTypes.object,
};

export default AddingADriver;
