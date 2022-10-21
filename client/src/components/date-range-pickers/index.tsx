import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.scss";

interface IDateRangePicker {
  inputWrapperClass?: string;
  setDatesCallback?: React.Dispatch<
    React.SetStateAction<{ checkIn: Date | null; checkOut: null | Date }>
  >;
}

const DateRangePicker = (props: IDateRangePicker) => {
  const { inputWrapperClass, setDatesCallback } = props;

  const [startDate, setStartDate] = useState<null | Date>(null);
  const [endDate, setEndDate] = useState<null | Date>(null);

  const getNextDay = (date: Date) => {
    const dateCopy = new Date(date);
    dateCopy.setDate(dateCopy.getDate() + 1);
    return dateCopy;
  };

  const today = useRef(new Date());
  const minCheckOutDate = useRef(getNextDay(new Date()));

  const handleCheckInDate = (date: Date) => {
    setStartDate(date);
    minCheckOutDate.current = getNextDay(date);
    if (setDatesCallback) {
      setDatesCallback((state) => ({ ...state, checkIn: date }));
    }
  };

  const handleCheckOutDate = (date: Date) => {
    setEndDate(date);
    if (setDatesCallback) {
      setDatesCallback((state) => ({ ...state, checkOut: date }));
    }
  };

  return (
    <>
      <div className={`date-pickers ${inputWrapperClass}`}>
        <span className="icon-calendar input-icon" />
        <DatePicker
          dateFormat="dd/MM/yyyy"
          selected={startDate}
          onChange={handleCheckInDate}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Check-in"
          calendarClassName="date-pickers-inputs"
          minDate={today.current}
        />
      </div>

      <div className={inputWrapperClass}>
        <span className="icon-calendar input-icon" />
        <DatePicker
          dateFormat="dd/MM/yyyy"
          selected={endDate}
          onChange={handleCheckOutDate}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          placeholderText="Check-out"
          calendarClassName="date-pickers-inputs"
          minDate={minCheckOutDate.current}
        />
      </div>
    </>
  );
};

DateRangePicker.defaultProps = {
  inputWrapperClass: "",
  setDatesCallback: () => {},
};

export default DateRangePicker;
