import React from "react";
import { NavLink } from "react-router-dom";
import { IRentalUnit } from "../../utils/types";
import { SERVER_ROUTE } from "../../utils/constants";
import ReservationDetails from "../reservation-details";
import routes from "../../utils/routes";

interface IReservationInfoProps {
  rentalUnitData: IRentalUnit;
  checkIn: Date;
  checkOut: Date;
  totalNights: number;
  totalPrice: number;
  reserve: () => void;
}

const ReservationInfo = (props: IReservationInfoProps) => {
  const { rentalUnitData, checkIn, checkOut, totalNights, totalPrice, reserve } = props;

  return (
    <form>
      <div className="reserve-confirmation__description">
        <h1>Please, confirm your reservation:</h1>
        <p>{`${checkIn.getDate()}/${
          checkIn.getMonth() + 1
        }/${checkIn.getFullYear()} - ${checkOut.getDate()}/${
          checkOut.getMonth() + 1
        }/${checkOut.getFullYear()}`}</p>
        <ReservationDetails
          pricePerNight={rentalUnitData.price}
          totalNights={totalNights}
          totalPrice={totalPrice}
          variant="big"
        />

        <button
          type="submit"
          className="reserve-confirmation__description-confirm"
          onClick={(e: React.SyntheticEvent) => {
            e.preventDefault();
            reserve();
          }}
        >
          Confirm reservation
        </button>
      </div>

      <div className="reserve-confirmation__image">
        <NavLink to={`${routes.APARTMENT}/${rentalUnitData.id}`}>
          {rentalUnitData.images && (
            <img
              src={`${SERVER_ROUTE}${rentalUnitData.images[0].image_path}`}
              alt={rentalUnitData.title}
            />
          )}
          <div className="reserve-confirmation__image-desc">
            <h2>{rentalUnitData.title}</h2>
            {rentalUnitData.total_rating !== null && (
              <p className="rating">
                {rentalUnitData.total_rating}
                <span className="icon-star-full" />
              </p>
            )}
          </div>

          <h4 className="apartment__info-type">{rentalUnitData.type_of_place.name}</h4>
          <p>{`${rentalUnitData.address.city}, ${rentalUnitData.address.country.name}`}</p>
        </NavLink>
      </div>
    </form>
  );
};

export default ReservationInfo;
