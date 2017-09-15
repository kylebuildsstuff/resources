// Point of constants is to have a uniform interface
// to access values that may change in the future.

export const CARRIERS = {
  GA: 'GA', // Aviva
  PEM: 'PEM', // Pembridge
  ECO: 'ECO', // Economical
  PAF: 'PAF', // PAFCO
  ROY: 'ROY', // RSA
  SR: 'SR', // SR
};

export const PROVINCES = {
  AB: 'AB', // 'Alberta',
  BC: 'BC', // 'British Columbia',
  MB: 'MB', // 'Manitoba',
  NB: 'NB', // 'Newfoundland and Labrador',
  NL: 'NL', // 'New Brunswick',
  NT: 'NT', // 'Northwest Territories',
  NS: 'NS', // 'Nova Scotia',
  NU: 'NU', // 'Nunavut',
  ON: 'ON', // 'Ontario',
  PE: 'PE', // 'Prince Edward Island',
  QC: 'QC', // 'Quebec',
  SK: 'SK', // 'Saskatchewan',
  YT: 'YT', // 'Yukon',
};

export const VEHICLE_CONDITIONS = {
  new: 'new',
  used: 'used',
  demo: 'demo',
};

export const VEHICLE_USAGES = {
  pleasure: 'pleasure',
  business: 'business',
  commuting: 'commuting',
};

export const PARKING_OPTIONS = {
  driveway: 'driveway',
  garage: 'garage',
  street: 'street',
  underground: 'underground',
  other: 'other',
};

export const REMOVE_VEH_STATUSES = {
  sold: 'sold the vehicle',
  traded: 'traded in to dealership',
  other: 'other',
};
