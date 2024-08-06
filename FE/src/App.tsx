import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import MainPage from "./pages/mainPage/MainPage";
import AirlineSearchPage from "./pages/airlinePage/AirlineSearchPage";
import AirlineAllPage from "./pages/airlinePage/AirlineAllPage";
import ExChangeRatePage from "./pages/exchangeRatePage/ExchangeRatePage";
import ParkingPage from "./pages/airlineInfoPages/pages/ParkingPage";
import FacilitiesPage from "./pages/airlineInfoPages/pages/FacilitiesPage";
import TerminalMapPage from "./pages/airlineInfoPages/pages/TerminalMapPage";
import AirportFashion from "./pages/airportFashionMain/AirportFashion";
import LookDetails from "./pages/airportFashionMain/LookDetails";
import PostUpload from "./pages/airportFashionMain/postUpload/PostUpload";
import CongestionPage from "./pages/airlineInfoPages/pages/CongestionPage";
import AirlineDetailPage from "./pages/airlinePage/AirlineDetailPage";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import { PageNames } from "./utils/PageNames"; // Enum import
import LoginMain from './pages/login/LoginMain'; // loginMain import
import BoardingPassMain from './pages/boardingPassMain/BoardingPassMain'; // boardingPassMain import

const queryClient = new QueryClient();

function App() {
  const [ticketCount, setTicketCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  // 현재 경로에 따른 페이지 이름을 반환하는 함수
  const getPageName = (path: string) => {
    switch (path) {
      case '/':
        return PageNames.MAIN;
      case '/exchange':
        return '환율';
      case '/airportFashion':
        return '공항패션';
        // 필요한 다른 경로들도 추가합니다.
      default:
        return '';
    }
  };

  return (
      <div className='App'>
        <QueryClientProvider client={queryClient}>
          <Header
              leftContent={<button onClick={() => navigate(-1)}>뒤로 가기</button>}
              centerContent={getPageName(location.pathname)}
              rightContent={<button onClick={() => navigate('/help')}>도움말</button>}
          />
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/airline-search' element={<AirlineSearchPage />} />
            <Route path='/airline-search/:id' element={<AirlineDetailPage />} />
            <Route path='/exchange' element={<ExChangeRatePage />} />
            <Route path='/parking' element={<ParkingPage />} />
            <Route path='/facilities' element={<FacilitiesPage />} />
            <Route path='/terminalmap' element={<TerminalMapPage />} />
            <Route path='/airline-all' element={<AirlineAllPage />} />
            <Route path='/congestion' element={<CongestionPage />} />
            <Route path='/airportFashion' element={<AirportFashion />} />
            <Route path='/lookDetails' element={<LookDetails />} />
            <Route path='/postUpload' element={<PostUpload />} />

            {/* 로그인 및 마이페이지 관련 라우트 */}
            <Route path='/*' element={<LoginMain setTicketCount={setTicketCount} />} />
            {/* BoardingPass 관련 라우트 */}
            <Route path='/*' element={<BoardingPassMain setTicketCount={setTicketCount} />} />

          </Routes>
          <Navbar ticketCount={ticketCount} />
        </QueryClientProvider>
      </div>
  );
}

export default App;
