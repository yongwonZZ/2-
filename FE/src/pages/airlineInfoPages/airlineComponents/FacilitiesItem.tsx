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
const isOpenNow = (serviceTime: string): boolean => {
  const [start, end] = serviceTime.split(" ~ ");
  const currentTime = new Date();
  const [currentHour, currentMinute] = [
    currentTime.getHours(),
    currentTime.getMinutes(),
  ];

  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);

  const currentMinutes = currentHour * 60 + currentMinute;
  const startMinutes = startHour * 60 + startMinute;
  const endMinutes = endHour * 60 + endMinute;
  if (startMinutes !== endMinutes) {
    return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
  }
  return true;
};

const FacilitiesItem: React.FC<FacilitiesItemProps> = ({
  name,
  service,
  location,
  arrOrDep,
  serviceTime,
  tel,
}) => {
  const openNow = isOpenNow(serviceTime);
  return (
    <div className={styles.facilityListBox}>
      <div className={styles.facilityName}>{name}</div>
      <div className={styles.facility}>
        <div className={styles.facilityLocation}>{location}</div>
        <div className={styles.facilityDes}>{service}</div>
      </div>
      <div className={`${styles.facility} ${styles.facilityInfo}`}>
        <div className={styles.time}>
          <FaRegClock />
          <div className={`${openNow ? styles.openNow : styles.closeNow}`}>
            {serviceTime}
          </div>
          {openNow ? (
            <div className={styles.openNow}>영업중</div>
          ) : (
            <div className={styles.closeNow}>영업 종료</div>
          )}
        </div>
        <div className={styles.facilityNumber}>
          <FaPhoneAlt />
          <a href={`tel:${tel}`}>{tel}</a>
        </div>
      </div>
    </div>
  );
};

export default FacilitiesItem;
