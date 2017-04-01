import React from 'react';

const normalizePostalCode = (val) => { // eslint-disable-line
  return val.replace(/(\w{3})/g, '$1 ').replace(/(^\s+|\s+$)/,'');
}

// set form values
export const formValues = (values, schema) => {
  if (Object.keys(values).length === 0) {
    return 'no values yet';
  } else {
    return Object.keys(values).map(key => {
      return (
        <p key={key}>
          <strong>{schema[key].label}:</strong>{' '}
          {values[key].label}
        </p>
      );
    });
  }
}

// return value is key exists in formValues or return false
export const returnValue = (key, name) => {
  if (Object.keys(key).length > 0 && key[name]) {
    console.log(key[name].value);
    return key[name].value;
  }
  return false;
}

// return value is key exists in formValues or return false
export const returnDrivers = (driverArray) => {
  const drivers = [];
  driverArray.map(d =>
    drivers.push({
      name: `${d.first_name} ${d.last_name}`,
      label: `${d.first_name} ${d.last_name}`,
    })
  )
  return drivers;
}
