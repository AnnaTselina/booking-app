import { useMutation, useQuery } from "@apollo/client";
import { NavLink } from "react-router-dom";
import { userVar } from "../../apollo-client";
import { GET_HOST_BOOKINGS, GET_USER, LOGOUT_MUTATION } from "../../queries-graphql";
import { BOOKING_STATUSES } from "../../utils/constants";
import routes from "../../utils/routes";
import "./styles.scss";

const UserTooltip = () => {
  const { data: userData } = useQuery(GET_USER);
  const { data: bookingsData } = useQuery(GET_HOST_BOOKINGS, {
    variables: { status: BOOKING_STATUSES.request },
  });

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
      <p className="medium">{userData.getUser.email}</p>

      <ul className="tooltip__action">
        <li className="tooltip__action-item">
          {userData.getUser.is_host && (
            <NavLink to={routes.HOST_BOOKINGS} className="medium">
              Bookings{" "}
              <span className="accent">{`${
                bookingsData?.getHostBookings.length
                  ? `(${bookingsData.getHostBookings.length})`
                  : ""
              }`}</span>
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
