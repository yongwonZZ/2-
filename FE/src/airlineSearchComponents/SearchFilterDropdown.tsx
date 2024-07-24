import styles from "./SearchFilterDropdown.module.css";

function SearchFilterDropdown() {
  return (
    <div className={styles.dropdown}>
      <label>
        <input type="checkbox" /> 편명
      </label>
      <label>
        <input type="checkbox" checked /> 항공사
      </label>
      <label>
        <input type="checkbox" /> 공항
      </label>
      <label>
        <input type="checkbox" /> 수하물수취대
      </label>
      <label>
        <input type="checkbox" /> 출구
      </label>
      <label>
        <input type="checkbox" /> 게이트
      </label>
    </div>
  );
}

export default SearchFilterDropdown;
