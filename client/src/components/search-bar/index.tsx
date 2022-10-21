import React, { useState } from "react";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import routes from "../../utils/routes";
import DateRangePicker from "../date-range-pickers";

interface SearchBarProps {
  className?: string;
}

const SearchBar = (props: SearchBarProps) => {
  const { className } = props;
  const [dates, setDates] = useState<{ checkIn: Date | null; checkOut: Date | null }>({
    checkIn: null,
    checkOut: null,
  });

  const [destination, setDestination] = useState("");

  const navigate = useNavigate();

  const handleSearch = (e: React.SyntheticEvent) => {
    e.preventDefault();
    let route = `${routes.SEARCH}?`;
    if (destination) {
      route += `destination=${destination || ""}`;
    }

    if (dates.checkIn && dates.checkOut) {
      route += `${destination ? "&" : ""}checkin=${`${dates.checkIn.getFullYear()}-${
        dates.checkIn.getMonth() + 1
      }-${dates.checkIn.getDate()}`}&checkout=${`${dates.checkOut.getFullYear()}-${
        dates.checkOut.getMonth() + 1
      }-${dates.checkOut.getDate()}`}`;
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
          onChange={(e) => {
            setDestination(e.target.value);
          }}
        />
      </div>

      <DateRangePicker inputWrapperClass="search-bar-item" setDatesCallback={setDates} />

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
