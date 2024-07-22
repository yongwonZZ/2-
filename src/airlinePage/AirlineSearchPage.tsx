import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../publicComponents/Header";
import FlightFilterOptions from "../airlineSearchComponents/FlightFilterOptions";
import AirlineSearchResult from "../airlineSearchComponents/AirlineSearchResult";

function AirlineSearchPage() {
  const [searchText, setSearchText] = useState<string>("");
  const prevNavigator = useNavigate(); // 이전 페이지로 이동하는 함수

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleTextReset = () => setSearchText("");

  return (
    <>
      <Header>
        <button onClick={() => prevNavigator(-1)}>이전</button>
        <div>
          <input
            type="text"
            value={searchText}
            placeholder="검색어를 입력해 주세요"
            onChange={handleTextChange}
          />
          <button onClick={handleTextReset}>X</button>
        </div>
        <button>필터</button>
      </Header>
      <FlightFilterOptions />
      <AirlineSearchResult />
    </>
  );
}

export default AirlineSearchPage;
