import { useMutation, useReactiveVar } from "@apollo/client";
import React, { useMemo, useState } from "react";
import { userVar } from "../../apollo-client";
import { RESERVE_RENTAL_UNIT_MUTATION } from "../../queries-graphql";
import Authentication from "../authentication";
import DateRangePicker from "../date-range-pickers";
import "./styles.scss";

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

  const [reserveRentalUnit] = useMutation(RESERVE_RENTAL_UNIT_MUTATION);

  const totalNights = useMemo(() => {
    if (dates.checkIn && dates.checkOut) {
      const difference = dates.checkOut.getTime() - dates.checkIn.getTime();
      const totalDays = Math.ceil(difference / (1000 * 3600 * 24));
      return totalDays;
    }
    return 0;
  }, [dates]);

  const totalPrice = useMemo(() => {
    if (totalNights && pricePerNight) {
      return totalNights * pricePerNight;
    }

    return 0;
  }, [totalNights, pricePerNight]);

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
        reserveRentalUnit({
          variables: {
            idRentalUnit,
            numGuests,
            totalPrice,
            startDate: dates.checkIn,
            endDate: dates.checkOut,
          },
        });
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
              <tr className={totalNights ? "" : "passive"}>
                <td>
                  <b>Total nights:</b>
                </td>
                <td>
                  <b>{totalNights}</b>
                </td>
              </tr>

              <tr className={totalNights ? "" : "passive"}>
                <td>
                  <b>Total price:</b>
                </td>
                <td>
                  <b>${totalPrice}</b>
                </td>
              </tr>
            </tbody>
          </table>

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
