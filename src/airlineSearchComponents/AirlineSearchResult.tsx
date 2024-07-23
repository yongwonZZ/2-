// 최초
// 1 - 최근 검색 있음 => 최근 검색 list
// 2 - 최근 검색 없음 =>
/* 앗... 검색 결과가 없습니다!
다른 검색어를 입력하거나
우측 상단의 검색어 필터를 확인해 보세요. */

// 검색어 상태가 공백이 아닌 경우 => 검색 결과
// 검색 결과

import { DummyData } from "../airlinePage/airlineDummyData";

type AirlineSearchResultProps = {
  searchedData: DummyData[] | null;
};

function AirlineSearchResult({ searchedData }: AirlineSearchResultProps) {
  return (
    <div>
      {searchedData &&
        searchedData.map((data) => {
          return (
            <div>
              <p>항공사: {data.airline}</p>
              <p>편명: {data.flightId}</p>
            </div>
          );
        })}
    </div>
  );
}

export default AirlineSearchResult;
