import { searchResultType } from "./search-result-type";
import AirlineSearchResultCard from "./AirlineSearchResultCard";
import { currentFormatTime } from "./utils/formatTime";
import { useFetchAirlineData } from "./hooks/useFetchAirlineData";

function AirlineSearchResult() {
  /** 요청에 필요한 파라미터 */
  /** 원래는 AirlineSearchPage로부터 props 전송받아야 함. 일단 하드코딩 */
  const params = {
    // airport_code: "IAD",
    // serviceKey와 type은 fetchAirlineData 내부에서 처리
  };

  const { error, isLoading, data } = useFetchAirlineData(params);

  return (
    <div>
      <h1>검색 결과</h1>
      <div>
        {isLoading && <div>데이터를 불러오는 중이에요..!</div>}
        {error && <div>에러: {error.message}</div>}
        {data
          ?.filter(
            ({ estimatedDateTime }) => estimatedDateTime >= currentFormatTime()
          )
          .slice(0, 10)
          .map((item: searchResultType, index: number) => (
            <AirlineSearchResultCard key={index} item={item} />
          ))}
      </div>
    </div>
  );
}

export default AirlineSearchResult;
