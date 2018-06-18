/**
*
* PolicyDropdown
*
*/

import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import { vehicleString } from '../../utils/helpers';

import styles from './styles.css';

function PolicyDropdown(props) {
  const classNames = classnames(styles.policyDropdown, {
    [styles.toggled]: props.active,
  });
  return (
    <div className={classNames}>
      <ul>
        <li>
          <Link to="/account/change-your-address">Change address</Link>
        </li>
        <li>
          <Link to="/account/vehicles/add-vehicle">Add a vehicle</Link>
        </li>
        {
          props.vehicles.map(v =>
            <li key={v.vehicle_no}>
              <Link to={`/account/vehicles/${v.vehicle_no}/replace`}>
                Replace {vehicleString(v)}
              </Link>
            </li>
          )
        }
        <li>
          {props.allowed ? (
            <button
              onClick={props.download}
              disabled={props.isFetching}
            >
              Download all pink slips
            </button>
          ) : ''}
        </li>
      </ul>
    </div>
  );
}

PolicyDropdown.propTypes = {
  active: React.PropTypes.bool,
  download: React.PropTypes.func,
  allowed: React.PropTypes.bool,
  vehicles: React.PropTypes.array,
  isFetching: React.PropTypes.bool,
};

export default PolicyDropdown;
