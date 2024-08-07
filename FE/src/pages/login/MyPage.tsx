import React, { useMemo, useEffect } from "react";
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';
import { handleLogout, useUser, fetchUserInfoFromLocalStorage } from '../../utils/userUtils/action';
import styles from '../../styles/myPage/Mypage.module.css'; // CSS 파일을 임포트

const MyPage: React.FC = () => {
    const navigate = useNavigate();
    const user = useUser();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('No token found, redirecting to login.');
            navigate('/login');
        }
    }, [navigate]);

    const memoizedUser = useMemo(() => user, [user]);

    const handleLogoutClick = () => {
        if (window.confirm('로그아웃 하시겠습니까?')) {
            handleLogout(navigate);
            alert('로그아웃 되었습니다.');
            navigate('/login');
        }
    };

    const handleFetchUserInfoClick = () => {
        fetchUserInfoFromLocalStorage();
    };

    const handleEditProfileClick = () => {
        console.log('Navigating to editProfile'); // 디버깅용 로그 추가
        navigate('editProfile'); // 상대 경로로 설정
    };

    return (
        <div className={styles.mypageContainer}>
            <Header leftContent="마이페이지" />
            <div className={styles.profileContainer}>
                <div className={styles.profileImage}></div>
                <div className={styles.profileInfo}>
                    <p className={styles.nickname}>{memoizedUser?.userName || memoizedUser?.email}</p>
                    <p className={styles.editInfo}>내 정보 수정</p>
                </div>
                <button className={styles.moveButton} onClick={handleEditProfileClick}>수정</button>
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
                    <button className={styles.logoutButton} onClick={handleLogoutClick}>로그아웃</button>
                    <button className={styles.logoutButton} onClick={handleFetchUserInfoClick}>회원정보 조회</button>
                </div>
            </div>
        </div>
    );
}

export default MyPage;
