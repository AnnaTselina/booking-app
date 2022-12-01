import { useMutation, useQuery } from "@apollo/client";
import { ACCEPT_BOOKING_MUTATION, GET_HOST_BOOKINGS } from "../../queries-graphql";
import { BOOKING_STATUSES, SERVER_ROUTE } from "../../utils/constants";
import { parseDateToStringWithMonthName } from "../../utils/helpers/parse-dates";
import { IBooking } from "../../utils/types";
import "./styles.scss";

const HostBookingsList = () => {
  const { data } = useQuery(GET_HOST_BOOKINGS);
  const [acceptBooking, { loading, error }] = useMutation(ACCEPT_BOOKING_MUTATION);

  const handleAccept = (bookingId: string) => {
    acceptBooking({
      variables: {
        id: bookingId,
      },
    });
  };

  return (
    <div className="host-booking-list__container">
      {!!data?.getHostBookings?.length && (
        <div className="host-booking-list">
          {data.getHostBookings.map((booking: IBooking) => (
            <div className="host-booking-list__card">
              <div className="host-booking-list__card-image">
                <img
                  src={`${SERVER_ROUTE}${booking.rental_unit.images[0].image_path}`}
                  alt={booking.rental_unit.title}
                />
              </div>
              <div className="host-booking-list__card-description">
                <h3>{booking.rental_unit.title}</h3>
                <table>
                  <tbody>
                    <tr>
                      <td>Requested by:</td>
                      <td>{booking.guest.user.email}</td>
                    </tr>
                    <tr>
                      <td>Status:</td>
                      <td>{booking.status}</td>
                    </tr>
                    <tr>
                      <td>Dates:</td>
                      <td>{`${parseDateToStringWithMonthName(
                        booking.start_date,
                      )} - ${parseDateToStringWithMonthName(booking.end_date)}`}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="host-booking-list__card-actions">
                {booking.status === BOOKING_STATUSES.request && (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        handleAccept(booking.id);
                      }}
                    >
                      {loading ? <span className="icon-loading" /> : "ACCEPT"}
                    </button>

                    <p className="error small">{error ? error.message : ""}</p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HostBookingsList;
