import { Routes, Route } from "react-router-dom";
import MainPage from "./mainPage/MainPage";
import AirlineSearchPage from "./airlinePage/AirlineSearchPage";

// 라우팅 설명
// Routes 하위의 Route 컴포넌트: 다양한 URL 경로에 대한 라우트 정의
// Header, Navbar 컴포넌트: 각각의 페이지 안에 속하도록 구성
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/airline-search" element={<AirlineSearchPage />} />
      </Routes>
    </div>
  );
}

export default App;
