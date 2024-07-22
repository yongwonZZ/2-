import { Link } from "react-router-dom";
import Header from "../mainPageComponents/Header";
import MainPageCard from "../mainPageComponents/MainPageCard";
import CodeShareOptions from "../mainPageComponents/CodeShareOptions";
import Navbar from "../mainPageComponents/Navbar";
import { useState } from "react";

function MainPage() {
  const [codeshareStatus, setCodeshareStatus] = useState(true);

  return (
    <>
      <Header>
        <h1>인천국제공항</h1>
      </Header>
      <MainPageCard
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
      </MainPageCard>
      <MainPageCard title="정보">
        <Link to="#">공항 터미널 지도</Link>
        <Link to="#">출입국 혼잡도</Link>
        <Link to="#">편의시설</Link>
        <Link to="#">주차</Link>
      </MainPageCard>
      <Navbar />
    </>
  );
}

export default MainPage;
