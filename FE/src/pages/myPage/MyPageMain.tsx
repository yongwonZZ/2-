import React from "react";
import { Routes, Route } from "react-router-dom";
import MyPage from "./MyPage";

const MyPageMain: React.FC = () => {
    return (
        <Routes>
            <Route path='/' element={<MyPage />} />
        </Routes>
    );
}

export default MyPageMain;
