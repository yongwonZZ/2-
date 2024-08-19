import React from "react";
import { Routes, Route } from "react-router-dom";
import AirlineSearchPage from "./AirlineSearchPage";
import AirlineAllPage from "./AirlineAllPage";
import AirlineDetailPage from "./AirlineDetailPage";
import ParkingPage from "../airlineInfoPages/pages/ParkingPage";
import FacilitiesPage from "../airlineInfoPages/pages/FacilitiesPage";
import TerminalMapPage from "../airlineInfoPages/pages/TerminalMapPage";
import CongestionPage from "../airlineInfoPages/pages/CongestionPage";

const AirlineMain: React.FC = () => {
    return (
        <Routes>
            <Route path='search' element={<AirlineSearchPage />} />
            <Route path='search/:id' element={<AirlineDetailPage />} />
            <Route path='all' element={<AirlineAllPage />} />
            <Route path='parking' element={<ParkingPage />} />
            <Route path='facilities' element={<FacilitiesPage />} />
            <Route path='terminalmap' element={<TerminalMapPage />} />
            <Route path='congestion' element={<CongestionPage />} />
        </Routes>
    );
}

export default AirlineMain;
