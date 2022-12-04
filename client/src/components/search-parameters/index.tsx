import { useState } from "react";
import Modal from "../modal";
import SearchBar from "../search-bar";
import "./styles.scss";

const SearchParameters = () => {
  const [filtersOpened, setFiltersOpened] = useState(false);

  return (
    <div className="search-parameters">
      <div className="search-parameters__filters">
        <button
          type="button"
          onClick={() => {
            setFiltersOpened(true);
          }}
        >
          <span className="icon-hamburger icon-before" />
          Filters
        </button>
      </div>

      <Modal
        isOpen={filtersOpened}
        handleClose={() => {
          setFiltersOpened(false);
        }}
        heading="Search filters"
        style={{ maxWidth: "800px", height: "80%" }}
      >
        <div>Filters</div>
      </Modal>

      <SearchBar className="centered" />
    </div>
  );
};

export default SearchParameters;
