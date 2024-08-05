import React from "react";
import { Routes, Route } from "react-router-dom";
import ExchangeRatePage from "./ExchangeRatePage";

const ExchangeRateMain: React.FC = () => {
    return (
        <Routes>
            <Route path='/' element={<ExchangeRatePage />} />
        </Routes>
    );
}

export default ExchangeRateMain;
