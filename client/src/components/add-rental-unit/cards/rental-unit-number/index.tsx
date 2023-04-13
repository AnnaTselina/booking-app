import { ICardProps, ActionType } from "../../types";

const cardHeading = "We would like to know about your place in numbers.";

const RentalUnitInNumbersCard = (props: ICardProps) => {
  const { nextStepCallback, previousStepCallback, dispatch, payload } = props;

  return (
    <div className="add-rental-unit__content-box-form">
      <h3 className="form-heading">{cardHeading}</h3>

      <div className="add-rental-unit-form__number-input">
        <label htmlFor="number_of_guests">1. Maximum number of guests</label>
        <input
          type="number"
          id="number_of_guests"
          min="0"
          onChange={(e) => {
            dispatch({
              type: ActionType.MAX_GUESTS,
              payload: { value: Number(e.target.value), set: true },
            });
          }}
          value={payload.max_guests.set ? payload.max_guests.value : ""}
        />
      </div>

      <div className="add-rental-unit-form__number-input">
        <label htmlFor="number_of_bedrooms">2. Number of bedrooms</label>
        <input
          type="number"
          id="number_of_bedrooms"
          min="0"
          onChange={(e) => {
            dispatch({
              type: ActionType.NUM_BEDROOMS,
              payload: { value: Number(e.target.value), set: true },
            });
          }}
          value={payload.num_bedrooms.set ? payload.num_bedrooms.value : ""}
        />
      </div>

      <div className="add-rental-unit-form__number-input">
        <label htmlFor="number_of_beds">3. Number of beds</label>
        <input
          type="number"
          id="number_of_beds"
          min="0"
          onChange={(e) => {
            dispatch({
              type: ActionType.NUM_BEDS,
              payload: { value: Number(e.target.value), set: true },
            });
          }}
          value={payload.num_beds.set ? payload.num_beds.value : ""}
        />
      </div>

      <div className="add-rental-unit-form__number-input">
        <label htmlFor="number_of_bathrooms">4. Number of bathrooms</label>
        <input
          type="number"
          id="number_of_bathrooms"
          min="0"
          onChange={(e) => {
            dispatch({
              type: ActionType.NUM_BATHROOMS,
              payload: { value: Number(e.target.value), set: true },
            });
          }}
          value={payload.num_bathrooms.set ? payload.num_bathrooms.value : ""}
        />
      </div>

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
          disabled={
            !(
              payload.max_guests.set &&
              payload.num_bedrooms.set &&
              payload.num_beds.set &&
              payload.num_bathrooms.set
            )
          }
        >
          next
        </button>
      </div>
    </div>
  );
};

export default RentalUnitInNumbersCard;
