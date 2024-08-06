import React from "react";
import styles from "../../styles/components/LoadingSpinner.module.css";
import { MdLocalAirport } from "react-icons/md";

interface LoadingSpinnerProps {
  message: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.spinner}>
        <div className={styles.earth}></div> {/* 지구 느낌의 원 추가 */}
        <div className={styles["plane-container"]}>
          <MdLocalAirport className={styles.plane} />
        </div>
      </div>
      <div style={{ position: "absolute", color: "white", fontSize: "20px" }}>
        {message}
      </div>
    </div>
  );
};

export default LoadingSpinner;
