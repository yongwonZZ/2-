import { searchResultType } from "./searchResultType";
import AirlineSearchResultCard from "./AirlineSearchResultCard";

type AirlineSearchResultProps = {
  data?: searchResultType[];
  isLoading: boolean;
  error?: Error;
};

function AirlineSearchResult({
  data,
  isLoading,
  error,
}: AirlineSearchResultProps) {
  return (
    <div>
      {isLoading && <div>데이터를 불러오는 중이에요..!</div>}
      {error && (
        <div>
          <p>데이터를 가져오는 데 실패했어요...</p>
          <p>에러 메시지: {error.message}</p>
        </div>
      )}
      {typeof data === "undefined" ? (
        <div>검색어를 입력해주세요!</div>
      ) : data.length === 0 ? (
        <div>
          <p>앗..! 검색 결과가 없습니다.</p>
          <p>다른 검색어를 입력하거나</p>
          <p>우측 상단의 검색어 필터를 확인해 보세요.</p>
        </div>
      ) : (
        data.map(
          (
            item: searchResultType,
            index: number,
            origin: searchResultType[]
          ) => (
            <AirlineSearchResultCard key={index} item={item}>
              {item.codeshare === "Slave" &&
              origin.find(
                ({ flightId }) => flightId === item.masterflightid
              ) ? (
                <AirlineSearchResultCard.Slave item={item} />
              ) : (
                <AirlineSearchResultCard.Master item={item} />
              )}
            </AirlineSearchResultCard>
          )
        )
      )}
    </div>
  );
}

export default AirlineSearchResult;
