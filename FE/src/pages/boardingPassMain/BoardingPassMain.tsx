import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BoardingPass from './BoardingPass';
import BoardingPassDetails from './BoardingPassDetails';

const BoardingPassMain: React.FC<{ setTicketCount: React.Dispatch<React.SetStateAction<number>> }> = ({ setTicketCount }) => {
    return (
        <Routes>
            <Route path='/boardingPass' element={<BoardingPass setTicketCount={setTicketCount} />} />
            <Route path='/boardingPass/:id' element={<BoardingPassDetails setTicketCount={setTicketCount} />} />
        </Routes>
    );
};

export default BoardingPassMain;