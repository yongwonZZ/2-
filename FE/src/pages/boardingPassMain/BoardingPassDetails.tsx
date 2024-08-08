import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import styles from "../../styles/boardingPass/BoardingPassDetails.module.css";
import Header from "../../components/Header";
import { AiOutlineShareAlt } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";

interface Ticket {
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
}

const BoardingPassDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const navigate = useNavigate();
    const [ticket, setTicket] = useState<Ticket | null>(null);

    useEffect(() => {
        if (location.state && (location.state as any).ticket) {
            setTicket((location.state as any).ticket);
        } else {
            const tickets = JSON.parse(localStorage.getItem('tickets') || '[]') as Ticket[];
            const ticketIndex = parseInt(id || '', 10);
            if (!isNaN(ticketIndex) && ticketIndex >= 0 && ticketIndex < tickets.length) {
                setTicket(tickets[ticketIndex]);
            } else {
                alert('티켓을 찾을 수 없습니다.');
                navigate('/boardingPass');
            }
        }
    }, [id, location.state, navigate]);

    const handleDelete = () => {
        const tickets = JSON.parse(localStorage.getItem('tickets') || '[]') as Ticket[];
        const ticketIndex = parseInt(id || '', 10);
        if (!isNaN(ticketIndex) && ticketIndex >= 0 && ticketIndex < tickets.length) {
            const updatedTickets = tickets.filter((_, index) => index !== ticketIndex);
            localStorage.setItem('tickets', JSON.stringify(updatedTickets));
            alert('티켓이 삭제되었습니다.');
            navigate('/boardingPass');
        } else {
            alert('티켓을 찾을 수 없습니다.');
        }
    };

    const handleShare = () => {
        alert("티켓 정보가 공유되었습니다!");
    };

    if (!ticket) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header leftContent={"티켓 상세정보"} />
            <div className={styles["boarding-pass-details"]}>
                <div className={styles["details-header"]}>
                    <button className={styles["share-button"]} onClick={handleShare}>
                        <AiOutlineShareAlt /> 공유하기
                    </button>
                </div>
                <div className={styles["ticket-info"]}>
                    <div className={styles["info-section"]}>
                        <h3>항공사</h3>
                        <p>{ticket.airline}</p>
                    </div>
                    <div className={styles["info-section"]}>
                        <h3>항공편</h3>
                        <p>{ticket.flightId}</p>
                    </div>
                    <div className={styles["info-section"]}>
                        <h3>출발지</h3>
                        <p>{ticket.airport}</p>
                    </div>
                    <div className={styles["info-section"]}>
                        <h3>도착지</h3>
                        <p>{ticket.airportCode}</p>
                    </div>
                    <div className={styles["info-section"]}>
                        <h3>출발 시간</h3>
                        <p>{ticket.scheduleDateTime}</p>
                    </div>
                    <div className={styles["info-section"]}>
                        <h3>도착 시간</h3>
                        <p>{ticket.estimatedDateTime}</p>
                    </div>
                    <div className={styles["info-section"]}>
                        <h3>탑승구</h3>
                        <p>{ticket.gatenumber}</p>
                    </div>
                    <div className={styles["info-section"]}>
                        <h3>좌석</h3>
                        <p>{ticket.exitnumber}</p>
                    </div>
                    <div className={styles["info-section"]}>
                        <h3>수하물</h3>
                        <p>{ticket.carousel}</p>
                    </div>
                </div>
                <div className={styles["details-footer"]}>
                    <button className={styles["delete-button"]} onClick={handleDelete}>
                        <FaTrashAlt /> 삭제하기
                    </button>
                </div>
            </div>
        </>
    );
};

export default BoardingPassDetails;
