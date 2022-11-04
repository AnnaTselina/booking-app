import { useQuery } from "@apollo/client";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { GET_USER } from "../../queries-graphql";
import routes from "../../utils/routes";
import UserTooltip from "../user-tooltip";
import "./styles.scss";

const SignedInPanel = () => {
  const { data } = useQuery(GET_USER);

  const [tooltipOpened, setTooltipOpened] = useState(false);

  return (
    <div className="account-tooltip">
      {data?.getUser && !data.getUser.is_host && (
        <NavLink type="button" className="button" to={routes.ADD_RENTAL_UNIT}>
          Become a host
        </NavLink>
      )}

      <button
        type="button"
        className="account-tooltip-open-button"
        onClick={() => {
          setTooltipOpened((state) => !state);
        }}
      >
        <span className="icon-person" />
      </button>

      {tooltipOpened && <UserTooltip />}
    </div>
  );
};

export default SignedInPanel;
