import { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import AirportFashion from "./pages/airportFashionMain/AirportFashion";
import LookDetails from "./pages/airportFashionMain/LookDetails";
import PostUpload from "./pages/airportFashionMain/postUpload/PostUpload";
import Navbar from "./components/Navbar";
import { PageNames } from "./utils/PageNames"; // Enum import
import { getPageName } from "./utils/getPageName"; // 타이틀 업데이트 함수
import LoginMain from "./pages/login/LoginMain"; // loginMain import
import BoardingPassMain from "./pages/boardingPassMain/BoardingPassMain"; // boardingPassMain import
import AirPortMain from "./pages/airPortsMain/AirPortMain"; // airPortMain import
import ExchangeRatePage from "./pages/exchangeRatePage/ExchangeRatePage";

const queryClient = new QueryClient();

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const pageTitle = getPageName(location.pathname);
    document.title = `SkyMaestro | ${pageTitle}`; // 경로 변경될 때마다 타이틀 업데이트
  }, [location.pathname]);

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Routes>
          {/* 공항 관련 라우트 */}
          <Route path="/*" element={<AirPortMain />} />

          <Route path="/exchange" element={<ExchangeRatePage />} />
          <Route path="/airportFashion" element={<AirportFashion />} />
          <Route path="/lookDetails" element={<LookDetails />} />
          <Route path="/postUpload" element={<PostUpload />} />

          {/* 로그인 및 마이페이지 관련 라우트 */}
          <Route path="/login/*" element={<LoginMain />} />

          {/* BoardingPass 관련 라우트 */}
          <Route path="/boardingPass/*" element={<BoardingPassMain />} />
        </Routes>
        <Navbar />
      </QueryClientProvider>
    </div>
  );
}

export default App;
