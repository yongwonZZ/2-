import React from "react";
import "./airportFashion.css";
import { PiPencilSimpleLine } from "react-icons/pi";
import LookFilter from "./airportFashionComponents/LookFilter";
import FashionImagesItem from "./airportFashionComponents/FashionImagesItem";
import LookSort from "./airportFashionComponents/LookSort";
import Navbar from "../publicComponents/Navbar";

const AirportFashion: React.FC = () => {
  return (
    <div>
      <h1>공항 패션</h1>
      <hr />
      <LookFilter />
      <LookSort />
      <div className='fashion-items-container'>
        <FashionImagesItem />
        <FashionImagesItem />
        <FashionImagesItem />
      </div>
      <div className='upload-button'>
        <button>
          <PiPencilSimpleLine size={20} />
        </button>
      </div>
      <Navbar />
    </div>
  );
};

export default AirportFashion;
