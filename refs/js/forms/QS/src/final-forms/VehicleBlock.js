import React from 'react';
import Text from './Fields/Text';
import Select from './Fields/Select';
import SecondaryDrivers from './SecondaryDrivers';
import * as _ from 'lodash';

const VehicleBlock = (props) => {
  const prefix = `${props.v.id}_`;
  return <div>
    <h3>Vehicle {prefix} - VIN # 1234567890</h3>
    <Select
      name={`${prefix}primary_use`}
      required
      label="Primary Use"
      options={[
        ['pleasure', 'Pleasure'],
        ['business', 'Business'],
        ['commuting', 'Commuting'],
      ]}
      helpText="Pleasure means your vehicle is used for leisure driving only. Commuting means your vehicle is used to drive to and from work and/or school, as well as for leisure driving. Business means your vehicle is used for work-related purposes and for leisure driving on occasion. For example, a sales person who uses their vehicle to meet with clients."
    />
    <Text
      name={`${prefix}daily_kms`} label="Daily KMs"
      helpText="The approximate number of kilometres you drive one way to work/school daily."
    />
    <Text
      name={`${prefix}annual_kms`} label="Annual KMs"
      helpText="The total number of kilometres you drive annually for all uses."
    />
    <Select
      name={`${prefix}parked_at_night`}
      required
      label="Where is the vehicle parked at night?"
      options={[
        ['private_driveway', 'Private Driveway'],
        ['garage', 'Garage'],
        ['street', 'Street'],
        ['underground_parking', 'Underground Parking'],
        ['other', 'Other'],
      ]}
    />
    <Select
      name={`${prefix}principal_driver`}
      required label="Who will be the principal driver?"
      options={[
        ['John Smith', 'John Smith'],
        ['Jane Doe', 'Jane Doe'],
        ['Other', 'other']
      ]}
      helpText="The person that drives the vehicle most, usually for commuting purposes."
    />
    <Select
      name={`${prefix}secondary_drivers`}
      required label="Are there any other licenced drivers in the household who are not listed on your policy?"
      options={[
        ['none', 'None'],
        [1, '1'],
        [2, '2'],
        [3, '3'],
        [4, '4'],
      ]}
      helpText="If other drivers have access to your car, they may need to be on your policy as a secondary driver."
    />
    {_.times(2, i =>
        <SecondaryDrivers key={i} count={i + 1} prefix={prefix} />
      )
    }
    <h3>Coverages</h3>
    <Select
      name={`${prefix}liability`}
      required label="Liability"
      options={[
        ['1,000,000', '1,000,000'],
        ['2,000,000', '2,000,000'],
      ]}
      helpText="Liability will provide coverage in the event if a third party were to bring a judgement against you."
    />
  </div>
}

export default VehicleBlock;
