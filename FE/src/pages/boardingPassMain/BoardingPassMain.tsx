import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BoardingPass from './BoardingPass';
import BoardingPassDetails from './BoardingPassDetails';

const BoardingPassMain: React.FC = () => {
    return (
        <Routes>
            <Route path='/boardingPass' element={<BoardingPass  />} />
            <Route path='/boardingPass/:id' element={<BoardingPassDetails />} />
        </Routes>
    );
};

export default BoardingPassMain;