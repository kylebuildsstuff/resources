import schema from './schema';
import {
  VEHICLE_CONDITIONS,
  VEHICLE_USAGES,
} from '../../utils/forms/constants';

const validate = (values, props) => { // eslint-disable-line
  const errors = {};

  // InitialFields
  if (values.get(schema.requester_name.name) === '-1' && (
    !values.get(schema.requester_name_other.name)
  )) {
    errors[schema.requester_name_other.name] = 'Required';
  } else if (!values.get(schema.requester_name.name)) {
    errors[schema.requester_name.name] = 'Required';
  }

  // VehicleBeingAddedFields
  if (values.get(schema.adding_vehicle_year.name) <= 1981 && !values.get(schema.adding_old_vehicle_name.name)) {
    errors[schema.adding_old_vehicle_name.name] = 'Required';
  } else if (!values.get(schema.adding_vehicle_year.name)) {
    errors[schema.adding_vehicle_year.name] = 'Required';
  } else if (values.get(schema.adding_vehicle_year.name).length < 4) {
    errors[schema.adding_vehicle_year.name] = 'Please enter the full year';
  } else if (values.get(schema.adding_vehicle_year.name) <= 1981) {
    errors[schema.adding_vehicle_year.name] = 'Vehicle year must be 1982 or newer';
  }

  if (values.get(schema.adding_vehicle_make.name) && !values.get(schema.adding_vehicle_model.name)) {
    errors[schema.adding_vehicle_model.name] = 'Required';
  }

  if (!values.get(schema.take_possession_date.name)) {
    errors[schema.take_possession_date.name] = 'Required';
  }

  if (!values.get('registered_province')) {
    errors[schema.registered_province.name] = 'Required';
  }

  if (values.get(schema.vehicle_condition.name) === VEHICLE_CONDITIONS.new || values.get(schema.vehicle_condition.name) === 'demo') {
    if (!values.get(schema.kms_at_purchase.name)) {
      errors[schema.kms_at_purchase.name] = 'Required';
    }
  } else if (!values.get(schema.vehicle_condition.name)) {
    errors[schema.vehicle_condition.name] = 'Required';
  }

  if (!values.get(schema.existing_damage.name)) {
    errors[schema.existing_damage.name] = 'Required';
  }

  if (!values.get(schema.price_of_vehicle.name)) {
    errors[schema.price_of_vehicle.name] = 'Required';
  }

  if (!values.get(schema.vehicle_usage.name)) {
    errors[schema.vehicle_usage.name] = 'Required';
  }

  if (!values.get(schema.vehicle_daily_kms.name)) {
    errors[schema.vehicle_daily_kms.name] = 'Required';
  }

  if (!values.get(schema.vehicle_annual_kms.name)) {
    errors[schema.vehicle_annual_kms.name] = 'Required';
  }

  if (values.get(
    schema.vehicle_usage.name
  ) === VEHICLE_USAGES.business) {
    if (!values.get(
      schema.business_vehicle_annual_kms.name
    )) {
      errors[schema.business_vehicle_annual_kms.name] = 'Required';
    }
  }

  if (values.get(schema.carry_passengers_for_compensation.name) !== 'false' && values.get(schema.carry_passengers_for_compensation.name) !== 'true') {
    errors[schema.carry_passengers_for_compensation.name] = 'Required';
  }

  if (values.get(schema.carry_special_use.name) !== 'false' && values.get(schema.carry_special_use.name) !== 'true') {
    errors[schema.carry_special_use.name] = 'Required';
  }

  if (values.get(schema.vehicle_modified.name) !== 'false' && values.get(schema.vehicle_modified.name) !== 'true') {
    errors[schema.vehicle_modified.name] = 'Required';
  }

  if (values.get(schema.existing_damage.name) !== 'false' && values.get(schema.existing_damage.name) !== 'true') {
    errors[schema.existing_damage.name] = 'Required';
  }

  if (values.get(schema.winter_tires.name) !== 'false' && values.get(schema.winter_tires.name) !== 'true') {
    errors[schema.winter_tires.name] = 'Required';
  }

  // DriverInformationFields
  if (!values.get(schema.registered_owner.name)) {
    errors[schema.registered_owner.name] = 'Required';
  }

  if (values.get(schema.registered_owner.name) === '-1') {
    if (!values.get(schema.other_registered_owner_name.name)) {
      errors[schema.other_registered_owner_name.name] = 'Required';
    }
    if (!values.get(schema.other_registered_owner_licence.name)) {
      errors[schema.other_registered_owner_licence.name] = 'Required';
    }
  }

  if (!values.get(schema.principle_driver.name)) {
    errors[schema.principle_driver.name] = 'Required';
  }

  if (values.get(schema.principle_driver.name) === '-1') {
    if (!values.get(schema.other_principle_driver_name.name)) {
      errors[schema.other_principle_driver_name.name] = 'Required';
    }
    if (!values.get(schema.other_principle_driver_licence.name)) {
      errors[schema.other_principle_driver_licence.name] = 'Required';
    }
  }

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

  // LessorLienInfoFields
  if (!values.get(schema.financing.name)) {
    errors[schema.financing.name] = 'Required';
  }

  if (!values.get(schema.financing_postal_code.name)) {
    // errors.financing_postal_code = 'Required';
  } else if (values.get(schema.financing_postal_code.name).length < 7 || values.get(schema.financing_postal_code.name).length > 7) {
    errors[schema.financing_postal_code.name] = 'Postal codes should be 6 characters';
  } else if (!/^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]( )?\d[ABCEGHJKLMNPRSTVWXYZ]\d$/i.test(values.get(schema.financing_postal_code.name))) {
    errors[schema.financing_postal_code.name] = 'Invalid postal code';
  } else if (values.get(schema.financing_postal_code.name) && (
    !props.addresses || props.addresses.length === 0
  )) {
    errors[schema.financing_postal_code.name] = 'Could not retrieve any addresses with this postal code.';
  }

  // VehCoverageFields
  if (!values.get(schema.coverage_liability.name)) {
    errors[schema.coverage_liability.name] = 'Required';
  }

  if (values.get(schema.coverage_collision.name) !== false && (
    values.get(schema.coverage_collision.name) !== true
  )) {
    errors[schema.coverage_collision.name] = 'Required';
  }

  if (values.get(schema.coverage_comprehensive.name) !== false && (
    values.get(schema.coverage_comprehensive.name) !== true
  )) {
    errors[schema.coverage_comprehensive.name] = 'Required';
  }

  return errors;
};

export default validate;
