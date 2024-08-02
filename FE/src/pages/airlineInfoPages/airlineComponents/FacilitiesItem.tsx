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
    <div className="facility-list-box">
      <div className="facility-name">{name}</div>
      <div className="facility ">
        <div className="facility-location">{location}</div>
        <div className="facility-des">{service}</div>
      </div>
      <div className="facility facility-info">
        <div className="time">
          <FaRegClock />
          <div className={`${openNow ? "open-now" : "close-now"}`}>
            {serviceTime}
          </div>
          {openNow ? (
            <div className="open-now">영업중</div>
          ) : (
            <div className="close-now">영업 종료</div>
          )}
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
