import styles from "./SearchFilterDropdown.module.css";
import { FlightFilter, filterNameMap } from "../types";

type SearchFilterDropdownProps = {
  filters: Record<keyof FlightFilter, boolean>;
  onFilterChange: (filterName: keyof FlightFilter) => void;
};

function SearchFilterDropdown({
  filters,
  onFilterChange,
}: SearchFilterDropdownProps) {
  return (
    <div className={styles.dropdown}>
      {Object.keys(filters).map((filterName) => (
        <label key={filterName}>
          <input
            type="checkbox"
            checked={filters[filterName as keyof FlightFilter]}
            onChange={() => onFilterChange(filterName as keyof FlightFilter)}
          />
          {filterNameMap[filterName as keyof FlightFilter]}
        </label>
      ))}
    </div>
  );
}

export default SearchFilterDropdown;
