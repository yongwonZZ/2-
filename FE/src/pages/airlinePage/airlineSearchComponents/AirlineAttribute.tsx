import styles from "../../../styles/airlinePage/airlineSerchComponents/AirlineAttribute.module.css";

type AirlineAttributeProps = {
  arrivals: boolean;
};

function AirlineAttribute({ arrivals }: AirlineAttributeProps) {
  return (
    <div className={styles.card}>
      <div className={styles["section-sm"]}>
        <span>터미널</span>
      </div>
      <div className={styles["section-sm"]}>
        <span>시간</span>
      </div>
      <div className={styles["section-lg"]}>
        <span>편명</span>
      </div>
      <div className={styles["section-lg"]}>
        <span>{arrivals ? "출발지" : "도착지"}</span>
      </div>
      <div className={styles["section-lg"]}>
        <span>{arrivals ? "출구" : "체크인"}</span>
        <span>{arrivals ? "체크인" : "탑승게이트"}</span>
      </div>
    </div>
  );
}

export default AirlineAttribute;
