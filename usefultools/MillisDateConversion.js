const DateTomillis = (date) => {
  date = new Date(date);
  return date.getTime.call(date);
};

const MillisToDate = (millis) => {
  let date = new Date(millis + 60 * 60 * 2000);
  return date;
};

const DelayedDate = (date, delay_minutes) => {
  let millis = DateTomillis(date);
  let new_millis = millis - delay_minutes * 60 * 1000;
  //new_millis += 60 * 60 * 2000; // UTC+2
  return MillisToDate(new_millis);
};

export { DateTomillis, MillisToDate, DelayedDate };
