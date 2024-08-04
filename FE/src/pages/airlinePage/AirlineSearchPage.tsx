import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AirlineSearchPage.module.css";
import Header from "../../components/Header";
import FlightFilterOptions from "./airlineSearchComponents/FlightFilterOptions";
import AirlineSearchResult from "./airlineSearchComponents/AirlineSearchResult";
import SearchFilterDropdown from "./airlineSearchComponents/SearchFilterDropdown";
import AirlineAttribute from "./airlineSearchComponents/AirlineAttribute";
import AirlineLastUpdated from "./airlineSearchComponents/AirlineLastUpdated";
import { useFetchAirlineData } from "../../hooks/useFetchAirlineData";
import { terminal1, terminal2 } from "../airlinePage/airlineTerminals";
import { currentFormatTime } from "utils/formatTime";
import { FlightFilter } from "./types"; // FlightFilter 타입 가져오기
import { FaChevronLeft } from "react-icons/fa";
import { LuSettings2 } from "react-icons/lu";
import { MdClear } from "react-icons/md";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";

const getSavedFlightFilter = () => {
  const savedFilter = localStorage.getItem("flightFilter");
  return savedFilter ? JSON.parse(savedFilter) : null;
};

function AirlineSearchPage() {
  const navigate = useNavigate();

  const targetRef = useRef<HTMLDivElement>(null);

  /** 검색어 상태 */
  const [searchText, setSearchText] = useState<string>(
    localStorage.getItem("searchText") ?? ""
  );

  /** 필터 상태 */
  const [flightFilter, setFlightFilter] = useState<FlightFilter>(
    getSavedFlightFilter() || {
      arrivals: true, // 도착
      departures: true, // 출발
      t1: true, // T1
      t2: true, // T2
      flightId: false, // 편명
      airline: true, // 항공사
      airport: false, // (출발/도착)공항
      carousel: false, // 수하물수취대
      exitnumber: false, // 출구
      gatenumber: false, // 게이트
    }
  );

  useEffect(() => {
    localStorage.setItem("flightFilter", JSON.stringify(flightFilter));
  }, [flightFilter]);

  /** 드롭다운 메뉴 상태 */
  const [showDropdown, setShowDropdown] = useState(false);

  /** 검색어 변경 핸들러 */
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    localStorage.setItem("searchText", event.target.value);
  };

  /** 검색어 clear 핸들러 */
  const handleTextClear = () => {
    setSearchText("");
    localStorage.removeItem("searchText");
  };

  /** 필터 토글 핸들러 */
  const handleSwitchFlightFilter = useCallback(
    (identifier: keyof FlightFilter) => {
      setFlightFilter((prevStatus) => ({
        ...prevStatus,
        [identifier]: !prevStatus[identifier],
      }));
    },
    []
  );

  /** 드롭다운 토글 핸들러 */
  const handleFilterDropdown = useCallback(
    () => setShowDropdown((prevState) => !prevState),
    []
  );

  /** 커스텀 훅 내 비즈니스 로직 => data fetching */
  const { error, isLoading, dataUpdatedAt, refetch, data } =
    useFetchAirlineData({});

  /** 데이터 필터링 로직 */
  const filteredData = useMemo(() => {
    if (!searchText.trim().length || !data) return [];

    return data
      .filter((item) => {
        const matchesDirection =
          (flightFilter.arrivals && !item.chkinrange) ||
          (flightFilter.departures && item.chkinrange);
        const matchesTerminal =
          (flightFilter.t1 && terminal1.includes(item.airline)) ||
          (flightFilter.t2 && terminal2.includes(item.airline));
        const matchesWithSearchText =
          (flightFilter.flightId && item.flightId?.includes(searchText)) ||
          (flightFilter.airline && item.airline?.includes(searchText)) ||
          (flightFilter.airport && item.airport?.includes(searchText)) ||
          (flightFilter.carousel && item.carousel?.includes(searchText)) ||
          (flightFilter.exitnumber && item.exitnumber?.includes(searchText)) ||
          (flightFilter.gatenumber && item.gatenumber?.includes(searchText));
        return matchesDirection && matchesTerminal && matchesWithSearchText;
      })
      .filter(
        ({ estimatedDateTime }) =>
          Number(estimatedDateTime) >= Number(currentFormatTime()) - 15
      )
      .sort(({ estimatedDateTime: a }, { estimatedDateTime: b }) => +a - +b);
  }, [data, flightFilter, searchText]);

  const { data: paginatedData, isLoading: isLoadingMore } = useInfiniteScroll(
    filteredData,
    targetRef
  );

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
      <AirlineLastUpdated dataUpdatedAt={dataUpdatedAt} refetch={refetch} />
      <AirlineAttribute arrivals={flightFilter.arrivals} />
      <AirlineSearchResult
        data={paginatedData}
        isLoading={isLoading}
        error={error || undefined}
      />
      {isLoadingMore && <LoadingSpinner message="Loading..." />}
      <div ref={targetRef} />
    </div>
  );
}

export default AirlineSearchPage;
