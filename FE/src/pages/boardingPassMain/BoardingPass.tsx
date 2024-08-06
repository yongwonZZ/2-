import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/boardingPass/BoardingPass.module.css';
import Header from "../../components/Header";
import BoardingPassTicket from './BoardingPassTicket';

const BoardingPass: React.FC = () => {
    const [tickets, setTickets] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedTickets = JSON.parse(localStorage.getItem('tickets') || '[]');
        setTickets(storedTickets);
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
