import moment from 'moment';

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
