import React, { useState } from "react";
import DateRangePicker from "../date-range-pickers";
import "./styles.scss";

interface IBookPanel {
  maxGuests: number;
  pricePerNight: number;
}

const BookPanel = (props: IBookPanel) => {
  const { maxGuests, pricePerNight } = props;

  const [dates, setDates] = useState<{ checkIn: Date | null; checkOut: Date | null }>({
    checkIn: null,
    checkOut: null,
  });

  const [numGuests, setNumGuests] = useState(1);

  const handleNumGuestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value)) {
      if (e.target.valueAsNumber < 1) {
        setNumGuests(1);
      } else if (e.target.valueAsNumber > maxGuests) {
        setNumGuests(maxGuests);
      } else {
        setNumGuests(e.target.valueAsNumber);
      }
    }
  };

  return (
    <div className="bookpanel-container">
      <form>
        <div className="bookpanel-box">
          <DateRangePicker
            setDatesCallback={setDates}
            clearButton
            inputWrapperClass="bookpanel-date-input"
          />

          <div className="bookpanel-box__num-guests">
            <label htmlFor="num-guests">Guests:</label>
            <input
              type="number"
              id="num-guests"
              min={1}
              value={numGuests}
              onChange={handleNumGuestsChange}
            />
          </div>

          <table className="bookpanel-box__price-calculations">
            <tbody>
              <tr>
                <td>
                  <b>Price per night:</b>
                </td>
                <td>
                  <b>${pricePerNight}</b>
                </td>
              </tr>
            </tbody>
          </table>

          <button
            type="submit"
            className="bookpanel-box__submit"
            disabled={!dates.checkIn || !dates.checkOut || !numGuests}
          >
            Reserve
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookPanel;
