import styles from "../../../styles/airlinePage/airlineSerchComponents/SearchFilterDropdown.module.css";
import { FlightFilter, filterNameMap } from "../types";

type SearchFilterDropdownProps = {
  filters: Record<keyof FlightFilter, boolean>;
  onFilterChange: (filterName: keyof FlightFilter) => void;
  onFilterClose: () => void;
};

function SearchFilterDropdown({
  filters,
  onFilterChange,
  onFilterClose,
}: SearchFilterDropdownProps) {
  return (
    <>
      <div className={styles.dropdown}>
        {Object.keys(filters).map((filterName) => (
          <label key={filterName}>
            <input
              type="checkbox"
              checked={filters[filterName as keyof FlightFilter]}
              onChange={() => onFilterChange(filterName as keyof FlightFilter)}
            />
            <span>{filterNameMap[filterName as keyof FlightFilter]}</span>
          </label>
        ))}
      </div>
      <button className={styles["button-close"]} onClick={onFilterClose}>
        닫기
      </button>
    </>
  );
}

export default SearchFilterDropdown;
