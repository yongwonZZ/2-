import React, { useEffect, useState } from "react";
import Header from "../../publicComponents/Header";
import FacilitiesItem from "../airlineComponents/FacilitiesItem";
import { FaChevronLeft, FaSearch } from "react-icons/fa";
import { fetchFacilitiesData } from "../getInfoData/getFacilitiesData";
import { Link } from "react-router-dom";

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
  const [searchToggle, setSearchToggle] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const type = "&facility_nm=&numOfRows=200&pageNo=1&type=json";

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
      <Header
        leftContent={
          searchToggle ? (
            <div className="facility-header">
              <FaChevronLeft
                style={{ fontSize: "22px", cursor: "pointer" }}
                onClick={() => setSearchToggle(false)}
              />
              <input
                value={searchInput}
                type="text"
                className="search-input"
                placeholder="검색어를 입력해 주세요"
              />
            </div>
          ) : (
            <div className="facility-header">
              <Link to={"/"}>
                <FaChevronLeft
                  style={{ fontSize: "22px", cursor: "pointer" }}
                />
              </Link>
              편의시설
            </div>
          )
        }
        rightContent={
          <FaSearch
            style={{ fontSize: "22px" }}
            onClick={() => setSearchToggle(true)}
          />
        }
      />
      {searchToggle ? (
        <></>
      ) : (
        <>
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
            <div className="loading-data">
              <p>편의시설 데이터를 불러오는 중입니다...</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FacilitiesPage;
