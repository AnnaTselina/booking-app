import { NavLink } from "react-router-dom";
import { SERVER_ROUTE } from "../../utils/constants";
import routes from "../../utils/routes";
import { IRentalUnit } from "../../utils/types";
import "./styles.scss";

const SearchCard = (props: { rentalUnit: IRentalUnit }) => {
  const { rentalUnit } = props;

  return (
    <NavLink to={`${routes.APARTMENT}/${rentalUnit.id}`}>
      <div className="search-card">
        {!!rentalUnit.images?.length && (
          <div className="search-card__image">
            <img src={`${SERVER_ROUTE}${rentalUnit.images[0].image_path}`} alt={rentalUnit.title} />
          </div>
        )}
        <div className="search-card__info">
          <div className="search-card__info-top">
            <h3 className="search-card__heading">{rentalUnit.title}</h3>
            <p>{rentalUnit.type_of_place.name}</p>
            <p>{`${rentalUnit.address.city}, ${rentalUnit.address.country.name}`}</p>
            <p>
              <b className="bold">${rentalUnit.price}</b> per night
            </p>
          </div>
          <div className="search-card__info-bottom">
            {rentalUnit.total_rating !== null && (
              <p>
                {rentalUnit.total_rating}
                <span className="icon-star-full" />
              </p>
            )}
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default SearchCard;
