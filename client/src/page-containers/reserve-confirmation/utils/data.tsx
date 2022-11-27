import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_RENTAL_UNIT } from "../../../queries-graphql";
import { getTotalNights, getTotalPrice } from "../../../utils/helpers/calculate-reservation-data";
import useParseSearchParams from "../../../utils/helpers/parse-search-params";
import { IRentalUnit } from "../../../utils/types";

interface IReserveConfirmationData {
  rentalUnitId: string;
  guests: number;
  checkIn: Date;
  checkOut: Date;
  rentalUnitData: IRentalUnit;
  totalNights: number;
  totalPrice: number;
}

const RESERVATION_PARAMS_ERROR =
  "Not all reservation parameters are valid. Please, try to reserve again.";

const GETTING_APARTMENT_ERROR = "An error occured getting apartment.";

const useGetReserveConfirmationData = () => {
  const [result, setResult] = useState<{
    loading: boolean;
    data: IReserveConfirmationData;
    error: {
      code: number;
      message: string;
    };
  }>({
    loading: true,
    data: Object.create({}),
    error: Object.create({}),
  });

  const searchParams = useParseSearchParams();
  const [getRentalUnit] = useLazyQuery(GET_RENTAL_UNIT);

  useEffect(() => {
    if (searchParams) {
      // check if params from url are valid
      const parsedSearchParams = {
        rentalUnitId: searchParams.get("rental-unit")!,
        guests: Number(searchParams.get("guests")),
        start: searchParams.get("start"),
        end: searchParams.get("end"),
      };

      const valid = Object.values(parsedSearchParams).every((x) => !!x);
      if (!valid) {
        setResult((curRes) => ({
          ...curRes,
          error: {
            code: 1,
            message: RESERVATION_PARAMS_ERROR,
          },
          loading: false,
        }));
      } else {
        // get apartment and check if valid
        getRentalUnit({
          variables: { id: parsedSearchParams.rentalUnitId },
          onError: () => {
            setResult({
              data: Object.create({}),
              error: {
                code: 2,
                message: GETTING_APARTMENT_ERROR,
              },
              loading: false,
            });
          },
          onCompleted: (apartmentData) => {
            if (apartmentData.getRentalUnit) {
              const checkIn = new Date(parsedSearchParams.start!);
              const checkOut = new Date(parsedSearchParams.end!);
              const totalNights = getTotalNights({ checkIn, checkOut });

              setResult({
                data: {
                  rentalUnitId: parsedSearchParams.rentalUnitId,
                  guests: parsedSearchParams.guests,
                  checkIn,
                  checkOut,
                  rentalUnitData: apartmentData.getRentalUnit,
                  totalNights,
                  totalPrice: getTotalPrice(totalNights, apartmentData.getRentalUnit.price),
                },
                loading: false,
                error: Object.create({}),
              });
            } else {
              setResult({
                data: Object.create({}),
                error: {
                  code: 2,
                  message: GETTING_APARTMENT_ERROR,
                },
                loading: false,
              });
            }
          },
        });
      }
    }
  }, [searchParams]);

  return result;
};
export default useGetReserveConfirmationData;
