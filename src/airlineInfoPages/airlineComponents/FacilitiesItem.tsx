import React from "react";
import "../styles/FacilitiesPage.css";
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
    <div className="facility-list-box">
      <div className="facility-name">{name}</div>
      <div className="facility ">
        <div className="facility-location">{location}</div>
        <div className="facility-des">{service}</div>
      </div>
      <div className="facility facility-info">
        <div className="time">
          <FaRegClock />
          <div>{serviceTime}</div>
        </div>
        <div className="facility-number">
          <FaPhoneAlt />
          <a href={`tel:${tel}`}>{tel}</a>
        </div>
      </div>
    </div>
  );
};

export default FacilitiesItem;
