import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/boardingPass/BoardingPass.module.css';
import Header from "../../components/Header";
import BoardingPassTicket from './BoardingPassTicket';


const BoardingPass: React.FC = () => {
    const [tickets, setTickets] = useState<number[]>([]);
    const navigate = useNavigate();

    const handleButtonClick = () => {
        setTickets([...tickets, tickets.length]);
    };

    const handleTicketClick = (index: number) => {
        navigate(`/boardingPass/${index}`);
    };

    return (
        <>
            <Header leftContent={"보딩패스"} />
            <button onClick={handleButtonClick}> 임시로 생성하기 </button>
            {tickets.map((ticket, index) => (
                <div key={index} onClick={() => handleTicketClick(index)}>
                    <BoardingPassTicket />
                </div>
            ))}
        </>
    );
};

export default BoardingPass;
