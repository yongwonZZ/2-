import { searchResultType } from "./search-result-type";
import { formatTime } from "./utils/formatTime";
import styles from "./AirlineSearchResultCard.module.css";
import { useNavigate } from "react-router-dom";

type Props = {
  item: searchResultType;
};

function AirlineSearchResultCard({ item }: Props) {
  const navigate = useNavigate();

  return (
    <div
      className={styles.card}
      onClick={() => navigate(`/airline-search/${item.flightId.toLowerCase()}`)}
    >
      <div className={styles["section-sm"]}>
        <span>T1</span>
        <span>[123]</span>
      </div>
      <div className={styles["section-sm"]}>
        <span className={styles["section-strikethrough"]}>
          {formatTime(item.scheduleDateTime)}
        </span>
        <span className={styles["section-blue"]}>
          {formatTime(item.estimatedDateTime)}
        </span>
      </div>
      <div className={styles["section-lg"]}>
        <span>{item.airline}</span>
        <span>{item.flightId}</span>
        <span className={styles["section-blue"]}>{item.remark}</span>
      </div>
      <div className={styles["section-lg"]}>
        <span>{item.airport}</span>
      </div>
      <div className={styles["section-lg"]}>
        <span>출구/수하물</span>
        <span>{item.exitnumber}</span>
        <span>{item.carousel}</span>
      </div>
    </div>
  );
}

export default AirlineSearchResultCard;
