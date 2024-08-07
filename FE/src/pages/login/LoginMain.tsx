import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import MyPage from './MyPage';
import CreateAccount from './CreateAccount';
import FindId from './FindId';
import FindPassword from './FindPassword';
import EditProfile from './EditProfile';

const LoginMain: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="myPage" element={<MyPage />} />
            <Route path="createAccount" element={<CreateAccount />} />
            <Route path="findId" element={<FindId />} />
            <Route path="findPassword" element={<FindPassword />} />
            <Route path="editProfile" element={<EditProfile />} />
        </Routes>
    );
};

export default LoginMain;
