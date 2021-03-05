const fullDate = new Date();
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

export const currentDate = () => {
  const day = days[fullDate.getDay()];
  const date = fullDate.getDate();
  const month = months[fullDate.getMonth()];
  const year = fullDate.getFullYear();
  console.log(fullDate);
  console.log(fullDate.getMonth() + 1);
  return `${day} ${date} ${month} ${year}`;
};

export const nextDay = () => {
  const day = days[fullDate.getDay() + 1];
  const date = fullDate.getDate() + 1;
  console.log(fullDate);
  return `${day} ${date}`;
};
