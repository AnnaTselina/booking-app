import { useMutation } from "@apollo/client";
import { useState } from "react";
import { userVar } from "../../apollo-client";
import { LOGOUT_MUTATION } from "../../queries-graphql";
import "./styles.scss";

interface ISignedInPanel {
  email: string;
}

const SignedInPanel = (props: ISignedInPanel) => {
  const { email } = props;

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
          <p>{email}</p>
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
