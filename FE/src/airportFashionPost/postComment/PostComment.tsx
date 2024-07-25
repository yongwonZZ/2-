import React from "react";
import { useState } from "react";
import "../lookDetails.css";
import Comments from "./Comments";
import { IoCloseOutline as IconClose } from "react-icons/io5";
import { GoArrowUp } from "react-icons/go";

interface PostCommentProps {
  onClose: () => void;
}

const PostComment: React.FC<PostCommentProps> = ({ onClose }) => {
  return (
    <div className='comment-overlay'>
      <div className='comment-container'>
        <div className='comment-top'>
          <p>댓글</p>
          <button className='close-button' onClick={onClose}>
            <IconClose size={25} />
          </button>
        </div>
        <Comments />
        <Comments />
        <Comments />
        <Comments />
        <Comments />
        <Comments />
        <Comments />
        <Comments />

        <div className='comment-input'>
          <hr />
          <input placeholder='댓글을 남겨보세요.'></input>
          <button className='registration-button'>
            <GoArrowUp size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostComment;
