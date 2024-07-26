import React, { useEffect, useState } from "react";
import Header from "../../publicComponents/Header";
import "../styles/InfoPages.css";
import ParkingAreaItem from "../airlineComponents/ParkingAreaItem";
import { fetchParkingData } from "../getInfoData/getParkingData";
import { FaChevronLeft } from "react-icons/fa";

const ParkingPage = () => {
  const [parkingData, setParkingData] = useState();
  const type = "&%20numOfRows=10&pageNo=1&type=json";

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const parking = await fetchParkingData(type);
  //       setParkingData(parking);
  //     } catch (error) {
  //       console.error("Failed to fetch parking data", error);
  //     }
  //   };
  //   console.log(parkingData);
  //   fetchData();
  // });
  return (
    <>
      <div className="container">
        {/* <Header>
        <div className="facility-header">
          <FaChevronLeft style={{ fontSize: "22px", cursor: "pointer" }} />
          편의시설
        </div>
      </Header>*/}
        <div className="parking short-area">
          <h2 className="parking-header">단기 주차장</h2>
          <div className="fee-info">
            <div>기본 30분 1,200원</div>
            <div>추가 15분당 600원</div>
            <div>1일권 24,000원</div>
          </div>
          <ParkingAreaItem />
          <ParkingAreaItem />
          <ParkingAreaItem />
        </div>
        <div className="parking long-area">
          <h2 className="parking-header">장기 주차장</h2>
          <div className="fee-info">
            <div>기본 30분 1,200원</div>
            <div>추가 15분당 600원</div>
            <div>1일권 24,000원</div>
          </div>
          <ParkingAreaItem />
          <ParkingAreaItem />
          <ParkingAreaItem />
          <ParkingAreaItem />
        </div>
      </div>
    </>
  );
};

export default ParkingPage;
