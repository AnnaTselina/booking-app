import { ICardProps } from "../../types";

const heading = "Most importantly, describe your place and enter price";

const TitleAndPriceCard = (props: ICardProps) => {
  const { nextStepCallback, previousStepCallback, setPayload, payload } = props;

  return (
    <div className="add-rental-unit__content-box-form">
      <h3 className="form-heading">{heading}</h3>

      <div className="add-rental-unit__title">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          minLength={30}
          maxLength={60}
          onChange={(e) => {
            setPayload((state) => ({
              ...state,
              title: {
                value: e.target.value,
                set: e.target.value.length >= 20,
              },
            }));
          }}
          value={payload.title.value}
        />
        <p className="add-rental-unit__title-help-text">
          Please, think of general description which should be 20-60 symbols long.
        </p>
      </div>

      <div className="add-rental-unit__description">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows={7}
          maxLength={300}
          onChange={(e) => {
            setPayload((state) => ({
              ...state,
              description: {
                value: e.target.value,
                set: e.target.value.length >= 150,
              },
            }));
          }}
          value={payload.description.value}
        />
        <p className="add-rental-unit__description-help-text">
          Please, describe common features of your place which might be interesting for potential
          guest, should be 150-300 symbols long.
        </p>
      </div>

      <div className="add-rental-unit__price">
        <label htmlFor="price">Price per night ($)</label>
        <input
          type="number"
          id="price"
          onChange={(e) => {
            setPayload((state) => ({
              ...state,
              price: {
                value: Number(e.target.value),
                set: !!e.target.value.length && !!Number(e.target.value),
              },
            }));
          }}
          value={payload.price.value}
          min={0}
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
          type="button"
          onClick={() => {
            nextStepCallback();
          }}
          disabled={!(payload.title.set && payload.description.set && payload.price.set)}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default TitleAndPriceCard;
