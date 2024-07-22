import { Link } from "react-router-dom";
import Header from "../publicComponents/Header";
import MainPageContainer from "../mainPageComponents/MainPageContainer";
import CodeShareOptions from "../mainPageComponents/CodeShareOptions";
import Navbar from "../publicComponents/Navbar";
import { useState } from "react";
import styles from "./MainPage.module.css";

function MainPage() {
  const [codeshareStatus, setCodeshareStatus] = useState(true);

  return (
    <div className={styles.wrapper}>
      <Header>
        <h1>인천국제공항</h1>
      </Header>
      <MainPageContainer
        title="항공편"
        option={
          <CodeShareOptions
            onSwitch={(isChecked: boolean) => setCodeshareStatus(isChecked)}
            isChecked={codeshareStatus}
          />
        }
      >
        <Link to="/airline-search">항공편 검색</Link>
        <Link to="#">전체 항공편</Link>
      </MainPageContainer>
      <MainPageContainer title="정보">
        <Link to="#">공항 터미널 지도</Link>
        <Link to="#">출입국 혼잡도</Link>
        <Link to="#">편의시설</Link>
        <Link to="#">주차</Link>
      </MainPageContainer>
      <Navbar />
    </div>
  );
}

export default MainPage;
