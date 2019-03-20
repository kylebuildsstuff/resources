/* eslint-disable */
import React from 'react';
import { browserHistory } from 'react-router';
import { Field } from 'redux-form/immutable';
import moment from 'moment/moment';

import TextInput from './forms/TextInput';
// import images otherwise not available to webpack - bleurgh
import ECO from '../assets/eco.jpg';
import PAF from '../assets/paf.jpg';
import PEM from '../assets/pem.jpg';
import ROY from '../assets/rsa.jpg';
import SR from '../assets/say.jpg';
import SCIS from '../assets/scis.jpg';
import TRG from '../assets/trg.jpg';
import ZEN from '../assets/zen.jpg';

// returns carrier string and image url from code provided by pivotal
export const carriers = (code) => {
  if (code === 'ECON') {
    return { imgUrl: ECO };
  } else if (code === 'PAF') {
    return { imgUrl: PAF };
  } else if (code === 'PEM') {
    return { imgUrl: PEM };
  } else if (code === 'ROY') {
    return { imgUrl: ROY };
  } else if (code === 'SR') {
    return { imgUrl: SR };
  } else if (code === 'TRG') {
    return { imgUrl: TRG };
  } else if (code === 'ZEN') {
    return { imgUrl: TRG };
  }
  return { insurer: 'SmartCoverage', imgUrl: SCIS };
};

// returns true if daily_commute is an actual value
export const dailyCommute = (distance) => {
  if (distance === 0 || distance === null) {
    return false;
  }
  return true;
};

// returns marital status string from code provided by pivotal
export const marital = (code) => {
  if (code === 'W') {
    return 'Widowed';
  } else if (code === 'S') {
    return 'Single';
  } else if (code === 'D') {
    return 'Divorced';
  } else if (code === 'P') {
    return 'Separated';
  } else if (code === 'R') {
    return 'Religious';
  } else if (code === 'C') {
    return 'Common-law';
  } else {
    return 'Married';
  }
};

// forward to url with timeout
export const forwardTo = (url, delay = 0) => {
  setTimeout(() => {
    browserHistory.push(url);
  }, delay);
}

// returns highest licence class from driver.licence array
export const licenceClass = (arr) => {
  const newArr = arr.sort((obj1, obj2) => {
    return obj1.tier - obj2.tier;
  });
  return newArr[newArr.length-1].licence_class;
}

export const vehicleUsageFunc = (code) => {
  if (code === 'C') {
    return 'Commuting';
  } else if (code === 'B') {
    return 'Business';
  } else {
    return 'Pleasure';
  }
}

// returns full vehicle string - YEAR MAKE MODEL - from vehicle object
export const vehicleString = (v) => {
  return `${v.vehicle_year} ${v.vehicle_make} ${v.vehicle_model}`;
}

export const genNoneToX = (x = 1) => {
  let optionsArray = [['0', 'None']];
  if (Number.isInteger(x)) {
    for (let i = 1; i <= x; i+= 1) {
      optionsArray.push([i.toString(), i.toString()]);
    }
  }
  return (optionsArray);
}

export const getDriversOnAllAutoPolicies = (policies, config={}) => {
  const drivers = [];
  for (let i = 0; i < policies.length; i += 1) {
    if (
      policies[i].type === 'auto' &&
      policies[i].driver &&
      policies[i].driver.length > 0
    ) {
      for (let d = 0; d < policies[i].driver.length; d += 1) {
        drivers.push(
          [policies[i].driver[d].id, `${policies[i].driver[d].first_name} ${policies[i].driver[d].last_name}`]
        );
      }
    }
  }
  config.other ? drivers.push(['-1', 'Other']) : '';
  return drivers;
}

export const genRequesterNameOptions = (primary, config={}) => {
  const returnList = [];
  // name that resides on the account which the user is logged into
  const insuredName = `${primary.first_name} ${primary.last_name}` ||
  `${primary.get('first_name')} ${primary.get('last_name')}` ||
  'Could not populate name insured';
  config.other ? returnList.push([primary.id, insuredName]) && returnList.push(['-1', 'Other']) : returnList.push([primary.id, insuredName])
  return returnList;
};

export const genVehiclesFromPolicies = (policies, config = {}) => {
  const vehicles = [];
  for (let pol = 0; pol < policies.length; pol += 1) {
    if (
      policies[pol].type === 'auto' &&
      policies[pol].vehicle.length > 0
    ) {
      for (let veh = 0; veh < policies[pol].vehicle.length; veh += 1) {
        let vehObj = policies[pol].vehicle[veh];
        vehicles.push([[vehObj.id], [`${vehObj.vehicle_year} ${vehObj.vehicle_make} ${vehObj.vehicle_model}`]]);
      }
    }
  }
  return vehicles;
}

export function checkIfVehCondIsNewerThanFiveYears(vehCond, vehYear) {
  if (vehCond === 'new' || vehCond === 'demo') {
    return true;
  }
  if (Number(vehYear) > 1000 && Number(vehYear) < 2200) {
    return moment(`${vehYear}-01-01`.toString()).isAfter(moment().subtract(5, 'years'))
  }
  return false;
}
