import React, { useState } from 'react';
import './BoardingPass.css';
import Header from "../../components/Header";
import BoardingPassTicket from './BoardingPassTicket';

interface BoardingPassProps {
    setTicketCount: React.Dispatch<React.SetStateAction<number>>;
}

const BoardingPass: React.FC<BoardingPassProps> = ({ setTicketCount }) => {
    const [tickets, setTickets] = useState<number[]>([]);

    const handleButtonClick = () => {
        setTickets([...tickets, tickets.length]);
        setTicketCount(prevCount => prevCount + 1);
    };

    return (
        <>
            <Header leftContent={"보딩패스"} />
            <button onClick={handleButtonClick}> 임시로 생성하기 </button>
            {tickets.map((ticket, index) => (
                <BoardingPassTicket key={index} />
            ))}
        </>
    );
};

export default BoardingPass;
