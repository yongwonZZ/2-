import React from "react";
import "./airportFashion.css";
import UploadIcon from "./images/pen-upload.svg";
import FashionImagesItem from "./airportFashionComponents/FashionImagesItem";

function AirportFashion() {
  return (
    <div>
      <h1>공항 패션</h1>
      <hr />
      <div className='look-button-container'>
        <button>캐주얼</button>
        <button>스트릿</button>
        <button>빈티지</button>
        <button>시크</button>
        <button>키치</button>
        <button>??</button>
        <button>??</button>
      </div>
      <div className='fashion-items-container'>
        <FashionImagesItem />
        <FashionImagesItem />
        <FashionImagesItem />
      </div>
      <div className='upload-button'>
        <button>
          <img src={UploadIcon} alt='Upload Icon' />
        </button>
      </div>
    </div>
  );
}

export default AirportFashion;
