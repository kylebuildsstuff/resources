export default function disabledDays(day) {
  if (day.getDay() === 0 || day.getDay() === 6) {
    return true;
  }
  return false;
}
