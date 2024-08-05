import React from "react";
import styles from "../../../styles/airportFashion/airportFashionPost/comments.module.css";
import { BsPersonFill as IconUserProfile } from "react-icons/bs";
import FormatDate from "../../../components/FormatDate";

interface CommentsProps {
  comment: string;
}

const Comments: React.FC<CommentsProps> = ({ comment }) => {
  const currentDate = new Date();

  return (
    <div>
      <div className={styles["user-comment-container"]}>
        <IconUserProfile size={35} />
        <div className={styles["comments"]}>
          <p>토마토마토</p>
          <p>{comment}</p>
        </div>
      </div>
      <p className={styles["date"]}>
        <FormatDate date={currentDate} />
      </p>
    </div>
  );
};

export default Comments;
