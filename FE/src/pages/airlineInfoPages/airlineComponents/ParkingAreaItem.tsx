import React from "react";
import styles from "../../../styles/airlineInfo/InfoPages.module.css";

interface ParkingData {
  floor: string;
  parking: string;
  parkingarea: string;
}

interface ParkingAreaItemProps {
  data: ParkingData;
}

const ParkingAreaItem: React.FC<ParkingAreaItemProps> = ({ data }) => {
  const count = Number(data.parkingarea) - Number(data.parking);

  return (
    <div
      className={`${styles["parking-list-item"]} ${
        count > 0 ? styles.pos : styles.impos
      }`}
    >
      <div className="floor">{data.floor}</div>
      <div className={`possible `}>
        {count > 0 ? `${count}대 가능` : "만차"}
      </div>
    </div>
  );
};

export default ParkingAreaItem;
