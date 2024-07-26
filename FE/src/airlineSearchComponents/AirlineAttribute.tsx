import styles from "./AirlineAttribute.module.css";

function AirlineAttribute() {
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
        <span>출발지</span>
      </div>
      <div className={styles["section-lg"]}>
        <span>출구/</span>
        <span>수하물</span>
      </div>
    </div>
  );
}

export default AirlineAttribute;
