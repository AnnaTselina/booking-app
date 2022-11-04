import { ICardProps } from "../../types";

const startingHeading = "You are about to become a host.";
const startingParagraph = "Please tell us about your rental unit.";

const StartingCard = (props: ICardProps) => {
  const { nextStepCallback } = props;

  return (
    <div className="add-rental-unit__content-box-form">
      <h3 className="form-heading">{startingHeading}</h3>
      <p className="form-paragraph">{startingParagraph}</p>
      <div className="form-button">
        <button
          type="button"
          onClick={() => {
            nextStepCallback();
          }}
        >
          start
        </button>
      </div>
    </div>
  );
};

export default StartingCard;
