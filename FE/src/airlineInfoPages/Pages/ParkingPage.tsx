import React, { useEffect, useState } from "react";
import Header from "../../publicComponents/Header";
import "../styles/InfoPages.css";
import ParkingAreaItem from "../airlineComponents/ParkingAreaItem";
import { fetchParkingData } from "../getInfoData/getParkingData";
import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

interface ParkingData {
  floor: string;
  parking: string;
  parkingarea: string;
}

const ParkingPage: React.FC = () => {
  const [parkingData, setParkingData] = useState<ParkingData[]>([]);
  const [longTimeParkingArea, setLongTimeParkingArea] = useState<ParkingData[]>(
    []
  );
  const [shortTimeParkingArea, setShortTimeParkingArea] = useState<
    ParkingData[]
  >([]);
  const type = "&%20numOfRows=10&pageNo=1&type=json";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const parking = await fetchParkingData(type);
        setParkingData(parking.response.body.items);
      } catch (error) {
        console.error("Failed to fetch parking data", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const shortTime = parkingData.filter((item) => item.floor.includes("단기"));
    const longTime = parkingData.filter((item) => item.floor.includes("장기"));

    setShortTimeParkingArea(shortTime);
    setLongTimeParkingArea(longTime);
  }, [parkingData]);

  return (
    <>
      <div className="container">
        <Header
          leftContent={
            <div className="parking-header">
              <Link to={"/"}>
                <FaChevronLeft style={{ fontSize: "22px" }} />
              </Link>
              주차
            </div>
          }
        />
        <div className="parking short-area">
          <h2 className="parking-header">단기 주차장</h2>
          <div className="fee-info">
            <div>기본 30분 1,200원</div>
            <div>추가 15분당 600원</div>
            <div>1일권 24,000원</div>
          </div>
          {shortTimeParkingArea.map((item, index) => (
            <ParkingAreaItem key={index} data={item} />
          ))}
        </div>
        <div className="parking long-area">
          <h2 className="parking-header">장기 주차장</h2>
          <div className="fee-info">
            <div>소형 시간당 1,000원</div>
            <div>소형 1일권 9,000원</div>
            <div>대형 30분당 1,200원</div>
            <div>대형 1일권 12,000원</div>
          </div>
          {longTimeParkingArea.map((item, index) => (
            <ParkingAreaItem key={index} data={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ParkingPage;
