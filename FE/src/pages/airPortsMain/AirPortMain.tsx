import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import AirlineSearchPage from '../airlinePage/AirlineSearchPage';
import AirlineAllPage from '../airlinePage/AirlineAllPage';
import ParkingPage from '../airlineInfoPages/pages/ParkingPage';
import FacilitiesPage from '../airlineInfoPages/pages/FacilitiesPage';
import TerminalMapPage from '../airlineInfoPages/pages/TerminalMapPage';
import CongestionPage from '../airlineInfoPages/pages/CongestionPage';
import AirlineDetailPage from '../airlinePage/AirlineDetailPage';

const AirPortMain: React.FC = () => {
    return (
        <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/airline-search' element={<AirlineSearchPage />} />
            <Route path='/airline-search/:id' element={<AirlineDetailPage />} />
            <Route path='/airline-all' element={<AirlineAllPage />} />
            <Route path='/parking' element={<ParkingPage />} />
            <Route path='/facilities' element={<FacilitiesPage />} />
            <Route path='/terminalmap' element={<TerminalMapPage />} />
            <Route path='/congestion' element={<CongestionPage />} />
        </Routes>
    );
};

export default AirPortMain;
