import React from 'react';
import Text from './Fields/Text';

const SecondaryDrivers = (props) => {
  return (
    <div>
      <Text
        name={`${props.prefix}daily_kms`} label="Daily KMs"
        helpText="The approximate number of kilometres you drive one way to work/school daily."
      />
      <Text
        name={`${props.prefix}annual_kms`} label="Annual KMs"
        helpText="The total number of kilometres you drive annually for all uses."
      />
    </div>
  )
}

export default SecondaryDrivers;
