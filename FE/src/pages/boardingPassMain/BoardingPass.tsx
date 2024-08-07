import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import BoardingPassTicket from "./BoardingPassTicket";

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

const BoardingPass: React.FC = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const savedTickets = JSON.parse(localStorage.getItem('tickets') || '[]') as Ticket[];
        setTickets(savedTickets);
    }, []);

    const handleTicketClick = (index: number) => {
        navigate(`/boardingPass/${index}`);
    };

    return (
        <>
            <Header leftContent={"보딩패스"} />
            {tickets.map((ticket, index) => (
                <div key={index} onClick={() => handleTicketClick(index)}>
                    <BoardingPassTicket ticket={ticket} />
                </div>
            ))}
        </>
    );
};

export default BoardingPass;
