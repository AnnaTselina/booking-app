import { useReactiveVar } from "@apollo/client";
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userVar } from "../../apollo-client";
import routes from "../../utils/routes";
import Authentication from "../authentication";
import DateRangePicker from "../date-range-pickers";
import { parseDateToString } from "../../utils/helpers/parse-dates";
import "./styles.scss";
import { getTotalNights, getTotalPrice } from "../../utils/helpers/calculate-reservation-data";
import ReservationDetails from "../reservation-details";

interface IBookPanel {
  maxGuests: number;
  pricePerNight: number;
  idRentalUnit: string;
  availability: { start_date: string; end_date: string }[];
}

const BookPanel = (props: IBookPanel) => {
  const { maxGuests, pricePerNight, idRentalUnit, availability } = props;

  const userId = useReactiveVar(userVar);

  const [dates, setDates] = useState<{ checkIn: Date | null; checkOut: Date | null }>({
    checkIn: null,
    checkOut: null,
  });

  const [numGuests, setNumGuests] = useState(1);
  const [authenticationActive, setAuthenticationActive] = useState(false);

  const navigate = useNavigate();

  const totalNights = useMemo(() => getTotalNights(dates), [dates]);

  const totalPrice = useMemo(
    () => getTotalPrice(totalNights, pricePerNight),
    [totalNights, pricePerNight],
  );

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

  const reserve = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (userId) {
      if (dates.checkIn && dates.checkOut && numGuests && totalNights && totalPrice) {
        navigate(
          `${
            routes.RESERVE
          }?rental-unit=${idRentalUnit}&guests=${numGuests}&start=${parseDateToString(
            dates.checkIn,
          )}&end=${parseDateToString(dates.checkOut)}`,
        );
      }
    } else {
      setAuthenticationActive(true);
    }
  };

  return (
    <div className="bookpanel-container">
      <form onSubmit={reserve}>
        <div className="bookpanel-box">
          <DateRangePicker
            setDatesCallback={setDates}
            clearButton
            inputWrapperClass="bookpanel-date-input"
            availability={availability}
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

          <ReservationDetails
            pricePerNight={pricePerNight}
            totalNights={totalNights}
            totalPrice={totalPrice}
          />

          <button
            type="submit"
            className="bookpanel-box__submit"
            disabled={!dates.checkIn || !dates.checkOut || !numGuests}
            onClick={reserve}
          >
            Reserve
          </button>
        </div>
      </form>
      {authenticationActive && (
        <Authentication
          closeAuthenticationCallback={() => {
            setAuthenticationActive(false);
          }}
        />
      )}
    </div>
  );
};

export default BookPanel;
