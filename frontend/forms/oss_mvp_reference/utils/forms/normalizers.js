const normalizers = {
  numbersOnly(value) {
    if (!value) {
      return value;
    }
    const onlyNums = value.replace(/[^\d]/g, '');
    return onlyNums;
  },
  phoneNumber(value, prevVal) {
    if (!value) {
      return value;
    }
    const onlyNums = value.replace(/[^\d]/g, '');
    if (!prevVal || value.length > prevVal.length) {
      // typing forward
      if (onlyNums.length === 3) {
        return `${onlyNums}-`;
      }
      if (onlyNums.length === 6) {
        return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)} -`;
      }
    }
    if (onlyNums.length <= 3) {
      return onlyNums;
    }
    if (onlyNums.length <= 6) {
      return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
    }
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(6, 10)}`;
  },
  postalCode(value) {
    return value.toUpperCase();
  },
  numbersWithCommasAndPeriods(value) {
    const onlyNums = value.replace(/[^\d,\.]/g, '');
    return onlyNums;
  },
};

export default normalizers;
