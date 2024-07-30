import { Routes, Route } from "react-router-dom";
// @ts-ignore
import { QueryClient, QueryClientProvider } from "react-query";
import MainPage from "./pages/mainPage/MainPage";
import AirlineSearchPage from "./pages/airlinePage/AirlineSearchPage";
import AirlineAllPage from "./pages/airlinePage/AirlineAllPage";
import ExchangeRatePage from "./pages/ExchangeRatePage/ExchangeRatePage";
import ParkingPage from "./pages/airlineInfoPages/Pages/ParkingPage";
import FacilitiesPage from "./pages/airlineInfoPages/Pages/FacilitiesPage";
import TerminalMapPage from "./pages/airlineInfoPages/Pages/TerminalMapPage";
import BoardingPass from "./pages/boardingPass/BoardingPass";
import Login from "./pages/login/Login";
import MyPage from "./pages/myPage/MyPage";
import AirportFashion from "./pages/airportFashionMain/airportFashion";
import LookDetails from "./pages/airportFashionPost/lookDetails";
import PostUpload from "./pages/airportFashionPost/postUpload/PostUpload";
import CongestionPage from "./pages/airlineInfoPages/Pages/CongestionPage";
import AirlineDetailPage from "./pages/airlinePage/AirlineDetailPage";
import Navbar from "./components/Navbar";
import SelectCountryPage from "./pages/ExchangeRatePage/SelectCountryPage";

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
          <Route path="/postUpload" element={<PostUpload />} />
          <Route
            path="/exchange/selectcontry"
            element={<SelectCountryPage />}
          />
        </Routes>
        <Navbar />
      </QueryClientProvider>
    </div>
  );
}

export default App;
