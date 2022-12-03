import React, { useEffect, useState } from "react";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import routes from "../../utils/routes";
import DateRangePicker from "../date-range-pickers";
import { parseDateToString, parseStringToDate } from "../../utils/helpers/parse-dates";
import useParseSearchParams from "../../utils/helpers/parse-search-params";

interface SearchBarProps {
  className?: string;
}

const SearchBar = (props: SearchBarProps) => {
  const { className } = props;
  const [checkIn, setCheckIn] = useState<null | Date>(null);
  const [checkOut, setCheckOut] = useState<null | Date>(null);

  const [destination, setDestination] = useState("");

  const navigate = useNavigate();

  const searchParams = useParseSearchParams();

  useEffect(() => {
    if (searchParams) {
      const initialSearchParams = {
        destination: searchParams.get("destination"),
        checkIn: searchParams.get("checkin"),
        checkOut: searchParams.get("checkout"),
      };
      if (initialSearchParams.destination) {
        setDestination(initialSearchParams.destination);
      }
      if (initialSearchParams.checkIn) {
        setCheckIn(parseStringToDate(initialSearchParams.checkIn));
      }
      if (initialSearchParams.checkOut) {
        setCheckOut(parseStringToDate(initialSearchParams.checkOut));
      }
    }
  }, [searchParams]);

  const handleSearch = (e: React.SyntheticEvent) => {
    e.preventDefault();
    let route = `${routes.SEARCH}?`;
    if (destination) {
      route += `destination=${destination || ""}`;
    }

    if (checkIn && checkOut) {
      route += `${destination ? "&" : ""}checkin=${parseDateToString(
        checkIn,
      )}&checkout=${parseDateToString(checkOut)}`;
    }

    navigate(route);
  };

  return (
    <form className={`search-bar ${className}`} onSubmit={handleSearch}>
      <div className="search-bar-item">
        <span className="icon-pin-circle input-icon" />
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => {
            setDestination(e.target.value);
          }}
        />
      </div>

      <DateRangePicker
        checkIn={checkIn}
        setCheckIn={setCheckIn}
        checkOut={checkOut}
        setCheckOut={setCheckOut}
      />

      <div className="search-bar-item">
        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </div>
    </form>
  );
};

SearchBar.defaultProps = {
  className: "",
};

export default SearchBar;
