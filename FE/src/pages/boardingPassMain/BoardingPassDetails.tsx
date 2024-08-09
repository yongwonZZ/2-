import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import styles from "../../styles/boardingPass/BoardingPassDetails.module.css";
import Header from "../../components/Header";
import { AiOutlineShareAlt } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { IoIosAirplane, IoIosMap } from "react-icons/io";
import { formatDateTime } from "../../utils/formatDateTime";
import { calculateFlightDetails } from "../../utils/calculateFlightDetails";
import { terminal1LogosUrl, terminal2LogosUrl } from "../../pages/airlinePage/airlineTerminals";

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
    chkinrange?: string; // 체크인 범위가 있을 수도 있고 없을 수도 있음
}

const BoardingPassDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const navigate = useNavigate();
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [flightDetails, setFlightDetails] = useState<{ distance: number, flightDuration: number } | null>(null);

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

    useEffect(() => {
        if (ticket) {
            const departureCode = ticket.chkinrange ? 'ICN' : ticket.airportCode;
            const arrivalCode = ticket.chkinrange ? ticket.airportCode : 'ICN';
            const details = calculateFlightDetails(departureCode, arrivalCode);
            setFlightDetails(details);
        }
    }, [ticket]);

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

    const departure = ticket.chkinrange ? 'ICN' : ticket.airportCode;
    const arrival = ticket.chkinrange ? ticket.airportCode : 'ICN';

    // 항공사 로고 URL 가져오기
    const airlineLogoUrl = terminal1LogosUrl[ticket.airline] || terminal2LogosUrl[ticket.airline];

    return (
        <>
            <Header leftContent={"티켓 상세정보"} />
            <div className={styles["boarding-pass-details"]}>
                <div className={styles["header-container"]}>
                    <div className={styles["info-section"]}>
                        {airlineLogoUrl ? (
                            <img src={airlineLogoUrl} alt={ticket.airline} className={styles["airline-logo"]}/>
                        ) : (
                            <p>{ticket.airline}</p>
                        )}
                    </div>
                    <div className={styles["details-header"]}>
                        <button className={styles["share-button"]} onClick={handleShare} disabled>
                            <AiOutlineShareAlt /> 공유하기
                        </button>
                    </div>
                </div>
                <div className={styles["journey-info-wrapper"]}>
                    <IoIosMap className={styles["icon-map"]}/>
                    <div className={styles["journey-info"]}>
                        <p>여정</p>
                    </div>
                    <div className={styles["route-info"]}>
                        <p>{departure}</p>
                        <IoIosAirplane className={styles["icon-departure"]}/>
                        <p>{arrival}</p>
                    </div>
                </div>
                <div className={styles["ticket-info"]}>
                    <div className={styles["info-section"]}>
                        <p>{formatDateTime(ticket.scheduleDateTime)}</p>
                    </div>

                    <div className={styles["flight-info"]}>
                        <p className={styles["large-text"]}>{departure}</p>
                    </div>
                    <div className={styles["flight-info"]}>
                        <p className={styles["gray-text"]}>
                            {"-".repeat(10)}
                            {flightDetails ? `총 ${(Math.floor(flightDetails.flightDuration / 3600000))}시간 ${(Math.round(((flightDetails.flightDuration % 3600000) / 60000)))}분 소요` : 'N/A'}
                            {"-".repeat(10)}
                        </p>
                    </div>
                    <div className={styles["flight-info"]}>
                        <p className={styles["large-text"]}>{arrival}</p>
                    </div>
                </div>
                <div className={styles["additional-info"]}>
                    <div className={styles["info-section"]}>
                        <h3>게이트</h3>
                        <p>{ticket.gatenumber}</p>
                    </div>
                    <div className={styles["info-section"]}>
                        <h3>수화물 수취대</h3>
                        <p>{ticket.carousel}</p>
                    </div>
                    <div className={styles["info-section"]}>
                        <h3>출구</h3>
                        <p>{ticket.exitnumber}</p>
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
