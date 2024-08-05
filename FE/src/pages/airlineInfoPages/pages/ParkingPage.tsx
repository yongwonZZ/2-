import React, { useCallback, useEffect, useMemo, useState } from "react";
// @ts-ignore
import Header from "../../../components/Header";
import "../../../styles/airlineInfo/InfoPages.module.css";
import ParkingAreaItem from "../airlineComponents/ParkingAreaItem";
import { fetchParkingData } from "../getInfoData/getParkingData";
import { FaCaretDown, FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

interface ParkingData {
  floor: string;
  parking: string;
  parkingarea: string;
}

const ParkingPage: React.FC = () => {
  const [parkingData, setParkingData] = useState<ParkingData[]>([]);
  const [updateTime, setupdateTime] = useState<string>("");
  const [filterToggle, setFilterToggle] = useState<boolean>(false);
  const type = "&%20numOfRows=10&pageNo=1&type=json";

  /** 현재 시간을 반환 */
  const getCurrentTime = () => {
    const now = new Date();
    const year = String(now.getFullYear());
    const month = String(now.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더함
    const date = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${year}.${month}.${date}.${hours}:${minutes}`;
  };

  const fetchData = useCallback(async () => {
    try {
      const parking = await fetchParkingData(type);
      setParkingData(parking.response.body.items);
      setupdateTime(getCurrentTime());
    } catch (error) {
      console.error("Failed to fetch parking data", error);
    }
  }, [type]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const { shortTimeParkingArea, longTimeParkingArea } = useMemo(() => {
    const shortTime = parkingData.filter((item) => item.floor.includes("단기"));
    const longTime = parkingData.filter((item) => item.floor.includes("장기"));
    return { shortTimeParkingArea: shortTime, longTimeParkingArea: longTime };
  }, [parkingData]);

  const { t1Area, t2Area } = useMemo(() => {
    const t1 = shortTimeParkingArea.filter((item) => item.floor.includes("T1"));
    const t2 = shortTimeParkingArea.filter((item) => item.floor.includes("T2"));
    return { t1Area: t1, t2Area: t2 };
  }, [shortTimeParkingArea]);

  return (
    <div className="container">
      <Header
        leftContent={
          <div className="parking-header">
            <Link to={"/"}>
              <FaChevronLeft style={{ fontSize: "22px" }} />
            </Link>
            주차 {filterToggle ? "T2" : "T1"}
            <FaCaretDown onClick={() => setFilterToggle(!filterToggle)} />
          </div>
        }
      />
      {/* <div className="update-time">마지막 업데이트</div> */}
      <div className="update-time">마지막 업데이트 {updateTime}</div>
      <div className="parking short-area">
        <h2 className="parking-header">단기 주차장</h2>
        <div className="fee-info">
          <div>기본 30분 1,200원</div>
          <div>추가 15분당 600원</div>
          <div>1일권 24,000원</div>
        </div>
        {filterToggle
          ? t2Area.map((item, index) => (
              <ParkingAreaItem key={index} data={item} />
            ))
          : t1Area.map((item, index) => (
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
  );
};

export default ParkingPage;
