import React from 'react';
import Header from "../components/Header";
import './Mypage.css';
import Navbar from "../components/Navbar"; // CSS 파일을 임포트
import { useNavigate } from 'react-router-dom';

const MyPage: React.FC = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate('../login');
    }

    return (
        <div className="mypage-container" >
            <Header leftContent={"마이페이지"} />
            <div className="profile-container">
                <div className="profile-image"></div>
                <div className="profile-info">
                    <p className="nickname">닉네임</p>
                    <p className="edit-info">내 정보 수정</p>
                </div>
                <button className="move-button">수정</button>
            </div>
            <div className="ticket-container">
                <div>
                    <p>티켓</p>
                    <p>n장</p>
                </div>
            </div>
            <div className="section-container">
                <div className="section">
                    <p>1:1 문의</p>
                    <button className="section-button">수정</button>
                </div>
                <div className="section">
                    <p>공항 패션 히스토리</p>
                    <button className="section-button">수정</button>
                </div>
                <div className="section">
                    <p>버전</p>
                    <p> 0.0.1 </p>
                </div>
                <div className="logout-container">
                    <button className="logout-button" onClick={handleLogout}>로그아웃</button>
                </div>
            </div>
            <Navbar />
        </div>
    );
}

export default MyPage;
