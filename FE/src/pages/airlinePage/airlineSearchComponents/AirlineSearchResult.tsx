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
  return (
    <div>
      {isLoading && <div>데이터를 불러오는 중이에요..!</div>}
      {error && <div>에러: {error.message}</div>}
      {typeof data === "undefined" ? (
        <div>검색어를 입력해주세요!</div>
      ) : (
        data
          ?.filter(
            ({ estimatedDateTime }) =>
              Number(estimatedDateTime) >= Number(currentFormatTime()) - 30
          )
          .slice(0, 10)
          .map((item: searchResultType, index: number) => (
            <AirlineSearchResultCard key={index} item={item} />
          ))
      )}
    </div>
  );
}

export default AirlineSearchResult;
