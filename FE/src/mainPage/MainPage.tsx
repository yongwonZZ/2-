import Header from "../publicComponents/Header";
import MainPageContainer from "../mainPageComponents/MainPageContainer";
import CodeShareOptions from "../mainPageComponents/CodeShareOptions";
import MainPageLinkItem from "../mainPageComponents/MainPageLinkItem";
import Navbar from "../publicComponents/Navbar";
import { useState } from "react";
import styles from "./MainPage.module.css";
import {
  FaSearch,
  FaList,
  FaMapMarkedAlt,
  FaDoorOpen,
  FaConciergeBell,
  FaParking,
} from "react-icons/fa"; // icon 라이브러리

function MainPage() {
  /** 코드쉐어 상태값 */
  const [codeshareStatus, setCodeshareStatus] = useState(true);

  /** 각 link-item별 라우트 설정 */
  return (
    <div className={styles.wrapper}>
      <Header leftContent="인천국제공항" />
      <MainPageContainer
        title="항공편"
        option={
          <CodeShareOptions
            onSwitch={(isChecked: boolean) => setCodeshareStatus(isChecked)}
            isChecked={codeshareStatus}
          />
        }
      >
        <MainPageLinkItem
          icon={<FaSearch className={styles.icon} />}
          title="항공편 검색"
          navigateTo="/airline-search"
        />
        <MainPageLinkItem
          icon={<FaList className={styles.icon} />}
          title="전체 항공편"
          navigateTo="/airline-all"
        />
      </MainPageContainer>
      <MainPageContainer title="정보">
        <MainPageLinkItem
          icon={<FaMapMarkedAlt className={styles.icon} />}
          title="공항 터미널 지도"
          navigateTo="/terminalmap"
        />
        <MainPageLinkItem
          icon={<FaDoorOpen className={styles.icon} />}
          title="출입국 혼잡도"
          navigateTo="/congestion"
        />
        <MainPageLinkItem
          icon={<FaConciergeBell className={styles.icon} />}
          title="편의시설"
          navigateTo="/facilities"
        />
        <MainPageLinkItem
          icon={<FaParking className={styles.icon} />}
          title="주차"
          navigateTo="/parking"
        />
      </MainPageContainer>
      <Navbar />
    </div>
  );
}

export default MainPage;
