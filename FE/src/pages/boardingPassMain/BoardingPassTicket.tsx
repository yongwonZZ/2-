import React from "react";
import styles from "../../styles/boardingPass/BoardingPass.module.css";

interface TicketProps {
    ticket: {
        airline: string;
        flightId: string;
        departure: string;
        arrival: string;
        departureTime: string;
        arrivalTime: string;
        gate: string;
        seat: string;
        baggage: string;
    };
}

const BoardingPassTicket: React.FC<TicketProps> = ({ ticket }) => {
    return (
        <div className={styles["boarding-pass"]}>
            <div className={styles["color-strip"]}></div>
            <div className={styles["boarding-pass-content"]}>
                <div className={styles.status}>
                    <p>도착 현황</p>
                    <p>도착 or 대기</p>
                </div>
                <div className={styles["flight-info"]}>
                    <p>{ticket.departureTime}</p>
                    <p>{ticket.arrivalTime}</p>
                </div>
                <div className={styles["airline-info"]}>
                    <p>{ticket.airline}</p>
                    <p>{ticket.flightId}</p>
                </div>
                <div className={styles["route-info"]}>
                    <p>{ticket.departure}</p>
                    <span className="icon">→</span>
                    <p>{ticket.arrival}</p>
                </div>
                <div className={styles["additional-info"]}>
                    <div>
                        <p>터미널 / 게이트</p>
                        <p>{ticket.gate}</p>
                    </div>
                    <div>
                        <p>출구 정보</p>
                        <p>{ticket.seat}</p>
                    </div>
                    <div>
                        <p>수하물 수취대</p>
                        <p>{ticket.baggage}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BoardingPassTicket;
