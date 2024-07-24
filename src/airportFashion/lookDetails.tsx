import React from "react";
import "./airportFashionComponents/lookDetails.css";
import { useLocation } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { BsPersonFill } from "react-icons/bs";
import { GoKebabHorizontal } from "react-icons/go";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";

import FashionImagesItem from "./airportFashionComponents/FashionImagesItem";

const LookDetails: React.FC = () => {
  const location = useLocation();
  const { imageUrl } = location.state as { imageUrl: string };

  return (
    <div>
      <div className='top-container'>
        <button>
          <IoIosArrowBack size={20} />
        </button>
        <h1>스트릿</h1>
      </div>
      <hr />
      <div className='user-post-info'>
        <BsPersonFill size={30} />
        <div>
          <p>사용자이름</p>
          <p>2024년 07월 24일</p>
        </div>
        <GoKebabHorizontal />
      </div>
      <div className='fashion-items-container'>
        <img src={imageUrl} alt={`Fashion-Image`} />
      </div>
      <div className='like-comment-icon'>
        <IoMdHeartEmpty />
        <FaRegComment />
      </div>
    </div>
  );
};

export default LookDetails;
