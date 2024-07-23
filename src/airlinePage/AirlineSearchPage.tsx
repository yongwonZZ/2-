import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../publicComponents/Header";
import FlightFilterOptions from "../airlineSearchComponents/FlightFilterOptions";
import AirlineSearchResult from "../airlineSearchComponents/AirlineSearchResult";
import SearchFilterDropdown from "../airlineSearchComponents/SearchFilterDropdown";
import styles from "./AirlineSearchPage.module.css";
import { GrPrevious } from "react-icons/gr";
import { LuSettings2 } from "react-icons/lu";
import { MdClear } from "react-icons/md";

import { DummyData, DUMMY_DATA } from "./airlineDummyData"; // 가짜 항공편 데이터

type FlightFilterStatus = {
  arrivals: boolean;
  departures: boolean;
  t1: boolean;
  t2: boolean;
};

function AirlineSearchPage() {
  /** 검색어 */
  const [searchText, setSearchText] = useState<string>("");

  /** fetch해온 데이터 */
  const [searchedData, setSearchedData] = useState<DummyData[] | null>(null);

  /** 데이터 불러오기 */
  useEffect(() => {
    if (!searchText.trim().length) return;

    // 더미 데이터로부터 data를 받아온 것을
    // setState를 이용해 저장해둠
    setSearchedData(DUMMY_DATA);
  }, [searchText]);

  /** 도착, 출발, T1, T2 필터 */
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
  const navigate = useNavigate();

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleTextClear = () => setSearchText("");

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
      <Header
        leftContent={
          <GrPrevious
            className={styles["icon-prev"]}
            onClick={() => navigate(-1)}
          />
        }
        centerContent={
          <div className={styles["search-box"]}>
            <input
              type="text"
              value={searchText}
              placeholder="검색어를 입력해 주세요"
              onChange={handleTextChange}
            />
            {searchText && (
              <MdClear
                className={styles["icon-clear"]}
                onClick={handleTextClear}
              />
            )}
          </div>
        }
        rightContent={
          <LuSettings2
            className={styles["icon-dropdown"]}
            onClick={handleFilterDropdown}
          />
        }
      />
      {showDropdown && <SearchFilterDropdown />}
      <FlightFilterOptions
        filter={flightFilterStatus}
        onSwitch={handleSwitchFlightFilter}
      />
      <AirlineSearchResult searchedData={searchedData} />
    </div>
  );
}

export default AirlineSearchPage;
