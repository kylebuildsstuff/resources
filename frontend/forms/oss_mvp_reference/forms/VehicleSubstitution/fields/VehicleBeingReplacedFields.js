/**
*
* VehicleBeingReplaced
*
*/

import React from 'react';
import { Field } from 'redux-form/immutable';

import FormHeader from '../../../components/FormHeader';
import Select from '../../../utils/forms/Select';
import DateInput from '../../../utils/forms/datePicker/DateInput';
import disabledDays from '../../../utils/forms/datePicker/disabledDays';
import {
  genVehiclesFromPolicies,
} from '../../../utils/helpers';
import {
  removeVehStatuses,
} from '../../../utils/forms/values';
import schema from '../schema';

function VehicleBeingReplaced(props) {
  return (
    <div>
      <FormHeader hdr="Vehicle Being Replaced" />
      {props.getFormValues ? (
        <div>
          <Field
            component={Select}
            label={schema.removing_vehicle.label}
            name={schema.removing_vehicle.name}
            placeholder={schema.removing_vehicle.placeholder}
            helpText={schema.removing_vehicle.helpText}
            isRequired={schema.removing_vehicle.required}
            type={schema.removing_vehicle.type}
            valuesList={
              genVehiclesFromPolicies(
                props.policies, { vehicle: props.vehicle }
              )
            }
          />

          <Field
            component={Select}
            label={schema.removing_vehicle_status.label}
            name={schema.removing_vehicle_status.name}
            placeholder={schema.removing_vehicle_status.placeholder}
            helpText={schema.removing_vehicle_status.helpText}
            isRequired={schema.removing_vehicle_status.required}
            type={schema.removing_vehicle_status.type}
            valuesList={removeVehStatuses}
          />

          {props.getFormValues.get(
            schema.removing_vehicle_status.name
          ) &&
            <Field
              changeField={props.changeField}
              component={DateInput}
              disabledDays={disabledDays.nextThreeMonths}
              label={schema.removing_vehicle_loss_of_possession_date.label}
              name={schema.removing_vehicle_loss_of_possession_date.name}
              placeholder={schema.removing_vehicle_loss_of_possession_date.placeholder}
              isRequired={schema.removing_vehicle_loss_of_possession_date.required}
              helpText={schema.removing_vehicle_loss_of_possession_date.helpText}
              type={schema.removing_vehicle_loss_of_possession_date.type}
            />
          }
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

VehicleBeingReplaced.propTypes = {
  getFormValues: React.PropTypes.any,
  change: React.PropTypes.any,
  validMakes: React.PropTypes.any,
  validModels: React.PropTypes.any,
  fetchVehMakes: React.PropTypes.func,
  fetchVehModels: React.PropTypes.func,
  vehMakes: React.PropTypes.any,
  vehModels: React.PropTypes.any,
  policies: React.PropTypes.any,
  vehicle: React.PropTypes.any,
  changeField: React.PropTypes.any,
};

export default VehicleBeingReplaced;
