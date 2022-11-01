import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { userVar } from "../../apollo-client";
import { GET_USER, LOGOUT_MUTATION } from "../../queries-graphql";
import "./styles.scss";

const SignedInPanel = () => {
  const { data } = useQuery(GET_USER);

  const [tooltipOpened, setTooltipOpened] = useState(false);

  const [logout] = useMutation(LOGOUT_MUTATION, {
    update(_, result) {
      if (result.data.logout) {
        userVar(null);
      }
    },
  });

  return (
    <div className="account-tooltip">
      <button
        type="button"
        className="account-tooltip-open-button"
        onClick={() => {
          setTooltipOpened((state) => !state);
        }}
      >
        <span className="icon-person" />
      </button>

      {tooltipOpened && (
        <div className="account-tooltip-content">
          <div className="arrow" />
          <p>{data.getUser.email}</p>
          <button
            type="button"
            className="link"
            onClick={() => {
              logout();
            }}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default SignedInPanel;
