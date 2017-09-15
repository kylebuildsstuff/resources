/**
*
* SingleVehicle
*
*/

import React from 'react';
import { Link } from 'react-router';
import CoverageBlock from '../../components/CoverageBlock';
import { vehicleUsageFunc, dailyCommute } from '../../utils/helpers';

function SingleVehicle(props) {
  return (
    <div>
      {props.health ? (
        <Link
          className="btn-small pull-right"
          to={`/account/vehicles/${props.vehicle.vehicle_no}/replace`}
        >
          Replace
        </Link>
        ) : ''}
      <ul className="list-unstyled">
        <li><strong>VIN:</strong> {props.vehicle.vehicle_vin}</li>
        <li><strong>Vehicle use:</strong> {vehicleUsageFunc(props.vehicle.vehicle_use_cd)}</li>
        <li><strong>Annual KMs:</strong> {props.vehicle.annual_distance}km</li>
        {
          dailyCommute(props.vehicle.commute_distance) && (
            <li>
              <strong>Daily commute:</strong> {props.vehicle.commute_distance}km
            </li>
          )
        }
        {props.vehicle.leased_ind ? <li><strong>Leased:</strong> Yes</li> : ''}
      </ul>
      <CoverageBlock coverages={props.vehicle.coverages} />
    </div>
  );
}

SingleVehicle.propTypes = {
  health: React.PropTypes.bool,
  vehicle: React.PropTypes.object,
};

export default SingleVehicle;
