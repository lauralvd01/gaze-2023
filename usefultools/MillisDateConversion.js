const DateTomillis = (date) => {
  return date.getTime.call(date);
};

const MillisToDate = (millis) => {
  let date = new Date(millis);
  return date;
};

const DelayedDate = (date, delay_minutes) => {
  let millis = DateTomillis(date);
  let new_millis = millis - delay_minutes * 60 * 1000;
  return MillisToDate(new_millis);
};

export { DateTomillis, MillisToDate, DelayedDate };
