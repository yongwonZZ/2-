import React, { useMemo, useEffect } from "react";
import Header from "../../../components/Header";
import { useNavigate } from "react-router-dom";
import {
  handleLogout,
  useUser,
  fetchUserInfoFromLocalStorage,
} from "../../../utils/userUtils/action";
import styles from "../../../styles/myPage/Mypage.module.css"; // CSS 파일을 임포트

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const user = useUser();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found, redirecting to login.");
      navigate("/login");
    }
  }, [navigate]);

  const memoizedUser = useMemo(() => user, [user]);

  const handleLogoutClick = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      handleLogout(navigate);
      alert("로그아웃 되었습니다.");
      navigate("/login");
    }
  };

  const handleFetchUserInfoClick = () => {
    fetchUserInfoFromLocalStorage();
  };

  return (
    <div className={styles["mypage-container"]}>
      <Header leftContent="마이페이지" />
      <div className={styles["profile-container"]}>
        <div className={styles["profile-image"]}></div>
        <div className={styles["profile-info"]}>
          <p className={styles.nickname}>
            {memoizedUser?.userName || memoizedUser?.email}
          </p>
          <p className={styles["edit-info"]}>내 정보 수정</p>
        </div>
        <button className={styles["move-button"]}>수정</button>
      </div>
      <div className={styles["ticket-counter"]}>
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
            onClick={handleLogoutClick}
          >
            로그아웃
          </button>
          <button
            className={styles["logout-button"]}
            onClick={handleFetchUserInfoClick}
          >
            회원정보 조회
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
