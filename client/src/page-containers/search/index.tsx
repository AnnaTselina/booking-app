import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import SearchBar from "../../components/search-bar";
import SearchResults from "../../components/search-results";
import { GET_RENTAL_UNITS } from "../../queries-graphql";
import useParseSearchParams from "../../utils/helpers/parse-search-params";

const SearchPageContainer = () => {
  const [getRentalUnits, { loading, data }] = useLazyQuery(GET_RENTAL_UNITS);

  const searchParams = useParseSearchParams();

  useEffect(() => {
    const variables: { [key: string]: string } = {};

    if (searchParams) {
      const destination = searchParams.get("destination");
      const checkIn = searchParams.get("checkin");
      const checkOut = searchParams.get("checkout");

      if (destination) {
        variables.destination = destination;
      }

      if (checkIn && checkOut) {
        variables.checkin = checkIn;
        variables.checkout = checkOut;
      }
    }

    getRentalUnits({
      variables,
    });
  }, [searchParams]);

  return (
    <>
      <SearchBar className="centered" />
      <SearchResults loading={loading} results={data?.getRentalUnits} />
    </>
  );
};

export default SearchPageContainer;
