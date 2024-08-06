import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import MyPage from './myPage/MyPage';
import CreateAccount from './createAccount/CreateAccount';

const LoginMain: React.FC = () => {
    return (
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/myPage' element={<MyPage />} />
            <Route path='/createAccount' element={<CreateAccount />} />
        </Routes>
    );
};

export default LoginMain;
