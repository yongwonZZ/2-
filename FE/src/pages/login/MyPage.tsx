import React, { useMemo, useEffect } from "react";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import {
  handleLogout,
  useUser,
  fetchUserInfoFromLocalStorage,
} from "../../utils/userUtils/action";
import styles from "../../styles/myPage/Mypage.module.css";
import { FaChevronRight, FaTimes } from "react-icons/fa";

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

  const handleEditProfileClick = () => {
    navigate("editProfile");
  };

  return (
      <div className={styles.mypageWrapper}>
        <Header centerContent="마이페이지" />
        <div className={styles.mypageContainer}>
          <div className={styles.profileContainer}>
            <div className={styles.profileImage}></div>
            <div className={styles.profileInfo}>
              <p className={styles.nickname}>
                {memoizedUser?.userName || memoizedUser?.email}
              </p>
              <p className={styles.editInfo}>내 정보 수정</p>
            </div>
            <button className={styles.logoutButton} onClick={handleLogoutClick}>
              <FaTimes />
            </button>
          </div>
          <div className={styles.ticketContainer}>
            <div className={styles.ticketHeader}>
              <p>항공권 정보</p>
              <button className={styles.chevronButton}>
                <FaChevronRight />
              </button>
            </div>
          </div>
          <div className={styles.sectionContainer}>
            <div className={styles.section}>
              <p>공항 패션 히스토리</p>
              <button className={styles.chevronButton}>
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default MyPage;
