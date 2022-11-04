import { useQuery } from "@apollo/client";
import { GET_AMENITIES } from "../../../../queries-graphql";
import { IAmenity } from "../../../../utils/types";
import { ICardProps } from "../../types";

const heading = "Choose amenities in your apartment";

const AmenitiesCard = (props: ICardProps) => {
  const { nextStepCallback, previousStepCallback, setPayload, payload } = props;

  const { data } = useQuery(GET_AMENITIES);

  const toggleAmenity = (id: string) => {
    setPayload((state) => {
      const currentAmenitiesList = [...state.amenities_ids.value];
      if (currentAmenitiesList.length === 1 && currentAmenitiesList[0] === "") {
        currentAmenitiesList[0] = id;
      } else {
        const amenityInListIndex = currentAmenitiesList.indexOf(id);
        if (amenityInListIndex === -1) {
          currentAmenitiesList.push(id);
        } else if (currentAmenitiesList.length === 1) {
          currentAmenitiesList.splice(amenityInListIndex, 1, "");
        } else {
          currentAmenitiesList.splice(amenityInListIndex, 1);
        }
      }

      return {
        ...state,
        amenities_ids: { value: currentAmenitiesList, set: true },
      };
    });
  };

  return (
    <div className="add-rental-unit__content-box-form">
      <h3 className="form-heading">{heading}</h3>

      {data?.getAmenities && (
        <div className="add-rental-unit__amenities">
          {data.getAmenities.map((amenity: IAmenity) => (
            <div className="add-rental-unit__amenities-item" key={amenity.id}>
              <input
                type="checkbox"
                name="amenity"
                id={amenity.id}
                onChange={() => {
                  toggleAmenity(amenity.id);
                }}
                checked={payload.amenities_ids.value.includes(amenity.id)}
              />
              <label htmlFor={amenity.id}>{amenity.name}</label>
            </div>
          ))}
        </div>
      )}

      <div className="form-button">
        <button
          type="button"
          onClick={() => {
            previousStepCallback();
          }}
        >
          back
        </button>
        <button
          type="button"
          onClick={() => {
            nextStepCallback();
          }}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default AmenitiesCard;
