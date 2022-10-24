import { useLazyQuery } from "@apollo/client";
import { useEffect, useMemo, useRef } from "react";
import { useLocation } from "react-router-dom";
import SearchResults from "../../components/search-results";
import { GET_RENTAL_UNITS } from "../../queries-graphql";

const SearchPageContainer = () => {
  const [getRentalUnits, { loading, data }] = useLazyQuery(GET_RENTAL_UNITS);

  const searchString = useRef<null | string>(null);

  const location = useLocation();

  useEffect(() => {
    if (location) {
      const { search } = location;
      if (search !== searchString.current) {
        searchString.current = search;

        const params = new URLSearchParams(search);
        const destination = params.get("destination");
        const checkIn = params.get("checkin");
        const checkOut = params.get("checkout");
        const variables: { [key: string]: string } = {};

        if (destination) {
          variables.destination = destination;
        }

        if (checkIn && checkOut) {
          variables.checkin = checkIn;
          variables.checkout = checkOut;
        }

        getRentalUnits({
          variables,
        });
      }
    }
  }, [location]);

  const searchResults = useMemo(() => {
    if (data?.getRentalUnits) {
      return data.getRentalUnits;
    }
    return null;
  }, [data]);

  return <SearchResults loading={loading} results={searchResults} />;
};

export default SearchPageContainer;
