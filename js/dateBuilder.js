const fullDate = new Date();
let months = new Array(
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
let days = new Array(
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
);

export const currentDate = () => {
  const day = days[fullDate.getDay()];
  const date = fullDate.getDate();
  const month = months[fullDate.getMonth()];
  const year = fullDate.getFullYear();
  return `${day} ${date} ${month} ${year}`;
};

export const nextDay = (fullDate) => {
  const day = days[fullDate.getDay()];
  const date = fullDate.getDate() + 1;
  console.log(fullDate.getDay());
  return `${day} ${date}`;
};
