import { useLazyQuery } from "@apollo/client";
import { useEffect, useMemo, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { useLocation } from "react-router-dom";
import { GET_RENTAL_UNIT } from "../../queries-graphql";
import { IRentalUnit } from "../../utils/types";
import "./styles.scss";

/* eslint-disable import/no-unresolved */
import "swiper/css";
import "swiper/css/navigation";

import { SERVER_ROUTE } from "../../utils/constants";
import BookPanel from "../book-panel";

SwiperCore.use([Navigation, Pagination]);

const Apartment = () => {
  const apartmentId = useRef<null | string>(null);

  const location = useLocation();

  const [getRentalUnit, { loading, data }] = useLazyQuery(GET_RENTAL_UNIT);

  useEffect(() => {
    if (location) {
      const id = location.pathname.split("/").pop() || "";

      if (id !== apartmentId.current) {
        apartmentId.current = id;
        getRentalUnit({ variables: { id } });
      }
    }
  }, [location]);

  const rentalUnit = useMemo((): IRentalUnit | null => {
    if (data?.getRentalUnit) {
      return data.getRentalUnit;
    }

    return null;
  }, [data]);

  const availability = useMemo(() => {
    if (data?.getRentalUnitAvailability) {
      return data.getRentalUnitAvailability;
    }

    return null;
  }, [data]);

  return (
    <div className={`apartment ${loading ? "centered" : ""}`}>
      {loading ? (
        <div className="search-loading">
          <span className="icon-loading big" />
        </div>
      ) : (
        <div className="apartment-container">
          {rentalUnit ? (
            <div className="apartment-content">
              <div className="apartment__image-slider">
                {rentalUnit.images && !!rentalUnit.images.length && (
                  <Swiper className="mySwiper" navigation modules={[Navigation]}>
                    {rentalUnit.images.map((image) => (
                      <SwiperSlide key={`${image.image_path}`}>
                        <img src={`${SERVER_ROUTE}${image.image_path}`} alt={rentalUnit.title} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </div>
              <div className="apartment__info">
                <div>
                  <h1>{rentalUnit.title}</h1>
                  <h4 className="apartment__info-type">{rentalUnit.type_of_place.name}</h4>
                  <p>{`${rentalUnit.address.city}, ${rentalUnit.address.country.name}`}</p>
                  <h3>{rentalUnit.description}</h3>
                  <div className="apartment__info-numbers">
                    <div className="apartment__info-numbers-item">
                      <div>Maximum guests:</div>
                      <div>{rentalUnit.max_guests}</div>
                    </div>
                    <div className="apartment__info-numbers-item">
                      <div>Bedrooms:</div>
                      <div>{rentalUnit.num_bedrooms}</div>
                    </div>
                    <div className="apartment__info-numbers-item">
                      <div>Beds:</div>
                      <div>{rentalUnit.num_beds}</div>
                    </div>
                    <div className="apartment__info-numbers-item">
                      <div>Bathrooms:</div>
                      <div>{rentalUnit.num_bathrooms}</div>
                    </div>
                  </div>
                  <div className="apartment__info-amenities">
                    <h2>Amenities:</h2>
                    {rentalUnit.amenities && !!rentalUnit.amenities.length ? (
                      <ul className="apartment__info-amenities-list">
                        {rentalUnit.amenities.map((amenity) => (
                          <li
                            key={`${amenity.amenity.id}`}
                            className="apartment__info-amenities-item"
                          >
                            {amenity.amenity.name}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      "-"
                    )}
                  </div>
                </div>
                {apartmentId.current && (
                  <BookPanel
                    maxGuests={rentalUnit.max_guests}
                    pricePerNight={rentalUnit.price}
                    idRentalUnit={apartmentId.current}
                    availability={availability}
                  />
                )}
              </div>
            </div>
          ) : (
            <div className="apartment__no-results">Sorry, there is no such apartment.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Apartment;
