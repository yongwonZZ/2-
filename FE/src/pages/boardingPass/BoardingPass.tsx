import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BoardingPass.css';
import Header from "../../components/Header";
import BoardingPassTicket from './BoardingPassTicket';

interface BoardingPassProps {
    setTicketCount: React.Dispatch<React.SetStateAction<number>>;
}

const BoardingPass: React.FC<BoardingPassProps> = ({ setTicketCount }) => {
    const [tickets, setTickets] = useState<number[]>([]);
    const navigate = useNavigate();

    const handleButtonClick = () => {
        setTickets([...tickets, tickets.length]);
        setTicketCount(prevCount => prevCount + 1);
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
