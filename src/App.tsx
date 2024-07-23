import { Routes, Route } from "react-router-dom";
import MainPage from "./mainPage/MainPage";
import AirlineSearchPage from "./airlinePage/AirlineSearchPage";
import Login from './login/Login';
import CreateAccount from './createaccount/CreateAccount'; // CreateAccount 페이지 컴포넌트 임포트
import MyPage from './myPage/MyPage'; // MyPage 컴포넌트 임포트
import FooterNavbar from "./gwcomponents/nav"; // FooterNavbar 컴포넌트 임포트
import BoardingPass from "./boardingPass/BoardingPass";
// 라우팅 설명
// Routes 하위의 Route 컴포넌트: 다양한 URL 경로에 대한 라우트 정의
// Header, Navbar 컴포넌트: 각각의 페이지 안에 속하도록 구성
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/airline-search" element={<AirlineSearchPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} /> {/* CreateAccount 경로 추가 */}
          <Route path="/myPage" element={<MyPage />} /> {/* MyPage 경로 추가 */}
          <Route path="/boardingPass" element={<BoardingPass />} />
      </Routes>
        <FooterNavbar />
    </div>
  );
}

export default App;
