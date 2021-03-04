export const dateBuilder = (fullDate) => {
  var months = new Array(
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  );
  var days = new Array(
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  );
  const day = days[fullDate.getDay()];
  const date = fullDate.getDate();
  const month = months[fullDate.getMonth()];
  const year = fullDate.getFullYear();

  return `${day} ${date} ${month} ${year}`;
};
