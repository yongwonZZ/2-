import React, { useCallback, useEffect, useState, useRef } from "react";
import styles from "../../../styles/airlineInfo/FacilitiesPage.module.css";
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
  const [displayedFacilities, setDisplayedFacilities] = useState<Facility[]>(
    []
  );
  const [searchToggle, setSearchToggle] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [itemsToShow, setItemsToShow] = useState<number>(20);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastFacilityElementRef = useRef<HTMLDivElement | null>(null);

  const type = "&facility_nm=&numOfRows=500&pageNo=1&type=json";

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const faciData = await fetchFacilitiesData(type);
      setFacility(faciData.response.body.items);
      setDisplayedFacilities(
        faciData.response.body.items.slice(0, itemsToShow)
      );
    } catch (error) {
      console.error("Failed to fetch facilities data", error);
    } finally {
      setLoading(false);
    }
  }, [itemsToShow]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading) {
        setItemsToShow((prevItemsToShow) => prevItemsToShow + 20);
      }
    });

    if (lastFacilityElementRef.current) {
      observer.current.observe(lastFacilityElementRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [loading]);

  useEffect(() => {
    setDisplayedFacilities(facility.slice(0, itemsToShow));
  }, [facility, itemsToShow]);

  const filteredFacilities = displayedFacilities.filter(
    (item) =>
      item.entrpskoreannm.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.trtmntprdlstkoreannm
        .toLowerCase()
        .includes(searchInput.toLowerCase())
  );

  const handleSearchInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);
    },
    []
  );
  useEffect(() => {
    console.log(filteredFacilities);
  }, [filteredFacilities]);

  return (
    <>
      <div className={styles["facility-header"]}>
        {searchToggle ? (
          <div className={styles["fac-header-left"]}>
            <FaChevronLeft
              style={{ fontSize: "22px", cursor: "pointer" }}
              onClick={() => setSearchToggle(false)}
            />
            <input
              value={searchInput}
              type="text"
              style={{
                outline: "none",
                border: "none",
                borderWidth: "0",
                fontSize: "20px",
                padding: 0,
                margin: 0,
              }}
              className={styles["search-input"]}
              placeholder="검색어를 입력해 주세요"
              onChange={handleSearchInputChange}
            />
          </div>
        ) : (
          <div className={styles["fac-header-left"]}>
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
      <div className={`${styles.container} ${styles["faci-container"]}`}>
        {searchToggle ? (
          <>
            {filteredFacilities.length >= 1 ? (
              filteredFacilities.map((item, index) => (
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
              <>
                <div className={styles.notFound}>
                  <div className={styles.box}>
                    "<span className={styles.searchText}>{searchInput}</span>"에
                    대한 검색결과를 찾을 수 없습니다.
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            {displayedFacilities.map((item, index) => {
              if (index === displayedFacilities.length - 1) {
                return (
                  <div ref={lastFacilityElementRef} key={index}>
                    <FacilitiesItem
                      name={item.entrpskoreannm}
                      service={item.trtmntprdlstkoreannm}
                      location={item.lckoreannm}
                      arrOrDep={item.arrordep}
                      serviceTime={item.servicetime}
                      tel={item.tel}
                    />
                  </div>
                );
              } else {
                return (
                  <FacilitiesItem
                    key={index}
                    name={item.entrpskoreannm}
                    service={item.trtmntprdlstkoreannm}
                    location={item.lckoreannm}
                    arrOrDep={item.arrordep}
                    serviceTime={item.servicetime}
                    tel={item.tel}
                  />
                );
              }
            })}
          </>
        )}
        {loading && (
          <p className={styles["loading-data"]}>
            편의시설 데이터를 불러오는 중입니다...
          </p>
        )}
      </div>
    </>
  );
};

export default FacilitiesPage;
