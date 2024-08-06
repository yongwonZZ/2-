import React, { useState } from "react";
import styles from "../../../styles/airlineInfo/TerminalMapPage.module.css";
import { FaCaretDown, FaChevronLeft } from "react-icons/fa";
import Header from "../../../components/Header";
import Map1 from "../images/map_exit_route_map_01.png";
import Map11 from "../images/map_entry_route_map_01.png";

import Map2 from "../images/map_exit_route_map_02.png";
import Map22 from "../images/map_entry_route_map_02.png";
import { Link } from "react-router-dom";
import container from "../../../styles/airlineInfo/InfoPages.module.css";

const TerminalMapPage = () => {
  const [terminal, setTerminal] = useState<string>("T1");

  const handleOnClickTerminal = () => {
    if (terminal === "T1") {
      return setTerminal("T2");
    } else {
      return setTerminal("T1");
    }
  };

  return (
    <div className={container.container}>
      <Header
        leftContent={
          <div className={styles.mapHeader}>
            <Link to={"/"}>
              <FaChevronLeft style={{ fontSize: "22px", cursor: "pointer" }} />
            </Link>
            <button className={styles.mapBtn} onClick={handleOnClickTerminal}>
              공항 터미널 지도{terminal} <FaCaretDown />
            </button>
          </div>
        }
      ></Header>
      <div className={styles.mapInfo}>
        * 두 손가락을 이용해 확대해 볼 수 있습니다
      </div>
      <div className={styles.mapContainer}>
        {terminal === "T1" ? (
          <>
            <div className={styles.mapName}>출국</div>
            <img src={Map1} alt="map1" />
            <div className={styles.mapName}>입국</div>
            <img src={Map11} alt="map11" />
          </>
        ) : (
          <>
            <div className={styles.mapName}>출국</div>
            <img src={Map2} alt="map1" />
            <div className={styles.mapName}>입국</div>
            <img src={Map22} alt="map11" />
          </>
        )}
      </div>
    </div>
  );
};

export default TerminalMapPage;
