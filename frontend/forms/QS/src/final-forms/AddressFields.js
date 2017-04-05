import React from 'react';
import Text from './Fields/Text';
import Select from './Fields/Select';

const AddressFields = (props) => {
  return (
    <div>
      <Text name="postal_code" label="Postal Code" required />
      <Text name="unit_number" label="Unit Number" />
      <Text name="street_number" label="Street Number" required />
      <Text name="street_name" label="Street Name" required />
      <Text name="city" label="City" required />
      <Select
        name="province" required label="Province"
        options={[
          ['Alberta', 'AL'],
          ['British Columbia', 'BC'],
          ['New Brunswick', 'NB'],
          ['Nova Scotia', 'NS'],
          ['Ontario', 'ON'],
          ['Saskatchewan', 'SK'],
          ['Yellowknife', 'YK'],
        ]}
      />
      <Text name="phone_number" label="Phone Number" required />
    </div>
  )
}

export default AddressFields;
