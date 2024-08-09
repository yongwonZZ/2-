import Header from "../../components/Header";
import MainPageContainer from "./mainPageComponents/MainPageContainer";
import MainPageLinkItem from "./mainPageComponents/MainPageLinkItem";
import styles from "../../styles/mainPage/MainPage.module.css";
import {
  FaSearch,
  FaList,
  FaMapMarkedAlt,
  FaDoorOpen,
  FaConciergeBell,
  FaParking,
} from "react-icons/fa"; // icon 라이브러리

function MainPage() {
  /** 각 link-item별 라우트 설정 */
  return (
    <div className={styles.wrapper}>
      <Header centerContent="인천국제공항" />
      <MainPageContainer title="항공편">
        <MainPageLinkItem
          icon={<FaSearch className={styles.icon} />}
          title="항공편 검색"
          description="검색어로 항공편 찾기"
          navigateTo="/airline-search"
        />
        <MainPageLinkItem
          icon={<FaList className={styles.icon} />}
          title="전체 항공편"
          description="인천공항 모든 이륙/착륙 항공편"
          navigateTo="/airline-all"
        />
      </MainPageContainer>
      <MainPageContainer title="정보">
        <MainPageLinkItem
          icon={<FaMapMarkedAlt className={styles.icon} />}
          title="공항 터미널 지도"
          description="한 눈에 볼 수 있는 터미널 지도"
          navigateTo="/terminalmap"
        />
        <MainPageLinkItem
          icon={<FaDoorOpen className={styles.icon} />}
          title="출입국 혼잡도"
          description="시간별 출입국장 혼잡도 상태"
          navigateTo="/congestion"
        />
        <MainPageLinkItem
          icon={<FaConciergeBell className={styles.icon} />}
          title="편의시설"
          description="인천공항 내 편의시설 위치 및 정보"
          navigateTo="/facilities"
        />
        <MainPageLinkItem
          icon={<FaParking className={styles.icon} />}
          title="주차"
          description="실시간 주차 가능대수 정보"
          navigateTo="/parking"
        />
      </MainPageContainer>
    </div>
  );
}

export default MainPage;
