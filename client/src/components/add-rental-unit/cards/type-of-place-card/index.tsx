import { useQuery } from "@apollo/client";
import React from "react";
import { GET_TYPES_OF_PLACES_QUERY } from "../../../../queries-graphql";
import { ITypeOfPlace } from "../../../../utils/types";
import { ICardProps } from "../../types";

const cardHeading = "What type of place is it?";

const TypeOfPlaceCard = (props: ICardProps) => {
  const { nextStepCallback, previousStepCallback, setPayload, payload } = props;

  const { data } = useQuery(GET_TYPES_OF_PLACES_QUERY);

  return (
    <div className="add-rental-unit__content-box-form">
      {data?.getTypesOfPlaces && (
        <>
          <h3 className="form-heading">{cardHeading}</h3>
          <form className="add-rental-unit-form">
            {data.getTypesOfPlaces.map((type: ITypeOfPlace) => (
              <div className="add-rental-unit-form__radio-input" key={type.id}>
                <input
                  type="radio"
                  id={type.id}
                  name="type-of-place"
                  onChange={() => {
                    setPayload((state) => ({
                      ...state,
                      type_of_place_id: { value: type.id, set: true },
                    }));
                  }}
                  checked={type.id === payload.type_of_place_id.value}
                />
                <label htmlFor={type.id}> {type.name}</label>
              </div>
            ))}
          </form>
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
              type="submit"
              onClick={() => {
                nextStepCallback();
              }}
              disabled={!payload.type_of_place_id.set}
            >
              next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TypeOfPlaceCard;
