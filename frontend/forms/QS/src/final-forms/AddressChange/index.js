import React from 'react';
import BaseForm from '../BaseForm';
import Text from '../Fields/Text';
import Email from '../Fields/Email';
import Select from '../Fields/Select';
import Checkbox from '../Fields/Checkbox';
import AddressFields from '../AddressFields';
import VehicleBlock from '../VehicleBlock';
import YearMakeModel from '../YearMakeModel';

class Form extends React.Component {
  render() {

    const arr = [
      {
        id: 1,
        title: 'My First Vehicle',
      },
      {
        id: 2,
        title: 'My Second Vehicle',
      }
    ]

    return (
      <div className="AddressChange">
        <YearMakeModel />
        <hr />
        <AddressFields />
        <hr />
        <Select
          options={[['abc', 'Abc'], ['def', 'Def']]}
          label="Who is completing this request?" name="requester_name" other
        />
        {
          1 > 2 &&
            <Text required
              label="Name of person completing this request?" name="email_address"
              helpText="Only the person listed on the vehicle registration or an authorized individual may make changes to this policy."
            />
        }
        <Email required label="My Email Field" name="email_address" />
        <Checkbox
          required label="My Group of Checkboxes" name="collision_coverage" type="checkbox"
          options={[
            ['collision', 'Collision'],
            ['comprehensive', 'Comprehensive'],
            ['trans_replacement', 'Coverage for Transportation Replacement (20)'],
            ['non_owned', 'Liability for Damage to Non-Owned Autos (27)'],
            ['limited_waiver', 'Limited Waiver of Depreciation/Limited Waiver of Depreciation for Specified Lessee(s)'],
            ['accident_waiver', 'Accident Waiver'],
            ['conviction_protector', 'Conviction Protector'],
          ]}
        />
        <Checkbox
          required label="My Radio Buttons" name="collision_coverage" type="radio"
          options={[
            ['true', 'Yes'],
            ['false', 'No'],
          ]}
        />
        <Select
          options={[['abc', 'Abc'], ['def', 'Def']]}
          label="My Select" name="requester_name" other
        />
        {
          arr.map(v =>
            <VehicleBlock key={v.id} v={v} />
          )
        }
      </div>
    )
  }
}

export default BaseForm(Form);
