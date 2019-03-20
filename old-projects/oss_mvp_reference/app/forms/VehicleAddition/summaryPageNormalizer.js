import _ from 'lodash';
// Take the formValues and make it pretty
// e.g. take policy_number (which is a uuid), and turn it into a name

// Takes as arguments, all the form label-value pairings, [['Requester Name', '12312-udasd-ai123-asd'], [...], ...]
// Turns it into a new array with changed values, [['Requester Name', 'Johnny'], [...], ...]
export const summaryPageNormalizer = (labelValuePairings, primary) => {
  const normalizedPairings = labelValuePairings.map((val) => {
    // Convert booleans into 'Yes', and 'No' strings
    if (val[1] === true || val[1] === 'true') {
      return [val[0], 'Yes'];
    }
    if (val[1] === false || val[1] === 'false') {
      return [val[0], 'No'];
    }

    // Convert '0's to 'None's
    if (val[1] === 0 || val[1] === '0') {
      return [val[0], 'None'];
    }

    // Convert '-1's to 'Other's
    if (val[1] === '-1') {
      return [val[0], 'Other'];
    }

    // Convert Make and Models to Uppercase
    if (val[0] === 'Vehicle Make' || val[0] === 'Vehicle Model') {
      return [val[0], val[1].toUpperCase()];
    }

    // Convert requester_name from uuid to actual string name
    if (val[0] === 'Requester Name') {
      return [val[0], `${primary.first_name} ${primary.last_name}`];
    }

    return [val[0], _.upperFirst(val[1])];
  });

  return normalizedPairings;
};
