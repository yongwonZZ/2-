import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import styles from "../../styles/airportFashion/airportFashionPost/lookDetails.module.css";
import PostComment from "./postComment/PostComment";
import FormatDate from "../../components/FormatDate";

import { IoIosArrowBack as IconArrowBack } from "react-icons/io";
import { BsPersonFill as IconUserProfile } from "react-icons/bs";
import { GoKebabHorizontal as IconKebabMenu } from "react-icons/go";
import { IoMdHeartEmpty as IconLikeNo } from "react-icons/io";
import { IoMdHeart as IconLikeYes } from "react-icons/io";
import { GoComment as IconComment } from "react-icons/go";

const LookDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { imageUrl, description, style, date } = location.state as {
    imageUrl: string;
    description: string;
    style: string;
    date: string;
  };

  const handleBackClick = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  // 댓글 상태
  const [isCommentOpen, setCommentOpen] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const [firstComment, setFirstComment] = useState<string | null>(null);

  // 좋아요 상태
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const handleCommentClick = () => {
    setCommentOpen(true);
  };

  const handleCommentClose = () => {
    setCommentOpen(false);
  };

  const handleLikeClick = () => {
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    setIsLiked(!isLiked);
  };

  const updateCommentCount = (count: number) => {
    setCommentCount(count);
  };

  const updateFirstComment = (comment: string) => {
    setFirstComment(comment);
  };

  return (
    <div>
      <div className={styles["top-container"]}>
        <div className={styles["look-details-top"]}>
          <button className={styles["back-button"]} onClick={handleBackClick}>
            <IconArrowBack size={20} />
          </button>
          <h1>{style}</h1>
        </div>
        <hr />
      </div>

      <div className={styles["user-post-info-top"]}>
        <div className={styles["user-post-info"]}>
          <button>
            <IconUserProfile size={37} />
          </button>
          <div>
            <p>사용자이름</p>
            <p>{date}</p>
          </div>
          <button>
            <IconKebabMenu size={15} />
          </button>
        </div>
      </div>
      <div className={styles["fashion-image"]}>
        <img src={imageUrl} alt={`Fashion-Image`} />
      </div>
      <div className={styles["like-comment-icon"]}>
        <button className={styles["like-button"]} onClick={handleLikeClick}>
          {isLiked ? <IconLikeYes size={28} /> : <IconLikeNo size={28} />}
        </button>
        <button
          className={styles["comment-button"]}
          onClick={handleCommentClick}
        >
          <IconComment size={25} />
        </button>
      </div>
      <div className={styles["post-bottom-container"]}>
        <p>좋아요 {likeCount}개</p>
        <p>{description}</p>
        <div className={styles["post-comment-container"]}>
          {firstComment ? (
            <>
              <p>토마토마토</p>
              <p>{firstComment}</p>
            </>
          ) : (
            <p>댓글이 없습니다.</p>
          )}
        </div>
        <button onClick={handleCommentClick}>
          {commentCount}개 댓글 더보기
        </button>
      </div>
      {isCommentOpen && (
        <PostComment
          onClose={handleCommentClose}
          updateCommentCount={updateCommentCount}
          updateFirstComment={updateFirstComment}
        />
      )}
    </div>
  );
};

export default LookDetails;
