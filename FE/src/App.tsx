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
import Login from "./pages/login/Login";
import MyPage from "./pages/myPage/MyPage";
import AirportFashion from "./pages/airportFashionMain/AirportFashion";
import LookDetails from "./pages/airportFashionMain/LookDetails";
import PostUpload from "./pages/airportFashionMain/postUpload/PostUpload";
import CongestionPage from "./pages/airlineInfoPages/pages/CongestionPage";
import AirlineDetailPage from "./pages/airlinePage/AirlineDetailPage";
import Navbar from "./components/Navbar";
import CreateAccount from "./pages/createAccount/CreateAccount";
import BoardingPassDetails from "./pages/boardingPassDetails/BoardingPassDetails";
import { isAuthenticated } from "./utils/TokenUtils";

const queryClient = new QueryClient();

function App() {
  const [ticketCount, setTicketCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated() && location.pathname !== '/login' && location.pathname !== '/createAccount') {
      console.log('No token found, redirecting to login.');
      navigate('/login');
    }
    else{
      console.log(isAuthenticated());
    }
  }, [location, navigate]);

  return (
      <div className='App'>
        <QueryClientProvider client={queryClient}>
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
            <Route path='/login' element={<Login />} />
            <Route path='/myPage' element={<MyPage />} />
            <Route path='/createAccount' element={<CreateAccount />} />
            <Route path='/airportFashion' element={<AirportFashion />} />
            <Route path='/lookDetails' element={<LookDetails />} />
            <Route path='/postUpload' element={<PostUpload />} />
            <Route
                path='/boardingPass/:id'
                element={<BoardingPassDetails setTicketCount={setTicketCount} />}
            />
          </Routes>
          <Navbar ticketCount={ticketCount} />
        </QueryClientProvider>
      </div>
  );
}

export default App;
