/**
*
* ContactBlock
*
*/

import React from 'react';
import { Link } from 'react-router';
import AccountHeader from '../AccountHeader';

function ContactBlock(props) {
  return (
    <div>
      <AccountHeader pageTitle="Primary Contact" />
      <p className="text-center">
        <strong>{props.contact.first_name} {props.contact.last_name}</strong><br />
        {props.contact.address_1}<br />
        {props.contact.address_2}
        {props.contact.city}, {props.contact.province}<br />
        {props.contact.postal_code}
      </p>
      {
        props.health && (
          <p className="text-center">
            <Link className="btn-small" to="/account/change-your-address/">
              Change Address
            </Link>
          </p>
        )
      }
    </div>
  );
}

ContactBlock.propTypes = {
  contact: React.PropTypes.object,
  primary: React.PropTypes.object,
  health: React.PropTypes.bool,
};

export default ContactBlock;
