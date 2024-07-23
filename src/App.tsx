import { Routes, Route } from "react-router-dom";
import MainPage from "./mainPage/MainPage";
import AirlineSearchPage from "./airlinePage/AirlineSearchPage";
import AirlineAllPage from "./airlinePage/AirlineAllPage";
import ExchangeRatePage from "./ExchangeRatePage/ExchangeRatePage";
import ParkingPage from "./airlineInfoPages/Pages/ParkingPage";
import FacilitiesPage from "./airlineInfoPages/Pages/FacilitiesPage";
import TerminalMapPage from "./airlineInfoPages/Pages/TerminalMapPage";

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
      </Routes>
    </div>
  );
}

export default App;
