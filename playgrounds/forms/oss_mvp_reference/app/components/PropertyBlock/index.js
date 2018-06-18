/**
*
* VehiclesBlock
*
*/

import React from 'react';
// import moment from 'moment/moment';
import PolicyHeader from '../PolicyHeader';

import cards from '../../styles/cards.css';

function PropertyBlock(props) {
  return (
    <div className={cards.card}>
      <PolicyHeader policy={props.policy} />
      <div className={cards.inner}>
        <p>
          <strong>Form Type:</strong> {props.policy.type}
        </p>
        <h4>Property address</h4>
        <address>
          {props.policy.address1}<br />
          {props.policy.address2 && <span>props.policy.address2<br /></span>}
          {props.policy.city}, {props.policy.province}<br />
          {props.policy.postal_code}<br />
        </address>
      </div>
      <div className={cards.ftr}></div>
    </div>
  );
}

PropertyBlock.propTypes = {
  policy: React.PropTypes.object,
};

export default PropertyBlock;
