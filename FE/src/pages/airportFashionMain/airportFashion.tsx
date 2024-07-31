import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./airportFashion.css";
import LookFilter from "./airportFashionComponents/LookFilter";
import FashionImagesItem from "./airportFashionComponents/FashionImagesItem";
import LookSort from "./airportFashionComponents/LookSort";
import { PiPencilSimpleLine } from "react-icons/pi";
import { IoIosArrowBack as IconArrowBack } from "react-icons/io";

const AirportFashion: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackClick = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  const handleUploadButtonClick = () => {
    navigate("/PostUpload");
  };

  const uploadedData = location.state as {
    images: string[];
    text: string;
  } | null;

  return (
    <div className='airport-fashion-main-container'>
      <div className='airport-fashion-top'>
        <button className='back-button' onClick={handleBackClick}>
          <IconArrowBack size={20} />
        </button>
        <h1>공항 패션</h1>
        <hr />
        <LookFilter />
        <LookSort />
      </div>
      <div className='fashion-items-top'>
        <div className='fashion-items-container'>
          {uploadedData?.images &&
            uploadedData.images.map((url, index) => (
              <FashionImagesItem
                key={index}
                imageUrl={url}
                description={uploadedData.text}
              />
            ))}
        </div>
      </div>
      <div className='upload-button'>
        <button onClick={handleUploadButtonClick}>
          <PiPencilSimpleLine size={24} />
        </button>
      </div>
    </div>
  );
};

export default AirportFashion;
