import { searchResultType } from "./search-result-type";
import AirlineSearchResultCard from "./AirlineSearchResultCard";
import { currentFormatTime } from "../../../utils/formatTime";

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
  const filteredData = data
    ?.filter(
      ({ estimatedDateTime }) =>
        Number(estimatedDateTime) >= Number(currentFormatTime()) - 30
    )
    .sort(({ estimatedDateTime: a }, { estimatedDateTime: b }) => +a - +b)
    .slice(0, 10);

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
      ) : filteredData?.length === 0 ? (
        <div>
          <p>앗..! 검색 결과가 없습니다.</p>
          <p>다른 검색어를 입력하거나</p>
          <p>우측 상단의 검색어 필터를 확인해 보세요.</p>
        </div>
      ) : (
        filteredData?.map((item: searchResultType, index: number) => (
          <AirlineSearchResultCard key={index} item={item} />
        ))
      )}
    </div>
  );
}

export default AirlineSearchResult;
