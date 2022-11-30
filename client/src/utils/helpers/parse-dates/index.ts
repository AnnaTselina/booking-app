/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-shadow
enum MonthNames {
  January,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December,
}

export const parseDateToString = (date: Date) => {
  const month = (date.getMonth() + 1).toString();
  const day = date.getDate().toString();

  return `${date.getFullYear()}-${month.length > 1 ? month : `0${month}`}-${
    day.length > 1 ? day : `0${day}`
  }`;
};

export const parseDateToStringWithMonthName = (date: Date | string) => {
  const dateTyped = typeof date === "string" ? new Date(date) : date;

  const month = dateTyped.getMonth();
  const day = dateTyped.getDate();

  return `${day} ${MonthNames[month]}, ${dateTyped.getFullYear()}`;
};

export const parseStringToDate = () => {};
