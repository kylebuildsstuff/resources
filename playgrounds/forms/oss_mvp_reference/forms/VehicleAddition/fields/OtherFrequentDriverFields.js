import React from 'react';
import { Field } from 'redux-form/immutable';

import TextInput from '../../../utils/forms/TextInput';
import schema from '../schema';

function OtherFrequentDriverFields(props) {
  const num = parseInt(props.num, 10);
  const fieldsArray = [];
  if (!Number.isInteger(num)) {
    return <div></div>;
  }

  for (let i = 0; i < num; i += 1) {
    fieldsArray.push((
      <div key={i}>
        <Field
          component={TextInput}
          isRequired={schema.other_frequent_driver_name.required}
          label={`${i + 1}. ${schema.other_frequent_driver_name.label}`}
          name={`${schema.other_frequent_driver_name.name}_${i + 1}`}
          type={schema.other_frequent_driver_name.type}
          placeholder={schema.other_frequent_driver_name.placeholder}
        />

        <Field
          component={TextInput}
          isRequired={schema.other_frequent_driver_licence.required}
          label={`${i + 1}. ${schema.other_frequent_driver_licence.label}`}
          name={`${schema.other_frequent_driver_licence.name}_${i + 1}`}
          type={schema.other_frequent_driver_licence.type}
          placeholder={schema.other_frequent_driver_licence.placeholder}
        />
      </div>
    ));
  }
  return (
    <div>
      {fieldsArray}
    </div>
  );
}

OtherFrequentDriverFields.propTypes = {
  num: React.PropTypes.any,
};

export default OtherFrequentDriverFields;
