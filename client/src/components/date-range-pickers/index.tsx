import React, { useMemo, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.scss";

interface IDateRangePicker {
  inputWrapperClass?: string;
  availability?: { start_date: string; end_date: string }[];
  checkIn: Date | null;
  checkOut: Date | null;
  setCheckIn: React.Dispatch<React.SetStateAction<Date | null>>;
  setCheckOut: React.Dispatch<React.SetStateAction<Date | null>>;
}

const DateRangePicker = (props: IDateRangePicker) => {
  const { inputWrapperClass, availability, checkIn, checkOut, setCheckIn, setCheckOut } = props;

  const getNextDay = (date: Date) => {
    const dateCopy = new Date(date);
    dateCopy.setDate(dateCopy.getDate() + 1);
    return dateCopy;
  };

  const today = useRef(new Date());
  const minCheckOutDate = useRef(getNextDay(new Date()));

  const handleCheckInDate = (date: Date) => {
    setCheckIn(date);
    minCheckOutDate.current = getNextDay(date);
  };

  const handleCheckOutDate = (date: Date) => {
    setCheckOut(date);
  };

  const availabilityParsedForDatePicker = useMemo(() => {
    if (availability) {
      return availability.map((range) => {
        const start = new Date(Number(range.start_date));
        start.setHours(0, 0, 0);
        const end = new Date(Number(range.end_date));
        end.setHours(0, 0, 0);

        return {
          start,
          end,
        };
      });
    }

    return [];
  }, [availability]);

  return (
    <div className="date-pickers-wrapper">
      <div className={`date-pickers-item ${inputWrapperClass}`}>
        <span className="icon-calendar input-icon" />
        <DatePicker
          dateFormat="dd/MM/yyyy"
          selected={checkIn}
          onChange={handleCheckInDate}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          placeholderText="Check-in"
          calendarClassName="date-pickers-inputs"
          minDate={today.current}
          excludeDateIntervals={availabilityParsedForDatePicker}
        />
        <div className="date-pickers-item__clear">
          {!!checkIn && (
            <button
              type="button"
              className="link"
              onClick={() => {
                setCheckIn(null);
                minCheckOutDate.current = getNextDay(new Date());
              }}
            >
              <span className="icon-cancel" />
            </button>
          )}
        </div>
      </div>

      <div className={`date-pickers-item ${inputWrapperClass}`}>
        <span className="icon-calendar input-icon" />
        <DatePicker
          dateFormat="dd/MM/yyyy"
          selected={checkOut}
          onChange={handleCheckOutDate}
          selectsEnd
          startDate={checkIn}
          endDate={checkOut}
          placeholderText="Check-out"
          calendarClassName="date-pickers-inputs"
          minDate={minCheckOutDate.current}
          excludeDateIntervals={availabilityParsedForDatePicker}
        />
        <div className="date-pickers-item__clear">
          {!!checkOut && (
            <button
              type="button"
              className="link"
              onClick={() => {
                setCheckOut(null);
              }}
            >
              <span className="icon-cancel" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

DateRangePicker.defaultProps = {
  inputWrapperClass: "",
  availability: [],
};

export default DateRangePicker;
