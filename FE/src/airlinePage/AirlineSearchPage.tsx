import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../publicComponents/Header";
import FlightFilterOptions from "../airlineSearchComponents/FlightFilterOptions";
import AirlineSearchResult from "../airlineSearchComponents/AirlineSearchResult";
import SearchFilterDropdown from "../airlineSearchComponents/SearchFilterDropdown";
import AirlineAttribute from "../airlineSearchComponents/AirlineAttribute";
import styles from "./AirlineSearchPage.module.css";
import { FaChevronLeft } from "react-icons/fa";
import { LuSettings2 } from "react-icons/lu";
import { MdClear } from "react-icons/md";
import { useFetchAirlineData } from "../airlineSearchComponents/hooks/useFetchAirlineData";
import { fetchAirlineData } from "../airlineSearchComponents/api/fetchAirlineData";
import { FlightFilter } from "./types"; // FlightFilter 타입 가져오기

function AirlineSearchPage() {
  /** 페이지 이동을 위한 훅 */
  const navigate = useNavigate();

  /** 검색어 상태 */
  const [searchText, setSearchText] = useState<string>("");

  /** 필터 상태 */
  const [flightFilter, setFlightFilter] = useState<FlightFilter>({
    arrivals: true,
    departures: true,
    t1: true,
    t2: true,
    flightId: false,
    airline: true,
    airport: false,
    baggageClaim: false,
    exit: false,
    gate: false,
  });

  /** 드롭다운 메뉴 상태 */
  const [showDropdown, setShowDropdown] = useState(false);

  /** 검색어 변경 핸들러 */
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  /** 검색어 clear 핸들러 */
  const handleTextClear = () => setSearchText("");

  /** 필터 토글 핸들러 */
  const handleSwitchFlightFilter = (identifier: keyof FlightFilter) => {
    setFlightFilter((prevStatus) => {
      return {
        ...prevStatus,
        [identifier]: !prevStatus[identifier],
      };
    });
  };

  /** 드롭다운 토글 핸들러 */
  const handleFilterDropdown = () => setShowDropdown(!showDropdown);

  /** 커스텀 훅 내 비즈니스 로직 => data fetching */
  const { error, isLoading, data } = useFetchAirlineData(fetchAirlineData({}));

  /** 데이터 필터링 로직 */
  const filteredData = data?.filter((item) => {
    const matchesSearchText = searchText
      ? item.airline?.includes(searchText) ||
        item.flightId?.includes(searchText)
      : true;
    const matchesFilter =
      (flightFilter.arrivals && item.terminalid === "A") || // terminalid 필드 사용
      (flightFilter.departures && item.terminalid === "D") || // terminalid 필드 사용
      (flightFilter.t1 && item.terminalid === "T1") ||
      (flightFilter.t2 && item.terminalid === "T2") ||
      (flightFilter.flightId && item.flightId) ||
      (flightFilter.airline && item.airline) ||
      (flightFilter.airport && item.airport) ||
      (flightFilter.baggageClaim && item.carousel) || // carousel 필드 사용
      (flightFilter.exit && item.exitnumber) || // exitnumber 필드 사용
      (flightFilter.gate && item.gatenumber); // gatenumber 필드 사용
    return matchesSearchText && matchesFilter;
  });

  return (
    <div className={styles.wrapper}>
      <Header
        leftContent={
          <FaChevronLeft
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
      {showDropdown && (
        <SearchFilterDropdown
          filters={flightFilter}
          onFilterChange={handleSwitchFlightFilter}
        />
      )}
      <FlightFilterOptions
        filter={flightFilter}
        onSwitch={handleSwitchFlightFilter}
      />
      <AirlineAttribute />
      <AirlineSearchResult
        data={filteredData}
        isLoading={isLoading}
        error={error || undefined}
      />
    </div>
  );
}

export default AirlineSearchPage;
