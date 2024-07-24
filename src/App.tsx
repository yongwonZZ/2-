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
import CongestionPage from "./airlineInfoPages/Pages/CongestionPage";

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
          <Route path="/exchange" element={<ExchangeRatePage />} />
          <Route path="/parking" element={<ParkingPage />} />
          <Route path="/facilities" element={<FacilitiesPage />} />
          <Route path="/terminalmap" element={<TerminalMapPage />} />
          <Route path="/airline-all" element={<AirlineAllPage />} />
            <Route path="/congestion" element={<CongestionPage />} />
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;
