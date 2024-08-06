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
    <div className={styles.rateItems}>
      <div className={styles.rateItemName}>{curUnit ? curUnit : "..."}</div>
      <div className={styles.rateItem}>{dealBasR ? dealBasR : "..."}</div>
    </div>
  );
};

export default ExRateHeaderItem;
