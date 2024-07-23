import React from "react";
import "../styles/FacilitiesPage.css";
import { FaRegClock, FaPhoneAlt } from "react-icons/fa";

const FacilitiesItem = () => {
  return (
    <div className="facility-list-box">
      <div className="facility-name">SKT 로밍센터</div>
      <div className="facility ">
        <div className="facility-location">
          제2여객터미널 3층 D-E체크인 카운터 사이
        </div>
        <div className="facility-des">
          국제로밍 서비스, 이동전화 렌탈 서비스
        </div>
      </div>
      <div className="facility facility-info">
        <div className="time">
          <FaRegClock />
          <div>06:00 ~ 22:00</div>
        </div>
        <div className="facility-number">
          <FaPhoneAlt />
          <a href={`tel:02-6343-9000`}>02-6343-9000</a>
        </div>
      </div>
    </div>
  );
};

export default FacilitiesItem;
