/* eslint-disable */
/**
* AddressBlock
* linting diabled because of necessary camel casing
*/

import React from 'react';

import cards from '../../styles/cards.css';

function AddressBlock(props) {
  const {
    address_1,
    address_2,
    city,
    province,
    postal_code,
  } = props.primary;
  return (
    <div className={cards.cardItem}>
      {address_1}, {address_2}<br />
      {city}, {province} {postal_code}
    </div>
  );
}

AddressBlock.propTypes = {
  primary: React.PropTypes.object,
};

export default AddressBlock;
