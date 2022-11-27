import "./styles.scss";

const ReservationDetails = ({
  pricePerNight,
  totalNights,
  totalPrice,
  variant,
}: {
  pricePerNight: number;
  totalNights: number;
  totalPrice: number;
  variant?: "normal" | "big";
}) => (
  <table className={`reservation-details ${variant}`}>
    <tbody>
      <tr>
        <td>
          <b>Price per night:</b>
        </td>
        <td>
          <b>${pricePerNight}</b>
        </td>
      </tr>
      <tr className={totalNights ? "" : "passive"}>
        <td>
          <b>Total nights:</b>
        </td>
        <td>
          <b>{totalNights}</b>
        </td>
      </tr>

      <tr className={totalNights ? "" : "passive"}>
        <td>
          <b>Total price:</b>
        </td>
        <td>
          <b>${totalPrice}</b>
        </td>
      </tr>
    </tbody>
  </table>
);

ReservationDetails.defaultProps = {
  variant: "normal",
};

export default ReservationDetails;
