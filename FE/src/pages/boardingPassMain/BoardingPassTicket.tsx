import React from 'react';
import '../../styles/boardingPass/BoardingPass.module.css';

interface BoardingPassTicketProps {
    ticket: any;
}

const BoardingPassTicket: React.FC<BoardingPassTicketProps> = ({ ticket }) => {
    return (
        <div className="boarding-pass">
            <div className="color-strip"></div>
            <div className="boarding-pass-content">
                <div className="status">
                    <p>도착 현황</p>
                    <p>{ticket.remark}</p>
                </div>
                <div className="flight-info">
                    <p>{ticket.scheduleDateTime}</p>
                    <p>{ticket.estimatedDateTime}</p>
                </div>
                <div className="airline-info">
                    <p>{ticket.airline}</p>
                    <p>{ticket.flightId}</p>
                </div>
                <div className="route-info">
                    <p>{ticket.airport}</p>
                    <span className="icon">→</span>
                    <p>인천(서울)</p>
                </div>
                <div className="additional-info">
                    <div>
                        <p>터미널 / 게이트</p>
                        <p>{ticket.terminalid} / {ticket.gatenumber}</p>
                    </div>
                    <div>
                        <p>출구 정보</p>
                        <p>{ticket.exitnumber}</p>
                    </div>
                    <div>
                        <p>수하물 수취대</p>
                        <p>{ticket.carousel}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BoardingPassTicket;
