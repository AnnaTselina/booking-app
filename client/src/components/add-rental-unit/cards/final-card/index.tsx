import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ADD_RENTAL_UNIT_MUTATION } from "../../../../queries-graphql";
import routes from "../../../../utils/routes";
import { ICardProps } from "../../types";

const heading = "That's it! We have everything to make you a host.";
const errorAddingRentalUnit = "An error happenned trying to add rental unit. Try again later.";

const FinalCard = (props: ICardProps) => {
  const { payload } = props;

  const navigate = useNavigate();

  const [addRentalUnit, { data, loading, error }] = useMutation(ADD_RENTAL_UNIT_MUTATION);

  const submit = () => {
    const transformedPayloadValues: {
      [key: string]: string | number | string[] | File[];
    } = {};

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { address, ...info } = payload;

    Object.entries({ ...info, ...address }).forEach((entry) => {
      transformedPayloadValues[entry[0]] = entry[1].value;
    });

    //  transformedPayloadValues.images = [];

    addRentalUnit({ variables: transformedPayloadValues });
  };

  useEffect(() => {
    if (data && data.addRentalUnit) {
      navigate(routes.HOME);
    }
  }, [data]);

  return (
    <div className="add-rental-unit__content-box-form">
      <h3 className="form-heading centered">{heading}</h3>

      <div className="form-button form-button__with-errors">
        {error && <div className="add-rental-unit__form-error">{errorAddingRentalUnit}</div>}

        <button type="button" onClick={submit}>
          {loading && <span className="icon-loading" />}
          submit
        </button>
      </div>
    </div>
  );
};

export default FinalCard;
