/**
*
* ReplaceVehDropdown
*
*/

import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';

import { vehicleString } from '../../utils/helpers';
import styles from './styles.css';

function ReplaceVehDropdown(props) {
  const classNames = classnames(styles.replaceVehDropdown, {
    [styles.toggled]: props.active,
  });
  return (
    <div className={classNames}>
      {props.vehicles.map((v) =>
        <li key={v.vehicle_no}>
          <Link to={`/account/vehicles/${v.vehicle_no}/replace`}>
            Replace {vehicleString(v)}
          </Link>
        </li>
      )}
    </div>
  );
}

ReplaceVehDropdown.propTypes = {
  policy: React.PropTypes.any,
  vehicles: React.PropTypes.any,
  active: React.PropTypes.any,
};

export default ReplaceVehDropdown;
