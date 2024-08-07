import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import MyPage from './myPage/MyPage';
import CreateAccount from './createAccount/CreateAccount';
import FindId from './findId/FindId'; // FindId import
import FindPassword from './findPassword/FindPassword'; // FindPassword import
import EditProfile from './editProfile/EditProfile'; // 새로운 페이지 import

const LoginMain: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="myPage" element={<MyPage />} />
            <Route path="createAccount" element={<CreateAccount />} />
            <Route path="findId" element={<FindId />} />
            <Route path="findPassword" element={<FindPassword />} />
            <Route path="editProfile" element={<EditProfile />} /> {/* 새로운 라우트 추가 */}
        </Routes>
    );
};

export default LoginMain;
