import React, { useMemo } from "react";
import Header from "../../components/Header";
import styles from "../../styles/myPage/Mypage.module.css";
import { useNavigate } from "react-router-dom";
import { handleLogout, useUser } from "../../utils/userUtils/action";

interface User {
  email: string;
  nickname?: string;
}

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const user = useUser();

  // useMemo를 사용하여 사용자 정보를 메모이제이션합니다.
  const memoizedUser = useMemo(() => user, [user]);

  return (
    <div className={styles["mypage-container"]}>
      <Header leftContent={"마이페이지"} />
      <div className={styles["profile-container"]}>
        <div className={styles["profile-image"]}></div>
        <div className={styles["profile-info"]}>
          <p className={styles.nickname}>
            {memoizedUser?.nickname || memoizedUser?.email}
          </p>
          <p className={styles["edit-info"]}>내 정보 수정</p>
        </div>
        <button className={styles["move-button"]}>수정</button>
      </div>
      <div className={styles["ticket-container"]}>
        <div>
          <p>티켓</p>
          <p>n장</p>
        </div>
      </div>
      <div className={styles["section-container"]}>
        <div className={styles.section}>
          <p>1:1 문의</p>
          <button className={styles["section-button"]}>수정</button>
        </div>
        <div className={styles.section}>
          <p>공항 패션 히스토리</p>
          <button className={styles["section-button"]}>수정</button>
        </div>
        <div className={styles.section}>
          <p>버전</p>
          <p> 0.0.1 </p>
        </div>
        <div className={styles["logout-container"]}>
          <button
            className={styles["logout-button"]}
            onClick={() => handleLogout(navigate)}
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
