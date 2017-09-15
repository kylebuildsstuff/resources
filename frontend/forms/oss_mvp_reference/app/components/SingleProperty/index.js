/**
*
* SingleProperty
*
*/

import React from 'react';
import FontAwesome from 'react-fontawesome';
import PolicyHeader from '../PolicyHeader';

import cards from '../../styles/cards.css';

function SingleProperty(props) {
  return (
    <div className={cards.card}>
      <PolicyHeader
        policy={props.policy}
      />
      <div className={cards.cardInner}>
        <div className={cards.cardBlock}>
          <div className={cards.cardTitle}>
            <FontAwesome name="home" /> Address
          </div>
        </div>
        <div className={cards.cardItem}>
          <p><strong>Policy Type: </strong> {props.policy.type}</p>
          <address>
            {props.policy.address1}<br />
            {props.policy.address2 && <span>props.policy.address2<br /></span>}
            {props.policy.city}, {props.policy.province}<br />
            {props.policy.postal_code}<br />
          </address>
        </div>
      </div>
    </div>
  );
}

SingleProperty.propTypes = {
  policy: React.PropTypes.object,
};

export default SingleProperty;
