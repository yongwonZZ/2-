import { useState } from "react";
import { IoMdRefresh } from "react-icons/io";
import { lastUpdatedTime } from "../../../utils/formatTime";
import styles from "./AirlineLastUpdated.module.css";

type AirlineLastUpdatedProps = {
  dataUpdatedAt: number;
  refetch: () => void;
};

function AirlineLastUpdated({
  dataUpdatedAt,
  refetch,
}: AirlineLastUpdatedProps) {
  const [isRotating, setIsRotating] = useState(false);

  const handleRefetch = () => {
    setIsRotating(true);
    refetch();
  };

  const handleAnimationEnd = () => setIsRotating(false);

  return (
    <div className={styles.container}>
      <span>{lastUpdatedTime(dataUpdatedAt)}</span>
      <IoMdRefresh
        className={`${styles["icon-refresh"]} ${
          isRotating ? styles.rotate : ""
        }`}
        onClick={handleRefetch}
        onAnimationEnd={handleAnimationEnd}
      />
    </div>
  );
}

export default AirlineLastUpdated;
