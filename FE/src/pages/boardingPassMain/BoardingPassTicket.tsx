import React from "react";
import styles from "../../styles/boardingPass/BoardingPass.module.css";
import { IoIosAirplane } from "react-icons/io";
import { formatDateTime } from "../../utils/formatDateTime";

interface TicketProps {
    ticket: {
        airline: string;
        flightId: string;
        airport: string;
        airportCode: string;
        carousel: string;
        codeshare: string;
        estimatedDateTime: string;
        exitnumber: string;
        gatenumber: string;
        remark: string;
        scheduleDateTime: string;
        terminalid: string;
        direction: string; // 추가된 필드: 출발 또는 도착 정보
        chkinrange: string; // 체크인 범위
    };
}

const BoardingPassTicket: React.FC<TicketProps> = ({ ticket }) => {
    return (
        <div className={styles["boarding-pass"]}>
            <div className={styles["color-strip"]}></div>
            <div className={styles["boarding-pass-content"]}>
                <div className={styles.status}>
                    <p className={styles.bold}>{ticket.airline}</p>
                    <p className={styles.bold}>{ticket.flightId}</p>
                </div>
                {ticket.chkinrange ? (
                    <div className={styles["route-info"]}>
                        <div>
                            <p className={`${styles.bold} ${styles.largeText}`}>ICN</p>
                            <p className={styles.bold}>{ticket.airline}</p>
                        </div>
                        <IoIosAirplane className={styles["icon-departure"]} />
                        <div>
                            <p className={`${styles.bold} ${styles.largeText}`}>{ticket.airportCode}</p>
                            <p className={styles.bold}>{ticket.airport}</p>
                        </div>
                    </div>
                ) : (
                    <div className={styles["route-info"]}>
                        <div>
                            <p className={`${styles.bold} ${styles.largeText}`}>{ticket.airportCode}</p>
                            <p className={styles.bold}>{ticket.airport}</p>
                        </div>
                        <IoIosAirplane className={styles["icon-departure"]} />
                        <div>
                            <p className={`${styles.bold} ${styles.largeText}`}>ICN</p>
                            <p className={styles.bold}>{ticket.airline}</p>
                        </div>
                    </div>
                )}
                <div>
                    <p className={styles.bold}>{formatDateTime(ticket.scheduleDateTime)}</p>
                </div>
                <div className={styles["details-button-container"]}>
                    <button>자세히 보기</button>
                </div>
            </div>
        </div>
    );
};

export default BoardingPassTicket;
