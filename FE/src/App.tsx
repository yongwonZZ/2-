import { Routes, Route } from "react-router-dom";
// @ts-ignore
import { QueryClient, QueryClientProvider } from "react-query";
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
import AirportFashion from "./airportFashionMain/airportFashion";
import LookDetails from "./airportFashionPost/lookDetails";
import CongestionPage from "./airlineInfoPages/Pages/CongestionPage";
import AirlineDetailPage from "./airlinePage/AirlineDetailPage";

const queryClient = new QueryClient();

// 라우팅 설명
// Routes 하위의 Route 컴포넌트: 다양한 URL 경로에 대한 라우트 정의
// Header, Navbar 컴포넌트: 각각의 페이지 안에 속하도록 구성
// QueryClientProvider로 감싼 컴포넌트들은 react-query를 사용 가능
function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/airline-search" element={<AirlineSearchPage />} />
          <Route path="/airline-search/:id" element={<AirlineDetailPage />} />
          <Route path="/exchange" element={<ExchangeRatePage />} />

          <Route path="/parking" element={<ParkingPage />} />
          <Route path="/facilities" element={<FacilitiesPage />} />
          <Route path="/terminalmap" element={<TerminalMapPage />} />
          <Route path="/airline-all" element={<AirlineAllPage />} />
          <Route path="/congestion" element={<CongestionPage />} />
          <Route path="/BoardingPass" element={<BoardingPass />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/MyPage" element={<MyPage />} />
          <Route path="/airportFashion" element={<AirportFashion />} />
          <Route path="/lookDetails" element={<LookDetails />} />
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;
