import { IRentalUnit } from "../../utils/types";
import SearchCard from "../search-card";
import "./styles.scss";

interface ISearchResults {
  loading: boolean;
  results: IRentalUnit[] | null;
}

const SearchResults = (props: ISearchResults) => {
  const { loading, results } = props;

  return (
    <div className={`search-results ${loading ? "centered" : ""}`}>
      {loading && (
        <div className="search-loading">
          <span className="icon-loading big" />
        </div>
      )}

      {results && (
        <>
          <div className="search-results-cards">
            {results.map((rentalUnit: IRentalUnit) => (
              <SearchCard rentalUnit={rentalUnit} key={rentalUnit.id} />
            ))}
          </div>
          <div />
        </>
      )}
    </div>
  );
};

export default SearchResults;
