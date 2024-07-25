import React, { useEffect, useState } from "react";
import Header from "../../publicComponents/Header";
import FacilitiesItem from "../airlineComponents/FacilitiesItem";
import { FaChevronLeft } from "react-icons/fa";
import { fetchFacilitiesData } from "../getInfoData/getFacilitiesData";

interface Facility {
  entrpskoreannm: string;
  trtmntprdlstkoreannm: string;
  lckoreannm: string;
  arrordep: string;
  servicetime: string;
  tel: string;
}

const FacilitiesPage: React.FC = () => {
  const [facility, setFacility] = useState<Facility[]>([]);
  const type = "&facility_nm=&numOfRows=50&pageNo=1&type=json";

  /** 편의시설 데이터를 state에 저장합니다 */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const faciData = await fetchFacilitiesData(type);
        // console.log("faci data : ", faciData);
        setFacility(faciData.response.body.items);
      } catch (error) {
        console.error("Failed to fetch parking data", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="container">
      <Header>
        <div className="facility-header">
          <FaChevronLeft style={{ fontSize: "22px", cursor: "pointer" }} />
          편의시설
        </div>
      </Header>
      {facility && facility.length > 0 ? (
        facility.map((item, index) => (
          <FacilitiesItem
            key={index}
            name={item.entrpskoreannm}
            service={item.trtmntprdlstkoreannm}
            location={item.lckoreannm}
            arrOrDep={item.arrordep}
            serviceTime={item.servicetime}
            tel={item.tel}
          />
        ))
      ) : (
        <p>편의시설 데이터를 불러오는 중입니다...</p>
      )}
    </div>
  );
};

export default FacilitiesPage;
