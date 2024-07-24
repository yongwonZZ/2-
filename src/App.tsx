import { Routes, Route } from "react-router-dom";
import MainPage from "./mainPage/MainPage";
import AirlineSearchPage from "./airlinePage/AirlineSearchPage";
import AirlineAllPage from "./airlinePage/AirlineAllPage";
import ExchangeRatePage from "./ExchangeRatePage/ExchangeRatePage";
import ParkingPage from "./airlineInfoPages/Pages/ParkingPage";
import FacilitiesPage from "./airlineInfoPages/Pages/FacilitiesPage";
import TerminalMapPage from "./airlineInfoPages/Pages/TerminalMapPage";
import BoardingPass from "./boardingPass/BoardingPass";
import Login from "./login/Login";
import MyPage from "./myPage/MyPage";
import AirportFashion from "./airportFashion/airportFashion"
// 라우팅 설명
// Routes 하위의 Route 컴포넌트: 다양한 URL 경로에 대한 라우트 정의
// Header, Navbar 컴포넌트: 각각의 페이지 안에 속하도록 구성
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/airline-search" element={<AirlineSearchPage />} />
        <Route path="/exchange" element={<ExchangeRatePage />} />
        <Route path="/parking" element={<ParkingPage />} />
        <Route path="/facilities" element={<FacilitiesPage />} />
        <Route path="/terminalmap" element={<TerminalMapPage />} />
        <Route path="/airline-all" element={<AirlineAllPage />} />

        <Route path="/BoardingPass" element={<BoardingPass />} />
        <Route path="/Login" element={<Login />}/>
        <Route path="/MyPage" element={<MyPage />}/>
        <Route path="/airportFashion" element={<AirportFashion />} />
      </Routes>
    </div>
  );
}

export default App;
