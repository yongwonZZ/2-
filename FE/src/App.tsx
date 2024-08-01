import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import MainPage from "./pages/mainPage/MainPage";
import AirlineSearchPage from "./pages/airlinePage/AirlineSearchPage";
import AirlineAllPage from "./pages/airlinePage/AirlineAllPage";
import ExChangeRatePage from "./pages/exchangeRatePage/ExchangeRatePage";
import ParkingPage from "./pages/airlineInfoPages/pages/ParkingPage";
import FacilitiesPage from "./pages/airlineInfoPages/pages/FacilitiesPage";
import TerminalMapPage from "./pages/airlineInfoPages/pages/TerminalMapPage";
// import BoardingPass from "./pages/boardingPass/BoardingPass";
import Login from "./pages/login/Login";
// @ts-ignore
import MyPage from "./pages/myPage/MyPage";
import AirportFashion from "./pages/airportFashionMain/airportFashion";
import LookDetails from "./pages/airportFashionPost/lookDetails";
import PostUpload from "./pages/airportFashionPost/postUpload/PostUpload";
import CongestionPage from "./pages/airlineInfoPages/pages/CongestionPage";
import AirlineDetailPage from "./pages/airlinePage/AirlineDetailPage";
import Navbar from "./components/Navbar";
// @ts-ignore
import CreateAccount from "./pages/createAccount/CreateAccount";
import BoardingPassDetails from "./pages/boardingPassDetails/BoardingPassDetails";

const queryClient = new QueryClient();

function App() {
  const [ticketCount, setTicketCount] = useState(0);

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Navbar ticketCount={ticketCount} />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/airline-search" element={<AirlineSearchPage />} />
          <Route path="/airline-search/:id" element={<AirlineDetailPage />} />
          <Route path="/exchange" element={<ExChangeRatePage />} />
          <Route path="/parking" element={<ParkingPage />} />
          <Route path="/facilities" element={<FacilitiesPage />} />
          <Route path="/terminalmap" element={<TerminalMapPage />} />
          <Route path="/airline-all" element={<AirlineAllPage />} />
          <Route path="/congestion" element={<CongestionPage />} />
          {/* <Route
            path="/BoardingPass"
            element={<BoardingPass setTicketCount={setTicketCount} />}
          /> */}
          <Route path="/Login" element={<Login />} />
          <Route path="/MyPage" element={<MyPage />} />
          <Route path="/CreateAccount" element={<CreateAccount />} />
          <Route path="/airportFashion" element={<AirportFashion />} />
          <Route path="/lookDetails" element={<LookDetails />} />
          <Route path="/postUpload" element={<PostUpload />} />
          <Route
            path="/boardingPass/:id"
            element={<BoardingPassDetails setTicketCount={setTicketCount} />}
          />
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;
