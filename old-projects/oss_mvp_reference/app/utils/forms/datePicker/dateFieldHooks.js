import moment from 'moment';

// Doesn't make sense for normalizing logic to live here
// every date picker will be normalized the same.
// Moved date normalizing logic directly into DateInput component
export function formatDate(dateValue) {
  // return formattedValue
  if (dateValue === '') {
    return moment().format('YYYY-MM-DD');
  }
  const formatted = moment(Date.parse(dateValue))
    .format('dddd MMM. Do, YYYY');
  return formatted;
}

export function normalizeDate(stringValue) {
  // return nextValue
  return moment(stringValue).toDate();
}
