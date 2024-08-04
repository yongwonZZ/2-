import React from "react";

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
    <div className={`parking-list-item ${count > 0 ? "pos" : "impos"}`}>
      <div className="floor">{data.floor}</div>
      <div className={`possible `}>
        {count > 0 ? `${count}대 가능` : "만차"}
      </div>
    </div>
  );
};

export default ParkingAreaItem;
