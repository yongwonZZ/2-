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
    <div className="parking-list-item">
      <div className="floor">{data.floor}</div>
      <div className="possible">{count}</div>
    </div>
  );
};

export default ParkingAreaItem;
