import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import MyPage from '../login/myPage/MyPage';
import CreateAccount from '../login/createAccount/CreateAccount';

const LoginMain: React.FC<{ setTicketCount: React.Dispatch<React.SetStateAction<number>> }> = ({ setTicketCount }) => {
    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/myPage' element={<MyPage />} />
            <Route path='/createAccount' element={<CreateAccount />} />
        </Routes>
    );
};

export default LoginMain;