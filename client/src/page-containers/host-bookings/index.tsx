import { useQuery } from "@apollo/client";
import { GET_HOST_BOOKINGS } from "../../queries-graphql";

const HostBookings = () => {
  // eslint-disable-next-line no-unused-vars
  const { data } = useQuery(GET_HOST_BOOKINGS);

  return <div>host bookings</div>;
};

export default HostBookings;
