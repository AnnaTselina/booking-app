import { useLazyQuery, useMutation } from "@apollo/client";
import { NavLink } from "react-router-dom";
import ReservationInfo from "../../components/reservation-info";
import {
  CHECK_RENTAL_UNIT_AVAILABILITY,
  RESERVE_RENTAL_UNIT_MUTATION,
} from "../../queries-graphql";
import routes from "../../utils/routes";
import "./styles.scss";
import getReserveConfirmationData from "./utils/data";

const errorMap: { [key: number]: { path: string; text: string } } = {
  1: {
    path: `${routes.APARTMENT}/id`,
    text: "apartment",
  },
  2: {
    path: `${routes.SEARCH}`,
    text: "search",
  },
  3: {
    path: `${routes.HOME}`,
    text: "home",
  },
};

const ReserveConfirmationContainer = () => {
  const { loading, error, data } = getReserveConfirmationData();

  const [reserveRentalUnit, { loading: reserveLoading, data: reserveData, error: reserveError }] =
    useMutation(RESERVE_RENTAL_UNIT_MUTATION);

  const [checkRentalUnitAvailability, { data: availabilityData }] = useLazyQuery(
    CHECK_RENTAL_UNIT_AVAILABILITY,
    {
      variables: {
        rentalUnitId: data.rentalUnitId,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
      },
    },
  );

  const reserve = () => {
    checkRentalUnitAvailability({
      onCompleted: (availability) => {
        if (availability.checkIfRentalUnitAvailable) {
          reserveRentalUnit({
            variables: {
              idRentalUnit: data.rentalUnitId,
              numGuests: data.guests,
              totalPrice: data.totalPrice,
              startDate: data.checkIn,
              endDate: data.checkOut,
            },
          });
        }
      },
    });
  };

  if (loading || reserveLoading) {
    return (
      <div className="search-loading">
        <span className="icon-loading big" />
      </div>
    );
  }

  if (error && error.code) {
    return (
      <div className="content-centered">
        <p>{error.message}</p>
        <p>
          Go to{" "}
          <NavLink to={errorMap[error.code].path} className="underlined">
            {errorMap[error.code].text}
          </NavLink>{" "}
          page.
        </p>
      </div>
    );
  }

  if (reserveError) {
    return (
      <div className="content-centered">
        <p>An error occcured trying to reserve apartment. Please, try again later.</p>
        <p>
          Go to{" "}
          <NavLink to={errorMap[3].path} className="underlined">
            {errorMap[3].text}
          </NavLink>{" "}
          page.
        </p>
      </div>
    );
  }

  return (
    <div>
      {data && !reserveLoading && !reserveData && !reserveError && (
        <div className="reserve-confirmation">
          <ReservationInfo
            {...data}
            reserve={reserve}
            available={availabilityData ? availabilityData.checkIfRentalUnitAvailable : true}
          />
        </div>
      )}
      {reserveData?.reserveRentalUnit && (
        <div className="content-centered">
          <p>{`Successfully reserved! Reservation id: ${reserveData.reserveRentalUnit.id}`}</p>
          <p>
            Go to{" "}
            <NavLink to={errorMap[3].path} className="underlined">
              {errorMap[3].text}
            </NavLink>{" "}
            page.
          </p>
        </div>
      )}
    </div>
  );
};

export default ReserveConfirmationContainer;
