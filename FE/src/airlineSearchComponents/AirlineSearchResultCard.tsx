import { searchResultType } from "./search-result-type";
import { formatTime } from "./utils/formatTime";
import styles from "./AirlineSearchResultCard.module.css";

type Props = {
  item: searchResultType;
};

function AirlineSearchResultCard({ item }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles["section-sm"]}>
        <span>T1</span>
        <span>[123]</span>
      </div>
      <div className={styles["section-sm"]}>
        <span>{formatTime(item.scheduleDateTime)}</span>
        <span>{formatTime(item.estimatedDateTime)}</span>
      </div>
      <div className={styles["section-lg"]}>
        <span>{item.airline}</span>
        <span>{item.flightId}</span>
        <span>{item.remark}</span>
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
