import { Routes, Route } from "react-router-dom";
import MainPage from "./mainPage/MainPage";
import AirlineSearchPage from "./airlinePage/AirlineSearchPage";

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
