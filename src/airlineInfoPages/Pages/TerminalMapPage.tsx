import React, { useState } from "react";
import "../styles/TerminalMapPage.css";
import { FaCaretDown } from "react-icons/fa";
import Header from "../../publicComponents/Header";

const TerminalMapPage = () => {
  const [terminal, setTerminal] = useState<string>("T1");

  const handleOnClickTerminal = () => {};

  return (
    <div className="container">
      <Header>
        <button className="map-header">
          공항 터미널 지도{terminal} <FaCaretDown />
        </button>
      </Header>
      <div className="map-container"></div>
    </div>
  );
};

export default TerminalMapPage;
