// Values passed into the forms as options.

// first value is the value sent to the API, second
// is the display value.

import {
  PROVINCES,
  VEHICLE_CONDITIONS,
  VEHICLE_USAGES,
  PARKING_OPTIONS,
  REMOVE_VEH_STATUSES,
} from './constants';

export const provinces = [
  [PROVINCES.AB, 'Alberta'],
  [PROVINCES.BC, 'British Columbia'],
  [PROVINCES.MB, 'Manitoba'],
  [PROVINCES.NB, 'Newfoundland and Labrador'],
  [PROVINCES.NL, 'New Brunswick'],
  [PROVINCES.NT, 'Northwest Territories'],
  [PROVINCES.NS, 'Nova Scotia'],
  [PROVINCES.NU, 'Nunavut'],
  [PROVINCES.ON, 'Ontario'],
  [PROVINCES.PE, 'Prince Edward Island'],
  [PROVINCES.QC, 'Quebec'],
  [PROVINCES.SK, 'Saskatchewan'],
  [PROVINCES.YT, 'Yukon'],
];

export const vehicleConditions = [
  [VEHICLE_CONDITIONS.new, 'New'],
  [VEHICLE_CONDITIONS.used, 'Used'],
  [VEHICLE_CONDITIONS.demo, 'Demo'],
];

export const vehicleUsages = [
  [VEHICLE_USAGES.pleasure, 'Pleasure'],
  [VEHICLE_USAGES.business, 'Business'],
  [VEHICLE_USAGES.commuting, 'Commuting'],
];

export const leasedOrFinanced = [
  [true, 'Yes - Leased/Financed'],
  [false, 'No'],
];

export const liabilityLimits = [
  [1000000, '1,000,000'],
  [2000000, '2,000,000'],
];

export const parkingOptions = [
  [PARKING_OPTIONS.driveway, 'Private Driveway'],
  [PARKING_OPTIONS.garage, 'Garage'],
  [PARKING_OPTIONS.street, 'Street'],
  [PARKING_OPTIONS.underground, 'Underground Parking'],
  [PARKING_OPTIONS.other, 'Other'],
];

export const removeVehStatuses = [
  [REMOVE_VEH_STATUSES.sold, ['Sold the vehicle (transaction already completed)']],
  [REMOVE_VEH_STATUSES.traded, ['Traded in to dealership']],
  [REMOVE_VEH_STATUSES.other, ['Other']],
];
