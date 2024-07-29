import React from "react";
import "./comments.css";
import { BsPersonFill as IconUserProfile } from "react-icons/bs";

const Comments: React.FC = () => {
  return (
    <div className='user-comment-container'>
      <IconUserProfile size={35} />
      <div className='comments'>
        <p>토마토마토</p>
        <p>오 예쁩니다. 👍👍</p>
      </div>
      <p className='date'>2024년 7월 25일</p>
    </div>
  );
};

export default Comments;
