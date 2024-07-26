import styles from "./AirlineAllPage.module.css";
import Header from "../publicComponents/Header";
import { FaChevronLeft } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import { useState } from "react";
import { FlightFilterForAllPage } from "./types";
import AirlineSearchResult from "../airlineSearchComponents/AirlineSearchResult";
import { useNavigate } from "react-router-dom";
import { useFetchAirlineData } from "../airlineSearchComponents/hooks/useFetchAirlineData";
import { fetchAirlineData } from "../airlineSearchComponents/api/fetchAirlineData";
import { terminal1, terminal2 } from "./airlineTerminals";

function AirlineAllPage() {
  /** 페이지 이동 훅 */
  const navigate = useNavigate();

  /** 필터 상태 */
  const [flightFilter, setFlightFilter] = useState<FlightFilterForAllPage>({
    arrivals: true, // true => 도착, false => 출발
    t1: true, // true => t1, false => t2
  });

  const handleSwitchFlightFilter = (
    identifier: keyof FlightFilterForAllPage
  ) => {
    setFlightFilter((prevState) => {
      return {
        ...prevState,
        [identifier]: !prevState[identifier],
      };
    });
  };

  /** 커스텀 훅 내 비즈니스 로직 => data fetching */
  const { error, isLoading, data } = useFetchAirlineData(fetchAirlineData({}));

  /** 데이터 필터링 로직 */
  const filteredData = data?.filter((item) => {
    const matchesFilter =
      (flightFilter.arrivals && item.terminalid === "A") ||
      (flightFilter.t1
        ? terminal1.includes(item.airline)
        : terminal2.includes(item.airline));

    return matchesFilter;
  });

  return (
    <div className={styles.wrapper}>
      <Header
        leftContent={
          <div className={styles["header-container--left"]}>
            <FaChevronLeft
              className={styles["icon-prev"]}
              onClick={() => navigate(-1)}
            />
            <button
              className={styles["icon-btn"]}
              onClick={() => handleSwitchFlightFilter("arrivals")}
            >
              <span>{flightFilter.arrivals ? "도착" : "출발"}</span>
              <FaCaretDown className={styles["icon-switch"]} />
            </button>
            <button
              className={styles["icon-btn"]}
              onClick={() => handleSwitchFlightFilter("t1")}
            >
              <span>T{flightFilter.t1 ? 1 : 2}</span>
              <FaCaretDown className={styles["icon-switch"]} />
            </button>
          </div>
        }
      />
      <AirlineSearchResult
        data={filteredData}
        isLoading={isLoading}
        error={error || undefined}
      />
    </div>
  );
}

export default AirlineAllPage;
