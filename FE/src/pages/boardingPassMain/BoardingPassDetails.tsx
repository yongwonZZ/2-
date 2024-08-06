import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/boardingPass/BoardingPassDetails.module.css';
import Header from "../../components/Header";
import { AiOutlineShareAlt } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";

interface Ticket {
    airline: string;
    flightId: string;
    departure: string;
    arrival: string;
    departureTime: string;
    arrivalTime: string;
    gate: string;
    seat: string;
    baggage: string;
}

const BoardingPassDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [ticket, setTicket] = useState<Ticket | null>(null);

    useEffect(() => {
        const tickets = JSON.parse(localStorage.getItem('tickets') || '[]') as Ticket[];
        const ticketIndex = parseInt(id || '', 10);
        if (!isNaN(ticketIndex) && ticketIndex >= 0 && ticketIndex < tickets.length) {
            setTicket(tickets[ticketIndex]);
        } else {
            alert('티켓을 찾을 수 없습니다.');
            navigate('/boardingPass');
        }
    }, [id, navigate]);

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
            <div className="boarding-pass-details">
                <div className="details-header">
                    <button className="share-button" onClick={handleShare}>
                        <AiOutlineShareAlt /> 공유하기
                    </button>
                </div>
                <div className="ticket-info">
                    <div className="info-section">
                        <h3>항공사</h3>
                        <p>{ticket.airline}</p>
                    </div>
                    <div className="info-section">
                        <h3>항공편</h3>
                        <p>{ticket.flightId}</p>
                    </div>
                    <div className="info-section">
                        <h3>출발지</h3>
                        <p>{ticket.departure}</p>
                    </div>
                    <div className="info-section">
                        <h3>도착지</h3>
                        <p>{ticket.arrival}</p>
                    </div>
                    <div className="info-section">
                        <h3>출발 시간</h3>
                        <p>{ticket.departureTime}</p>
                    </div>
                    <div className="info-section">
                        <h3>도착 시간</h3>
                        <p>{ticket.arrivalTime}</p>
                    </div>
                    <div className="info-section">
                        <h3>탑승구</h3>
                        <p>{ticket.gate}</p>
                    </div>
                    <div className="info-section">
                        <h3>좌석</h3>
                        <p>{ticket.seat}</p>
                    </div>
                    <div className="info-section">
                        <h3>수하물</h3>
                        <p>{ticket.baggage}</p>
                    </div>
                </div>
                <div className="details-footer">
                    <button className="delete-button" onClick={handleDelete}>
                        <FaTrashAlt /> 삭제하기
                    </button>
                </div>
            </div>
        </>
    );
};

export default BoardingPassDetails;
