import React from 'react';
import './BoardingPass.css';
import Navbar from "../publicComponents/Navbar";
import Header from "../publicComponents/Header";

const BoardingPass: React.FC = () => {
    return (
        <>
            <Header>편의시설</Header>
            <div className="boarding-pass">
                <div className="color-strip"></div>
                <div className="boarding-pass-content">
                    <div className="status">
                        <p>도착 현황</p>
                        <p>도착 or 대기</p>
                    </div>
                    <div className="flight-info">
                        <p>7.21. (일) 오후 8:17</p>
                        <p>비행기 도착정보 00:00:00</p>
                    </div>
                    <div className="airline-info">
                        <p>항공사명</p>
                        <p>항공 편명</p>
                    </div>
                    <div className="route-info">
                        <p>출발지</p>
                        <span className="icon">→</span>
                        <p>도착지</p>
                    </div>
                    <div className="additional-info">
                        <div>
                            <p>터미널 / 게이트</p>
                            <p>정보1 / 정보2</p>
                        </div>
                        <div>
                            <p>출구 정보</p>
                            <p>B</p>
                        </div>
                        <div>
                            <p>수하물 수취대</p>
                            <p>정보1</p>
                        </div>
                    </div>
                </div>
                <Navbar />
            </div>
        </>
    );
};

export default BoardingPass;
