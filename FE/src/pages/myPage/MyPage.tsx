import React, { useMemo } from "react";
import Header from "../../components/Header";
import styles from "../../styles/myPage/Mypage.module.css";
import { useNavigate } from "react-router-dom";
import { handleLogout, useUser } from "../../utils/userUtils/action";

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const user = useUser();

  // useMemo를 사용하여 사용자 정보를 메모이제이션합니다.
  const memoizedUser = useMemo(() => user, [user]);

  return (
      <div className={styles.mypageContainer}>
        <Header leftContent={"마이페이지"} />
        <div className={styles.profileContainer}>
          <div className={styles.profileImage}></div>
          <div className={styles.profileInfo}>
            <p className={styles.nickname}>{memoizedUser?.email}</p>
            <p className={styles.editInfo}>내 정보 수정</p>
          </div>
          <button className={styles.moveButton}>수정</button>
        </div>
        <div className={styles.ticketContainer}>
          <div>
            <p>티켓</p>
            <p>n장</p>
          </div>
        </div>
        <div className={styles.sectionContainer}>
          <div className={styles.section}>
            <p>1:1 문의</p>
            <button className={styles.sectionButton}>수정</button>
          </div>
          <div className={styles.section}>
            <p>공항 패션 히스토리</p>
            <button className={styles.sectionButton}>수정</button>
          </div>
          <div className={styles.section}>
            <p>버전</p>
            <p> 0.0.1 </p>
          </div>
          <div className={styles.logoutContainer}>
            <button
                className={styles.logoutButton}
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
