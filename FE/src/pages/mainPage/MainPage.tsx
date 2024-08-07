import MainPageLinkItem from "./mainPageComponents/MainPageLinkItem";
import styles from "../../styles/mainPage/MainPage.module.css";
import {
  flightsSearchImg,
  flightsAllImg,
  airportMapImg,
  congestionImg,
  facilitiesImg,
  parkingImg,
} from "./img";

function MainPage() {
  return (
    <div className={styles.wrapper}>
      <MainPageLinkItem
        icon={<img src={flightsSearchImg} alt="항공편검색" />}
        title="항공편 검색"
        navigateTo="/airline-search"
      />
      <MainPageLinkItem
        icon={<img src={flightsAllImg} alt="전체항공편" />}
        title="전체 항공편"
        navigateTo="/airline-all"
      />
      <MainPageLinkItem
        icon={<img src={airportMapImg} alt="공항터미널지도" />}
        title="공항 터미널 지도"
        navigateTo="/terminalmap"
      />
      <MainPageLinkItem
        icon={<img src={congestionImg} alt="출입국혼잡도" />}
        title="출입국 혼잡도"
        navigateTo="/congestion"
      />
      <MainPageLinkItem
        icon={<img src={facilitiesImg} alt="편의시설" />}
        title="편의시설"
        navigateTo="/facilities"
      />
      <MainPageLinkItem
        icon={<img src={parkingImg} alt="주차" />}
        title="주차"
        navigateTo="/parking"
      />
    </div>
  );
}

export default MainPage;
