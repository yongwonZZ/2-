import React from "react";
import styles from "../../../styles/exchangeRatePage/ExRateHeaderItem.module.css";

interface ExRateHeaderItemProps {
  curUnit: string;
  dealBasR: string;
}

const ExRateHeaderItem: React.FC<ExRateHeaderItemProps> = ({
  curUnit,
  dealBasR,
}) => {
  return (
    <div className={styles["rate-items"]}>
      <div className={styles["rate-item-name"]}>
        {curUnit ? curUnit : "..."}
      </div>
      <div className={styles["rate-item"]}>{dealBasR ? dealBasR : "..."}</div>
    </div>
  );
};

export default ExRateHeaderItem;
