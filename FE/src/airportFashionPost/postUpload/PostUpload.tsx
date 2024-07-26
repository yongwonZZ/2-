import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./postUpload.css";

import { IoIosArrowBack as IconArrowBack } from "react-icons/io";
import { GoPlus as IconPlus } from "react-icons/go";
import { IoCloseOutline as IconClose } from "react-icons/io5";

const PostUpload: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  const [text, setText] = useState("");
  const maxLength = 100;

  const handleLengthCheck = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <div className='post-upload-container'>
      <div className='top-container'>
        <button className='back-button' onClick={handleBackClick}>
          <IconArrowBack size={20} />
        </button>
        <h1>코디 올리기</h1>
      </div>
      <hr />
      <p className='description'>스타일이 잘 보이는 사진으로 올려주세요!</p>
      <div className='image-container'>
        <div className='image-file-button'>
          <button>
            <IconPlus size={20} />
          </button>
          <p>1/10</p>
        </div>
        <div className='image-seleted'>
          <img src='https://lh4.googleusercontent.com/proxy/NH1xONh1jGqnN1DAWR_giRaO5CP_105vJku5kck4Qf6yk51Q98tZrrHZSsjssL-Ff2okDMRLb9R_akeNJ5BDHICDyX6wXJP-Olur1YZ1C9xw' />
          <button>
            <IconClose size={16} />
          </button>
        </div>
      </div>
      <p className='description'>내용을 입력해주세요.</p>
      <div className='textarea-container'>
        <textarea
          placeholder='착용한 #스타일을 소개해주세요.'
          maxLength={maxLength}
          onChange={handleLengthCheck}
        ></textarea>
        <p>
          {text.length}/{maxLength}
        </p>
      </div>
      <p className='description'>스타일</p>
      <div>
        <div className='look-style-button'>
          <button>캐주얼</button>
          <button>오피스</button>
          <button>빈티지</button>
          <button>스포티</button>
          <button>럭셔리</button>
          <button>시크</button>
          <button>키치</button>
        </div>
      </div>
      <button className='post-registration-button'>등록하기</button>
    </div>
  );
};

export default PostUpload;
