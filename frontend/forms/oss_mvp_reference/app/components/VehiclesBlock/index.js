/**
*
* VehiclesBlock
*
*/

import React from 'react';
import BlockItem from '../../containers/BlockItem';
import { vehicleString } from '../../utils/helpers';

function VehiclesBlock(props) {
  return (
    <div>
      {props.vehicles.map((vehicle) =>
        <BlockItem
          health={props.health}
          key={vehicle.id}
          single={vehicle}
          title={vehicleString(vehicle)}
        />
      )}
    </div>
  );
}

VehiclesBlock.propTypes = {
  vehicles: React.PropTypes.array,
  health: React.PropTypes.bool,
};

export default VehiclesBlock;
