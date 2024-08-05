import React from "react";
import "../../../styles/airportFashionPost/comments.css";
import { BsPersonFill as IconUserProfile } from "react-icons/bs";

interface CommentsProps {
  comment: string;
}

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  return `${year}년 ${month}월 ${day}일`;
};

const Comments: React.FC<CommentsProps> = ({ comment }) => {
  const currentDate = formatDate(new Date());

  return (
    <div>
      <div className='user-comment-container'>
        <IconUserProfile size={35} />
        <div className='comments'>
          <p>토마토마토</p>
          <p>{comment}</p>
        </div>
      </div>
      <p className='date'>{currentDate}</p>
    </div>
  );
};

export default Comments;
