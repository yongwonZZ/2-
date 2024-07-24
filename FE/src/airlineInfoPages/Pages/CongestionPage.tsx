import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import Header from "../../publicComponents/Header";
import "../styles/ConjestionPage.css";

const CongestionPage = () => {
  return (
    <div className="container conjestion">
      <Header>
        <div className="conjestion-header">
          <FaChevronLeft style={{ fontSize: "22px" }} />
          오늘 출국장
        </div>
      </Header>
    </div>
  );
};

export default CongestionPage;
