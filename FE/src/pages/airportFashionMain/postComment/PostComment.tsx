import React from "react";
import { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";
import styles from "../../../styles/airportFashion/airportFashionPost/comments.module.css";
import Comments from "./Comments";
import { saveComments, loadComments } from "./commentUtils"; // 추가

import { IoCloseOutline as IconClose } from "react-icons/io5";
import { GoArrowUp } from "react-icons/go";

interface PostCommentProps {
  onClose: () => void;
  updateCommentCount: (count: number) => void;
  updateFirstComment: (comment: { text: string; userName: string }) => void;
  userName: string;
  postId: string;
}

const PostComment: React.FC<PostCommentProps> = ({
  onClose,
  updateCommentCount,
  updateFirstComment,
  userName,
  postId,
}) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<
    { userName: string; text: string }[]
  >([]);

  useEffect(() => {
    const initialComments = loadComments(postId);
    setComments(initialComments);
  }, [postId]);

  const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      const newComment = { userName, text: commentText.trim() };
      const updatedComments = [...comments, newComment];
      setComments(updatedComments);
      setCommentText("");
      updateCommentCount(updatedComments.length);
      if (updatedComments.length === 1) {
        updateFirstComment(newComment);
      }
      saveComments(postId, updatedComments);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommentSubmit();
    }
  };

  return (
    <div className={styles["comment-overlay"]}>
      <div className={styles["comment-container"]}>
        <div className={styles["comment-top"]}>
          <p>댓글</p>
          <button className={styles["close-button"]} onClick={onClose}>
            <IconClose size={25} />
          </button>
        </div>
        <div className={styles["comments-box"]}>
          {comments.map((comment, index) => (
            <Comments key={index} comment={comment} />
          ))}
        </div>

        <div className={styles["comment-input"]}>
          <hr />
          <input
            placeholder='댓글을 남겨보세요.'
            value={commentText}
            onChange={handleCommentChange}
            onKeyDown={handleKeyPress}
          ></input>
          <button
            className={styles["registration-button"]}
            onClick={handleCommentSubmit}
          >
            <GoArrowUp size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostComment;
