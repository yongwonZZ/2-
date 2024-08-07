import { searchResultType } from "./searchResultType";
import { formatTime, formatDateString } from "../../../utils/formatTime";
import { terminal2 } from "../airlineTerminals";
import { terminal1LogosUrl, terminal2LogosUrl } from "../airlineTerminals";
import styles from "../../../styles/airlinePage/airlineSerchComponents/AirlineSearchResultCard.module.css";
import { useNavigate } from "react-router-dom";
import { MdOutlineSubdirectoryArrowRight as ArrowRight } from "react-icons/md";

type Props = {
  item: searchResultType;
  children?: React.ReactNode;
};

function AirlineSearchResultCard({ item, children }: Props) {
  const navigate = useNavigate();

  return (
    <div
      className={styles.card}
      onClick={() => navigate(`/airline-search/${item.flightId.toLowerCase()}`)}
    >
      {children}
    </div>
  );
}

AirlineSearchResultCard.Master = ({ item }: Props) => {
  return (
    <>
      <div className={styles["section-sm"]}>
        <span>T{terminal2.includes(item.airline) ? 2 : 1}</span>
        <span>[{item.gatenumber}]</span>
      </div>
      <div className={styles["section-sm"]}>
        <span>{formatDateString(item.scheduleDateTime)}</span>
        <span className={styles["section-strikethrough"]}>
          {item.scheduleDateTime !== item.estimatedDateTime &&
            formatTime(item.scheduleDateTime)}
        </span>
        <span className={styles["section-blue"]}>
          {formatTime(item.estimatedDateTime)}
        </span>
      </div>
      <div className={styles["section-lg"]}>
        <img
          src={
            terminal2.includes(item.airline)
              ? terminal2LogosUrl[item.airline]
              : terminal1LogosUrl[item.airline]
          }
          alt="항공사로고"
        />
        <span>{item.airline}</span>
        <span>{item.flightId}</span>
        <span className={styles["section-blue"]}>{item.remark}</span>
      </div>
      <div className={styles["section-lg"]}>
        <span>{item.airport}</span>
      </div>
      <div className={styles["section-lg"]}>
        <span>{item.chkinrange ? "체크인/탑승구" : "출구/수하물"}</span>
        <span>{item.chkinrange ? item.gatenumber : item.exitnumber}</span>
        <span>{item.chkinrange ? item.chkinrange : item.carousel}</span>
      </div>
    </>
  );
};

AirlineSearchResultCard.Slave = ({ item }: Props) => {
  return (
    <>
      <ArrowRight />
      <div className={styles["section-lg"]}>
        <span>코드쉐어</span>
      </div>
      <div className={styles["section-sm"]}>
        <span>{item.flightId}</span>
      </div>
    </>
  );
};

export default AirlineSearchResultCard;
