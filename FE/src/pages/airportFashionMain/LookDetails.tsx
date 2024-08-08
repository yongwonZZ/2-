import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import styles from "../../styles/airportFashion/airportFashionPost/lookDetails.module.css";
import PostComment from "./postComment/PostComment";
import FormatDate from "../../components/FormatDate";
import { loadComments } from "./postComment/commentUtils";
import {
  saveLikeStatus,
  loadLikeStatus,
  getLikeCount,
  hasUserLiked,
} from "./postComment/likeUtils";

import { IoIosArrowBack as IconArrowBack } from "react-icons/io";
import { BsPersonFill as IconUserProfile } from "react-icons/bs";
import { GoKebabHorizontal as IconKebabMenu } from "react-icons/go";
import { IoMdHeartEmpty as IconLikeNo } from "react-icons/io";
import { IoMdHeart as IconLikeYes } from "react-icons/io";
import { GoComment as IconComment } from "react-icons/go";

const LookDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, name, imageUrl, description, style, date, token } =
    location.state as {
      id: string;
      name: string;
      imageUrl: string;
      description: string;
      style: string;
      date: string;
      token: string;
    };

  const handleBackClick = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  // 현재 로그인한 사용자 토큰
  const currentUser = localStorage.getItem("token") || "";

  // 좋아요 상태
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const userHasLiked = hasUserLiked(id, currentUser);
    setIsLiked(userHasLiked);
    setLikeCount(getLikeCount(id));
  }, [id, currentUser]);

  const handleLikeClick = () => {
    const newLikeStatus = !isLiked;
    setLikeCount((prev) => (newLikeStatus ? prev + 1 : prev - 1));
    setIsLiked(newLikeStatus);
    saveLikeStatus(id, currentUser, newLikeStatus);
  };

  // 댓글 상태
  const [isCommentOpen, setCommentOpen] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const [firstComment, setFirstComment] =
    useState<{ text: string; userName: string } | null>(null);

  const handleCommentClick = () => {
    setCommentOpen(true);
  };

  const handleCommentClose = () => {
    setCommentOpen(false);
  };

  const updateCommentCount = (count: number) => {
    setCommentCount(count);
  };

  const updateFirstComment = (comment: { text: string; userName: string }) => {
    setFirstComment(comment);
  };

  useEffect(() => {
    const initialComments = loadComments(id);
    setCommentCount(initialComments.length);
    if (initialComments.length > 0) {
      setFirstComment(initialComments[0]);
    } else {
      setFirstComment(null);
    }
  }, [id]);

  // 로컬 스토리지 사용자 이름 가져오기
  const userString = localStorage.getItem("user");
  const userName: string = userString
    ? JSON.parse(userString).userName ?? ""
    : "";

  // 게시글 삭제 상태
  const [isDeleteMenuOpen, setIsDeleteMenuOpen] = useState(false);

  const handleDeleteClick = () => {
    if (currentUser == token) {
      // 로컬 스토리지에서 게시글 삭제
      const storedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
      const updatedPosts = storedPosts.filter((post: any) => post.id !== id);
      localStorage.setItem("posts", JSON.stringify(updatedPosts));

      navigate("/airportFashion"); // 게시글 삭제 후 메인 페이지로 이동
    } else {
      alert("본인이 작성한 게시글만 삭제할 수 있습니다.");
    }
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
            <p>{name}</p>
            <p>
              <FormatDate date={date} />
            </p>
          </div>
          <button onClick={() => setIsDeleteMenuOpen(!isDeleteMenuOpen)}>
            <IconKebabMenu size={15} />
          </button>
          {isDeleteMenuOpen && (
            <div className={styles["delete-menu"]}>
              <button onClick={handleDeleteClick}>삭제</button>
              <button onClick={() => setIsDeleteMenuOpen(false)}>취소</button>
            </div>
          )}
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
              <p>{firstComment.userName}</p>
              <p>{firstComment.text}</p>
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
          userName={userName}
          postId={id}
        />
      )}
    </div>
  );
};

export default LookDetails;
