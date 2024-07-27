import React, {
  ReactElement,
  useCallback,
  useEffect,
  useState,
  useMemo,
} from "react";
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
  const type = "&facility_nm=&numOfRows=300&pageNo=1&type=json";

  const fetchData = useCallback(async () => {
    try {
      const faciData = await fetchFacilitiesData(type);
      setFacility(faciData.response.body.items);
    } catch (error) {
      console.error("Failed to fetch parking data", error);
    }
  }, []);

  /** 편의시설 데이터를 state에 저장합니다 */
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  /** 입력된 검색어를 기반으로 데이터 필터링 */
  const filteredFacilities = useMemo(
    () =>
      facility.filter(
        (item) =>
          item.entrpskoreannm
            .toLowerCase()
            .includes(searchInput.toLowerCase()) ||
          item.trtmntprdlstkoreannm
            .toLowerCase()
            .includes(searchInput.toLowerCase())
      ),
    [facility, searchInput]
  );

  const handleSearchInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);
    },
    []
  );

  return (
    <>
      <div className="facility-header">
        {searchToggle ? (
          <div className="fac-header-left">
            <FaChevronLeft
              style={{ fontSize: "22px", cursor: "pointer" }}
              onClick={() => setSearchToggle(false)}
            />
            <input
              value={searchInput}
              type="text"
              className="search-input"
              placeholder="검색어를 입력해 주세요"
              onChange={handleSearchInputChange}
            />
          </div>
        ) : (
          <div className="fac-header-left">
            <Link to={"/"}>
              <FaChevronLeft style={{ fontSize: "22px", cursor: "pointer" }} />
            </Link>
            편의시설
          </div>
        )}
        <FaSearch
          style={{ fontSize: "22px" }}
          onClick={() => setSearchToggle(true)}
        />
      </div>
      <div className="container faci-container">
        {/* <Header
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
                onChange={handleSearchInputChange}
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
      /> */}
        {searchToggle ? (
          <>
            {filteredFacilities.map((item, index) => (
              <FacilitiesItem
                key={index}
                name={item.entrpskoreannm}
                service={item.trtmntprdlstkoreannm}
                location={item.lckoreannm}
                arrOrDep={item.arrordep}
                serviceTime={item.servicetime}
                tel={item.tel}
              />
            ))}
          </>
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
    </>
  );
};

export default FacilitiesPage;
