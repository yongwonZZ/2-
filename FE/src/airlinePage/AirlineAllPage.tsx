import styles from "./AirlineAllPage.module.css";
import Header from "../publicComponents/Header";
import { FaChevronLeft } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import { useState } from "react";
// import AirlineSearchResult from "../airlineSearchComponents/AirlineSearchResult";
import { useNavigate } from "react-router-dom";

function AirlineAllPage() {
  /** 조회 옵션 상태 */
  const [isArrivalOption, setIsArrivalOption] = useState(true);
  const [terminalNum, setTerminalNum] = useState(1);

  const navigate = useNavigate();

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
              onClick={() => setIsArrivalOption(!isArrivalOption)}
            >
              <span>{isArrivalOption ? "도착" : "출발"}</span>
              <FaCaretDown className={styles["icon-switch"]} />
            </button>
            <button
              className={styles["icon-btn"]}
              onClick={() => setTerminalNum((terminalNum % 2) + 1)}
            >
              <span>T{terminalNum}</span>
              <FaCaretDown className={styles["icon-switch"]} />
            </button>
          </div>
        }
      />
      {/* <AirlineSearchResult /> */}
    </div>
  );
}

export default AirlineAllPage;
