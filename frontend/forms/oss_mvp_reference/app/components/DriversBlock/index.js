/**
*
* DriversBlock
*
*/

import React from 'react';
import BlockItem from '../../containers/BlockItem';

function DriversBlock(props) {
  return (
    <div>
      {props.drivers.map((driver) =>
        <BlockItem
          key={driver.id}
          single={driver}
          title={`${driver.first_name} ${driver.last_name}`}
        />
      )}
    </div>
  );
}

DriversBlock.propTypes = {
  drivers: React.PropTypes.array,
};

export default DriversBlock;
