import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../publicComponents/Header";
import FlightFilterOptions from "../airlineSearchComponents/FlightFilterOptions";
import AirlineSearchResult from "../airlineSearchComponents/AirlineSearchResult";
import SearchFilterDropdown from "../airlineSearchComponents/SearchFilterDropdown";
import styles from "./AirlineSearchPage.module.css";

type FlightFilterStatus = {
  arrivals: boolean;
  departures: boolean;
  t1: boolean;
  t2: boolean;
};

function AirlineSearchPage() {
  const [searchText, setSearchText] = useState<string>("");

  /** 도착, 출발, T1, T2 필터 상태 */
  const [flightFilterStatus, setFlightFilterStatus] =
    useState<FlightFilterStatus>({
      arrivals: true,
      departures: true,
      t1: true,
      t2: true,
    });

  /** Header의 필터 버튼 클릭 시 드롭다운 상태 */
  const [showDropdown, setShowDropdown] = useState(false);

  /** 이전 페이지로 이동하는 함수 */
  const prevNavigator = useNavigate();

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleTextReset = () => setSearchText("");

  /** 도착, 출발, T1, T2 필터 상태변경 함수 */
  const handleSwitchFlightFilter = (identifier: keyof FlightFilterStatus) => {
    setFlightFilterStatus((prevStatus) => {
      return {
        ...prevStatus,
        [identifier]: !prevStatus[identifier],
      };
    });
  };

  /** 필터 드롭다운 상태변경 함수 */
  const handleFilterDropdown = () => setShowDropdown(!showDropdown);

  return (
    <div className={styles.wrapper}>
      <Header>
        <button onClick={() => prevNavigator(-1)}>이전</button>
        <div>
          <input
            type="text"
            value={searchText}
            placeholder="검색어를 입력해 주세요"
            onChange={handleTextChange}
          />
          <button onClick={handleTextReset}>X</button>
        </div>
        <button onClick={handleFilterDropdown}>필터</button>
      </Header>
      {showDropdown && <SearchFilterDropdown />}
      <FlightFilterOptions
        filter={flightFilterStatus}
        onSwitch={handleSwitchFlightFilter}
      />
      <AirlineSearchResult />
    </div>
  );
}

export default AirlineSearchPage;
