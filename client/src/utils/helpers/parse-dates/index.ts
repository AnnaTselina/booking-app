export const parseDateToString = (date: Date) => {
  const month = (date.getMonth() + 1).toString();
  const day = date.getDate().toString();

  return `${date.getFullYear()}-${month.length > 1 ? month : `0${month}`}-${
    day.length > 1 ? day : `0${day}`
  }`;
};

export const parseStringToDate = () => {};
