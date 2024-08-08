import React, { useMemo, useEffect, useState } from "react";
import Header from "../../components/Header"; // 기존 스타일 유지
import { useNavigate } from "react-router-dom";
import {
  handleLogout,
  useUser,
} from "../../utils/userUtils/action";
import styles from "../../styles/myPage/Mypage.module.css";
import { FaChevronRight, FaTimes } from "react-icons/fa";
import BoardingPassTicket from "../boardingPassMain/BoardingPassTicket";

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const user = useUser();
  const [showTicketDetails, setShowTicketDetails] = useState(false);

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

  const toggleTicketDetails = () => {
    setShowTicketDetails((prev) => !prev);
  };

  return (
      <div className={styles.mypageWrapper}>
        <Header leftContent={""} centerContent="마이페이지" rightContent={""} />
        <div className={styles.mypageContainer}>
          <div className={styles.profileContainer}>
            <div className={styles.profileImage}></div>
            <div className={styles.profileInfo}>
              <p className={styles.nickname}>
                {memoizedUser?.userName || memoizedUser?.email}
              </p>
              <p
                  className={styles.editInfo}
                  onClick={handleEditProfileClick}
              >
                내 정보 수정
              </p>
            </div>
            <button className={styles.logoutButton} onClick={handleLogoutClick}>
              <FaTimes />
            </button>
          </div>
          <div className={styles.ticketContainer}>
            <div
                className={`${styles.ticketHeader} ${
                    showTicketDetails ? styles.active : ""
                }`}
                onClick={toggleTicketDetails}
            >
              <p>항공권 정보</p>
              <button
                  className={`${styles.chevronButton} ${
                      showTicketDetails ? styles.rotateChevron : ""
                  }`}
              >
                <FaChevronRight />
              </button>
            </div>
            <div
                className={`${styles.ticketDetails} ${
                    showTicketDetails ? "show" : ""
                }`}
            >
              {/* 보딩패스 정보나 티켓 정보 등 */}
              <BoardingPassTicket
                  ticket={{
                    airline: "대한항공",
                    flightId: "KE123",
                    airport: "인천국제공항",
                    airportCode: "ICN",
                    carousel: "5",
                    codeshare: "KE123",
                    estimatedDateTime: "2024-08-01T10:00:00",
                    exitnumber: "G5",
                    gatenumber: "10",
                    remark: "On Time",
                    scheduleDateTime: "2024-08-01T09:00:00",
                    terminalid: "1",
                    direction: "출발",
                    chkinrange: "09:00-10:00",
                  }}
              />
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
