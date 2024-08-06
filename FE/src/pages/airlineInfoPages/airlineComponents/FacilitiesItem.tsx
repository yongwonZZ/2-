import React from "react";
import styles from "../../../styles/airlineInfo/FacilitiesPage.module.css";
import { FaRegClock, FaPhoneAlt } from "react-icons/fa";

interface FacilitiesItemProps {
  name: string;
  service: string;
  location: string;
  arrOrDep: string;
  serviceTime: string;
  tel: string;
}

const FacilitiesItem: React.FC<FacilitiesItemProps> = ({
  name,
  service,
  location,
  arrOrDep,
  serviceTime,
  tel,
}) => {
  return (
    <div className={styles["facility-list-box"]}>
      <div className={styles["facility-name"]}>{name}</div>
      <div className={styles.facility}>
        <div className={styles["facility-location"]}>{location}</div>
        <div className={styles["facility-des"]}>{service}</div>
      </div>
      <div className={`${styles.facility} ${styles["facility-info"]}`}>
        <div className={styles.time}>
          <FaRegClock />
          <div>{serviceTime}</div>
        </div>
        <div className={styles["facility-number"]}>
          <FaPhoneAlt />
          <a href={`tel:${tel}`}>{tel}</a>
        </div>
      </div>
    </div>
  );
};

export default FacilitiesItem;
