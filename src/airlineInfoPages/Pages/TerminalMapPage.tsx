import React, { useState } from "react";
import "../styles/TerminalMapPage.css";
import { FaCaretDown, FaChevronLeft } from "react-icons/fa";
import Header from "../../publicComponents/Header";
import Map1 from "../images/map_exit_route_map_01.png";
import Map11 from "../images/map_entry_route_map_01.png";

import Map2 from "../images/map_exit_route_map_02.png";
import Map22 from "../images/map_entry_route_map_02.png";

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
    <div className="container">
      <Header>
        <div className="map-header">
          <FaChevronLeft style={{ fontSize: "22px", cursor: "pointer" }} />
          <button className="map-btn" onClick={handleOnClickTerminal}>
            공항 터미널 지도{terminal} <FaCaretDown />
          </button>
        </div>
      </Header>
      <div className="map-container">
        {terminal === "T1" ? (
          <>
            출국
            <img src={Map1} alt="map1" />
            입국
            <img src={Map11} alt="map11" />
          </>
        ) : (
          <>
            출국
            <img src={Map2} alt="map1" />
            입국
            <img src={Map22} alt="map11" />
          </>
        )}
      </div>
    </div>
  );
};

export default TerminalMapPage;
