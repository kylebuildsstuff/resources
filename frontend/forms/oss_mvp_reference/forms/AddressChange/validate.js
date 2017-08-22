import schema from './schema';
import {
  VEHICLE_USAGES,
} from '../../utils/forms/constants';

const validate = (values, props) => { // eslint-disable-line
  const policyNumber = values.get(schema.policy_number.name);
  let policy = props.policies.filter((pol) => {
    if (pol.policy_number && (pol.policy_number === policyNumber)) {
      return true;
    }
    return false;
  });
  policy = policy[0] || '';

  const errors = {};
  // InitialFields
  if (values.get(schema.requester_name.name) === '-1' && (
    !values.get(schema.requester_name_other.name)
  )) {
    errors[schema.requester_name_other.name] = 'Required';
  } else if (!values.get(schema.requester_name.name)) {
    errors[schema.requester_name.name] = 'Required';
  }
  // NewAddressFields
  if (!values.get(schema.postal_code.name)) {
    errors[schema.postal_code.name] = 'Required';
  } else if (values.get(
    schema.postal_code.name).length < 6 ||
    values.get(schema.postal_code.name).length > 7
  ) {
    errors[schema.postal_code.name] = 'Postal codes should be 6 characters';
  } else if (!/^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]( )?\d[ABCEGHJKLMNPRSTVWXYZ]\d$/i.test(values.get(schema.postal_code.name))) {
    errors[schema.postal_code.name] = 'Invalid postal code';
  } else if (values.get(schema.postal_code.name) && (
    !props.addresses || props.addresses.length === 0
  )) {
    errors[schema.postal_code.name] = 'Could not retrieve any addresses with this postal code.';
  }

  if (!values.get(schema.new_street_number.name)) {
    errors[schema.new_street_number.name] = 'Required';
  }

  if (!values.get(schema.new_street_name.name)) {
    errors[schema.new_street_name.name] = 'Required';
  }

  if (!values.get(schema.new_municipality.name)) {
    errors[schema.new_municipality.name] = 'Required';
  }

  if (!values.get(schema.new_province.name)) {
    errors[schema.new_province.name] = 'Required';
  }

  if (!values.get(schema.move_in_date.name)) {
    errors[schema.move_in_date.name] = 'Required';
  }

  // DriverInformationFields -- unlooped fields
  if (!values.get(schema.other_frequent_driver.name)) {
    errors[schema.other_frequent_driver.name] = 'Required';
  }

  // other_frequent_driver names
  if (Number(values.get(schema.other_frequent_driver.name)) === 1 && (
    !values.get(`${schema.other_frequent_driver_name.name}_1`)
  )) {
    errors[`${schema.other_frequent_driver_name.name}_1`] = 'Required';
  }

  if (Number(values.get(schema.other_frequent_driver.name)) === 2 && (
    !values.get(`${schema.other_frequent_driver_name.name}_1`)
  )) {
    errors[`${schema.other_frequent_driver_name.name}_1`] = 'Required';
  }

  if (Number(values.get(schema.other_frequent_driver.name)) === 2 && (
    !values.get(`${schema.other_frequent_driver_name.name}_2`)
  )) {
    errors[`${schema.other_frequent_driver_name.name}_2`] = 'Required';
  }

  if (Number(values.get(schema.other_frequent_driver.name)) === 3 && (
    !values.get(`${schema.other_frequent_driver_name.name}_1`)
  )) {
    errors[`${schema.other_frequent_driver_name.name}_1`] = 'Required';
  }

  if (Number(values.get(schema.other_frequent_driver.name)) === 3 && (
    !values.get(`${schema.other_frequent_driver_name.name}_2`)
  )) {
    errors[`${schema.other_frequent_driver_name.name}_2`] = 'Required';
  }

  if (Number(values.get(schema.other_frequent_driver.name)) === 3 && (
    !values.get(`${schema.other_frequent_driver_name.name}_3`)
  )) {
    errors[`${schema.other_frequent_driver_name.name}_3`] = 'Required';
  }

  if (Number(values.get(schema.other_frequent_driver.name)) === 4 && (
    !values.get(`${schema.other_frequent_driver_name.name}_1`)
  )) {
    errors[`${schema.other_frequent_driver_name.name}_1`] = 'Required';
  }

  if (Number(values.get(schema.other_frequent_driver.name)) === 4 && (
    !values.get(`${schema.other_frequent_driver_name.name}_2`)
  )) {
    errors[`${schema.other_frequent_driver_name.name}_2`] = 'Required';
  }

  if (Number(values.get(schema.other_frequent_driver.name)) === 4 && (
    !values.get(`${schema.other_frequent_driver_name.name}_3`)
  )) {
    errors[`${schema.other_frequent_driver_name.name}_3`] = 'Required';
  }

  if (Number(values.get(schema.other_frequent_driver.name)) === 4 && (
    !values.get(`${schema.other_frequent_driver_name.name}_4`)
  )) {
    errors[`${schema.other_frequent_driver_name.name}_4`] = 'Required';
  }

  // other_frquent_driver_licences
  if (Number(values.get(schema.other_frequent_driver.name)) === 1 && (
    !values.get(`${schema.other_frequent_driver_licence.name}_1`)
  )) {
    errors[`${schema.other_frequent_driver_licence.name}_1`] = 'Required';
  }

  if (Number(values.get(schema.other_frequent_driver.name)) === 2 && (
    !values.get(`${schema.other_frequent_driver_licence.name}_1`)
  )) {
    errors[`${schema.other_frequent_driver_licence.name}_1`] = 'Required';
  }

  if (Number(values.get(schema.other_frequent_driver.name)) === 2 && (
    !values.get(`${schema.other_frequent_driver_licence.name}_2`)
  )) {
    errors[`${schema.other_frequent_driver_licence.name}_2`] = 'Required';
  }

  if (Number(values.get(schema.other_frequent_driver.name)) === 3 && (
    !values.get(`${schema.other_frequent_driver_licence.name}_1`)
  )) {
    errors[`${schema.other_frequent_driver_licence.name}_1`] = 'Required';
  }

  if (Number(values.get(schema.other_frequent_driver.name)) === 3 && (
    !values.get(`${schema.other_frequent_driver_licence.name}_2`)
  )) {
    errors[`${schema.other_frequent_driver_licence.name}_2`] = 'Required';
  }

  if (Number(values.get(schema.other_frequent_driver.name)) === 3 && (
    !values.get(`${schema.other_frequent_driver_licence.name}_3`)
  )) {
    errors[`${schema.other_frequent_driver_licence.name}_3`] = 'Required';
  }

  if (Number(values.get(schema.other_frequent_driver.name)) === 4 && (
    !values.get(`${schema.other_frequent_driver_licence.name}_1`)
  )) {
    errors[`${schema.other_frequent_driver_licence.name}_1`] = 'Required';
  }

  if (Number(values.get(schema.other_frequent_driver.name)) === 4 && (
    !values.get(`${schema.other_frequent_driver_licence.name}_2`)
  )) {
    errors[`${schema.other_frequent_driver_licence.name}_2`] = 'Required';
  }

  if (Number(values.get(schema.other_frequent_driver.name)) === 4 && (
    !values.get(`${schema.other_frequent_driver_licence.name}_3`)
  )) {
    errors[`${schema.other_frequent_driver_licence.name}_3`] = 'Required';
  }

  if (Number(values.get(schema.other_frequent_driver.name)) === 4 && (
    !values.get(`${schema.other_frequent_driver_licence.name}_4`)
  )) {
    errors[`${schema.other_frequent_driver_licence.name}_4`] = 'Required';
  }

  if (policy) {
    // validation for looped fields
    policy.vehicle.forEach((veh) => {
      // VehicleInformationFields
      if (!values.get(`veh_${veh.vehicle_no}_${schema.vin.name}`)) {
        errors[`veh_${veh.vehicle_no}_${schema.vin.name}`] = 'Required';
      }

      if (!values.get(`veh_${veh.vehicle_no}_${schema.vehicle_usage.name}`)) {
        errors[`veh_${veh.vehicle_no}_${schema.vehicle_usage.name}`] = 'Required';
      }

      if (!values.get(`veh_${veh.vehicle_no}_${schema.vehicle_daily_kms.name}`)) {
        errors[`veh_${veh.vehicle_no}_${schema.vehicle_daily_kms.name}`] = 'Required';
      }

      if (!values.get(`veh_${veh.vehicle_no}_${schema.vehicle_annual_kms.name}`)) {
        errors[`veh_${veh.vehicle_no}_${schema.vehicle_annual_kms.name}`] = 'Required';
      }

      if (values.get(
        `veh_${veh.vehicle_no}_${schema.vehicle_usage.name}`
      ) === VEHICLE_USAGES.business) {
        if (!values.get(
          `veh_${veh.vehicle_no}_${schema.business_vehicle_annual_kms.name}`
        )) {
          errors[`veh_${veh.vehicle_no}_${schema.business_vehicle_annual_kms.name}`] = 'Required';
        }
      }

      if (!values.get(`veh_${veh.vehicle_no}_${schema.parked_at_night.name}`)) {
        errors[`veh_${veh.vehicle_no}_${schema.parked_at_night.name}`] = 'Required';
      }

      // DriverInformationFields
      if (!values.get(`veh_${veh.vehicle_no}_${schema.principle_driver.name}`)) {
        errors[`veh_${veh.vehicle_no}_${schema.principle_driver.name}`] = 'Required';
      }

      if (values.get(`veh_${veh.vehicle_no}_${schema.principle_driver.name}`) === '-1') {
        if (!values.get(`veh_${veh.vehicle_no}_${schema.other_principle_driver_name.name}`)) {
          errors[`veh_${veh.vehicle_no}_${schema.other_principle_driver_name.name}`] = 'Required';
        }
        if (!values.get(`veh_${veh.vehicle_no}_${schema.other_principle_driver_licence.name}`)) {
          errors[`veh_${veh.vehicle_no}_${schema.other_principle_driver_licence.name}`] = 'Required';
        }
      }

      // CoverageFields
      if (!values.get(`veh_${veh.vehicle_no}_${schema.coverage_liability.name}`)) {
        errors[`veh_${veh.vehicle_no}_${schema.coverage_liability.name}`] = 'Required';
      }

      if (values.get(`veh_${veh.vehicle_no}_${schema.coverage_collision.name}`) !== false && (
        values.get(`veh_${veh.vehicle_no}_${schema.coverage_collision.name}`) !== true
      )) {
        errors[`veh_${veh.vehicle_no}_${schema.coverage_collision.name}`] = 'Required';
      }

      if (values.get(`veh_${veh.vehicle_no}_${schema.coverage_comprehensive.name}`) !== false && (
        values.get(`veh_${veh.vehicle_no}_${schema.coverage_comprehensive.name}`) !== true
      )) {
        errors[`veh_${veh.vehicle_no}_${schema.coverage_comprehensive.name}`] = 'Required';
      }
    });
  }

  return errors;
};

export default validate;
