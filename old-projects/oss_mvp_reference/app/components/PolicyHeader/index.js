/**
*
* PolicyHeader
*
*/

import React from 'react';
import classnames from 'classnames';
import FontAwesome from 'react-fontawesome';
import moment from 'moment/moment';
import { carriers } from '../../utils/helpers';

import cards from '../../styles/cards.css';

function PolicyHeader(props) {
  const classNames = classnames({
    clearfix: 'clearfix',
    [cards.hdr]: cards.hdr,
  });
  const carrier = carriers(props.policy.carrier_code);
  return (
    <div className={classNames}>
      <div>
        <img alt="Insurance Company" src={carrier.imgUrl} />
        {props.allowed ? (
          <btn
            className="btn-small"
            onClick={props.download}
            disabled={props.isFetching}
          >
            My pink slips
          </btn>
        ) : ''}
      </div>
      <ul>
        <li>
          <h3>Policy # {props.policy.policy_number}</h3>
        </li>
        <li>{props.policy.carrier}</li>
        <li><small><strong>Named insured:</strong> {props.policy.named_insured}</small></li>
        <li><small><strong>Effective date:</strong> {moment(props.policy.effective_date).format('MMM D, YYYY')}</small></li>
        <li><small><strong>Expiration date:</strong> {moment(props.policy.expiration_date).format('MMM D, YYYY')}</small></li>
      </ul>
      {
        props.policy.type === 'auto' && (
          <button className={cards.editBtn} onClick={props.togglePolicyDropdown}>
            <FontAwesome name="pencil" /><b> EDIT</b>
          </button>
        )
      }
    </div>
  );
}

PolicyHeader.propTypes = {
  policy: React.PropTypes.object,
  allowed: React.PropTypes.bool,
  download: React.PropTypes.func,
  togglePolicyDropdown: React.PropTypes.func,
  isFetching: React.PropTypes.bool,
};

export default PolicyHeader;
