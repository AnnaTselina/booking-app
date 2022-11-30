import { useMutation, useQuery } from "@apollo/client";
import { NavLink } from "react-router-dom";
import { userVar } from "../../apollo-client";
import { GET_USER, LOGOUT_MUTATION } from "../../queries-graphql";
import routes from "../../utils/routes";
import "./styles.scss";

const UserTooltip = () => {
  const { data } = useQuery(GET_USER);

  const [logout] = useMutation(LOGOUT_MUTATION, {
    update(_, result) {
      if (result.data.logout) {
        userVar(null);
      }
    },
  });

  return (
    <div className="account-tooltip-content">
      <div className="arrow" />
      <p className="medium">{data.getUser.email}</p>

      <ul className="tooltip__action">
        <li className="tooltip__action-item">
          {data.getUser.is_host && (
            <NavLink to={routes.HOST_BOOKINGS} className="medium">
              Bookings
            </NavLink>
          )}
        </li>

        <li>
          <button
            type="button"
            className="link not-underlined"
            onClick={() => {
              logout();
            }}
          >
            Log out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserTooltip;
