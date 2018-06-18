import moment from 'moment/moment';

const disabledDays = {
  enableAll() {
    return false;
  },

  weekends(day) {
    if (day.getDay() === 0 || day.getDay() === 6) {
      return true;
    }
    return false;
  },

  withinThirtyDaysPastFuture(day) {
    const momentDay = moment(day);
    const lowerLimit = moment().subtract(30, 'days');
    const higherLimit = moment().add(30, 'days');
    if (momentDay >= lowerLimit && momentDay <= higherLimit) {
      return false;
    }
    return true;
  },

  withinThirtyDaysFuture(day) {
    const momentDay = moment(day);
    const higherLimit = moment().add(30, 'days');
    if (momentDay <= higherLimit) {
      return false;
    }
    return true;
  },

  greaterThanCurrentLessThanThirtyDaysFuture(day) {
    const momentDay = moment(day);
    const higherLimit = moment().add(30, 'days');
    if (momentDay <= higherLimit && (
      momentDay >= moment()
    )) {
      return false;
    }
    return true;
  },

  nextThreeMonths(day) {
    const momentDay = moment(day);
    const higherLimit = moment().add(90, 'days');
    if (momentDay <= higherLimit && (
      momentDay >= moment()
    )) {
      return false;
    }
    return true;
  },
};

export default disabledDays;
