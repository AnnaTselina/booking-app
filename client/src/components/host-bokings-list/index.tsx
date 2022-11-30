import { useQuery } from "@apollo/client";
import { GET_HOST_BOOKINGS } from "../../queries-graphql";
import { SERVER_ROUTE } from "../../utils/constants";
import { parseDateToStringWithMonthName } from "../../utils/helpers/parse-dates";
import { IBooking } from "../../utils/types";
import "./styles.scss";

const HostBookingsList = () => {
  const { data } = useQuery(GET_HOST_BOOKINGS);

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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HostBookingsList;
