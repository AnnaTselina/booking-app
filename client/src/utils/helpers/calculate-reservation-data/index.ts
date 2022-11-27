export const getTotalNights = (dates: { checkIn: Date | null; checkOut: Date | null }) => {
  if (dates.checkIn && dates.checkOut) {
    const difference = dates.checkOut.getTime() - dates.checkIn.getTime();
    const totalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return totalDays;
  }
  return 0;
};

export const getTotalPrice = (totalNights: number, pricePerNight: number) => {
  if (totalNights && pricePerNight) {
    return totalNights * pricePerNight;
  }

  return 0;
};
