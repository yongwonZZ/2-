import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import MyPage from './myPage/MyPage';
import CreateAccount from './createAccount/CreateAccount';
import FindId from './findId/FindId'; // FindId import
import FindPassword from './findPassword/FindPassword'; // FindPassword import

const LoginMain: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="myPage" element={<MyPage />} />
            <Route path="createAccount" element={<CreateAccount />} />
            <Route path="findId" element={<FindId />} />
            <Route path="findPassword" element={<FindPassword />} />
        </Routes>
    );
};

export default LoginMain;
